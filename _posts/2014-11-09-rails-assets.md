---
layout: post
title: "Better asset management in Rails using Rails assets"
date:  2014-11-10 18:18:18
categories:
  - rails
---

I've been looking for better ways to manage the JavaScript asset dependencies in a Rails app. It's easy to find gems that package many client side JS libraries, but a lot of them are unmaintained. It becomes a pain when you're trying to upgrade Rails, but are blocked by these gems.

[Bower](http://bower.io/) is a package manager for such assets, and would have solved this problem. But I was reluctant to add another package manager to the mix and make the deployment setup even more complex.

That's when I came across [rails-assets](https://rails-assets.org/), which is a proxy between bundler and bower. This allows us to include bower packages in our application using only bundler. You don't need to have bower installed on your machine.

To use it, you need to add `source 'https://rails-assets.org'` at the top of your Gemfile, and then include any bower packages as gems with `rails-assets-` prefixed to their name.

For example, you could add `gem 'rails-assets-bootstrap'` and you will be able to accesss bootstrap assets from application.js (using `//= require bootstrap`) and application.css (using `*= require bootstrap`).

When you request a gem from rails-assets, it converts bower packages into gems that can be installed via bundler. I've only used it with Rails, but it is compatible with any sprockets based application.

The project has been around for more than a year, and it seems to be stable. Although I haven't yet moved to rails-assets for all the client side assets in my app, this has already simplified the asset dependencies a great deal.

# Links

* [Rails Assets](https://rails-assets.org/)
* Search for [Bower packages](http://bower.io/search/)
