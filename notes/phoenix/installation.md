---
title: "Installing Elixir and Phoenix"
layout: page
---

If you haven't installed Elixir already,
you can do so by `brew install elixir`,
or the equivalent for your OS.
Now we need the
[hex package manager](https://hex.pm/)
to install Phoenix.
We can install hex by:

{% highlight bash %}
mix local.hex
{% endhighlight %}

Once hex is installed,
we can use it to install Phoenix
like this:

{% highlight bash %}
mix archive.install https://github.com/phoenixframework/phoenix/releases/download/v1.0.0/phoenix_new-1.0.0.ez
{% endhighlight %}

It appears that future versions of Phoenix
will support installation via a
`mix archive.install phoenix` command.
This installs Phoenix
and also provide the `mix phoenix.new` command
to generate a new Phoenix project.

**Generating a new project:**

To generate the project,
we will use the `phoenix.new` mix task.
This sets up the project
and installs the dependencies.

{% highlight bash %}
$ mix phoenix.new blog
{% endhighlight %}

Phoenix uses [Brunch](http://brunch.io/)
to manage the front end assets,
and brunch is a node.js module.
So you will first need to make sure
that node installed on your machine.

**Running Phoenix server:**

Enter the `blog` directory
and run the `mix phoenix.server` command
to start running the app.
It will first compile
all the required modules
and then show the message:
"Running Blog.Endpoint with Cowboy on port 4000 (http)".

{% highlight bash %}
$ cd blog/
$ mix phoenix.server
{% endhighlight %}

If everything went smoothly,
you will see a "Welcome to Phoenix"
message at localhost:3000.

*In the
[next section](/notes/phoenix/chat-example/),
we will explore
the most interesting feature of Phoenix -
channels -
which allow us to easily add
realtime functionality to our apps.*

[Table of contents](/notes/phoenix/)
