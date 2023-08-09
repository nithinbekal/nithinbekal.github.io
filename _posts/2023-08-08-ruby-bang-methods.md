---
layout: post
title: "Ruby's bang methods - Handle with care!"
date: 2023-08-08
categories: ruby
---

In Ruby,
method names can be suffixed with `!`.
These are often called "bang" methods.
This is used to indicate
that it is a dangerous counterpart
of the non-bang version of the method.

I had always thought of "dangerous"
to mean that the method
mutates the underlying object
and returns that object.
However,
these methods can differ
from their non-bang versions
in other subtle ways.
This tripped me up recently.

## The case of `Array#reject!`

I was modifying some code recently,
and was surprised by how `Array#reject!` works.

`Array#reject` - the non-bang version -
returns a new array
after removing elements for which
the block evaluates to a truthy value.
I had expected `reject!`
to work similarly,
with the exception that
it returns the mutated receiver.

Let's look at an example
comparing the two methods,
when there is something to reject:

```ruby
[1, 2, 3].reject(&:even?)  #=> [1, 3]
[1, 2, 3].reject!(&:even?) #=> [1, 3]
```

Both of them returned an array.
Now, let's try changing the input
to only contain odd numbers.

```ruby
[1, 3, 5].reject(&:even?)  #=> [1, 3, 5]
[1, 3, 5].reject!(&:even?) #=> nil 💥
```

Turns out `reject!` returns `nil`
if there's nothing to reject.
This is how a lot of methods
in the standard library behave.

## Using bang methods safely

In the code that I was changing,
we had an intermediate array
that wasn't being used.
I thought it was safe to mutate it
to avoid allocating more objects.
If you need to do something like this,
you can use `reject!` inside `tap` like this:

```ruby
[1,3,5].tap { |n| n.reject!(&:even?) } #=> [1, 3, 5]
```

There's also another alternative
in case of `reject!` -
`Array#delete_if` works like
how I expected `reject!` to work
and returns the array,
irrespective of whether it was mutated or not.

```ruby
[1, 2, 3].delete_if(&:even?)  #=> [1, 3]
[1, 3, 5].delete_if(&:even?)  #=> [1, 3, 5]
```

In the end, I decided not to change the code.
I find `reject` to be the most readable option,
and profiling the code
didn't show any significant gains
from avoiding the allocations.

## So what does `!` indicate?

Matz, the creator of Ruby,
has this to say
about bang methods:

> The bang (!) does not mean “destructive”
> nor lack of it mean non destructive either.
> The bang sign means
> “the bang version is more dangerous
> than its non bang counterpart; handle with care”.

This is what Ruby docs say:

> ...by convention,
> a method with an exclamation point or bang is considered dangerous.
> In Ruby’s core library the dangerous method implies that
> when a method ends with a bang (!),
> it indicates that unlike its non-bang equivalent, permanently modifies its receiver.

Typically,
in the Ruby standard library,
this means that a bang method
returns either the mutated object,
or `nil` if there's nothing to mutate.

However,
not all dangerous methods
are bang methods.
There are `Array` methods like
`push`, `pop`, `prepend`, etc
which will mutate the object,
but they don't have the `!` suffix
because they don't have
a safe counterpart.

