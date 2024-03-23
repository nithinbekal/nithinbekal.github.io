---
layout: post
title: "Using bower with Phoenix"
date:  2015-07-04 19:57:57
categories:
  - elixir
  - phoenix
---

I was looking for a way to use Bower
to manage my front-end dependencies
in a Phoenix app,
and I found out
that bower already works seamlessly
with [brunch](http://brunch.io/),
which is the build tool for assets
that ships with Phoenix.

All you need to do is
add a `bower.json` file
to the root of your project
and brunch takes care of
installing the dependencies.
For instance,
here's how you would add
jquery to your project:

Make sure bower is installed
using `bower --version`.
If it isn't installed alerady,
install it using:

{% highlight bash %}
npm install -g bower
{% endhighlight %}

Now add a barebones `bower.json` file:

{% highlight json %}
{
  "name": "MyPhoenixProject",
  "dependencies": {
    "jquery": "~ 2.1"
  }
}
{% endhighlight %}

And that's literally it!

If you run `mix phoenix.server`,
you will see the message,
"info: Installing bower packages...".
It even watches the bower file for changes
and installs dependencies
if the server is already running.
When you check the app.js file
from the browser,
you will see that jquery
has been concatenated
to the top of the file.

Comparing this to my preferred method
[to do the same thing in Rails](/posts/rails-assets/),
I definitely prefer Phoenix's approach.

