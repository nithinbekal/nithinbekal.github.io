---
layout: post
title: "Demystifying @tenderlove's homeopathic code optimizations"
date:  2015-06-06 23:00:00
categories: ruby
---

At the [Keep Ruby Weird](http://keeprubyweird.com) conference,
Aaron patterson, aka [@tenderlove](http://twitter.com/tenderlove),
gave a hilarious keynote talk
where he mentioned
[homeopathic code optimizations](https://youtu.be/9N31ay425GI?t=1983).
If you haven't watched it yet,
[go watch it now](https://www.youtube.com/watch?v=9N31ay425GI).

For those that haven't watched the video,
here's the idea:
he talks about a program `dilute.rb`,
that takes another ruby program and "dilutes" it
by replacing characters with whitespace.

So if this is the original program:

{% highlight ruby %}
# fib.rb
def fib n
  if n < 3
    1
  else
    fib(n-1) + fib(n-2)
  end
end

p fib(34)
{% endhighlight %}

...we run `dilute.rb` on it:

{% highlight bash %}
$ D=40 ./dilute.rb fib.rb
{% endhighlight %}

...it "dilutes" the program
by randomly replacing
40% of the characters with whitespace
(the `D=40` env variable sets the percentage),
so you might see something like this:

{% highlight ruby %}
d   fib n
  if     3
    1
  else
    fib n  ) + fi (n-2
  end


p fib(3
{% endhighlight %}

But when you pipe the output to ruby like this:

{% highlight bash %}
#! /usr/bin/env ruby
$ D=40 ruby dilute.rb fib.rb | ruby
5702887
{% endhighlight %}

...it "remembers" the original program
and works perfectly.
WHAT?
What kind of black magic is this?
Aaron doesn't tell us.

I never figured it out myself,
but recently, I came across
[this gist by @radarek](https://gist.github.com/radarek/011f4bb39f9f35952274)
that finally shed some light
on the magic behind this:

{% highlight ruby %}
#! /usr/bin/env ruby
probability = $stdout.tty? ? (ENV["D"] || 10).to_i : 0
puts ARGF.read.chars.map { |c| rand(100) + 1 <= probability && c !~ /\s/ ? " " : c }.join
{% endhighlight %}

The important part here
is the `$stdout.tty?` method call.
This uses the `IO#tty?` method
to determine if the output is a terminal
or a program.
It "dilutes" the text
only if the output is a terminal.
When we pipe the output to ruby,
it detects that the output isn't a terminal
so it pipes the original text from `fib.rb`.

The more time I've spent
trying to understand Ruby,
the less magic it seems to have.
So it's nice to come across something
that left me completely baffled
and left me thinking,
"how could that even work?".

This was a perfect code demo
for a conference called "Keep Ruby Weird".
That we have a conference with that name
is what makes the Ruby community so much fun. ;)

Stay weird, and happy hacking!

