---
layout: post
title: "Rails: Handling Redirects in the Router"
date:  2016-07-06 18:34:59 +05:30
categories: rails
---

Recently I needed to handle incoming redirects in a Rails app
that didn't map to any existing routes.
It turns out that we can tell the Rails router
to match a pattern and redirects it directly
without writing a controller.

Say we have a Jekyll blog at `blog.example.com`,
and we need to move that to our main domain as `example.com/blog`.
The easiest way to handle this is to set up a URL DNS record
with the domain registrar that redirects
all traffic coming to `blog.example.com` to `example.com/blog`.

Unfortunately, our new blog has a different URL structure.
All our traffic is coming to `example.com/blog/posts/my-post-slug/`
and the `/posts/` part seems redundant.
We've set up our blog routes like this:

{% highlight ruby %}
namespace :blog do
  get '/',    to: 'posts#index'
  get '/:id', to: 'posts#show'

  resources :posts, except: [:index, :show]
end
{% endhighlight %}

To handle the new set of URLs, we could do either of these things:

{% highlight ruby %}
# Option 1
get '/posts/:id', to: 'posts#show'

# Option 2 (posts#legacy redirects to the correct URL)
get '/posts/:id', to: 'posts#legacy'
{% endhighlight %}

Both of these have drawbacks.
In option 1, we will now have two URLs for each blog post,
which we don't want to have to maintain.

Option 2 is better, but we're needlessly adding another action
just to handle a simple redirect.
This is where I came across the option to redirect directly in the router.
All you need to do is set it up like this:

{% highlight ruby %}
namespace :blog do
  # ...
  get '/posts/:id', to: redirect('/blog/%{id}/')
end
{% endhighlight %}

The router allows you to interpolate the argument using `%{}`.
Now we don't have an additional action in the controller,
or have to worry about having two separate URLs for the same post.

On encountering cases where you find yourself adding controller methods
that do very little, it's a good idea to look at the docs
and see if the router provides a simpler way to do it.

### Links

- [ActionDispatch::Routing::Redirection](http://api.rubyonrails.org/classes/ActionDispatch/Routing/Redirection.html)
