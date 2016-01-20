---
layout: post
title: "Getting started with Rails 5's ActionCable and websockets"
date:  2015-07-17 22:15:42
categories: rails
---

ActionCable is the websockets framework that ships with Rails 5.
It aims to simplify the addition of realtime features to Rails apps.
In this tutorial, we will explore ActionCable by
building a simple chat application.

Let's get started by installing the pre-release version of Rails (5.0.0.beta).
Once the final 5.0.0 version of Rails is released,
we won't have to add the `--pre` flag to the gem install command.

{% highlight bash %}
gem install rails --pre
rails new chatter
{% endhighlight %}

# Adding the views

We will be displaying the chat messages in `messages#index`.
Before joining the chat room, we will ask users to set a username
that will be displayed along with the chat messages.
The `sessions#new` view will contain the form to pick a username,
and we will also set it as the home page.
Let's add these routes to routes.rb:

{% highlight ruby %}
Rails.application.routes.draw do
  resources :messages, only: [:index]
  resources :sessions, only: [:new, :create]

  root 'sessions#new'
end
{% endhighlight %}

Next, we add a SessionsController.
The `#new` method only renders a view, so we can omit it here,
and just add the view template.
The `#create` method sets a signed cookie, `username`
that we will use to identify the user.

{% highlight ruby %}
# app/controllers/sessions_controller.rb
class SessionsController < ApplicationController
  def create
    cookies.signed[:username] = params[:session][:username]
    redirect_to messages_path
  end
end
{% endhighlight %}

We'll also add the erb template for `sessions#new` at
`app/views/sessions/new.html.erb`:

{% highlight erb %}
<%= form_for :session, url: sessions_path do |f| %>
  <%= f.label :username, 'Enter a username' %><br/>
  <%= f.text_field :username %><br/>
  <%= f.submit 'Start chatting' %>
<% end %>
{% endhighlight %}

In `MessagesController`, the `#index` method only renders the view,
so we don't need to do anything there:

{% highlight ruby %}
# app/controllers/messages_controller.rb
class MessagesController < ApplicationController
  def index
  end
end
{% endhighlight %}
The `messages/index` template looks like this:

{% highlight erb %}
<p>Signed in as @<%= cookies.signed[:username] %>.</p>

<div id='messages'></div>
<br/><br/>

<%= text_field_tag :body, '', id: 'chat-speak' %>
{% endhighlight %}

The empty `#messages` div is where we'll append
all the chat messages coming through the channel.

# Adding a channel

The next thing we will do is generate a channel that we can use
to communicate via websockets between the client and the server.

{% highlight bash %}
rails generate channel Chat speak
{% endhighlight %}

This will generate a `ChatChannel` with an action called `speak`.
It also generates a `chat.coffee` file in
`app/assets/javascripts/channels`.

After creating our first channel, we need to turn on the cable connection in
`app/assets/javascript/cable.coffee`
by uncommenting these lines:

{% highlight coffeescript %}
@App ||= {}
App.cable = ActionCable.createConsumer()
{% endhighlight %}

We also need to uncomment a line in `config/routes.rb` so that
ActionCable runs in the same process when we run `rails server`.

{% highlight ruby %}
Rails.application.routes.draw do
  # other routes

  mount ActionCable.server => '/cable'
end
{% endhighlight %}

# Setting up `ChatChannel`

First, we need to handle the actions present in `ChatChannel`.

{% highlight ruby %}
# app/channels/chat_channel.rb
class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'messages'
  end

  def speak(data)
    ActionCable.server.broadcast('messages',
      message: render_message(data['message']))
  end

  private

  def render_message(message)
    ApplicationController.render(partial: 'messages/message',
                                 locals: { message: message })
  end
end
{% endhighlight %}

When a client connects to the channel, the `#subscribed` action is called.
This subscribes the client to a stream called `messages`.
Whenever data is broadcast to the messages stream, it is pushed to the clients.

The `#speak` action corresponds to a method in the client side code.
When a user types a message a hits enter, we can call `App.chat.speak`
on the client side, which in turn invokes this action on the server.

When we receive a message in the `#speak` action,
we will render the HTML for that message to the `messages` stream.
We're using the newly introduced `ApplicationController.render` method
which allows us to render a partial into a string.
Let's create the partial:

`app/views/messages/_message.html.erb`:

{% highlight erb %}
<p><%= message %></p>
{% endhighlight %}

When we broadcast the HTML to the `messages` stream,
all the clients connected to the channel will receive the data
and call the `App.chat.received` method on the client side.

Nest stop: writing the client side code corresponding to this.

# Client side code

Rails has already generated some client side code for us.
Let's start by handling the event when enter is pressed in the chat input field.
Add this at the end of `app/assets/javascripts/channels/chat.coffee`:

{% highlight coffeescript %}
$(document).on 'keypress', '#chat-speak', (event) ->
  if event.keyCode is 13
    App.chat.speak(event.target.value)
    event.target.value = ""
    event.preventDefault()
{% endhighlight %}

When you hit enter in the `#chat-speak` input field,
this pushes the content of the field to the chat channel
by calling `App.chat.speak`, which in turn sends it to the cable server.

Let's also handle the two main actions in `App.chat`:

{% highlight coffeescript %}
# app/assets/javascripts/channels/chat.coffee
App.chat = App.cable.subscriptions.create "ChatChannel",
  received: (data) ->
    $('#messages').append(data.message)

  speak: (msg) ->
    @perform 'speak', message: msg
{% endhighlight %}

With this, our chat app is ready.
Try submitting a message in the input field,
and you'll see it appear on the page.
There is one problem with this, though.
We aren't showing the name of the person sending the message.
Let's fix that.

# Setting `current_user`

In the `messages/_message` partial, we want to be able to
access the username of the current user.
To do this, we will add a `#current_user` method in
`ApplicationCable::Connection`.

{% highlight ruby %}
# app/channels/application_cable/connection.rb
module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = cookies.signed[:username]
    end
  end
end
{% endhighlight %}

The next thing to do is to use this `ChatChannel#render_message`:

{% highlight ruby %}
# app/channels/chat_channel.rb

def render_message(message)
  ApplicationController.render(
    partial: 'messages/message',
    locals: {
      message: message,
      username: current_user
    })
end
{% endhighlight %}

In `app/views/messages/_message.html.erb`:

{% highlight erb %}
<p>
  <b><%= username %></b>:
  <%= message %>
</p>
{% endhighlight %}

Restart the rails server and open the chat in two different browsers.
Now, you can see the messages being rendered with the username.

# Next steps

* [Code for this example](https://github.com/nithinbekal/actioncable-chat-example/tree/basic)
* [ActionCable screencast by DHH](https://www.youtube.com/watch?v=n0WUjGkDFS0)
* [ActionCable examples](https://github.com/rails/actioncable-examples)
  from the Rails core team have some very nice examples
  that show off the more advanced features of ActionCable.
* [GoRails: ActionCable and Websockets Introduction](https://gorails.com/episodes/rails-5-actioncable-websockets)
  explores the code from the ActionCable examples linked above
  in a great screencast.

If you want to look at how similar features are implemented
in other languages and frameworks,
I recently wrote about building a similar
[chat app using the Phoenix framework](/posts/phoenix-chat/)
for the Elixir language.
Because of Elixir's similarity with Ruby in terms of syntax,
it should be easy for Rubyists to follow along.

