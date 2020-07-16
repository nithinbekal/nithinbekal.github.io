---
layout: post
title: "Defining gem dependencies in single file Ruby scripts"
date:  2020-07-15 17:58:21
categories: ruby
---

Sometimes I come across cases
where I need to write a simple script which uses a gem.
The simplest way to go about this
is to `gem install gem-name`
and then `require 'gem-name'` in your script.
However, this means that you need to remember
to install the gem before running the script.

Bundler has an inline gemfile definition feature
that lets you define gem dependencies in a single-file Ruby script.
To use this feature,
require `'bundler/inline'` and provide a `gemfile` block
that has the code that you normally put in a `Gemfile`.

```ruby
require 'bundler/inline'

gemfile do
  source 'https://rubygems.org'
  gem 'benchmark-ips', require: 'benchmark/ips'
end

Benchmark.ips do |x|
  x.report('original') { naive_implementation() }
  x.report('optimized') { fast_implementation() }

  x.compare!
end
```

Now running `ruby myfile.rb`
will automatically install the gem
and run the script.

I always have a script like the above one handy.
When suggesting a performance optimization when reviewing some code,
it's useful to be able to share a script like that.
This lets the PR author to easily copy and tweak it
without having to worry about installing the necessary gems.
