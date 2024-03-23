---
layout: post
title: "Avoid deeply nested routes in Rails"
date:   2010-05-14 12:00:00
redirect_from:
  - /2010/rails-avoid-multiple-level-nested-resource-routes/
categories:
  - rails
---

*UPDATE: Code examples have been updated for Rails 3/4. Rails 2 was the latest version when this post was originally written. Also edited some of the content for clarity.*

While generating RESTful routes in rails, it is easy to get carried away and generate many levels of nested resources for every level of has_many associations. For instance, I recently wrote something like this in my routes file (where a Course `has_many` Batches, and a Batch `has_many` Exams.):

{% highlight ruby %}
# config/routes.rb
resources :courses do
  resources :batches do
    resources :exams
  end
end
{% endhighlight %}

The Rails Guides for routing makes the following recommendation:

> Resources should never be nested more than 1 level deep.

Now imagine how you would get the path to edit an exam resource. You'd have to write something like this:

{% highlight ruby %}
edit_course_batch_exam_path(@course, @batch, @exam)
{% endhighlight %}

As we already have the batch_id parameter in the URLs for `#show`, `#edit`, `#update` and `#destroy` in batches_controller, we only need to nest `#index`, `#new` and `#create` under the course resource. We can rewrite the routes for course and batches as:

{% highlight ruby %}
resources :courses do
  resources :batches, only: [:index, :new, :create]
end

resources :batches, only: [:show, :edit, :update, :destroy]
{% endhighlight %}

We can do the same to route exams, which need only be routed under the batches resources. To avoid all the verbosity involved in the above example, we can make use of a feature called *shallow nesting*. All of the above can be achieved through this:

{% highlight ruby %}
resources :courses, shallow: true do
  resources :batches do
    resources :exams
  end
end
{% endhighlight %}

We now have nested routes for the `#index`, `#new` and `#create`, while avoiding the unnecessary nesting for the URLs that route to actions where the id is already being passed.
