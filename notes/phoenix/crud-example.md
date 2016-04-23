---
title: "Creating a simple blog app"
layout: page
---

In this section,
we will build a simple blog app
that lets us
create, read, update and delete
blog posts.

We will be using
Phoenix's generators features
to generate the code
for our blog.
Let's start off by creating a new project:

{% highlight bash %}
$ mix phoenix.new blog
{% endhighlight %}

Phoenix uses [Brunch](http://brunch.io/)
to manage the front end assets,
and brunch is a node.js module.
So you will first need to make sure
that node installed on your machine.

**Running Phoenix server**

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

**Livereload FTW!**

One of the things that really impressed me
was that livereload is built into the framework.
To check this out,
edit the home page template,
`web/templates/page/index.html.eex`
and change "Welcome to Phoenix!" to
"Welcome to my blog!".

Now go back to the browser,
and voila, the text has already changed
without having to reload the page.

**Setting up the database**

Before we can start
adding our database tables,
we need to set up the database.
Open up `config/dev.exs`,
and edit the username and password
near the bottom of the file.
(They will both be set
to "postgres" by default.)

{% highlight elixir %}
# config/dev.exs
config :blog, Blog.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "tyrion",
  password: "casterlyrock",
  database: "blog_dev",
  size: 10 # The amount of database connections in the pool
{% endhighlight %}

Next, let us create the database
using the `mix ecto.create` task.

{% highlight bash %}
$ mix ecto.create
Compiled ...
...
Generated blog.app
The database for Blog.Repo has been created.
{% endhighlight %}

Now our database is all set,
and we can proceed to
generating our scaffolded `Post` model.

**Creating our posts resource**

Phoenix gives us a `phoenix.gen.html` task
similar to Rails' `rails generate scaffold`.
Here we create a Post model,
with the database called posts
and two fields:

{% highlight bash %}
$ mix phoenix.gen.html Post posts title body:text
{% endhighlight %}

This generates a simple scaffold
to create, read, update and delete posts.
The command produces this output:

{% highlight text %}
* creating priv/repo/migrations/20150527180842_create_post.exs
* creating web/models/post.ex
* creating test/models/post_test.exs
* creating web/controllers/post_controller.ex
* creating web/templates/post/edit.html.eex
* creating web/templates/post/form.html.eex
* creating web/templates/post/index.html.eex
* creating web/templates/post/new.html.eex
* creating web/templates/post/show.html.eex
* creating web/views/post_view.ex
* creating test/controllers/post_controller_test.exs

Add the resource to the proper scope in web/router.ex:

    resources "/posts", PostController

and then update your repository by running migrations:

    $ mix ecto.migrate
{% endhighlight %}

This gives you a handy list of files
that you can explore to get an idea about
what Phoenix controllers, models and views look like.
(Note - the equivalent of Rails views
is called templates in Phoenix.
What we call views in Phoenix
are similar to presenters in Rails.)

Now let's follow the instructions
at the end of that output.
First, we'll add the routes
to the appropriate section of the router
at `web/router.ex`:

{% highlight elixir %}
defmodule Blog.Router do
  use Blog.Web, :router

  # other stuff

  scope "/", ElixirBlog do
    pipe_through :browser # Use the default browser stack
    get "/", PageController, :index

    resources "/posts", PostController
  end
end
{% endhighlight %}

And now,
we can run the migrations
to create the posts table:

{% highlight bash %}
$ mix ecto.migrate
...
[info] == Running Blog.Repo.Migrations.CreatePost.change/0 forward
[info] create table posts
[info] == Migrated in 0.1s
{% endhighlight %}

At this point we will need to
restart the Phoenix server.
Going to `localhost:4000/posts`
will show you the generated scaffold for posts.
Click the "new post" link and add some posts.
The list of posts also shows options
to edit and delete these posts.

**Routing `/posts` as our homepage**

Now that we've added posts,
let's replace the default homepage
with the list of posts.
For this, we can edit `web/router.ex`:

{% highlight diff %}
- get "/", PageController, :index
+ get "/", PostController, :index
{% endhighlight %}

Now `localhost:4000/` shows the list of posts.

*In the
[next chapter](/notes/phoenix/authentication/),
we will build a user authentication system
from scratch for our blog app.*

[Table of contents](/notes/phoenix/)
