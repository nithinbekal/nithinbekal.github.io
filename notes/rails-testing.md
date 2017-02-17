---
layout: page
title: "Rails Testing"
date:  2017-02-16 14:13:35
---

My default testing stack:

- Minitest, with the `test 'something' do ...` style
- No fixtures (or at least limit them as much as possible)
- spring to run tests quickly
- [vim-test](https://github.com/janko-m/vim-test) for running tests in vim (I've mapped `,.` to run tests)

## Some testing patterns that I follow

**Write the assertions first, and then work backwards.**
For example, when writing tests for products#show,
start by writing what you expect.

{% highlight ruby %}
class ProductsControllerTest < ActionDispatch::IntegrationTest
  test 'GET #show returns JSON product information' do
    # todo

    assert_response :success
    assert_equal 'Product 42', json['title']
    assert_equal 100,          json['price']
  end
end
{% endhighlight %}

In the above test, we don't have the variable `json` yet,
or even the `get :show` call that calls the method.
but we can start filling in the details. 

{% highlight ruby %}
test 'GET #show returns JSON product information' do
  get :show, id: product.id
  json = JSON.parse(response.body)

  # expectations
end
{% endhighlight %}

Now that we have filled in the details within the test,
we still don't have the `product` variable,
which we can add at the top of the test.

{% highlight ruby %}
test 'GET #show returns JSON product information' do
  product = Product.create!(title: 'Product 42', price: 100)
  
  # ...
end
{% endhighlight %}

**Use bang version of AR::Base#create in the tests.**
In case where validations fails, this immediately raises an exception,
rather than letting invalid data to pass through.

In the above example, if the Product validation were to fail for some reason,
`Product#create` would return an unpersisted instance of `Product`.
As a result, we would get a routing error for products#show with id=nil,
which tells us nothing about the actual cause of failure.

Take the case when you were to add a new validation to Product.
Suddenly you see a lot of tests failing with routing error.
It would make things a lot easier if you could know
what vaildation is causing the failure.
Instead, if we're using `#create!`, we get an exception at that line,
and we know immediately what to fix.

**Use Enumerable#fetch.**
Same reason as above - this causes immediate exception
rather than propagating nils through the test.

**Leave a failing/pending test when you take a break.**
This is great advice from Kent Beck's excellent TDD By Example.
It gives you a starting point when you come back to the code,
rather than having to think about what to do next.

## Bookmarks

- [High Low Testing](http://mikepackdev.com/blog_posts/39-high-low-testing)
- [Thoughtbot: How We Test Rails Applications](https://robots.thoughtbot.com/how-we-test-rails-applications)
- [Five Tips for Testing Rails](http://www.thechrisoshow.com/2008/05/04/five-tips-for-testing-rails/)
- [A Guide for Writing Maintainable Rails Tests](https://littlelines.com/blog/2013/12/17/a-guide-for-writing-maintainable-rails-tests)

Rspec

- [Betterspecs](http://betterspecs.org) - rspec guidelines with ruby

Fixtures, factories, etc.

- [Mystery Guest](https://robots.thoughtbot.com/mystery-guest) -
  some good arguments on avoiding fixtures
- [Rails Testing Antipatterns: Fixtures and Factories](http://semaphoreci.com/blog/2014/01/14/rails-testing-antipatterns-fixtures-and-factories.html)
- [Tricks and Tips for using Fixtures effectively in Rails](http://blog.bigbinary.com/2014/09/21/tricks-and-tips-for-using-fixtures-in-rails.html)
- [Getting Friendly with Fixtures](https://whatdoitest.com/getting-friendly-with-fixtures)

Testing views

- [Golden Master Testing](http://www.sitepoint.com/golden-master-testing-refactor-complicated-views/) (Katrina Owen) - Refactor complicated views
- [Testing Client Side Views in Rails Apps](http://blog.arkency.com/2013/09/testing-client-side-views-in-rails-apps/)
- [Writing Deterministic and Performant Specs with Capybara](http://blog.carbonfive.com/2013/07/26/writing-deterministic-performant-specs-with-capybara/)
