---
layout: post
title: "When to Use Protected Methods in Ruby"
date:  2014-10-23 20:44:27
categories: ruby
---

The `protected` method visibility in Ruby is one of its more confusing aspects. I recently took a closer look at it, and found that it has an interesting use case.

First let's take a quick look at how `public` and `private` method visibility works.

{% highlight ruby %}
class Foo
  def hello
    'Hello'
  end

  private
  def secret
    'abracadabra'
  end
end

foo = Foo.new
foo.hello     #=> 'Hello'
foo.secret    #=> NoMethodError
{% endhighlight %}

Here, calling `foo.hello` works, but the private method can't be called outside the scope of the class. Private methods can only be called implicitly - you cannot specify the object on which the method is being called.

{% highlight ruby %}
class Foo
  def leak
    puts secret        #=> 'abracadabra'
    puts self.secret   #=> NoMethodError
  end

  private
  def secret
    'abracadabra'
  end
end
{% endhighlight %}

In the code above, `#leak` calls the `secret` method correctly, but `self.secret` doesn't work, because you're explicitly setting the receiver of the method.

In case of protected methods, you can call them from the scope of any object belonging to the same class. This means that when you pass a `Person` object `p1` as an argument to a method on another `Person` object `p2`, you can access all the protected methods of `p1` within that method.

{% highlight ruby %}
class Person
  def older_than?(other_person)
    age > other_person.age
  end

  protected
  def age
    @age
  end
end
{% endhighlight %}

In the above example, the `#older_than?` method needs to access `other_person`'s age, but we don't want age to be public. When `age` method is public, `foo.older_than?(bar)` works as long as `bar` belongs to `Person` class or any of its subclasses (ie. `bar.is_a?(Person)` is true).

I don't remember ever having to use `protected` in all these years, but it's good to finally know where it could be used.

## Further reading

* Aaron Patterson: [Protected Methods and Ruby 2.0](http://tenderlovemaking.com/2012/09/07/protected-methods-and-ruby-2-0.html)
* [When Should I Use Protected Method Visibility in Ruby?](http://tx.pignata.com/2012/10/when-should-i-use-protected-method-visibility-in-ruby.html)

