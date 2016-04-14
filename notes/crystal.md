---
layout: page
title: "Crystal Programming Language"
date:  2016-03-08 20:44:45
---

Crystal is a compiled, statically typed programming language
that has a syntax very similar to Ruby.
Crystal uses much of Ruby's syntax and the object model,
but it compiles to native code,
which makes Crystal programs run faster than Ruby ones.

The dynamically typed nature of Ruby makes it a very expressive language.
However, this expressiveness comes at the cost of performance,
making it much slower than compiled languages like Go or Java.

Crystal has static types, which helps catch a lot of errors at compile time.
Don't worry, though - you won't be writing verbose type annotations everywhere.
The Crystal compiler infers the type of your variables,
allowing you to take advantage of static typing while writing Ruby-like code.

## Running your first crystal program

Let's start off with a hello world program in Crystal.

{% highlight ruby %}
puts "Hello, world!"
{% endhighlight %}

You can run the program by using the `crystal run` command.
Crystal programs use the `.cr` file extension.

{% highlight bash %}
$ crystal run hello.cr
Hello, world!
{% endhighlight %}

If you wish to only create the crystal executable,
you can use the `crystal build` command.
This would create a compiled executable file called `hello`,
which you can then run.

{% highlight bash %}
$ crystal build hello.cr
$ ./hello
Hello, world!
{% endhighlight %}

## Creating a crystal project

{% highlight bash %}
$ crystal init lib Foo
      create  Foo/.gitignore
      create  Foo/LICENSE
      create  Foo/README.md
      create  Foo/.travis.yml
      create  Foo/shard.yml
      create  Foo/src/Foo.cr
      create  Foo/src/Foo/version.cr
      create  Foo/spec/spec_helper.cr
      create  Foo/spec/Foo_spec.cr
Initialized empty Git repository in ~/Foo/.git/
{% endhighlight %}

## Basic data types

- Number
- Boolean
- Tuple
- Boolean
- String
- Array
- Hash
- Struct

## Arrays and hashes

## Type inference

{% highlight ruby %}
a = 1    # a :: Int32
b = a    # b :: Int32

if some_condition?
  a = 1
else
  a = "Hello"
end
# a :: (Int32 | String)
{% endhighlight %}


## Methods and overloading

{% highlight ruby %}
def add(x : String, y : String)
  x.to_i + y.to_i
end

def add(x, y)
  x+y
end
{% endhighlight %}


## Generic types

{% highlight ruby %}
class Stack(T)
  def initialize
    @values = Array(T).new
  end
end
{% endhighlight %}

## Concurrency

`spawn` creates a new Fiber to execute the block.
The program continues running after creating fiber.

{% highlight ruby %}
spawn do
  # do something
end
{% endhighlight %}

Channels are a way to send messages to a fiber.

{% highlight ruby %}
ch = Channel(Int32).new
spawn do
  puts ch.receive
end

ch.send(42)
{% endhighlight %}


## Metaprogramming

{% highlight text %}
{% raw %}
macro attr_reader(*names)
  {% for name in names %}
    def {{name}}
      @{{name}}
    end
  {% end %}
end
{% endraw %}
{% endhighlight %}


## Links

- [Crystal Docs](http://crystal-lang.org/docs)
- [Type Inference (part 1)](http://crystal-lang.org/2013/09/23/type-inference-part-1.html)
- [Type Inference Rules](http://crystal-lang.org/2014/04/27/type-inference-rules.html)
- [Building a Realtime Chat Application Using Crystal and Kemal](http://serdardogruyol.com/building-a-realtime-chat-app-with-crystal-and-kemal/)
- [Crystal - Statically Typed Ruby](http://www.slideshare.net/vagmi/crystal-statically-typed-ruby) - Slides from a talk by Vagmi Mudumbai
