---
layout: post
title: "Presenters in Rails"
date:  2014-09-25 22:00:50
categories: ruby, rails, programming
---

When your models are bloated with methods that are only used in views, it might be a good time to refactor them. Moving that logic into helper modules might be OK in some cases, but as the complexity of your views grows, you might want to look at presenters.

Presenters give you an object oriented way to approach view helpers. In this post, I will walk through how we refactored our views to use presenters instead of helper methods or even methods in the model.

Ryan Bates' excellent Railscasts has an episode on writing [presenters from scratch](http://railscasts.com/episodes/287-presenters-from-scratch) that guided me through this refactor. It's dives a bit deeper than what I'm covering here, so go check it out after you've read this.

# Refactoring the views

We have a HAML view where we display the title and publication status of a post. The title is an ActiveRecord field and the publication status is a method in the Post model.

{% highlight haml %}
%h1= @post.title
%p= @post.publication_status
{% endhighlight %}

The `publication_status` is shown as the publication date if it is already published. Otherwise we show the string 'Draft'.

{% highlight ruby %}
class Post < ActiveRecord::Base
  def publication_status
    published_at || 'Draft'
  end
end
{% endhighlight %}

This isn't too bad. But what if we need to change this to show the publication date in an "X hours ago" format instead? We would love to use Rails' time_ago_in_words helper method, but it's not available in the model. The simplest approach here would be to move this into a helper module.

{% highlight ruby %}
module PostHelper
  def publication_status(post)
    if post.published_at
      time_ago_in_words(post.published_at)
    else
      'Draft'
    end
  end
end
{% endhighlight %}

This solves our problem, but these view helpers have the disadvantage of putting all helper methods into a single namespace. It would be nice to have a class that contains post related helper methods.

# Creating our first presenter

We can create a `PostPresenter` class that implements the logic that we have in the helper.

{% highlight ruby %}
class PostPresenter < Struct.new(:post, :view)
  def publication_status
    if post.published_at?
      view.time_ago_in_words(post.published_at)
    else
      'Draft'
    end
  end
end

presenter = PostPresenter.new(@post, view_context)
presenter.publications_status  #=> 'Draft'
{% endhighlight %}

The view_context here represents an instance of `ActionView`, which is where we get view helpers like time_ago_in_words. Since `PostPresenter` does not contain these helper methods, we need to explicitly pass in the view_context from the controller.

Now we run into the problem of needing a `#title` method since that is also needed in the view. We can avoid this by passing through method calls to the post object if they are not defined in the presenter. Let's create a `BasePresenter` class that takes care of this, and inherit all our presenters from this class.

{% highlight ruby %}
class BasePresenter < SimpleDelegator
  def initialize(model, view)
    @model, @view = model, view
    super(@model)
  end

  def h
    @view
  end
end
{% endhighlight %}

By inheriting from Ruby's builtin `SimpleDelegator` class and calling `super` in the initialize method, we make sure that if we call any method that is not defined in the presenter, it passes it on to the post object.

I have also included a handy method `#h` that simply returns the view context. (This name is used in both Draper and the presenters Railscast, so let's follow the same convention.) Our presenter, after inheriting from `BasePresenter`, now looks like this:

{% highlight ruby %}
class PostPresenter < BasePresenter
  def publication_status
    if @model.published_at?
        h.time_ago_in_words(@model.published_at)
    else
      'Draft'
    end
  end
end
{% endhighlight %}

We can instantiate the presenter objects in the controller:

{% highlight ruby %}
class PostsController < ApplicationController
  def show
    post = Post.find(params[:id])
    @post = PostPresenter.new(post, view_context)
  end
end
{% endhighlight %}

# Moving presenters out of controllers

To simplify things further, we could avoid instantiating the presenter object in the controller and instead add a helper method that allows us to wrap the ActiveRecord object inside a presenter directly in the view.

{% highlight ruby %}
module Application_helper
  def present(model)
    klass = "#{model.class}Presenter".contantize
    presenter = klass.new(model, self)
    yield(presenter) if block_given?
  end
end
{% endhighlight %}

This infers the presenter class from the object being passed in and passes the presenter object into a block that we pass in from the view. It allows us to write code that looks like this:

{% highlight ruby %}
- present(@post) do |post|
  %h2= post.title
  %p= post.author
{% endhighlight %}

# Custom presenters

The above code assumes that all our presenter classes follow the convention of appending 'Presenter' to the model name. I sometimes split presenters into smaller ones that are used in different places. For instance, I could have an `AdminPostPresenter` which contains helper methods for showing a post in the admin dashboard.

For these cases, I tweaked the `present` method to accept an optional second argument.

{% highlight ruby %}
module ApplicationHelper
  def present(model, presenter_class=nil)
    klass = presenter_class || "#{model.class}Presenter".constantize
    presenter = klass.new(model, self)
    yield(presenter) if block_given?
  end
end
{% endhighlight %}

This allows me to call `present(@post, AdminPostPresenter)` in the view where I use the admin-specific presenter, while continuing to use the `present(@post)` format elsewhere.

# Wrapping up

Using presenters has been a great win for us in maintaining the views. They also have the added benefit of being easier to test. We did try using draper, but given how easy it is to roll our own presenters, we chose the latter option. If maintaining your Rails views is giving you problems, presenters could be a great way to clean things up.

# Links

* Ryan Bates' [Presenters from Scratch Railscast](http://railscasts.com/episodes/287-presenters-from-scratch)
* [Draper gem](https://github.com/drapergem/draper)
* [Jay Fields' article about presenters](blog.jayfields.com/2007/03/rails-presenter-pattern.html) was one of the early mentions of presenters in the Rails community
* In my previous post, I wrote about [the decorator pattern in Ruby](/posts/ruby-decorators/). Presenters can be seen as a kind of decorator that resides closer to the view layer.
* Slides from my [Decorators and Presenters](/slides/decorator-pattern/) talk at the Kochi Ruby meetup
