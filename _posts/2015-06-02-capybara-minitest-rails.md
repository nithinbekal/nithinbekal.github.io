---
layout: post
title: "High level Rails testing using Capybara and Minitest"
date:  2015-06-02 20:00:00
categories: rails
---

When working on a new project
or even a new feature,
I'm often not too sure about
the low level design of the code.
In these cases,
I'm starting to find
higher-level tests very useful.

These tests help us define our objective
in terms of how the user
interacts with the application,
and is not bothered with
low level implementation details
like names of the model
or what methods handle the data.

Capybara is a library
that lets us interact with
the app as a user would see it,
and perform actions like
clicking on links or
filling in and submitting forms.
Using Capybara,
we can simulate actions
a user would perform on our site
and test if it works as expected.
These tests are called
*acceptance tests*.

# Setting up Capybara with Minitest for Rails

Here we will see how we can
set up Capybara in a Rails project
and use it along with Minitest.
First, we will add the
[minitest-rails-capybara](https://github.com/blowmage/minitest-rails-capybara)
gem to the test group of our Gemfile.

{% highlight ruby %}
group :test do
  gem 'minitest-rails-capybara'
end
{% endhighlight %}

We will need to include Capybara
in our test helper.
It should now look something like this:

{% highlight ruby %}
# test/test_helper.rb
ENV['RAILS_ENV'] ||= 'test'

require File.expand_path('../../config/environment', __FILE__)

require 'rails/test_help'
require 'minitest/rails/capybara'
{% endhighlight %}

# Adding the first tests

Let's add our first acceptance test.
We will be testing
the user registration page.
There's a handy generator
to create the skeleton of the test.

{% highlight bash %}
rails g minitest:feature Register --spec
{% endhighlight %}

This will create a new file
in `test/features/register_page_test.rb`
with an example test.
I prefer the spec syntax,
but if you wish to use
the default minitest assert syntax
you can omit the `--spec` flag.

{% highlight ruby %}
# test/features/register_test.rb
require "test_helper"

feature "Register" do
  scenario "the test is sound" do
    visit root_path
    page.must_have_content "Hello World"
    page.wont_have_content "Goobye All!"
  end
end
{% endhighlight %}

As you can see,
the generated file has
an example test.
Let's edit this,
and write a test
for when the user
enters valid input.

{% highlight ruby %}
feature 'User registration' do
  scenario 'user enters valid input' do
    visit '/register'

    within '#new_user' do
      fill_in 'Email',    with: 'robert@westeros.gov'
      fill_in 'Password', with: 'baratheon'
      click_button 'Register'
    end

    page.must_have_content 'Welcome to Westeros!'
    page.current_path.must_equal '/welcome'
  end
end
{% endhighlight %}

Now this test will be run
when we run all tests
with `rake test`.
Let's add another test case
where the user enters invalid input -
in this case, the password is too short:

{% highlight ruby %}
feature 'User registration' do
  # ...

  scenario 'password is too short' do
    visit '/register'

    within '#new_user' do
      fill_in 'Email',    with: 'robert@westeros.gov'
      fill_in 'Password', with: 'b'
      click_button 'Register'
    end

    page.must_have_content 'Password is too short (minimum 8 characters)'
  end
end
{% endhighlight %}

# Wrapping up

To test an application thoroughly,
we need a mix of
unit and acceptance tests.
Acceptance tests will be
much slower compared to our unit tests.

It's a good idea to keep
only a small number of acceptance tests
that would cover your most important user stories.
Avoid acceptance tests for edge cases,
and instead let your unit tests cover those.
This way,
you will be able to keep your test suite fast,
while also having confidence
that your most important features
have been thoroughly tested.

