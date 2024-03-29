---
layout: post
title: "User authentication from scratch in Elixir and Phoenix"
date:  2015-06-30 23:00:00
categories:
  - elixir
  - phoenix
---

In my
[previous post about Phoenix](/posts/elixir-phoenix-crud-app/),
we built a very simple blog app.
We only added the ability to post content,
but there's no user authentication system.
In this post, we will add user authentication to the app.

There are excellent authentication libraries out there like
[passport](https://github.com/opendrops/passport) and
[addict](https://github.com/trenpixster/addict),
but here we'll be writing authentication code from scratch,
so that we can get more familiar with the framework.

NOTE: I'm using Elixir 1.2.4 with Phoenix 1.1.4 for this example.

## Add a user model

The first thing we will do is
add a User model.
Our users will sign up with
an email and a password.
We will not be storing the password directly as plaintext,
but in an hashed format.
Let's generate the model:

{% highlight bash %}
$ mix phoenix.gen.model User users email:unique crypted_password
{% endhighlight %}

(Note: If you're facing problems with the command,
you might want to take a look at
[this issue](https://github.com/phoenixframework/phoenix/issues/1326)
to solve this.
The API to define unique contraint
is not available in Phoenix < v1.0.4.)

This adds a User model
and a migration
to create a `users` table
in the database.
Run the migration
using the command:

{% highlight bash %}
$ mix ecto.migrate
{% endhighlight %}

## Signup page

Now that we have added the User model,
let's move on to creating a registration page.
Let's add the registration routes to `web/router.ex`.
Add this line after
the `resources "/posts"` line
in the file:

{% highlight elixir %}
# web/router.ex
resources "/registrations", RegistrationController, only: [:new, :create]
{% endhighlight %}

This adds a `/registrations` route,
and a `POST /registrations` path
to handle the form submission.

Add a link to the register page
in the navigation section of
`web/templates/layout/app.html.eex`:

{% highlight elixir %}
<%= link "Register", to: registration_path(@conn, :new) %>
{% endhighlight %}

Next we add a `RegistrationController`:

{% highlight elixir %}
# web/controllers/registration_controller.ex
defmodule Blog.RegistrationController do
  use Blog.Web, :controller
  alias Blog.User

  def new(conn, _params) do
    changeset = User.changeset(%User{})
    render conn, changeset: changeset
  end
end
{% endhighlight %}

When we try to load the `/register` page,
Phoenix shows us an error page
complaining about a missing `RegistrationView`.
Let's add an empty view module.

{% highlight elixir %}
# web/views/registration_view.ex
defmodule Blog.RegistrationView do
  use Blog.Web, :view
end
{% endhighlight %}

Now, we are ready to add the HTML view to
`web/templates/registration/new.html.eex`:

{% highlight elixir %}
<h1>Create an account</h1>

<%= form_for @changeset, registration_path(@conn, :create), fn f -> %>
  <%= if f.errors != [] do %>
    <div class="alert alert-danger">
      <p>Oops, something went wrong! Please check the errors below:</p>
    </div>
  <% end %>

  <div class="form-group">
    <label>Email</label>
    <%= email_input f, :email, class: "form-control" %>
    <%= error_tag f, :email %>
  </div>

  <div class="form-group">
    <label>Password</label>
    <%= password_input f, :password, class: "form-control" %>
    <%= error_tag f, :password %>
  </div>

  <div class="form-group">
    <%= submit "Signup", class: "btn btn-primary" %>
  </div>
<% end %>
{% endhighlight %}

Now if we go to the path `/registrations/new`,
we will find a signup form.
If we submit the form,
we will get this error:

{% highlight elixir %}
UndefinedFunctionError at POST /registrations
undefined function: Blog.RegistrationController.create/2
{% endhighlight %}

Let's add the
`RegistrationController.create/2` function
to handle this request.
The function would look like this:

{% highlight elixir %}
# web/controllers/registration_controller.ex

def create(conn, %{"user" => user_params}) do
  changeset = User.changeset(%User{}, user_params)

  case Blog.Registration.create(changeset, Blog.Repo) do
    {:ok, changeset} ->
      # sign in the user
    {:error, changeset} ->
      # show error message
  end
end
{% endhighlight %}

Here we're capturing
the email and password into `user_params`,
and creating a `User` changeset using it.

We will need to create
the `Blog.Registration` module
to save the user to database.
We'll come back to that later.
First, let's take care
of adding validations
to the `User` model.

## Validating and persisting `User`

We need to make some changes
to the `User` model
before we can continue.
The first thing to do
is to add a virtual password attribute
to `User` in `web/models/user.ex`.
This allows us to create a changeset
with the password attribute,
but it will not be persisted.
The schema block should now look like this:

{% highlight elixir %}
# web/models/user.ex

schema "users" do
  field :email, :string
  field :crypted_password, :string
  field :password, :string, virtual: true
  timestamps
end
{% endhighlight %}

Next we'll change `@required_fields`
to make password mandatory
instead of crypted_password.

{% highlight diff %}
- @required_fields ~w(email crypted_password)
+ @required_fields ~w(email password)
{% endhighlight %}

We also need to add some validations
to the `changeset/2` function.

{% highlight elixir %}
# web/models/user.ex

def changeset(model, params \\ :empty) do
  model
  |> cast(params, @required_fields, @optional_fields)
  |> unique_constraint(:email)
  |> validate_format(:email, ~r/@/)
  |> validate_length(:password, min: 5)
end
{% endhighlight %}

This function makes email and password mandatory,
validates uniqueness of email,
checks if email contains an `@`
(this is a very crude format validation,
but should suffice for now),
and ensures password is longer than 5 characters.

If we submit the form now,
we should see the same template
re-rendered with the corresponding errors.

Now let's return to the case
where we have a valid changeset
and need to persist the user
to the database.

{% highlight elixir %}
# web/controllers/registration_controller.ex

def create(conn, %{"user" => user_params}) do
  changeset = User.changeset(%User{}, user_params)

  case Blog.Registration.create(changeset, Blog.Repo) do
    {:ok, changeset} ->
      conn
      |> put_flash(:info, "Your account was created")
      |> redirect(to: "/")
    {:error, changeset} ->
      conn
      |> put_flash(:info, "Unable to create account")
      |> render("new.html", changeset: changeset)
  end
end
{% endhighlight %}

Here, we're calling `Blog.Registration.create/2`,
which is in a module we haven't written yet.
It hashes the password,
writes the `User` record to database,
and returns the persisted object.
Then it redirects the user
to the home page
with the success flash message.

## The `Registration` module

Now let's implement the `Registration` module.
This will contain a `create` function
that takes in a user changeset and a repo,
hash the password using Bcrypt
and then save the changeset to the database.

{% highlight elixir %}
# web/models/registration.ex

defmodule Blog.Registration do
  import Ecto.Changeset, only: [put_change: 3]

  def create(changeset, repo) do
    changeset
    |> put_change(:crypted_password, hashed_password(changeset.params["password"]))
    |> repo.insert()
  end

  defp hashed_password(password) do
    # hash password
  end
end
{% endhighlight %}

We haven't implemented
the function to hash the password.
For this, we will use the
[comeonin](https://github.com/elixircnx/comeonin) library
which provides functions
to hash passwords using bcrypt.
Add comeonin to `mix.exs`:

{% highlight diff %}
# mix.exs

  defp deps do
    [{:phoenix, "~> 0.13.1"},
      {:phoenix_ecto, "~> 0.4"},
      {:postgrex, ">= 0.0.0"},
      {:phoenix_html, "~> 1.0"},
      {:phoenix_live_reload, "~> 0.4", only: :dev},
+     {:comeonin, "~> 1.0"},
      {:cowboy, "~> 1.0"}]
  end
{% endhighlight %}

Now run `mix deps.get` to install the new dependency.
Once this has been installed,
we can implement the `hashed_password/2` function like this:

{% highlight elixir %}
# web/models/registration.ex

defp hashed_password(password) do
  Comeonin.Bcrypt.hashpwsalt(password)
end
{% endhighlight %}

If you submit valid email and password,
you will now be redirected
to the home page
and shown the message,
"your account has been created".

## Adding a login page

Now that we have added
the ability to create an account,
let's add the login/logout feature.
The first thing is to add the routes.
Add these routes immediately after the registration page routes in
`web/router.ex`.

{% highlight elixir %}
# web/router.ex

get    "/login",  SessionController, :new
post   "/login",  SessionController, :create
delete "/logout", SessionController, :delete
{% endhighlight %}

Next, let's add the SessionController
and create the login page.

{% highlight elixir %}
# web/controllers/session_controller.ex

defmodule Blog.SessionController do
  use Blog.Web, :controller

  def new(conn, _params) do
    render conn, "new.html"
  end
end
{% endhighlight %}

Create a new template
`web/templates/session/new.html.eex`
and add this:

{% highlight elixir %}
<h2>Login</h2>

<%= form_for @conn, session_path(@conn, :create), [name: :session], fn f -> %>
  <div class="form-group">
    <label>Email</label>
    <%= text_input f, :email, class: "form-control" %>
  </div>

  <div class="form-group">
    <label>Password</label>
    <%= password_input f, :password, class: "form-control" %>
  </div>

  <div class="form-group">
    <%= submit "Login", class: "btn btn-primary" %>
  </div>
<% end %>
{% endhighlight %}

If you open the page `/login`
it would complain that
`Blog.SessionView` module is missing.
Let's add an empty module
as we did with `RegistrationController`.

{% highlight elixir %}
# web/views/session_view.ex

defmodule Blog.SessionView do
  use Blog.Web, :view
end
{% endhighlight %}

This fixes the problem,
and you can now see the login page.

## Submitting the login form

Now we need to add a function
to handle submission of this form.
This is what the `create` function looks like:

{% highlight elixir %}
# web/controllers/session_controller.ex

def create(conn, %{"session" => session_params}) do
  case Blog.Session.login(session_params, Blog.Repo) do
    {:ok, user} ->
      conn
      |> put_session(:current_user, user.id)
      |> put_flash(:info, "Logged in")
      |> redirect(to: "/")
    :error ->
      conn
      |> put_flash(:info, "Wrong email or password")
      |> render("new.html")
  end
end
{% endhighlight %}

This function matches the session params
and passes them to `Blog.Session.login/2`.
This function checks
if there is a user in the repo
with the matching password,
and returns a tuple
containing `:ok` and the user
if the email and password are correct.
Otherwise it returns the atom `:error`.

## The `Session` module

We haven't added the `Blog.Session` module yet.
Let's go ahead and write the code.

{% highlight elixir %}
# web/models/session.ex

defmodule Blog.Session do
  alias Blog.User

  def login(params, repo) do
    user = repo.get_by(User, email: String.downcase(params["email"]))
    case authenticate(user, params["password"]) do
      true -> {:ok, user}
      _    -> :error
    end
  end

  defp authenticate(user, password) do
    case user do
      nil -> false
      _   -> Comeonin.Bcrypt.checkpw(password, user.crypted_password)
    end
  end
end
{% endhighlight %}

We can use `Comeonin.Bcrypt.checkpw/2`
to check if the password matches the user's password.
If the password is wrong,
or if a user does not exist with that email,
we return the atom `:error`.
If authentication succeeds,
we return a tuple
containing `:ok` and the user.

## Adding some helper functions for the view

You will notice that even when a user is logged in,
they can see the register link in the navbar,
and access the page.
We need to hide this,
and show the logout button
when a user is logged in.

Let's add a couple of functions
to `Blog.Session`
and make them available in the view.
The first function is `current_user/1`
that returns the currently logged in user.
It uses the `:current_user` session variable
we set during login.

{% highlight elixir %}
# web/models/session.ex

def current_user(conn) do
  id = Plug.Conn.get_session(conn, :current_user)
  if id, do: Blog.Repo.get(User, id)
end
{% endhighlight %}

We can now use this
to add another helper function, `logged_in?`,
to `Blog.Session`.

{% highlight elixir %}
# web/models/session.ex

def logged_in?(conn), do: !!current_user(conn)
{% endhighlight %}

Now we can make these available in the views
by adding this line at the end of
the `quote do ..` block in
the `Blog.Web.view/0` function
in `web/web.ex`:

{% highlight elixir %}
# web/web.ex

import Blog.Session, only: [current_user: 1, logged_in?: 1]
{% endhighlight %}

We can now replace the register page link
with code that shows the login and register links
only when the user isn't signed in.
Let's edit `web/templates/layout/app.html.eex`:

{% highlight elixir %}
<%= if logged_in?(@conn) do %>
  <li><%= current_user(@conn).email %></li>
  <li><%= link "Logout", to: session_path(@conn, :delete), method: :delete %></li>
<% else %>
  <li><%= link "Login",    to: "/login" %></li>
  <li><%= link "Register", to: registration_path(@conn, :new) %></li>
<% end %>
{% endhighlight %}

We have also used the `current_user` function
to show the logged in user's email in the views.

## Logout functionality

The last thing we need to do now
is to add the ability for users to logout.
To do this,
we can add the following `delete` function
to `SessionController`:

{% highlight elixir %}
# web/controllers/session_controller.ex

def delete(conn, _) do
  conn
  |> delete_session(:current_user)
  |> put_flash(:info, "Logged out")
  |> redirect(to: "/")
end
{% endhighlight %}

If you now click the logout link in the navbar,
the user will be logged out correctly.

## Automatic login on signup

One final thing we will do
before finishing up with this tutorial
is to log users in immediately after signup.
We will add the following line
in `Blog.RegistrationController.create/2`:

{% highlight diff %}
# web/controllers/registration_controller.ex

  case Blog.Registration.create(changeset, Blog.Repo) do
    {:ok, changeset} ->
      conn
+     |> put_session(:current_user, changeset.id)
      |> put_flash(:info, "Your account was created")
      |> redirect(to: "/")
  else
{% endhighlight %}

This automatically logs in
the user after signup.
There are many more details that we need to add
to turn this into a complete authentication system,
but we have already set up the basics.

## Next steps

You might have noticed that
we can still access login and register pages
even when we're logged in.
This is not something we want
in a proper authentication system.

We can easily do this using
[plugs](http://www.phoenixframework.org/v0.14.0/docs/understanding-plug),
which I will hopefully cover in a future blog post.

## Links

* [Phoenix app with authentication](http://meatherly.github.io/2015/05/11/phoenixauthentication/) -
  this article was a very useful reference
  for how to go about implementing
  the authentication feature.
* [Passport](https://github.com/opendrops/passport) and
  [Addict](https://github.com/trenpixster/addict)
  are two Phoenix authentication libraries.
  Reading their source code
  was another excellent reference
* [Rewriting ElixirStream.com from Rails to Phoenix](http://codingwithaxe.com/rewriting-elixirstream-com-from-rails-to-phoenix/)
  is another article that describes how to add
  authentication to a Phoenix app.
