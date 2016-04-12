---
layout: page
title: 'Elixir'
date:   2014-06-07 12:00:00
---

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

{% highlight elixir %}
x = 42
x               # 42
42 = x          # fine
1 = x           # ** (MatchError) no match of right hand side value: 42
2 = foo         # ** (RuntimeError) undefined function: foo/0
{% endhighlight %}

* `x = 42` assigns 42 to the variable x.
* `42 = x` is ok because
  the operator only checks if
  both sides match
* `1 = x` fails because
  the right side has the value 42
  and left side has the value 1,
  and so the match fails
* Variables can only be assigned
  if they are on the left side
* When we try matching an unknown variable
  on the right side,
  Elixir thinks it is a function call to `foo`
* You can re-bind variables

{% highlight elixir %}
{ :ok, status } = { :ok, 400 } } }
status          # 400

[a, b, c] = [1, 2, 3]
a               # 1

[head | tail ] = [1, 2, 3]
head            # 1
tail            # [2, 3]
[ 4 | tail ]    # [4, 2, 3]
{% endhighlight %}

* `^` (pin operator) lets you access previously bound values
* it can be used when you need to match against
  a variable's value prior to the match

{% highlight elixir %}
x = 1
{ x, ^x } = { 2, 1 }
x   # 2
{% endhighlight %}

# Strings, binaries, char lists

{% highlight elixir %}
string = "hello"
is_binary string # true

# UTF8 strings
s = "hełło"
byte_size s             # 7
s |> String.length      # 5

# each character is a 'code point' whose
# value can be accessed via ? operator
?ł      # 322
?a      # 97

# Binaries
<<1, 2, 3>>     # this is a binary
<<255>>         # max balue for binary
<<256>>         # 0  -- truncated

# Char lists
s = "hełło"
is_list s       # true
to_char_list s  # [104, 101, 322, 322, 111]
{% endhighlight %}

* Char lists are mainly used
  for interfacing with old
  Erlang libs

# Keyword lists

* Keyword lists are similar to hashes/dictionaries in other languages
* They map to arrays of key-value tuples
* have 3 characteristics
  - keys must be atoms
  - keys are ordered
  - duplicate keys can exist

{% highlight elixir %}
list = [a: 1, b: 2]
list == [{:a, 1}, {:b, 2}]  # true  -- same thing
list[:a]                    # 1
list ++ [c: 3]              # [a: 1, b: 2, c: 3]

# can have same key repeated
list2 = [a: 0] ++ list
list2[:a]               # 0  -- values in front override others

# Keyword list based if macro
if false, do: 1, else: 2

# Pattern matching requires number of elements and order to match
[a: a] = [a: 1]
a  # 1
{% endhighlight %}

# Maps

* Key value store

{% highlight elixir %}
map = %{ :a => 1, 2 => :b }
map[:a]         # 1
map[2]          # :b
Map.get map, :a # 1
map.a           # 1

# pattern match
%{:a => a} = map
a               # 1

# updating a map
%{ map | :a => 2 }      # %{ :a => 2, 2 => :b }
{% endhighlight %}

# Dict

* API that delegates to underlying implementation

# Modules and functions

* The `defmodule` macro defines a module
* `def` defines a function
* Functions have implicit returns

{% highlight elixir %}
defmodule Math
  def sum(a, b) do
    a + b
  end
end
{% endhighlight %}

Fibonacci example:

{% highlight elixir %}
defmodule Fibonacci do
  def fib(0), do: 0
  def fib(1), do: 1
  def fib(n), do: fib(n-1) + fib(n-2)
end
{% endhighlight %}

This version, using case,
maps to the pattern matching version
at the VM level.

{% highlight elixir %}
def fib(n)
  case n do
    0 -> 0
    1 -> 1
    n -> fib(n-1) + fib(n-2)
  end
end
{% endhighlight %}

Ruby-like version:

{% highlight elixir %}
def fib(n) do
  if n < 2
    n
  else
    fib(n-1) + fib(n-2)
  end
end
{% endhighlight %}

Length of a list:

{% highlight elixir %}
def len([]), do: 0
def len([h|t]), do: 1 + len(t)
{% endhighlight %}

Map:

{% highlight elixir %}
def map([],    f), do: []
def map([h|t], f), do: [ f.(h) | map(t, f) ]
{% endhighlight %}

Run length encoding:

{% highlight elixir %}
defmodule RLE do
  def encode(list), do: _encode(list, [])

  defp _encode([], result), do: Enum.reverse(result)

  defp _encode([a | a | t], result) do
    _encode([ {a,2} | tail ], result)
  end

  defp _encode( [ {a, n}, a | tail ], result ) do
    _encode( [ { a, n+1 } | tail ], result )
  end

  defp _encode( [a | tail ], result ) do
    _encode(tail, [ a | result ])
  end
end
{% endhighlight %}

Default args:

{% highlight elixir %}
defmodule Concat do
  def join(a, b, sep \\ " ") do
    a <> sep <> b
  end
end

IO.puts Concat.join("Hello", "world")      #=> Hello world
IO.puts Concat.join("Hello", "world", "_") #=> Hello_world
{% endhighlight %}

# Links

* [Elixir lang](http://elixir-lang.org/) - website
* [Phoenix guides](https://github.com/lancehalvorsen/phoenix-guides) - Guides for the Phoenix web framework
* [Elixir Quick Reference](https://github.com/itsgreggreg/elixir_quick_reference)
* [Jose Valim - How I Start](https://howistart.org/posts/elixir/1)
* [Elixir Resources](http://connettiva.eu/rubyday/)
* [Elixir Style Guide](https://github.com/niftyn8/elixir_style_guide)
* [Learning Elixir and Erlang - more resources](http://www.phoenixframework.org/docs/learning-elixir-and-erlang)

OTP

- [Process registry in Elixir: A practical example](https://m.alphasights.com/process-registry-in-elixir-a-practical-example-4500ee7c0dcc#.klz5c0gqo)

# Videos

* [Elixir - A modern approach to programming for the Erlang VM on Vimeo](https://vimeo.com/53221562), Jose Valim
* [Introduction to Elixir](http://www.youtube.com/watch?v=a-off4Vznjs&feature=youtu.be), Dave Thomas
* [Think Different](https://www.youtube.com/watch?v=5hDVftaPQwY), Dave Thomas keynote at Elixir Conf 2014

# Books

* [Études for Elixir](http://chimera.labs.oreilly.com/books/1234000001642) by J. David Eisenberg
