---
layout: post
title: "Decorator Pattern in Ruby"
date:  2014-09-24 21:28:17
categories: design-patterns, programming
---

Decorators allow us to add behavior to objects without affecting other objects of the same class. The decorator pattern is a useful alternative to creating sub-classes. We will look at an example where we use subclassing to solve a problem, and then look at how decorator objects provide a better solution.

Imagine we have a `Burger` class with a cost method that returns 50.

{% highlight ruby %}
class Burger
  def cost
    50
  end
end
{% endhighlight %}

Now we need to represent burgers with an added layer of cheese, and the cost goes up by 10. The simplest approach is to create a `BurgerWithCheese` subclass that returns 60 in the `cost` method.

{% highlight ruby %}
class BurgerWithCheese < Burger
  def cost
    60
  end
end
{% endhighlight %}

Next, we need to represent a large buger that adds 15 to the cost of a normal burger. We can represent this using a `LargeBurger` subclass of `Burger`.

{% highlight ruby %}
class LargeBurger < Burger
  def cost
    65
  end
end
{% endhighlight %}

We could also have an `ExtraLargeBurger` which adds a further cost of 15 to our `LargeBurger`. If we were to consider that these burger types could be served with cheese, we would need to add `LargeBurgerWithChese` and `ExtraLargeBurgerWithCheese` subclasses.

With this approach, we end up with a total of 6 classes. Double that number if you want to represent these combinations with fries on the side.

# Extending dynamically with modules

To simplify our code, we could use modules to dynamically add behavior to our `Burger` class. Let's write `CheeseBurger` and `LargeBurger` modules for this.

{% highlight ruby %}
module CheeseBurger
  def cost
    super + 10
  end
end

module LargeBurger
  def cost
    super + 15
  end
end
{% endhighlight %}

Now we can extend our buger objects dynamically using the `Object#extend` method.

{% highlight ruby %}
burger = Burger.new         #=> cost = 50
burger.extend(CheeseBurger) #=> cost = 60
burger.extend(LargeBurger)  #=> cost = 75
{% endhighlight %}

This is quite an improvement over our inheritance based implementation. Instead of having 6 classes, we just have one class and 3 modules. If we needed to add fries to the equation, we need just four modules instead of 12 classes.

# Applying the decorator pattern

The modules based solution has simplified our code a great deal, but we could still improve upon it by using the decorator pattern. We could consider an `ExtraLargeBurger` as being formed by twice adding 15 to the cost of a `Burger`.

Our module based implementation doesn't allow this. It would be tempting to call `burger.extend(LargeBurger)` twice to get an extra large burger. But when a module has already been used to extend an object, the second invokation of `#extend` has no effect.

If we were to continue using the same implementation, we would need to have an `ExtraLargeBurger` module that returns `super + 30` as the cost. Instead, we could use decorator objects, that can be composed to build more complex objects. We start with a decorator called `LargeBurger` that is a wrapper around a `Burger` object.

{% highlight ruby %}
class LargeBurger
  def initialize(burger)
    @burger = burger
  end

  def cost
    @burger.cost + 15
  end
end
{% endhighlight %}

Extra large burgers can now be created by using this wrapper twice on a `Burger` object.

{% highlight ruby %}
burger = Burger.new
large_burger = LargeBurger.new(burger)
extra_large_burger = LargeBurger.new(large_burger)
{% endhighlight %}

We can similarly represent cheese burgers using a `BurgerWithCheese` decorator. Using just three classes, we are no able to represent 6 types of burgers.

# SimleDelegator

Our decorator implementation has one disadvantage: if `Burger` has a `#calories` method, it will no longer be exposed after a decorator has been applied on it. To solve this problem, we will use Ruby's `SimpleDelegator` class. First of all, we will implement a `BurgerDecorator` base class that all our decorator classes will inherit from.

{% highlight ruby %}
class BurgerDecorator < SimpleDelegator
  def initialize(burger)
    @burger = burger
    super
  end
end
{% endhighlight %}

When we call super in the `#initialize` method above, `SimpleDelegator` ensures that all the methods of the `burger` object are available on the decorated burger objects that we create.

When we create new decorator classes, we only need to inherit from `BurgerDecorator` and implement those methods that are new or different in those decorated objects.

# Wrapping up

Decorators are a useful approach in cases where the objects have different types of behavior that can be combined in many ways. If we use inheritance in these cases, the number of subclasses can increase rapidly.

Since our decorated objects implement all the behavior of the original object, we can compose them to generate objects of any combination of behaviors.

This pattern can also be used to extract logic out of a complex class into other smaller classes. One common example is decorator classes that contain presentation logic in them.

# Further reading

* Slides from my talk on [decorators and presenters](/slides/decorator-pattern/) at Kochi Ruby meetup
* [Decorator Design Pattern](http://sourcemaking.com/design_patterns/decorator)
* [Ruby Decorators](http://codebrahma.com/design/patterns/2014/04/28/ruby-decorators.html)
