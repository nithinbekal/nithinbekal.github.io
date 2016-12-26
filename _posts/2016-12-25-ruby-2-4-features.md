---
layout: post
title: "What's new in Ruby 2.4?"
date:  2016-12-25 14:33:38 +05:30
categories: ruby
---

It's Christmas day, and following the tradition of the last few years,
the Ruby core team have released a new Ruby version today.
I'll summarize some of the interesting new features in Ruby 2.4 here.

Previous: 
[Ruby 2.3](/posts/ruby-2-3-features/).

## Numbers

__`Fixnum` and `Bignum` have been unified into `Integer` class.__

So far, we've had two classes for storing integers -
`Fixnum` for small integers, and `Bignum` for numbers outside this range.
However, these are implementation details
that programmers don't need to worry about while writing code.

These two classes have been replaced by a single `Integer` class.
Previously, `Integer` was a superclass of these two classes,
but now both `Fixnum` and `Bignum` are aliases to `Integer`.

{% highlight ruby %}
# 2.3
42.class      #=> Fixnum
(2**62).class #=> Bignum

# 2.4
42.class      #=> Integer
(2**62).class #=> Integer

Fixnum == Integer #=> true
Bignum == Integer #=> true
{% endhighlight %}

- [Feature #12005: Unify Fixnum and Bignum into Integer](https://bugs.ruby-lang.org/issues/12005)
- [Slides by Tanaka Akira](http://www.a-k-r.org/pub/2016-09-08-rubykaigi-unified-integer.pdf)
- [Ruby 2.4 unifies Fixnum and Bignum into Integer](http://blog.bigbinary.com/2016/11/18/ruby-2-4-unifies-fixnum-and-bignum-into-integer.html)
  (BigBinary blog)

__New `Integer#digits` method__

{% highlight ruby %}
42.digits  #=> [2, 4]
{% endhighlight %}

__Precision for float modifiers__

`Float` methods like `#ceil`, `#floor`, `#truncate` and `#round`
take an optional argument to set precision.

{% highlight ruby %}
1.567.round       #=> 2
1.567.round(2)    #=> 1.57
123.456.round(-1) #=> 120
{% endhighlight %}

__`Float#round` default behavior remains unchanged__

This one isn't really a change,
but this change in default behavior initially made it to one of the preview releases,
and was reverted later on.

By default, `#round` uses round-half-up behavior, ie. 1.5 would be rounded to 2.
The new behavior was to use banker's rounding, which rounds half to nearest even number.
This might cause bugs in many existing applications which rely on half-up rounding,
so the original default has been retained.

{% highlight ruby %}
# suggested behavior
1.5.round  #=> 2
2.5.round  #=> 2

# actual behavior
1.5.round #=> 2
2.5.round #=> 3
{% endhighlight %}

__`Float#round` options__

Even though the round-to-nearest-even change was reverted,
new options were introduced in `Float#round`
that allow you to explicitly set what kind of rounding to use.

{% highlight ruby %}
2.5.round               #=> 3
2.5.round(half: :even)  #=> 2
2.5.round(half: :down)  #=> 2
2.5.round(half: :up)    #=> 3
{% endhighlight %}

## `binding.irb`

I'm a big fan of the pry gem for the `binding.pry` method
that opens a REPL while running your code.
IRB has now introduced this feature,
and ruby now opens a REPL when it encounters the `binding.irb` method.

## Hash

__`Hash#compact`__

This method, and the bang version, `#compact!`,
remove keys with nil values from the hash.

{% highlight ruby %}
{ a: "foo", b: false, c: nil }.compact
#=> { a: "foo", b: false }
{% endhighlight %}

__`Hash#transform_values`__

Applies the block for each value in the hash.
Also provides a `#transform_values!` method that modifies the existing hash.
Examples from the docs:

{% highlight ruby %}
h = { a: 1, b: 2, c: 3 }
h.transform_values {|v| v * v + 1 }  #=> { a: 2, b: 5, c: 10 }
h.transform_values(&:to_s)           #=> { a: "1", b: "2", c: "3" }
{% endhighlight %}

## Strings, Symbols and IO

__String supports unicode case mappings__

Until now, Ruby only performed case conversion on ASCII characters.
The `upcase, downcase, swapcase, capitalize` methods on `String` and `Symbol`
have now been extended to work with unicode characters.

{% highlight ruby %}
# 2.3
"Türkiye".upcase   #=> "TüRKIYE"
"TÜRKİYE".downcase #=> "tÜrkİye"

# 2.4
"Türkiye".upcase   #=> "TÜRKIYE"
"TÜRKİYE".downcase #=> "türki̇ye"
{% endhighlight %}

- [Feature #10085: Add non-ASCII case conversion to String#upcase, #downcase, #swapcase, #capitalize](https://bugs.ruby-lang.org/issues/10085)

__Specify string buffer size__

`String.new` now allows a `capacity` argument
to specify the size of the buffer.
This will have performance benefits
when the string will be concatenated many times.

{% highlight ruby %}
String.new('foo', capacity: 1_000)
{% endhighlight %}

__`Symbol#match` now works like `String#match`__

`Symbol#match` used to return the match position,
while `String#match` returned a `MatchData` object.
This has been fixed in 2.4 and now both return a `MatchData`.

{% highlight ruby %}
# 2.3
:hello_ruby.match(/ruby/) #=> 6

# 2.4
:hello_ruby.match(/ruby/) #=> #<MatchData "ruby">
{% endhighlight %}

__`IO#gets` and other methods get a chomp flag__

You can now add an optional `chomp: true` flag to
`#gets`, `#readline`, `#each_line`, `#readlines` and `IO.foreach`.

{% highlight ruby %}
# In 2.3, you did this
foo = gets.chomp

# 2.4
foo = gets(chomp: true)
{% endhighlight %}

## Regexp

__`Regexp#match?`__

This new method returns true or false without updating the `$~` global variable.
Since it doesn't create a `MatchData` object or update `$~`,
it performs better than `#match`.

{% highlight ruby %}
/foo/.match?('foo')  #=> true
$~                   #=> nil
{% endhighlight %}

__Regexp#named_captures__

Returns a hash representing information about the named captures.

{% highlight ruby %}
/(?<fname>.+) (?<lname>.+)/.match('Ned Stark').named_captures
#=> {"fname"=>"Ned", "lname"=>"Stark"}
{% endhighlight %}

## Enumerable

__`Enumerable#sum`__

{% highlight ruby %}
(1..5).sum         #=> 15
%w(a b c).sum('')  #=> "abc"
{% endhighlight %}

## Files and directories

The `#empty?` method was added to `Dir`, `File` and `Pathname`.

{% highlight ruby %}
Dir.empty?('path/to/some/dir')    #=> true
File.empty?('path/to/some/file')  #=> true
Pathname.empty?('file-or-dir')    #=> true
{% endhighlight %}

### Language features

__Multiple assignment in conditionals__

In Ruby 2.3, you would get a syntax error
if you tried multiple assignment in a conditional.
This has been changed to a warning instead.

{% highlight ruby %}
# 2.3
if (a,b = [1,2]) then 'yes' else 'no' end
#=> SyntaxError: (irb):9: multiple assignment in conditional

# 2.4

if (a,b = [1,2]) then 'yes' else 'no' end
#=> warning: found = in conditional, should be ==
#=> 'yes'

if (a,b = nil) then 'yes' else 'no' end
#=> warning: found = in conditional, should be ==
#=> 'no'
{% endhighlight %}

## Wrapping up

I haven't mentioned all the new features in Ruby 2.4 here,
but if you're interested in the complete list of changes, take a look at the
[Ruby 2.4.0 NEWS file](https://github.com/ruby/ruby/blob/v2_4_0/NEWS).

- [Ruby 2.4 release announcement](https://www.ruby-lang.org/en/news/2016/12/25/ruby-2-4-0-released/)

Here are some more articles covering the new release:

- [Ruby 2.4 Released: Faster Hashes, Unified Integers and Better Rounding](https://blog.heroku.com/ruby-2-4-features-hashes-integers-rounding)
  on the Heroku blog
- [What's new in Ruby 2.4](https://jobandtalent.engineering/whats-new-in-ruby-2-4-f6e4fdd1a2b4#.kdibuxdoj)
  on the Jobandtalent Engineering team blog
- [Behavior changes in Ruby 2.4](https://wyeworks.com/blog/2016/6/22/behavior-changes-in-ruby-2.4)
  on the Wyeworks blog
- [9 New Features in Ruby 2.4](http://www.blackbytes.info/2016/12/new-ruby-features/)
  on the Black Bytes blog
