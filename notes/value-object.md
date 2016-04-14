---
layout: page
title: "Value Object"
date:  2016-04-14 11:19:48
---

- values of the instance variables never change once they have been set in the
  constructor
- equality is not based on identity
  - two value objects are equal when their values are equal, not necessarily
    being the same object.
- this protects from aliasing problems, ie. bugs caused by changing an object
  is being referred in two different places.

Money is a good example of value object:

{% highlight ruby %}
a = Money.new(5)
b = Money.new(5)

a == b #=> true
{% endhighlight %}
