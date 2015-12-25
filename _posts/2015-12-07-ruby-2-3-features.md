---
layout: post
title: "What's new in Ruby 2.3?"
date:  2015-12-07 20:25:05
categories: ruby
---

Ruby 2.3.0 will be released this Christmas,
and the first preview release was made available a few weeks ago.
I've been playing around with it
and looking at what new features have been introduced.

{% highlight bash %}
# Install using RVM
rvm install 2.3.0

# Using Rbenv
brew upgrade ruby-build --HEAD
rbenv install 2.3.0
{% endhighlight %}

# Safe navigation operator

A new operator (`&.`) has been introduced.
It can be very useful in cases where you need to check if an object is nil
before calling a method on it.
It will return nil if the object equals nil,
otherwise it calls the method on the object.

{% highlight ruby %}
# Ruby <= 2.2.x
if user && user.admin?
  # do something
end

# Ruby 2.3
if user&.admin?
  # do something
end
{% endhighlight %}

There are some caveats to consider.
The first version would evaluate to false if user were set to false,
but the safe navigation operator would throw a `NoMethodError`.
This is similar to Rails'
[`#try!`](http://api.rubyonrails.org/classes/Object.html#method-i-try-21)
method.

# Frozen string literals

Until Ruby 2.2, strings were mutable by default in Ruby.
We're allowed to do something like `str[2] = 'z'`.
If we want to make strings immutable,
we need to call `#freeze` on it (eg. `str = 'foobar'.freeze`).

Using frozen (immutable) strings gives us improved performance
because Ruby now has to allocate fewer objects.
Because of this, there are plans to
[make strings immutable by default in Ruby 3.0](https://bugs.ruby-lang.org/issues/11473).

To make the transition easier,
Ruby 2.3 allows you to optionally make all strings literals frozen by default.
You can enable this by adding a comment
`frozen_string_literal: true`
at the start of the file.
When enabled, all the string literals in the file are frozen
even without calling `#freeze` on them.
Note that this only enables the feature on files that have the comment.

{% highlight ruby %}
# frozen_string_literal: true

str = 'cat'
str[0] = 'b'

# frozen.rb:5:in `[]=': can't modify frozen String (RuntimeError)
#   from frozen.rb:5:in `<main>'
{% endhighlight %}

Although this doesn't seem like a major change right now,
this will pave the way for a smooth transition to Ruby 3.0
a few years from now.

Here's a detailed post from Alexis Mas
[explaining immutable strings in Ruby 2.3](https://wyeworks.com/blog/2015/12/1/immutable-strings-in-ruby-2-dot-3/)
if you want to read more about it.

# `Array#dig` and `Hash#dig`

This is another useful addition to the standard library.
We can now access nested elements in arrays and hashes
with a much simpler API.

We can now do this with arrays:

{% highlight ruby %}
list = [
  [2, 3],
  [5, 7, 9],
  [ [11, 13], [17, 19] ]
]

list.dig(1, 2)    #=> 9
list.dig(2, 1, 0) #=> 17
list.dig(0, 3)    #=> nil
list.dig(4, 0)    #=> nil
{% endhighlight %}

Hashes:

{% highlight ruby %}
dict = {
  a: { x: 23, y: 29 },
  b: { x: 31, z: 37 }
}

dict.dig(:a, :x) #=> 23
dict.dig(:b, :z) #=> 37
dict.dig(:b, :y) #=> nil
dict.dig(:c, :x) #=> nil
{% endhighlight %}

This could be very useful when dealing with JSON data
that we've parsed into a hash.

# "Did you mean?"

When you get a NoMethodError because of a typo in the method name,
Ruby now helpfully suggests other method names similar to that one.

{% highlight ruby %}
2.3.0-preview1 :001 > "foo bar".uppcase
NoMethodError: undefined method `uppcase' for "foo bar":String
Did you mean?  upcase
               upcase!
{% endhighlight %}

This might look like a small change,
but it's my favorite feature in 2.3.
Making error messages more helpful has a huge impact
on making the language easier to use,
especially for beginners.

# Hash "comparison"

Hashes now have the comparison methods defined on them.
If you see `a >= b`, it is checking
if all the key-value pairs in b are also present in a.

{% highlight ruby %}
{ x: 1, y: 2 } >= { x: 1 } #=> true
{ x: 1, y: 2 } >= { x: 2 } #=> false
{ x: 1 } >= { x: 1, y: 2 } #=> false
{% endhighlight %}

In the first example above,
the key-value pair `[:x, 1]` in the RHS is a subset of
those in the LHS - `[ [:x, 1], [:y, 2] ]`,
so it returns true.

This also applies to all other comparison operators.
Olivier Lacan, who proposed this feature in Ruby,
wrote an excellent explanation of 
[hash comparison in Ruby 2.3](http://olivierlacan.com/posts/hash-comparison-in-ruby-2-3/).

# `Hash#to_proc`

`Hash#to_proc` returns a lambda that maps the key with the value.
When you call the lambda with a key,
it returns the corresponding value from the hash.

{% highlight ruby %}
h = { foo: 1, bar: 2, baz: 3}
p = h.to_proc

p.call(:foo)  #=> 1
p.call(:bar)  #=> 2
p.call(:quux) #=> nil
{% endhighlight %}

This might not seem useful in itself.
Why not use `[]` to access the elements?
But it gets interesting when we use the `&` operator to create a proc
and pass it to an `Enumerable` block.

{% highlight ruby %}
h = { foo: 1, bar: 2, baz: 3}

# instead of this:
[:foo, :bar].map { |key| h[key] } #=> [1, 2]

# we can use this syntax:
[:foo, :bar].map(&h) #=> [1, 2]
{% endhighlight %}

# `Hash#fetch_values`

This method works like `Hash#values_at` -
it fetches the values corresponding to the list of keys we pass in.
The difference is that `#values_at` returns nil when the key doesn't exist,
while `#fetch_values` raises a `KeyError` for keys that aren't present.

{% highlight ruby %}
h = { foo: 1, bar: 2, baz: 3}
h.fetch_values(:foo, :bar) #=> [1, 2]

h.values_at(:foo, :quux)    #=> [1, nil]
h.fetch_values(:foo, :quux) #=> raise KeyError
{% endhighlight %}

# `Enumerable#grep_v`

The `grep_v` method is equivalent to
the `-v` option in the command line grep utility.
It returns the list of items that do not match the condition.

{% highlight ruby %}
list = %w(foo bar baz)

list.grep_v(/ba/)
#=> ['foo']

list.grep(/ba/)
#=> ['bar', 'baz']
{% endhighlight %}

# `Numeric#positive?` and `#negative?`

These functions have been around in Rails core extensions for a while,
and now have been included in Ruby.

# Links

* [Ruby 2.3.0-preview1 announcement](https://www.ruby-lang.org/en/news/2015/11/11/ruby-2-3-0-preview1-released/)
