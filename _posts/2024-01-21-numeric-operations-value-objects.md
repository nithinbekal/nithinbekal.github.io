---
layout: post
title: "Numeric operations on value objects in Ruby"
date:  2024-01-21
categories: ruby
---

Here's a little Ruby puzzle.
Imagine you have a `Value` class
that wraps a number,
and implements numeric operations.
**How would you go about implementing the class
in a way that lets you do something like
`2 + Value.new(3)`
and returns `Value.new(5)`?**

To start with,
let's describe what the `Value` class looks like:

```ruby
class Value
  attr_reader :num

  def initialize(num)
    @num = num
  end

  def +(other)
    Value.new(self.num + other.num)
  end

  # other operations: -, *, /
end
```

This will allow you do to things like this:

```ruby
Value.new(2) + Value.new(3)  #=> #<Value(5)
```

Changing this class to accept a numeric value
on the right hand side
is pretty straightforward.
We can change the `+` method on `Value`
to wrap non-Value arguments as value objects.

```ruby
def +(other)
  other = other.is_a?(value) ? other : Value.new(other)
  Value.new(self.num + other.num)
end

Value.new(3) + 2 #=> #<Value(5)>
```

However, this doesn't work in reverse.
This is because
when we write `2 + something`,
Ruby calls the `+` method on the integer,
so this is equivalent to `2.+(something)`.
`Integer#+` doesn't know how to handle `Value`s
so we'll see this exception:

```ruby
2 + Value.new(3)
#=> 🔥 Value can't be coerced into Integer (TypeError)
```

The first idea that came to my mind
when thinking of a way to do this in reverse
was to monkeypatch `Numeric`.

```ruby
class Numeric
  def +(other)
    if other.is_a?(Value)
      Value.new(self) + other
    else
      super
    end
  end
end
```

Monkeypatching core classes
is a terrible idea,
so let's look for another way.
The error message  we saw earlier
("Value can't be coerced into Integer")
gives us a clue about what to do.
There must be a way to coerce `Value` into `Integer`.

Can we define `to_i` on `Value`?
Nope, same error.
Defining `to_f` doesn't help either.

Next let's look at
[how `+` is implemented on Integer](https://github.com/ruby/ruby/blob/34315510d34543cf14fe0ac9e8adb1d86b5beebf/numeric.c#L3990).
When you perform an arithmetic operation on an integer
and it doesn't know what to do with the argument,
it calls `coerce` on that object.
This method should return a 2-element array
containing the objects
modified into compatible types.
It then calls `+` on the resulting objects.

We can now define a `Value#coerce` method,
that returns a tuple.
Ther first element here should be the number
wrapped into a `Value` object,
and the second should be the value object being added to it.

```ruby
def coerce(n)
  [Value.new(n), self]
end

# And now this works!
2 + Value.new(3) #=> <Value(5)>
```

There's one gotcha to note here:
it might be tempting to return `[self, n]` here
because `self.+(n)` can handle both numbers and `Value`s.
However, the coerce method is used
for all numeric operations,
including `-` and `/`
where the order of arguments matters
(`x/y` is not the same as `y/x`),
so it's important to return the values
in the same order.

## Python

I came across this problem
while working through
[Andrej Karpathy's neural networks course](https://karpathy.ai/zero-to-hero.html)
and trying to reimplement
his [micrograd](https://github.com/karpathy/micrograd) package written in Python.

Python takes a different approach to this,
and lets you define magic methods
for numeric operations.
For a similar `Value` class
written in Python,
you would do something like this:

```python
class Value:
  # ...

  # Value(2) + Value(3)
  def __add__(other):
    Value(self.num + other.num)

  # 2 + Value(3)
  def __radd__(other):
    return self + other


2 + Value(3) #=> Value(5)
```

I prefer the Ruby approach,
because you don't need to implement these magic methods
for all numeric operations.
However, the explicitness of magic methods
means that we don't need to worry
about returning the operands in an incorrect order.

If you want to compare the `Value` class in the two languages,
you can see them here:

- [Original Python implementation](https://github.com/karpathy/micrograd/blob/master/micrograd/engine.py)
- [Ruby implementation](https://github.com/nithinbekal/micrograd/blob/main/lib/micrograd/value.rb)
