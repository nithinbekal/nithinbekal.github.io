---
layout: post
title: "What's new in Ruby 2.5?"
date:  2017-12-27 15:42:42 +05:30
categories: ruby
---

The Ruby core team has traditionally released a new version of Ruby
on Christmas day,
and this Christmas,
we got Ruby 2.5.
A couple of years ago,
I started posting a summary of Ruby changes
([2.4](/posts/ruby-2-4-features/),
[2.3](/posts/ruby-2-3-features/)),
and this year's version is here.

_(This is only a list of things
I found most interesting about this release,
so if you want a complete list,
[take a look at the changelog](https://github.com/ruby/ruby/blob/trunk/doc/NEWS-2.5.0).)_

## Rescue in do/end blocks

If you needed to rescue an exception in a block,
the only way to do that was to put it in a begin/end block.
Now, you can rescue exceptions inside all do/end blocks.

```ruby
(1..5).each do |n|
  do_something(n)
rescue SomeError => e
  puts e
  next
end
```

## Top level constant lookup is removed

In previous versions,
if Ruby couldn't find a constant in the current scope,
it would fallback to the top level constant,
and emit a warning.
This has changed in 2.5,
and this will now cause an exception.

{% highlight ruby %}
class Foo; end
class Bar; end

# Ruby 2.4
Foo::Bar
# warning: toplevel constant Bar referenced by Foo::Bar
#=> Bar

# Ruby 2.5
Foo::Bar
# NameError
{% endhighlight %}

## Backtrace in reverse order

When printing to console,
Ruby will display the backtrace in reverse order.
You will also see the error message in bold and underlined.
This is an experimental feature,
and the order won't be changed when printing to logs.

When working on Rails projects,
it is common to have to scroll a long way back
to find the line in the backtrace
that shows the line where the exception happened.
By reversing the backtrace,
you get the context on the line causing the exception
without having to scroll back.


## `Kernel#yield_self`

This method passes an object to a block
and returns the value returned by the block.
The use of pipelines is common in Elixir,
so I'll translate some
[code](https://github.com/nithinbekal/google_books.ex/blob/1fe98c7d2bbc2f84b1dedcdc7b248a3b85c3030d/lib/google_books.ex#L19)
from one of my Elixir packages to Ruby
to demonstrate this feature.

{% highlight ruby %}
isbn = "0-306-40615-2"

isbn.gsub('-', '')
  .yield_self { |isbn| URI("#{API_URL}?q=isbn:#{isbn}") }
  .yield_self { |uri| Net:HTTP.get(uri) }
  .yield_self { |json_response| JSON.parse(json_response) }
  .yield_self { |response| response.dig('items', 'volumeInfo') }
{% endhighlight %}

The Ruby community has many people
who are interested in Elixir,
so this could end up being a popular feature.
I wonder if this could have been an operator,
but it's still an interesting addition to Ruby.

## Standard Gems

Ruby comes with a lot of things bundled into the standard library,
and this makes it hard to push bug fixes after a Ruby version is released.
To solve this, many libraries are being gemified,
and released independently of Ruby.
Libraries like cmath and webrick have been extracted this way.

This doesn't mean you can't use Webrick the next time you install Ruby, though.
The gems being extracted will be shipped with Ruby as default gems,
but you also have the option of installing the latest version through Rubygems.

- [List of standard gems](https://stdgems.org/2.5.0/)
- [Gemifying the standard library](https://bugs.ruby-lang.org/projects/ruby/wiki/StdlibGem)
- [Discussion on Ruby bug tracker](https://bugs.ruby-lang.org/issues/5481)

## String methods

**`String#-@`**: deduplicates unfrozen strings.

{% highlight ruby %}
s = - 'foo'  #=> 'foo'
s.frozen?    #=> true
{% endhighlight %}

**`delete_prefix`** and **`delete_suffix`**
(along with the bang `!` versions)

{% highlight ruby %}
'Mr. Smith'.delete_prefix('Mr. ')      #=> 'Smith'
'Wellington St.'.delete_suffix(' St.') #=> 'Wellington'
{% endhighlight %}

**`grapheme_clusters`**

{% highlight ruby %}
s = "a\u0300"       #=> "à"
s.grapheme_clusters #=> ["à"]
s.codepoints        #=> [97, 768]
{% endhighlight %}

## Array methods

`#append` and `#prepend` methods have been added,
which are aliases for `#push` and `#unshift` respectively.
These aliases were already introduced in Rails via ActiveSupport,
but it's nice to see them introduced into Ruby.

{% highlight ruby %}
list = ['b', 'c']  #=> ['b', 'c']
list.prepend('a')  #=> ['a', 'b', 'c']
list.append('d')   #=> ['a', 'b', 'c', 'd']
list               #=> ['a', 'b', 'c', 'd']
{% endhighlight %}

## Hash methods

`#slice` and `#transform_keys` have been added,
which are also originally from ActiveSupport.

{% highlight ruby %}
h = { a: 1, b: 2, c: 3, d: 4 }

h.slice(:a, :b)
#=> { a: 1, b: 2 }

h.transform_keys(&:to_s)
#=> {"a"=>1, "b"=>2, "c"=>3, "d"=>4}
{% endhighlight %}

## Goodbye, `ubygems.rb`!

This change will have zero impact on how you use Ruby,
but I was curious why we had an `ubygems.rb` file in stdlib,
so I wanted to mention it now that it's been removed.

Ruby has a `-r` flag that lets you require a library,
e.g. `ruby -rmath` to `require 'math'`.
The rubygems file was named `ubygems.rb`
so that the flag could be used as
`-rubygems` instead of `-rrubygems`.
This file hasn't been needed since Ruby 1.9,
and has now been removed from stdlib.

## Links

- [NEWS for Ruby 2.5.0](https://github.com/ruby/ruby/blob/trunk/doc/NEWS-2.5.0).
- [Ruby trunk docs](https://docs.ruby-lang.org/en/trunk/index.html)

{% include rubynew.html %}
