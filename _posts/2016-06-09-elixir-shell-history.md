---
layout: post
title: "Shell History in Elixir (IEx) and Erlang"
date:  2016-06-09 22:31:52 +05:30
categories: elixir
---

Elixir does not support history in the iex shell across sessions.
Although you can use the up/down arrows to access previously entered code,
this history is lost once you close the iex session.
This is one of the rare things that bothered me about the Elixir ecosystem.

Luckily, there is [erlang-history](https://github.com/ferd/erlang-history),
which adds shell history to Erlang shell.
Elixir actually uses the Erlang shell behind the scenes,
so this also works for IEx.
To start using it, clone the github repo and run `make install`:

{% highlight bash %}
git clone https://github.com/ferd/erlang-history.git
cd erlang-history
sudo make install
{% endhighlight %}

IEx is now working perfectly for me.
Hopefully, something like this will be added to Erlang itself in the future,
so that we can get this experience out of the box.

