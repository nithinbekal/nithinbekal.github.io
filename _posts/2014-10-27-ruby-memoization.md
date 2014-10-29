---
layout: post
title: "Memoization in Ruby Using Metaprogramming"
date:  2014-10-27 23:37:45
categories: ruby
---

I recently came across this [blog post](http://blog.sgtfloyd.com/post/84242904702) showing how you can write a method decorator in Ruby for memoizing the results of a method call. Playing around with the example and trying to extend it was very interesting. I'll try to walk through the code in this post.

# What is memoization?

Memoization is an optimization technique where you cache the results of expensive method calls. When the method is called with the same set of arguments, the cached result is returned.

As an example, let's look at a function that calculates factorial recursively. Suppose we've already calculated `fact(8)`, and now want to calculate `fact(9)`. This is the same as `9 * fact(8)`. If we store the result of `fact(8)` in a lookup table, we just need to fetch the value and the function is reduced to a simple multiplication.

# Writing a `Memoization` module

In this example, we will write a module called `Memoization` that has a method `memoize`, such that we will be able to use it like this:

{% highlight ruby %}
class Calculator
  extend Memoization

  memoize def fact(n)
    return 1 if n <= 1
    n * fact(n-1)
  end
end
{% endhighlight %}

We use `extend Memoization` instead of `include` because we need `memoize` as a class method. Because of this, we can call call `memoize` outside any method.

This also makes use of a feature that was introduced in Ruby 2.1 - a method definition returns the name of the method in symbol form, ie. in the above case, `def fact(n)` would return `:fact`. This symbol is passed as argument to the `memoize` method.

This is what the module looks like:

{% highlight ruby %}
module Memoization
  def memoize(name)
    @@lookup ||= Hash.new { |h, k| h[k] = {} }

    f = instance_method(name)

    define_method(name) do |args|
      return @@lookup[name][args] if @@lookup[name].include?(args)
      @@lookup[name][args] = f.bind(self).call(args)
    end
  end
end
{% endhighlight %}

We start off by defining a class variable `@@lookup` where we will cache our results. It is a hash where each method's name is the key to another hash that has the cached results for that method.

Let's imagine we had two memoized methods `fact(n)` and `sum(x, y)` and we've called `fact(0)` and `sum(2, 3)`. The `@@lookup` class variable gets updated to:

{% highlight ruby %}
{
  fact: { [0] => 1 },
  sum: { [2, 3] => 5 }
}
{% endhighlight %}

The keys for the computed values is an array because this allows us to have the same `memoize` method irrespective of the number of arguments for the method being memoized.

Next, we come across the line: `f = instance_method(name)`. This creates an object that represents the current definition of the `fact` method. This lets us redefine the `fact` method, while still being able to call it when the result isn't present in the lookup table.

Finally, we come to the `define_method` block. Here we overwrite the existing method with our memoized version. If `@@lookup` contains a calculated value for the given argument list, that is returned. Otherwise, we call the original function which is in the for of the `UnboundMethod` object  `f`.

The way the original method is called might look a little confusing: `f.bind(self).call(args)`. An `UnboundMethod` can only be called after binding with an instance of the same class (or its subclasses). This binds the function to the instance of `Calculator` that called it, and then calls it with the given arguments.

Once the method returns, the value is added to the lookup table. All subsequent method calls with the same input will be read from the lookup table.

# Conclusion

Calculating factorials is not the most computationally expensive operation, but it demonstrates how writing this method recursively makes it easier to memoize.

It is useful for method calls that do very time consuming computations. As long as the result depends only on the arguments of the method, this method decorator works fine.

If the result depended on some instance variables in addition to the arguments, it becomes a bit harder to do this. In that case, we would need to include the arguments and all the instance variables used in the method as the key in the lookup table.

# Further reading

* [Function Decorators in Ruby](http://blog.sgtfloyd.com/post/84242904702) - The example in this article was what got me playing around with method decorators.
* [Memoize expensive methods in ruby 2.x](http://naveenagarwal287.wordpress.com/2013/07/10/memoize-expensive-methods-in-ruby-2-x/) - achieves the same result by defining a module with the memoized version of the method, and prepending the module to the class.

