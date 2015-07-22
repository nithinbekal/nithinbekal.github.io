---
layout: post
title: "Set page titles and meta tags in Rails views"
date:  2015-07-22 12:43:59
categories:
  - rails
---

When building websites
that need to be SEO friendly,
we often need to customize
the page title and meta tags
for individual views.

My preferred way to do this is to
add helper methods
that you can use in the views
to override the defaults.
For example,
we might want to be able to
set the page title and meta tags
for a `posts#show` view like this:

{% highlight erb %}
<% # Meta information for the <head> section %>
<% title @post.title %>
<% meta_tag :description, @post.description %>
<% meta_tag :keywords, @post.keywords.join(',') %>

<% # Actual view content %>
<h2><%= @post.title %></h2>
<div class='content'><%= @post.body %></div>
{% endhighlight %}

Now let's write the helpers
and modify `layouts/application.html.erb`
to be able to use such helpers.

## Page titles

First, we'll write the page title helper.
Add this method to `ApplicationController`:

{% highlight ruby %}
module ApplicationHelper
  def title(text)
    content_for :title, text
  end
end
{% endhighlight %}

Now change the title tag
in `app/views/layouts/application.html.erb`
to look something like this:

{% highlight erb %}
<% # inside the head tag... %>
<title>
  <%= if content_for?(:title) then yield(:title) + ' | ' end %>
  My Awesome Site
</title>
{% endhighlight %}

Now if you set the title
in posts#show,
you will see the title as
"My Post Title | My Awesome Site",
and otherwise it will be
"My Awesome Site".

# Meta tags

Next we will set up
the helpers for
the meta tags.
We might need to setup
helpers for description and tags.
We can use a single helper
that can be used like
`meta_tag, :description, 'Some description goes here'`.
We'll add two helper methods
to accomplish this.

{% highlight ruby %}
module ApplicationHelper
  def meta_tag(tag, text)
    content_tag :"meta_#{tag}", text
  end

  def yield_meta_tag(tag, default_text='')
    content_for?(:"meta_#{tag}") ? content_for(:"meta_#{tag}") : default_text
  end
end
{% endhighlight %}

In the head section of layouts/application.html.erb:

{% highlight erb %}
<meta name='description'
      content='<%= yield_meta_tag(:description, 'Default description') %>' />
<meta name='keywords'
      content='<%= yield_meta_tag(:keywords, 'defaults,ruby,rails') %>' />
{% endhighlight %}

In posts#show:

{% highlight erb %}
<% meta_tag :description, @post.description %>
<% meta_tag :keywords, @post.keywords.join(',') %>
{% endhighlight %}

This solution is actually overkill
if we only need to override
description and keywords tags.
Having two helper methods,
`#meta_description` and `#meta_keywords`,
similar to the title helper,
would be a much simpler option
in that case.
But if you need the ability
to override many different tags,
the above approach make it simpler.

