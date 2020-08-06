---
layout: post
title: "Deploying a Phoenix App With Dokku"
date:  2020-07-23 19:14:00
categories:
  - elixir
  - phoenix
---

Dokku is my preferred approach
to deploy a web app to a VPS.
It lets you set up your own
Heroku style platform-as-a-service
to easily deploy an app.
Once set up,
all you need to do to deploy
is to `git push` your code to your dokku host.

This tutorial will walk you through
deploying an Elixir + Phoenix + Ecto app,
as well as connecting it to a Postgres database.
We will use a blog app as the example here.

##### Set up the server

For my hobby projects,
I use a $5/mo
[Digital Ocean server](https://m.do.co/c/863244c8a721),
with 1GB RAM and 25GB SSD storage.
I installed Ubuntu 18.04 on it.
(I tried 20.04, but had trouble installing dokku on it.)

Although 1GB of RAM is enough to run an Elixir app,
I had trouble getting node to compile front-end dependencies
with that much RAM.
To get around this, set up a 1GB swap file:

```
cd /var
touch swap.img
chmod 600 swap.img
dd if=/dev/zero of=/var/swap.img bs=1024k count=1000
```

##### Install dokku

Now it's time to install dokku.
SSH into the server by using `ssh root@your.ip.address`
and run the following commands.
(You'll find the command for the latest version on the
[dokku website](http://dokku.viewdocs.io/dokku/).)

```bash
wget https://raw.githubusercontent.com/dokku/dokku/v0.21.3/bootstrap.sh
sudo DOKKU_TAG=v0.21.3 bash bootstrap.sh
```

##### Web installer

Once dokku is installed,
you can find the web installer
by going to your server's IP address in the browser.
Here you can set the following:

- Set your hostname
- Enable the "user virtual naming for apps" options

This lets you access apps on subdomains of your hostname.
Eg. if your host is `example.com`,
you can create an app called `blog`
and access it at `blog.example.com`.
This is only for convenience -
you can always set up a custom domain later on.

Now would also be a good time to point
the `blog.example.com` domain to your dokku server's IP address.

##### Create the app

In this tutorial, we're creating a blog app,
and we will rather unimaginatively call it `blog`.
SSH into the dokku host and create the app:

```bash
dokku apps:create blog
```

After this we need to set up some environment variables.
For the `SECRET_KEY_BASE` variable,
you can generate a value locally from your phoenix app
by running `mix phx.gen.secret`.

```bash
dokku config:set blog LC_ALL=en_US.utf8
dokku config:set blog MIX_ENV=prod
dokku config:set blog SECRET_KEY_BASE=some_secret_key
```

##### Postgres setup

We will also use postgres as the database,
so we'll need to install the postgres plugin.

```bash
sudo dokku plugin:install https://github.com/dokku/dokku-postgres.git postgres
```

Now we will create a database called `blog`,
and link it to the `blog` app.

```bash
dokku postgres:create blog
dokku postgres:link blog blog
```

This will setup the database
and export a `DATABASE_URL` environment variable
in our app's docker container.
Phoenix is by default
configured to look for this env variable,
so there's nothing to change in our app.

##### Setup git remote

Now that the dokku host is ready,
let's set things up locally.
We'll first create a git remote called `dokku`,
which will point to the dokku server.

```bash
git remote add dokku dokku@blog.example.com:blog
```

Once this is set up,
you can run `git push dokku master` to deploy.
However, the deploys will fail right now
because we haven't configured our repo
to set up Elixir on deploy.

##### Buildpacks

We need to create a `.buildpacks` file
with the following content
and commit it to the repo.

```
https://github.com/HashNuke/heroku-buildpack-elixir.git
https://github.com/gjaldon/heroku-buildpack-phoenix-static.git
```

Set the Elixir and Erlang versions in `elixir_buildpack.config`:

```
erlang_version=23.0.2
elixir_version=1.10.0
```

Set the node version
used for compiling front end assets
in `phoenix_static_buildpack.config`:

```
node_version=14.4.0
```

##### Putting everything together

Now that we have everything set up,
let's deploy our app.
Push the local repo to the dokku remote
with `git push dokku master`.
You should see the deploy logs
as part of the output.

Now go to the IP address of the server,
or the appropriate subdomain
(`blog.example.com` in this example).
The app should be running on this URL.

##### Running migrations

Although we have deployed the app,
we still have one problem.
As soon as you hit a URL
that requires database access,
you will get a 500 error.
This is because we haven't run Ecto migrations yet.

Before we configure dokku
to run migrations as part of the deploy process,
we also need to create the database.
To do this, run this on the dokku server.

```bash
dokku run mix ecto.create
```

Next, we need to configure dokku
to run the pending ecto migrations
whenever we deploy.
Create an `app.json` at the root of the repo
and commit it.
This will define the post-deploy command.

```json
{
  "scripts": {
    "dokku": {
      "postdeploy": "mix ecto.migrate"
    }
  }
}
```

Push the code again to the dokku remote
and the migrations will run at the end of the deploy.

##### Setting up domains

Because of the way we set up the host name
through the web installer,
you will see the app running
on the `blog`subdomain on your host.
But you might want to host your app
on some other domain.
Run the following command
to configure a custom domain for your app:

```
dokku domains:add blog <your-fancy-domain>
```

##### SSL

Now that we have our app up and running,
let's finish up by setting up SSL for our domain.
Letsencrypt makes it incredibly easy
to enable SSL for your site.
Dokku has a letsencrypt plugin
that enables SSL for your domain
and auto-renews it when it expires.
Run the following commands
on the dokku server.


```bash
dokku plugin:install https://github.com/dokku/dokku-letsencrypt.git
dokku config:set --no-restart blog DOKKU_LETSENCRYPT_EMAIL=you@example.com
dokku letsencrypt blog
dokku letsencrypt:auto-renew blog
```

#### Links

- [Dokku documentation](http://dokku.viewdocs.io/dokku/getting-started/installation/)

