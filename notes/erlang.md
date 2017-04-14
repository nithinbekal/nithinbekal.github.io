---
layout: page
title: "Erlang"
date:  2015-06-13 22:18:17
---

# Erlang shell

{% highlight erlang %}
pwd().
cd("/Users/nithin/code").
ls().
e(-1). %% Eval last command
{% endhighlight %}

- User switch command: C-g
  - q -> quit
  - j -> list shells
  - c 2 -> connect to shell 2
  - k 2 -> kill shell 2

# Integers

{% highlight erlang %}

16#AB10F    %% B#Val numbers in base B
$A
$\n         %% $char for ASCII values


{% endhighlight %}
# Atoms

{% highlight erlang %}

alpha21
start_with_lower_case
true
false
'January'
'a space'


{% endhighlight %}
# Tuples

{% highlight erlang %}

{ok, 123}
{abc, {def, 123}, ghi}
{person, 'Joe', 'Armstrong'}


{% endhighlight %}
# Lists

{% highlight erlang %}

[]
[jan, feb, mar]
[a, [b, [c, d], e], f]

[72, 101, 108, 108, 111]
[$H, $e, $l, $l, $o] %% -> "Hello"

atom_to_list(foo). -> "foo"
list_to_atom("123"). -> '123'


{% endhighlight %}
# Variables

* Starts with uppercase or underscore
* Variables can only be bound once

{% highlight erlang %}

SomeVariable
_dont_care_variable
_

A.     %% Error: variable A is unbound
A = 1.
A = 2. %% Exception
A.     %% 1


{% endhighlight %}

# Functions

* Implicit returns
* Expressions separated by comma
* Clauses separated by semicolon
* Terminate function definition with dot.

{% highlight erlang %}

product(X, Y) -> X * Y.
product(X, Y, Z) -> X * Y * Z.

circumference(R) ->
  2 * math:pi() * R.


area({square, Side}) ->
  Side * Side;

area({circle, Radius}) ->
  math:pi() * Radius * Radius;

area({triangle, A, B, C}) ->
  S = (A + B + C) / 2,
  math:sqrt(S * (S-A) * (S-B) * (S-C)).


{% endhighlight %}

# Modules

* Module name has to match the file name.

{% highlight erlang %}

-module(demo).
-export([double/1]).

% This is a comment.
% times/2 remains private

double(X) ->
  times(X, 2).

times(X, N) -> X * N;


{% endhighlight %}
# Connecting to other nodes in shell

$ erl -sname foo
foo@nithin>

$ erl -sname bar
bar@nithin>

From bar@nithin, C-g and then `r 'foo@nithin'`.

# Case

{% highlight erlang %}

case lists:member(foo, List) do
  true -> ok;
  false -> {error, unkown}
end


{% endhighlight %}
# Guards

{% highlight erlang %}

factorial(N) when N > 0 ->
  N * factorial(N-1);
factorial(0) -> 1;


valid_age(Age) when Age >= 18, Age <= 100 ->
  true;
valid_age(Age) ->
  false.


{% endhighlight %}

# Recursion with lists

{% highlight erlang %}

average(X) -> sum(X) / count(X).

sum([H|T]) -> H + sum(T);
sum([]) -> 0.

count([H|T]) -> 1 + count(T);
count([]) -> 0;


Doing the same with accumulators:

average(X) -> average(X, 0, 0).

average([H|T], Length, Sum) ->
  average(T, Length+1, Sum+H);
average([], Length, Sum) ->
  Sum/Length.


{% endhighlight %}

# Processes

{% highlight erlang %}

Pid2 = spawn(Mod, Func, Args)

Pid2 ! {self(), foo} 

receive
    {reset, Board} -> reset(Board);
    _Other -> {error, unknown_msg};
end


read(Key) ->
  db ! {self(), {read, key}},
  receive
    {read, R} ->
      {ok, R};
    {error, Reason} ->
      {error, Reason}
  after 1000 ->
    {error, timeout}
  end.


{% endhighlight %}

#### Random notes and thoughts

- "Equals" actually means "pattern match"
- "Variable" means binding
- An erlang process has just 200-300 words
- BIF - built in fn


**Bookmarks**

- [BEAM Wisdoms](http://beam-wisdoms.clau.se/en/latest/) -
  collection of easy to read (ELI5) articles as well as in-depth knowledge such as VM internals, memory layout, opcodes etc.
- [Chat app with OTP - code example from FnConf15 B'lore](https://github.com/bernardd/OTPworkshop)

**Books:**

- [Learn You Some Erlang for Great Good](http://learnyousomeerlang.com)
- [The BEAM Book](https://github.com/happi/theBeamBook) -
  A description of the Erlang Runtime System ERTS and the virtual Machine BEAM.
  (By Erik Stenman)
- [Stuff Goes Bad: Erlang in Anger](http://www.erlang-in-anger.com)
