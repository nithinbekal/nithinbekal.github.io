---
layout: post
title: "How to use Ruby instead of sed and awk"
date:  2015-02-12 20:47:51
categories:
  - awk
  - ruby
  - sed
---

Many unix utilities like sed, awk and grep
provide powerful ways to manipulate text.
But I always need to dig through the man pages and tutorials
before I can do anything with them.

This morning, I needed to remove all the empty lines from a text file.
Searching for ways to do this using unix tools turned up a few options:

{% highlight bash %}
awk 'NF' input.txt
sed -i '/^$/d' input.txt
grep -v '^$' input.txt
{% endhighlight %}

Remembering how to use these tools is always a challenge,
so I decided to look at how to do this in Ruby.
Ruby allows us to pass one-liner scripts from the command line,
which lets us use it in the same way we would use awk.

Before we try replacing sed or awk with Ruby,
let's look at how we can run
simple Ruby one-liners from the command line.
For example:

{% highlight bash %}
$ ruby -e 'puts 42'
42
{% endhighlight %}

Running this prints "42" to the console,
as you might have guessed.
The `-e` flag tells Ruby to read the script
from the command line,
and therefore executes `puts 42`.

Next, let's look that the `-n` flag
which lets you pipe in text to Ruby,
and execute some code for each line of text.

{% highlight bash %}
$ echo 'foo' | ruby -n -e 'puts $_.upcase'
FOO
{% endhighlight %}

`$_` is a special variable that contains the last line read from STDIN.
In this case, it prints out 'FOO'.
This also works with multiple lines of input.
Say we have a file foo.txt
with the words foo, bar and baz on each line:

{% highlight bash %}
$ touch foo.txt
$ echo 'foo' >> foo.txt
$ echo 'bar' >> foo.txt
$ echo 'baz' >> foo.txt

$ cat foo.txt
foo
bar
baz
{% endhighlight %}

And we want to print them in uppercase.

{% highlight bash %}
$ cat foo.txt | ruby -n -e 'puts $_.upcase'
FOO
BAR
BAZ
{% endhighlight %}

Here, the `-n` flag takes each line being piped in,
and puts it in `$_`.
This is the equivalent of doing this:

{% highlight ruby %}
while gets
  puts $_.upcase
end
{% endhighlight %}

There are other interesting things we could do with this.
We could use `BEGIN` and `END` blocks to sort the lines in a file.

{% highlight bash %}
$ cat foo.txt | ruby -ne 'BEGIN{ $x=[]}; $x << $_.chomp; END { puts $x.sort }'
bar
baz
foo
{% endhighlight %}

The `BEGIN` block is executed before it starts processing the lines,
so we initialize a global variable to contain the lines.
The `$x << $_.chomp` line adds each line to the array.
The `END` block is executed after all lines have been processed.

Now, let's look at the `-a` flag
that splits the input and stores it in
a variable `$F`.
If we put the following text in a file:

{% highlight bash %}
$ touch matz.txt
$ echo 'matz:ruby' >> matz.txt
$ echo 'guido:python' >> matz.txt
$ echo 'brendan:js' >> matz.txt
$ echo 'jose:elixir' >> matz.txt

$ cat matz.txt
matz:ruby
guido:python
brendan:js
jose:elixir
{% endhighlight %}

and we need to extract the programming language names,
we could do it like this:

{% highlight bash %}
$ cat matz.txt | ruby -a -F: -ne 'puts $F[1]'
ruby
python
js
elixir
{% endhighlight %}

That finally brings me to the original problem
that I was trying to solve -
remove empty lines from a text file:

{% highlight bash %}
$ touch empty_lines.txt
$ echo 'lorem ipsum' >> empty_lines.txt
$ echo ''            >> empty_lines.txt
$ echo 'lorem ipsum' >> empty_lines.txt
$ echo ''            >> empty_lines.txt
$ echo 'lorem ipsum' >> empty_lines.txt
$ echo ''            >> empty_lines.txt
$ echo 'lorem ipsum' >> empty_lines.txt

$ cat empty_lines.txt
lorem ipsum

lorem ipsum

lorem ipsum

lorem ipsum
{% endhighlight %}

And now, all we need to do to remove those empty lines is:

{% highlight bash %}
$ cat empty_lines.txt | ruby -ne 'puts $_ unless $_.chomp.empty?'
lorem ipsum
lorem ipsum
lorem ipsum
lorem ipsum
{% endhighlight %}

And if we wanted to write it to a file,
we can just pipe the output.

{% highlight bash %}
$ cat empty_lines.txt | ruby -ne 'puts $_ unless $_.chomp.empty?' >> out.txt
{% endhighlight %}

Although special purpose tools like awk are very powerful,
we can still use Ruby
as a unix utility if we want to.

# Links

* [Awk-ward Ruby](http://tomayko.com/writings/awkward-ruby) (an excellent essay by Ryan Tomayko about Ruby's awk-like features)
* [Text processing one-liners: Ruby vs. Awk](http://benoithamelin.tumblr.com/post/10945200630/text-processing-1liners-ruby-vs-awk)

