---
layout: post
title: "Avoid time_ago_in_words in Rails"
date:  2015-07-24 21:36:55
categories: rails
---

ActiveSupport's `time_ago_in_words`
makes it really easy
to display time as
"x minutes/hours/months ago" format.
However,
it has one big disadvantage:
it makes it harder to use fragment caching.

Let's say we're displaying posts
within a partial:

{% highlight erb %}
<% # app/views/posts/_post.html.erb %>

<% cache post do %>
  <%= post.body %><br/>
  (posted <%= time_ago_in_words(post.created_at) %> ago)
<% end %>
{% endhighlight %}

Here the second line might show
"posted 2 minutes ago"
right now,
but in a minute,
it needs to change to
"posted 3 minutes ago",
but it will keep showing
the older time
until the cache expires.

My preferred solution for this
is to use the
[timeago](http://timeago.yarp.com)
jquery plugin.
Timeago plugin requires
time in ISO 8601 format,
so we'll add a helper method
that renders a span
containing time in the correct format.

{% highlight ruby %}
# app/helpers/time_helper.rb

module TimeHelper
  def timeago(time)
    content_tag(:span, time.iso8601, title: time.iso8601, class: 'timeago')
  end
end
{% endhighlight %}

Let's add a line of Javascript
to convert all spans
having the class timeago
to the time ago in words format:

{% highlight javascript %}
$('.timeago').timeago()
{% endhighlight %}

Now we can use this in the view, in place of
`time_ago_in_words`:

{% highlight erb %}
<% # app/views/posts/_post.html.erb %>

<% cache post do %>
  <%= post.body %><br/>
  (posted <%= timeago(post.created_at) %> ago)
<% end %>
{% endhighlight %}

Not only does this allow you
to use fragment caching correctly,
but it also updates the time
if you keep the page open for a while.
