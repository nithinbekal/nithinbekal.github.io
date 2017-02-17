---
layout: post
title: "Start Using Yarn With Rails Today"
date:  2017-02-17 19:18:50 +05:30
categories: rails
---

[Yarn](https://yarnpkg.com/en/) is a JavaScript package manager,
and a faster alternative to NPM.
It works almost exactly like NPM, but has one advantage -
it creates a `yarn.lock` file which you can check into source control,
and make sure you're running the same version of the packages everywhere.

Rails 5.1 will support Yarn out of the box,
but in the meanwhile, I wanted to try it out on a Rails 5.0 project.
I found the process surprisingly easy and painless.
Let's see how you can add Bootstrap to an existing Rails project through Yarn.

First of all you need to install Yarn.
On macOS, you can use homebrew to install it using `brew install yarn`.
For other OSes, refer to the
[installation instructions](https://yarnpkg.com/lang/en/docs/install/).

Next, run this command to create `package.json`.

{% highlight bash %}
yarn init
{% endhighlight %}

Next, let's install `bootstrap`:

{% highlight bash %}
yarn add bootstrap
{% endhighlight %}

This will install bootstrap to `node_modules/`,
and also create `yarn.lock` with information about the package versions.
Remember to add `node_modules/` to your `.gitignore`.

Next, we'll ask Rails to look for assets in `node_modules`
by adding this line to `config/initializers/assets.rb`:

{% highlight ruby %}
Rails.application.config.assets.paths << Rails.root.join('node_modules')
{% endhighlight %}

Tell `application.css` and `application.js` to load bootstrap's assets,
by adding these lines:

{% highlight ruby %}
# In app/assets/stylesheets/application.css:
*= require bootstrap/dist/css/bootstrap

# In app/assets/javascripts/application.js:
//= require bootstrap/dist/js/bootstrap
{% endhighlight %}

And that's all there is to it.
You can restart your Rails server, and you'll have bootstrap assets loaded.
This will not longer be necessary once Rails 5.1 ships,
but you can use this to start using Yarn with older Rails versions.

I have [previously mentioned Rails Assets](/posts/rails-assets/),
which is also a great option.
There were [cencerns about its future](https://github.com/tenex/rails-assets/issues/291)
at one point, but the team have done a great job maintaining it so far.
If you wish to avoid depending on Yarn now, it is a great option.
However, Yarn is set to become a part of Omakase Rails stack,
so it makes sense to start using it while we wait for the new Rails.

## Links

- [Add Yarn support in new apps](https://github.com/rails/rails/pull/26836)
