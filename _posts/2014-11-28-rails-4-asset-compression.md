---
layout: post
title: "Enable Asset Compression After Upgrading to Rails 4"
date:  2014-11-28 20:35:18
categories:
  - rails
---

Recently, I upgraded an app from Rails 3.2 to 4.0. Things went smoothly, but I recently noticed that the JavaScript response was twice the size I expected it to be. Taking a closer look showed that Rails was no longer minifying the JS assets.

It turns out that the `config.assets.compress = true` directive no longer works in Rails 4. Instead, you need to specify the compressor in config/environment/production.rb like this:

{% highlight ruby %}
MyApp::Application do
  config.assets.js_compressor = :uglifier
end
{% endhighlight %}

It is strange that this was changed without any deprecation messages, but luckily it didn't cause much damage.
