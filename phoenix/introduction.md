---
title: "Introduction"
layout: page
---

Phoenix is a web development framework
for the Elixir language.
In this tutorial,
we will build multiple small web apps
to explore the framework.

Advantages of Phoenix:

* **Concurrency**:
  Elixir runs on top of Erlang's virtual machine,
  which allows you to write massively concurrent applications
* **Realtime features**:
  Phoenix tries to make
  building realtime applications
  as easy as building
  your typical web app.
* Phoenix creator, Chris McCord
  explains the pros and cons
  of Phoenix
  [here](https://news.ycombinator.com/item?id=8671618).

Installation

{% highlight bash %}
brew install elixir node
mix archive.install https://github.com/phoenixframework/phoenix/releases/download/v0.17.0/phoenix_new-0.17.0.ez
mix phoenix.new my_phoenix_app
cd my_phoenix_app
mix phoenix.server
{% endhighlight %}

Links

* http://phoenix.thefirehoseproject.com/0.html
* http://www.phoenixframework.org/docs/installation
* https://robots.thoughtbot.com/testing-a-phoenix-elixir-json-api

