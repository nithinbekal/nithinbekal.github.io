---
layout: post
title: "Turbolinks and Google Analytics"
date:  2015-11-27 10:15:59
categories: rails
---

Google Analytics tracking code doesn't play well
with Rails apps using Turbolinks.
For a long time, we were using
[Turbolinks compatibilty script](http://reed.github.io/turbolinks-compatibility/google_analytics.html),
but then I noticed that our bounce rate was suspiciously low.

A bounce rate of under 50% would be considered quite good,
but ours was hovering under the 5% mark.
On looking at the requests,
the script was sending in two pageview requests on each page.

The script was using the old Analytics code,
so we decided to switch to the new analytics.js from Google,
and make it work with Turbolinks.
We're now using a much simpler method, based on
[this stackoverflow thread](http://stackoverflow.com/questions/18945464/rails-4-turbolinks-with-google-analytics).

First, put this code in the `<head>` section of your markup:

{% highlight erb %}
<script>
<%- if Rails.env.production? -%>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  ga('require', 'linkid');
  ga('create', 'UA-XXXXXXXX-X', 'auto');
<%- else -%>
  function ga() { console.log("Google Analytics"); }
<%- end -%>
</script>
{% endhighlight %}

This is identical to the default script, except that it is missing the `ga('send', ...)` line.
We'll put that in a JS file which is part of the asset pipeline.

{% highlight javascript %}
// app/assets/javascripts/analytics.js
$(document).on('page:change', function() {
  ga('send', 'pageview', window.location.pathname);
});
{% endhighlight %}

NOTE:
The above code is for Turbolinks 2.x.
As Michael mentions in the comments below,
replace `page:change` with `turbolinks:load` if you're using Turbolinks 5.0.

This triggers a pageview request every time Turbolinks loads a page.
Switching over to this approach has fixed our problem with incorrect reporting.

