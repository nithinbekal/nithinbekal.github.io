---
layout: post
title: "Passing optional locals to Rails partials"
date:  2015-02-16 13:05:42
categories: ruby, rails
---

When passing locals to Rails partials,
you might run into cases where
you need to pass optional locals in some places,
but don't want to pass it in every other place
where you use the partial.

As an example, you have a `_post` partial
which you render like this:

{% highlight erb %}
<%= render 'post', locals: { post: post } %>
{% endhighlight %}

And now you want to render the same partial from another view,
but this time you want to pass a boolean flag
to tell the partial to render the author bio as well.

{% highlight erb %}
<%= render 'post', locals: { post: post, show_author_bio: true } %>
{% endhighlight %}

If we now used the `show_author_bio` local in the partial,
it would break the other view 
which does not know about this local.
To use it safely, we can make use of
the `local_assigns` hash.

{% highlight erb %}
<h1><%= post.title %></h1>

<% if local_assigns[:show_author_bio] %>
  <%= render 'author_bio', locals: { author: post.author } %>
<% end %>

<%= post.body %>
{% endhighlight %}

Even though we're using it for passing a boolean value here,
we could pass in any other object as well.
For instance, we could pass in an optional author object:

{% highlight erb %}
<% if local_assigns.has_key?(:author) %>
  <%= render 'author_bio', locals: { author: author } %>
<% end %>
{% endhighlight %}

Sadly, Rails documentation seems to be
missing details about this useful feature.
I'm not sure if this is because
it has been deprecated since Rails 4.
Do leave a comment below if you know why.

