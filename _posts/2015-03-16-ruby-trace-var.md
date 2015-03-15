---
layout: post
title: "Tracing global variables in Ruby using trace_var"
date:  2015-03-12 00:33:13
categories: ruby
---

Recently, I came across this
"interesting" approach to printing
the "99 bottles of beer" song on
[Rosetta code](http://rosettacode.org/wiki/99_Bottles_of_Beer#Ruby).

{% highlight ruby %}
trace_var :$bottle_num do |val|
  $bottles = %Q{#{val == 0 ? 'No more' : val.to_s} bottle#{val == 1 ? '' : 's'}}
end

($bottle_num = 99).times do
  puts "#{$bottles} of beer on the wall"
  puts "#{$bottles} of beer"
  puts "Take one down, pass it around"
  $bottle_num -= 1
  puts "#{$bottles} of beer on the wall"
  puts ""
end
{% endhighlight %}

Wait... WHAT!?
This is unlike any Ruby code I've seen before.
What's `trace_var`?
What are those global variables doing?

Let's start by looking at this `trace_var` thing.
The `Kernel#trace_var`
[documentation says](http://ruby-doc.org/core-2.2.1/Kernel.html#method-i-trace_var):

> Controls tracing of assignments to global variables.
>
> ... the block is executed whenever the variable is assigned.
> The block or Proc object receives
> the variable’s new value as a parameter.

Let's try something simple with this.

{% highlight ruby %}
trace_var :$foo do |x|
  puts "$foo = #{x}"
end

(1..5).each { |i| $foo = i }

# This prints:
# $foo = 1
# $foo = 2
# $foo = 3
# $foo = 4
# $foo = 5
{% endhighlight %}

If you pass in a string
instead of a block or Proc,
it gets eval'ed.

{% highlight ruby %}
trace_var :$foo, "puts 'changing foo'"
$foo = 2
# changing foo
{% endhighlight %}

If you need to unset tracing with `trace_var`,
you can do `untrace_var :$foo`.

Now that we've seen how `trace_var` works,
let's go back to the "99 bottles" program.
It's starting to make sense now.

{% highlight ruby %}
trace_var :$bottle_num do |val|
  $bottles = %Q{#{val == 0 ? 'No more' : val.to_s} bottle#{val == 1 ? '' : 's'}}
end
{% endhighlight %}

This assigns the string
`"#{$bottle_num} bottles"`
to the `$bottles` variable,
except when `$bottle_num` is zero,
in which case "No more bottles"
is assigned.
So each time `$bottle_num` gets changed,
the `$bottles` string gets updated automatically.

# Debugging with `trace_var`

`trace_var` can be a useful debugging tool.
Suppose you want to find out
which line of code is
changing a global variable.
You could do this:

{% highlight ruby %}
trace_var :$foo do |x|
  puts "$foo = #{x}"
  puts caller
end
{% endhighlight %}

This will show you assigned value
and the execution stack at that point.

{% highlight text %}
$foo = 42
foo.rb:27:in `call'
foo.rb:27:in `initialize'
foo.rb:31:in `new'
foo.rb:31:in `<main>'
{% endhighlight %}

But if you ever find yourself debugging your code like this,
maybe it's a good time to get rid of those global variables.
[They are bad for your codebase](http://c2.com/cgi/wiki?GlobalVariablesAreBad).

`trace_var` only works with global variables.
If you need a more flexible tool
you might want to look at Ruby 2.0's new
[TracePoint API](http://ruby-doc.org/core-2.2.1/TracePoint.html).

# More weird Ruby

If you found this post interesting,
you might also enjoy my other articles
about lesser known features of Ruby,
such as
[the flip flop operator](/posts/ruby-flip-flop/),
[tail call optimization](/posts/ruby-tco/),
[memoization using metaprogramming tricks](/posts/ruby-memoization/),
or
[using Ruby as an alternative to sed/awk](/posts/ruby-sed-awk/).

# Links

* ["99 bottles of beer" solutions on Rosetta Code](http://rosettacode.org/wiki/99_Bottles_of_Beer#Ruby)
* [Kernel#trace_var documentation](http://ruby-doc.org/core-2.2.1/Kernel.html#method-i-trace_var)
