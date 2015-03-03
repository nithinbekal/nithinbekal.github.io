---
layout: page
title: 'Elixir'
date:   2014-06-07 12:00:00
---

* [Elixir lang](http://elixir-lang.org/) - website
* [Phoenix guides](https://github.com/lancehalvorsen/phoenix-guides) - Guides for the Phoenix web framework
- [Elixir - A modern approach to programming for the Erlang VM on Vimeo](https://vimeo.com/53221562), Jose Valim
- [Introduction to Elixir](http://www.youtube.com/watch?v=a-off4Vznjs&feature=youtu.be), Dave Thomas
- [Think Different](https://www.youtube.com/watch?v=5hDVftaPQwY), Dave Thomas keynote at Elixir Conf 2014

{% highlight ruby %}
brew install elixir
{% endhighlight %}

* dynamic/functional lang
* runs on Erlang VM
* Actor model - each actor is a separate process in the VM - allows concurrency

Processes are lightweight,
and exchange info via messages.
This isolates processes,
which allows independent GCs
and prevents system-wide pauses.

* [Mix is the build tool](http://elixir-lang.org/docs/stable/mix/)
* [Hex is the package manager](https://hex.pm/)
* [IEx is the repl](http://elixir-lang.org/docs/stable/iex/)
* can invoke any Erlang function with no runtime cost

## Basic types and operations

{% highlight elixir %}
40 + 2
"hello" <> " world"     # string
:atom                   # atom/symbol
[1, 2, 3]               # list
{1, 2, 3}               # tuple
[1, 2] ++ [3, 4]        # [1, 2, 3, 4]

# Use / for float and div for int division
# parenthesis are optional when invoking functions
# Floats are 64 bit double precision numbers
10 / 2      # 5.0
div 10, 2   # 5
rem 11, 3   # 2
{% endhighlight %}

* Booleans:

{% highlight elixir %}
is_boolean(true)     # true
is_boolean(false)    # false

# true and false are same as atoms :true and :false
is_atom(false)       # true
is_boolean(:true)    # true
is_boolean(:false)   # false
{% endhighlight %}

* Functions are referred by name and arity,
  eg. `is_boolean/1`.

* Strings are UTF-8 encoded

{% highlight elixir %}
"hello
world"            # "hello\nworld"
IO.puts "hello"   # Prints "hello" and returns :ok
{% endhighlight %}

* When using binary operations,
  use `and`, `or`, `not`
  when first argument is boolean.
* With `&&`, `||`, `!`
  the args can be of any type.
  (Everything except `false` and `nil` eval to true,
  just like in Ruby)

{% highlight elixir %}
false or is_atom(:example)  # true
true and true               # true
1 and true                  # ArgumentError
false and error("This error will never be raised")

1 || true       # 1
2 && 3          # 3
false || 11     # 11
!1              # false
!nil            # true
{% endhighlight %}

* Comparison operators:
  `===` is more strict compared to `==`.

{% highlight elixir %}
1 == 1.0        # true
1 === 1.0       # false
{% endhighlight %}

* Different data types can be compared.
  This allows sorting algorithms to not
  worry about data types.

{% highlight elixir %}
1 < :atom       # true

# sorting order
number < atom < reference < functions < port < pid < tuple < maps < list < bitstring
{% endhighlight %}


## Pattern matching

* `=` is the pattern match operator
* `^` (pin operator) lets you access previously bound values


