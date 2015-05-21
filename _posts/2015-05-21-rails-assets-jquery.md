---
layout: post
title: "Don't use jquery-rails gem alongside rails-assets"
date:  2015-05-21 20:12:45
categories: rails
---

I've [previously written](/posts/rails-assets/) about
how much I like rails-assets
for using bower packages
with the Rails asset pipeline.

I started using rails-assets
in one of my older projects
which already had the jquery-rails gem.
In order to not risk breaking anything,
I decided to keep using that gem for jquery,
and rails-assets for everything else.

Although this hasn't caused any problems so far,
I feel that this is a bad idea.
In the project,
I'm using jquery-textcomplete from rails-asset,
which has jquery as one of its dependencies.
Now I have two versions of jquery,
and it's confusing which version gets loaded
by the `//= require jquery` line
in the application.js manifest.

When starting a new project,
I now remove the jquery-rails gem,
and instead rely on rails-assets
for all JS assets.

{% highlight diff %}
- gem 'jquery-rails'

+ source 'https://rails-assets.org' do
+   gem 'rails-assets-jquery'
+   gem 'rails-assets-jquery-ujs'
+   # ...
+ end
{% endhighlight %}

One thing to keep in mind
is that you will also need to
include jquery_ujs also from bower.
This is required for Rails'
[unobtrusive JS features](https://robots.thoughtbot.com/a-tour-of-rails-jquery-ujs)
like ajax forms and
confirmation dialogs on delete links.

