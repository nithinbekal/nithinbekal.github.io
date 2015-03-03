---
layout: post
title: "Infinity in Ruby"
date:  2015-03-03 18:54:58
categories: ruby
---

Have you ever wondered how Ruby handles infinity?
We've all run into the divide-by-zero error
when diving an integer by zero,
but things are different
in case of floating point numbers.

{% highlight ruby %}
1/0        #=> ZeroDivisionError
1.0 / 0    #=> Infinity
1 / 0.0    #=> Infinity
Infinity   #=> NameError: uninitialized constant Infinity
{% endhighlight %}

As you can see above,
Ruby gives you a value
that represents infinity
when a floating point operation
returns an infinite value.

There isn't a constant
with the name `Infinity`,
as shown by the NameError
that we encountered
when trying to access it directly.
But it is available as the constant `Float::INFINITY`.
Let's take a closer look at it.

{% highlight ruby %}
Inf = 1/0.0      #=> Infinity
Inf.class        #=> Float
Float::INFINITY  #=> Infinity

# Negative infinity
- 1.0/0  #=> -Infinity
{% endhighlight %}

Ok, now that we know
that it's a value of type Float,
let's try some arithmetic operations on it.

{% highlight ruby%}
Inf = 1.0/0   #=> Infinity
Inf + 42      #=> Infinity
Inf / 42      #=> Infinity
Inf - 42      #=> Infinity
Inf * 42      #=> Infinity

# Addition/multiplication of two infinite values also results in infinity
Inf = 1.0/0  #=> Infinity
Inf + Inf    #=> Infinity
Inf * Inf    #=> Infinity

# Comparisons
Inf > 0       #=> true
Inf == Inf    #=> true
Inf != Inf    #=> false

# Large float operations result in infinity
2**10000        #=> big number with 3011 digits
2**10000 + 0.1  #=> Infinity

# Check if a number is infinite
Inf.infinite?   #=> true
(1.0).infinite? #=> false
{% endhighlight %}

# `NaN` - not a number

Subtraction and division
of two infinite values
yield undefined results.
Now we have another kind of value, `NaN`,
to represent such values.
Let's dig into `NaN`
for a minute.

{% highlight ruby %}
Inf - Inf    #=> NaN
Inf / Inf    #=> NaN

nan = 0 / 0.0  #=> NaN
nan.class      #=> Float
Float::NAN     #=> NaN

# Any arithmetic operation returns a NaN
nan + nan   #=> NaN
nan - 42    #=> NaN

# There's even a method to test if a value is NaN
nan.nan?       #=> True
{% endhighlight %}

# Infinite ranges

One interesting use of `Infinity`
is to get infinite ranges.

{% highlight ruby %}
Inf = 1.0/0

(0..Inf).take(5)        #=> [0, 1, 2, 3, 4]
(0..Inf).include?(3)    #=> true
(0..Inf).include?(-3)   #=> false
{% endhighlight %}

You need to be careful
when using methods like `#select`
because you might end up with
an infinite loop
while `#select`
keeps checking every number
because it never reaches `Infinity`.

In such cases,
you can use the
`Enumerable#lazy` method
to create a lazy enumerator
and then use the `#first` method
to take a certain number of items
from that list.

{% highlight ruby %}
(0..1/0.0).lazy
  .select(&:even?)
  .first(5)             #=> [0, 2, 4, 6, 8]
{% endhighlight %}

# An example

Let's look at an situation
where we might find
infinite ranges useful.
You have an `Article` class,
and need to implement
a `within_word_limit?` method
that checks if the word count is
between `@min_word_count` and `@max_word_count`.

If either of those variables is nil,
that limit does not exist,
ie. the range would be `0..Infinity`.
Here's one way of doing it
by setting the upper limit
of the range as infinity.

{% highlight ruby %}
class Article
  def within_word_limit?
    (min_word_limit..max_word_limit).include?(word_count)
  end

  private

  def max_word_limit
    @max_word_limit || Float::INFINITY
  end

  def min_word_limit
    @min_word_limit || 0
  end

  def word_count
    # count words
  end
end
{% endhighlight %}

We could do this
by using the comparison operators
and if statements,
but using a range makes it
much more readable.

# Links

* [IEEE Standard 754 Floating Point Numbers](http://steve.hollasch.net/cgindex/coding/ieeefloat.html)
