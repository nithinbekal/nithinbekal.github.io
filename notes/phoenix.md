---
layout: page
title: "Phoenix Framework"
---

Creating a new Phoenix project:

{% highlight bash %}
# Needs node >= 5.0
nvm install 5.4

# Install phoenix
mix local.hex
mix archive.install https://github.com/phoenixframework/phoenix/releases/download/v1.1.2/phoenix_new-1.1.2.ez

# Create phoenix project
mix phoenix.new test_app
cd test_app
mix phoenix.server
{% endhighlight %}

- [Phoenix 1.2.x to 1.3.0 Upgrade Instructions](https://gist.github.com/chrismccord/71ab10d433c98b714b75c886eff17357)

## Open source codebases

- [Evercam](https://github.com/evercam/evercam-server)
  ([deep dive into the codebase](https://hackernoon.com/elixir-deep-dive-evercam-a-10k-loc-phoenix-app-bd84bc20345d))
- [ElixirStatus](https://github.com/rrrene/elixirstatus-web)

## Deployment

- [Elixir Phoenix App deployed into a Load Balanced DigitalOcean setup](http://www.akitaonrails.com/2016/12/23/elixir-phoenix-app-deployed-into-a-load-balanced-digitalocean-setup)
- [Deploying Phoenix on Ubuntu with Gatling](https://dennisreimann.de/articles/phoenix-deployment-gatling-ubuntu-digital-ocean.html)

## Bookmarks

* [Phoenix Guides](http://www.phoenixframework.org/docs/overview)
* [Let's Build a Web App With Phoenix and Ecto](http://www.elixirdose.com/post/elixirdose_intro_to_phoenix)
* [A hands-on intro to building modern web applications with Elixir and Phoenix](http://phoenix.thefirehoseproject.com)
* [Build and test a blazing fast JSON API with Phoenix, an Elixir framework](https://robots.thoughtbot.com/testing-a-phoenix-elixir-json-api)

## Example apps

* [Simple Chat Example, by Chris McCord](https://github.com/chrismccord/phoenix_chat_example)
* [Blox - a simple blog application](https://github.com/drewolson/blox)
* [Phoenix demo app with authentication, admin/user scopes and a websocket chat](https://github.com/pmontrasio/phoenix-demo-app)
* [A simple CRUD application using Elixir and the Phoenix framework](https://github.com/gogogarrett/phoenix_crud)
* [Gaze](https://github.com/ericmj/gaze) - Phoenix with React
* [phoenix-flux-react - An experiment with Phoenix Channels, GenEvents, React and Flux](http://github.com/fxg42/phoenix-flux-react)
