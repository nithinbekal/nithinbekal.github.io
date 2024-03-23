---
layout: post
title: "Feature flags in Phoenix projects using laboratory"
date:  2016-08-30 21:11:58 +05:30
categories:
  - elixir
  - phoenix
---

If you're looking for a way to use feature flags in Phoenix projects,
you might want to check out the
[laboratory](https://github.com/code-mancers/laboratory) package.
It is an Elixir plug that allows you to turn features on or off
in Phoenix or any plug based Elixir web apps.

It works by providing an endpoint that you can mount in your router,
and you can access a page to turn on/off features.
The feature state is stored in cookies,
and you can check if a feature is enabled by checking
`Laboratory.enabled?(conn, :feature_name)`.

Let's try out adding a simple feature flag in a Phoenix project
to see this in action.
All we will do is show a subheading in the default Phoenix welcome page,
if a `subheading` feature is enabled.

Generate a new Phoenix project.
We won't be needing ecto or brunch, so let's skip those.

{% highlight elixir %}
mix phoenix.new foobar --no-brunch --no-ecto
{% endhighlight %}

Add `laboratory` to mix.exs and run `mix deps.get`:

{% highlight elixir %}
# mix.exs
def deps do
  [
    # other packages
    {:laboratory, "~> 0.0.1"},
  ]
end
{% endhighlight %}

Configure the `:laboratory` config inside `config/dev.exs`:

{% highlight elixir %}
# config/dev.exs
config :laboratory,
  features: [
    {:subheading, "Sub heading", "Subheading in the home page"},
  ]
{% endhighlight %}

Mount the `Laboratory` plug inside the router.

{% highlight elixir %}
# web/router.ex
scope "/lab", Laboratory do
  forward "/", Router
end
{% endhighlight %}

Now let's just show a subheading in the welcome page if the feature flag is enabled.

{% highlight erb %}
<!-- web/templates/page/index.html.eex -->
<%= if Laboratory.enabled?(@conn, :subheading) do %>
  <h3>Laboratory is enabled!</h3>
<% end %>
{% endhighlight %}

Now if you open the home page, you will not see this text.
Navigate to `/lab`.
You will find the feature flag "Subheading" listed there,
and a button to enable it.
If you enable it and go back to the home page,
you will now find the subheading visible there.

### Links

- [Laboratory on Github](https://github.com/code-mancers/laboratory)
