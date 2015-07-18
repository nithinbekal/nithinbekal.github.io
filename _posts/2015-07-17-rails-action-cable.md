---
layout: post
title: "Getting started with Rails 5's ActionCable and websockets"
date:  2015-07-17 22:15:42
categories: rails
---

The source code
for the much anticipated
[ActionCable](https://github.com/rails/actioncable) library
that will ship with Rails 5
has finally been made public.
For those of you who
haven't heard of ActionCable,
it is the websockets framework
that will ship with Rails 5.
It aims to simplify
the addition of realtime features
to Rails apps.

In this post,
we will build a very simple app
using ActionCable.
It will be a simple chat app,
where people can pick a username
and start posting to a public chatroom.
We'll only be looking at
how we can add realtime functionality
to an app,
but won't be exploring
the internals of ActionCable
in too much detail.

ActionCable works with Rails 4.2,
so that's what we'll be using,
but at the end of the post,
I'll show some Rails 5 features
that will simplify some of the things
we do with ActionCable.

# Gemfile

Generate the app using `rails new chat`
and add the actioncable and puma gems
to the Gemfile.
This is what the Gemfile
should now contain:

{% highlight ruby %}
source 'https://rubygems.org'

gem 'rails', '4.2.3'
gem 'actioncable', github: 'rails/actioncable'

gem 'sqlite3'
gem 'coffee-rails', '~> 4.1.0'
gem 'jquery-rails'
gem 'turbolinks'
gem 'puma'
gem 'uglifier', '>= 1.3.0'

group :development, :test do
  gem 'byebug'
  gem 'spring'
  gem 'web-console', '~> 2.0'
end
{% endhighlight %}

We've added puma because
ActionCable runs in a separate process
from our main application server,
and needs a web server like puma to run.

# Adding the views

We will be displaying the chat messages
in `messages#index`.
Before joining the chat room,
we will ask users to set a username
that will be displayed
along with the chat messages.
The `sessions#new` view will contain
the form to pick a username,
and we will also set it as the home page.
Let's add these routes to routes.rb:

{% highlight ruby %}
Rails.application.routes.draw do
  resources :messages, only: [:index, :create]
  resources :sessions, only: [:new, :create]

  root 'sessions#new'
end
{% endhighlight %}

Next, we add a SessionsController.
The `#new` method only renders a view,
so we can omit it here,
and just add the view template.
The `#create` method
sets a signed cookie, `username`,
that we will use to recognize the user.

{% highlight ruby %}
# app/controllers/sessions_controller.rb
class SessionsController < ApplicationController
  def create
    cookies.signed[:username] = params[:session][:username]
    redirect_to messages_path
  end
end
{% endhighlight %}

We'll also add the erb template for `sessions#new`
at `app/views/sessions/new.html.erb`:

{% highlight erb %}
<%= form_for :session, url: sessions_path do |f| %>
  <%= f.label :username, 'Enter a username' %><br/>
  <%= f.text_field :username %><br/>
  <%= f.submit 'Start chatting' %>
<% end %>
{% endhighlight %}

In `MessagesController` also,
the `#index` method only renders the view,
so we don't need to explicitly include it here.

For now, the `#create` method
will simply respond with a success status code
for every request.
Later on, we will change this to broadcast messages
that it receives.

{% highlight ruby %}
class MessagesController < ApplicationController
  def create
    head :ok
  end
end
{% endhighlight %}

The `messages/index` template looks like this:

{% highlight erb %}
Signed in as @<%= cookies.signed[:username] %>.
<br/><br/>

<div id='messages'></div>
<br/><br/>

<%= form_for :message, url: messages_path, remote: true, id: 'messages-form' do |f| %>
  <%= f.label :body, 'Enter a message:'  %><br/>
  <%= f.text_field :body %><br/>
  <%= f.submit 'Send message' %>
<% end %>
{% endhighlight %}

We've set `remote: true` in the form,
so it will submit the chat messages
using an ajax request.
We aren't doing anything with the requests
in `messages#create`,
but we have avoided page reloads
by using the ajax form.

The empty `#messages` div
is where we'll append
all the chat messages
coming through the channel.

# Setting up ActionCable

Now that everything else is in place,
let's set up ActionCable.
Right now we need to add these files manually,
but once the final version is released,
Rails will hopefully
generate these stubs for us.

We need two classes `ApplicationCable::Connection`
and `ApplicationCable::Channel`.
The latter will be the superclass for
our own channel classes.

{% highlight ruby %}
# app/channels/application_cable/connection.rb
module ApplicationCable
  class Connection < ActionCable::Connection::Base
  end
end

# app/channels/application_cable/channel.rb
module ApplicationCable
  class Channel < ActionCable::Channel::Base
  end
end
{% endhighlight %}

ActionCable uses Redis for
publishihng and subscribing to the messages,
so we need to configure Redis in
`config/redis/cable.yml`.
You will need Redis installed and running
for ActionCable to work.

{% highlight yaml %}
local: &local
  :url: redis://localhost:6379
  :host: localhost
  :port: 6379
  :timeout: 1
  :inline: true
development: *local
test: *local
{% endhighlight %}

As I mentioned earlier,
ActionCable runs in a separate process,
so it needs its own rackup file,
which we'll put in `cable/config.ru`.

{% highlight ruby %}
# cable/config.ru
require ::File.expand_path('../../config/environment',  __FILE__)
Rails.application.eager_load!

require 'action_cable/process/logging'

run ActionCable.server
{% endhighlight %}

We'll run the cable server
using puma on port 28080,
but instead of typing the entire command,
we'll add an executable script,
`bin/cable`:

{% highlight bash %}
# /bin/bash
bundle exec puma -p 28080 cable/config.ru
{% endhighlight %}

# Adding our MessagesChannel

The final step to get our chat app working
is to set up the `MessagesChannel`:

{% highlight ruby %}
# app/channels/messages_channel.rb
class MessagesChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'messages'
  end
end
{% endhighlight %}

Whenever a client subscribes to `MessagesChannel`,
the `#subscribed` method is called,
which starts streaming anything
you broadcast to the "messages" stream.

# Broadcasting to the messages stream

We can now change `messages#create` action
to broadcast incoming messages
to the messages stream:

{% highlight ruby %}
class MessagesController < ApplicationController
  def create
    ActionCable.server.broadcast 'messages',
      message: params[:message][:body],
      username: cookies.signed[:username]

    head :ok
  end
end
{% endhighlight %}

# Subscribing to messages from the client side

With a little bit of client side code,
we can finally put things together.
First, we will set up a connection
to the cable server in
`app/assets/javascripts/channels/index.coffee`:

{% highlight ruby %}
#= require cable
#= require_self
#= require_tree .

@App = {}
App.cable = Cable.createConsumer 'ws://127.0.0.1:28080'
{% endhighlight %}

We will subscribe to `MessagesChannel`
by adding the following code to
`app/assets/javascripts/channels/messages.coffee`:

{% highlight coffee %}
App.messages = App.cable.subscriptions.create 'MessagesChannel',
  received: (data) ->
    $('#messages').append @renderMessage(data)

  renderMessage: (data) ->
    "<p><b>[#{data.username}]:</b> #{data.message}</p>"
{% endhighlight %}

The `App.messages.received` function
gets called whenever the client
receives something through the websocket.
The incoming data is JSON encoded,
so we can access `data.username` and `data.message`
in the `renderMessage` function.

The final step is to make sure
our channels code is included
in the application.js file.
Just before the `require_tree .` line
in application.js,
add the following line,
that includes the fines in
`app/assets/javascripts/channels`.

{% highlight sass %}
//= require channels
{% endhighlight %}

Your ActionCable powered chat app
is now ready.
Make sure your cable server is running
using `./bin/cable`.
Remember to restart this
whenever you change
any of the channel classes,
because auto-reloading code
doesn't work (yet) with ActionCable.

Open two browsers
with separate cookie space
(eg. one regular Chrome window
and an incognito window),
and try submitting chat messages
in the `messages#index` page.

# If you're on Rails 5 alpha...

Rails 5 won't be out
for another couple of months yet,
but if you use rails master branch
([refer this Gemfile to set it up](https://github.com/nithinbekal/actioncable-chat-example/blob/f0f4c7269c0c491576fd23db4fd11c09ebe69f54/Gemfile)),
you can
[render views outside of actions](https://medium.com/evil-martians/new-feature-in-rails-5-render-views-outside-of-actions-2fc1181e86a8).
This lets you do interesting things
like broadcasting HTML to channels.
Here's how we could stream
the rendered text from a partial
using this feature:

{% highlight ruby %}
ActionCable.server.broadcast 'messages',
  message: MessagesController.render(
    partial: 'messages/message',
    locals: {
      message: params[:message][:body],
      username: cookies.signed[:username]
    }
  )
{% endhighlight %}

With this in place,
you no longer need the `renderMessage` function 
in `messages.coffee`.
Instead you can append `data.message`
directly to the `#messages` div.

# Next steps

If you wish to explore ActionCable further,
the next set would be the 
[github repo](https://github.com/rails/actioncable).
There is a details README,
and the source is well documented.

* [Code for this example](https://github.com/nithinbekal/actioncable-chat-example)
  (uses Rails 5)
* [ActionCable examples](https://github.com/rails/actioncable-examples)
  from the Rails core team
  have some very nice examples
  that show off the more advanced features
  of ActionCable.
* [GoRails: ActionCable and Websockets Introduction](https://gorails.com/episodes/rails-5-actioncable-websockets)
  explores the code from the
  ActionCable examples linked above
  in a great screencast.
* [This pull request](https://github.com/code-mancers/rapidfire-demo/compare/actioncable)
  is a nice example for
  adding ActionCable to your app.

If you want to look at
how similar features are implemented
in other languages and frameworks,
I recently wrote about building a similar
[chat app using the Phoenix framework](/posts/phoenix-chat/)
for the Elixir language.
Because of Elixir's similarity with Ruby
in terms of syntax,
it would be easy for Rubyists
to follow along.

