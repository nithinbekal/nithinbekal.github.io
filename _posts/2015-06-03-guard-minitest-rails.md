---
layout: post
title: "Rails tests: Setting up guard with minitest for quicker feedback"
date:  2015-06-03 20:24:39
categories: rails
---

For doing test-driven development effectively,
it is important to get instant feedback on your tests.
For this,
I like to configure my project
to run the corresponding tests
as soon as I save a file.

Guard is a useful tool
that can watch for changes to files.
Let's look at how we can set up
guard to run tests
on a Rails project
using Minitest testing framework.

First we add the `guard` and `guard-minitest` gems
to our Gemfile.

{% highlight ruby %}
# Add to gemfile:
group :test do
  gem 'guard'
  gem 'guard-minitest'
end
{% endhighlight %}

Run `bundle install`.
Now we need to generate a Guardfile
which will define what to do
when a file gets changed.
To generate the Guardfile,
run this command:

{% highlight bash %}
guard init minitest
{% endhighlight %}

This will generate a Guardfile
configured to work with Minitest.
This will also contain
Rails-specific configuration
that is commented out.
Uncomment the Rails connfiguration
and remove the Minitest::Unit configuration.
The file should now have
something like this:

{% highlight ruby %}
# Guardfile
guard :minitest do
  watch(%r{^app/(.+)\.rb$})                               { |m| "test/#{m[1]}_test.rb" }
  watch(%r{^app/controllers/application_controller\.rb$}) { 'test/controllers' }
  watch(%r{^app/controllers/(.+)_controller\.rb$})        { |m| "test/integration/#{m[1]}_test.rb" }
  watch(%r{^app/views/(.+)_mailer/.+})                    { |m| "test/mailers/#{m[1]}_mailer_test.rb" }
  watch(%r{^lib/(.+)\.rb$})                               { |m| "test/lib/#{m[1]}_test.rb" }
  watch(%r{^test/.+_test\.rb$})
  watch(%r{^test/test_helper\.rb$}) { 'test' }
end
{% endhighlight %}

Now you can run guard in the terminal
and every time you change a file,
the corresponding test file will be run.

**Links**

* [guard gem](https://github.com/guard/guard)
* [guard-minitest gem](https://github.com/guard/guard-minitest)
