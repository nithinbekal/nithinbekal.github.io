---
layout: post
title: "What's new in Rails 5?"
date:  2016-01-04 23:57:24
categories: rails
---

Rails 5.0 is almost here!
The first beta version has been released already,
and you can try out some of the shiny new features right away.
So what are the new features?
Let's take a quick tour of the new features and major changes.

## ActionCable

Websocket support in Rails is the most talked about feature in Rails 5.
This will make it super easy to add realtime features to your app.
If you're planning to explore ActionCable,
here's a couple of getting started guides:

* [Getting Started With ActionCable](/posts/rails-action-cable/)
* [ActionCable demo screencast by DHH](https://www.youtube.com/watch?v=n0WUjGkDFS0)

## Attributes API

A new attributes API has been introduced that allows you to define
custom attributes on a model or override existing attributes.
For instance, you can create a `MoneyType` attribute type,
and define how this gets stored as a `price_in_cents` field in the database.

{% highlight ruby %}
# app/models/product.rb
class Product < ApplicationRecord
  attribute :price_in_cents, MoneyType.new
end

class MoneyType < ActiveRecord::Type::Integer
  def type_cast(value)
    # convert values like '$10.00' to 1000
  end
end

product = Product.new(price_in_cents: '$10.00')
product.price_in_cents #=> 1000
{% endhighlight %}

It also allows you to override types of existing database attributes
(eg. you were using a decimal field in the database,
and now only need the values as integers),
or even to define non-persisted attributes on a model.
Read more about the attributes API here:

* [Attributes API documentation](https://github.com/rails/rails/blob/master/activerecord/lib/active_record/attributes.rb)
* [Introduction to Rails 5 Attributes](http://jakeyesbeck.com/2015/12/20/rails-5-attributes/)
* [Using the Rails 5 Attributes API Today, in Rails 4.2](https://nvisium.com/blog/2015/06/22/using-rails-5-attributes-api-today-in/)

## ApplicationRecord

And speaking of ActiveRecord, you might have noticed
that the `Product` model above inherits from `ApplicationRecord`,
not `ActiveRecord::Base`.
This is because Rails now generates that class
so that we can add all our customizations there
instead of mokeypatching `ActiveRecord::Base`.
Read more about it here:

* [ApplicationRecord in Rails 5](http://blog.bigbinary.com/2015/12/28/application-record-in-rails-5.html)

## ActiveRecord::Relation#or

After all this time, we finally have the `#or` method in ActiveRecord.
We can call `#or` on a relation and pass another relation as its argument
and it will generate an OR query.
We can use it like this:

{% highlight ruby %}
class Issue < ApplicationRecord
  scope :reported, -> { where(status: 'reported') }
  scope :open,     -> { where(status: 'open') }
end

active_issues = Issue.reported.or(Issue.open)
{% endhighlight %}

## ActiveRecord::Relation#in_batches

The new `#in_batches` method yields a relation,
unlike `#find_in_batches` which yields an array.
We can use this method for things like this:

{% highlight ruby %}
Person.where('age >= 18').in_batches(of: 1000) do |people|
  people.update_all(can_vote: true)
end
{% endhighlight %}

* [Documentation](https://github.com/rails/rails/blob/v5.0.0.beta1/activerecord/lib/active_record/relation/batches.rb#L132)
* [New in ActiveRecord: #in_batches](http://crypt.codemancers.com/posts/2015-12-23-new-in-batches-method-in-active-record/)

## ActiveRecord::Base#has_secure_token

If you need a random token in your models,
Rails 5 has introduced `has_secure_token`.
Example usage:

{% highlight ruby %}
class User < ApplicationRecord
  has_secure_token :email_unsubscribe_token
end

user = User.create
user.email_unsubscribe_token #=> 'e2426a93718d1817a43abbaa'

user.regenerate_email_unsubscribe_token
{% endhighlight %}

## Rails API

The rails-api gem has been merged into Rails.
It allows you to generate API-only Rails app
and strips out all the middleware that you don't need
in an app that generates JSON responsed instead of HTML.
You can now generate an API-only app using the `--api` option:

{% highlight bash %}
rails new my-app-api --api
{% endhighlight %}

## ActionController::Renderer

View rendering has been moved out into `ActionController::Renderer`
and is available for use anywhere via `ApplicationController.render` method.
This lets you render partials into strings and use them
in background jobs and other classes.
Here's an example of how to render a partial using the render method:

{% highlight ruby %}
MessagesController.render(partial: 'messages/message',
  locals: { message: params[:message][:body] })
{% endhighlight %}

If you're wondering why you would want to render views outside controllers
you can see this in action in the code for the
[Getting Started with ActionCable](/posts/rails-action-cable/)
guide, where it is used for rendering HTML into a string in background job
which is then sent to the clients via websockets.

## Turbolinks 3

The latest version of Turbolinks introduces partial replacement,
which allows you to replace only specific divs on a page.
Using `data-turbolinks-permanent`, you can also transfer DOM elements
from page to page along with the states.
This is useful for sections like navbars that do not change across pages.

On the server side, you can trigger partial replacement
using additional options with `redirect_to` or `render` methods.
For example, take a look at the following code:

{% highlight ruby %}
class CommentsController < ApplicationController
  def create
    @comment = Comment.new(comment_params)

    if @comment.save
      redirect_to comments_url, change: 'comments'
    else
      render :new, change: :new_comment
    end
  end
end
{% endhighlight %}

If the comment is saved successfully in the above case,
only the div with id "comments" is replaced
with the matching element from the rendered HTML at `comments_url`.
In case of an error, only the 'new_comment' element, which is the comment form,
is replaced by the matching element from the response.

* [Turbolinks Readme](https://github.com/rails/turbolinks/blob/master/README.md)

## New command router

Ever accidentally typed `rails db:migrate` or `rake generate model`?
Figuring out which command to use is often confusing to beginners.
Now all such commands are routed through `rails`,
so we will be able to use commands like `rails db:migrate`.
The rake commands are still available if you want to use them.

## Snappier development mode

In development mode, Rails reloads constants
when it finds that the file has changed.
Until now it was done by checking the mtimes for all the files on each request
and reloading if something has changed.
Rails 5 introduces an evented file system monitor
which asynchronously calls Rails when something changes.
As a result, it no longer needs to check all the files on each request,
and this makes the development mode much faster.
Read more about it here:

* [Snappier development mode in Rails 5](http://weblog.rubyonrails.org/2015/11/11/snappier-development-mode-in-rails-5/)

## Test runner

The test runned for minitest has seen many improvements,
including improved error messages, color output
and the ability to run a single test by referring to the line.
This has finally brought the minitest 
Read more about the improvements in the test runner here:

* [Test runner in Rails 5](http://blog.bigbinary.com/2016/01/03/test-runner-in-rails-5.html)

## Supports only Ruby 2.2.2+

Rails has always pushed the community towards the latest Ruby versions,
and 5.0 is no different.
This version will only work on Ruby 2.2.2 and above.
This lets Rails to improve performance
by making use of the latest improvements in the Ruby garbage collector
(like incremental GC and symbol GC).

If you're upgrading Ruby anyway, you might want to look at Ruby 2.3
which was released recently
[with a bunch of new features](/posts/ruby-2-3-features/).

## Upgrading

With the release of Rails 5, all versions of Rails from 4.1.x and below 
will no longer be supported.
Bug fixes will only be released for Rails 5.0.x and 4.2.x.
Now would be a good time to upgrade,
at least to 4.2.x if you haven't already done so.
If you're planning to upgrade to Rails 5.0, these resources could be useful:

* [Upgrading to Ruby on Rails 5.0 from Rails 4.2 – application use case](http://dev.mensfeld.pl/2015/12/upgrading-to-ruby-on-rails-5-0-from-rails-4-2-application-use-case/)
* [A Guide for Upgrading Ruby on Rails](http://edgeguides.rubyonrails.org/upgrading_ruby_on_rails.html)

## Links

The new features in Rails have been discussed in a few other places:

* [Rails 5 Beta 1 announcement](http://weblog.rubyonrails.org/2015/12/18/Rails-5-0-beta1/)
* [Rails 5 - The Beta Awakens](http://weblog.rubyonrails.org/2015/12/19/this-week-in-rails-rails-5-the-beta-awakens/)
* [What's New in Rails 5](http://blog.michelada.io/whats-new-in-rails-5)
* [Rails 5 - what's new](https://medium.com/evil-martians/the-rails-5-post-9c76dbac8fc#.qoo3ba9yw)

_A lot of new features have been introduced in Rails 5,
and I might have missed a few interesting ones.
Please do leave a comment pointing out any interesting features
I might have missed and I'll add it to the list._

