---
layout: post
title: "Getting Started With Io"
date:  2014-10-25 23:50:43
categories: io
---

Io is a prototype-based langauge that has been around since 2002. What stood out to me about it is that it has a great deal of flexibility despite its remarkably simple syntax.

The easiest way to get started with Io is to play around with it on the REPL. Download the binary for your OS from [iolanguage.org](iolanguage.org) (you can do `brew install io` on OSX) and start the repl with the `io` command.

In the interest of following the traditions of programming language tutorials, let me start off with the Hello World example:

{% highlight io %}
"Hello, world!" println
{% endhighlight %}

# Prototype and objects

Io is a prototype-based language, so it doesn't have classes. Instead, you get prototypes, which are objects that you can clone to create new instances of objects. As a result, prototypes can fill the role of both classes and objects. Let's see how this works.

`Object` is the parent of all prototypes. You can create your own `Dog` prototype by cloning `Object`.

{% highlight io %}
Dog := Object clone
{% endhighlight %}

Objects in Io are made up of key-value pairs called "slots". We can access the list of slots for an object using `slotNames`. We can also find the type of a prototype using the `type` method. Let's see how we can set a slot called "description" for the dog.

{% highlight io %}
Dog description := "Man's best friend"
#==> Man's best friend

Dog slotNames
#==> list(type, description)

Dog type
#==> Dog
{% endhighlight %}

Because the name of the prototype here starts with an uppercase character, this `Dog` prototype acts in a similar way to classes in class-based languages. When you clone a prototype, Io sets the `type` slot if it starts with an uppercase character.

# Creating instances

If `Dog` is equivalent to classes in class-based languages, how do we create instances? Let's clone `Dog` to create an instance of it.

{% highlight io %}
dog := Dog clone

dog type
#==> Dog

dog slotNames
#==> list()

dog description
#==> An animal
{% endhighlight %}

From the above snippet, you can see that when you create an instance of `Dog`, the type is `Dog` - the name of the prototype from which it was created. You can also see that no slots are set on the object, but you can still access the description slot you set on `Dog`.

If a slot is not found on the object, it looks for the slot in the parent object, and keeps checking until it gets to `Object`. Let's try setting a new slot on the dog object.

{% highlight io %}
dog name := "Rover"
#==> Rover

dog description = "A dog named Rover"
#==> A dog named Rover

dog slotNames
#==> list(type, description)
{% endhighlight %}

You might have noticed in the above code that I'm using two different types of assignment operrators. The `:=` operator is used to set a new slot, whereas the `=` operator updates an existing slot. Once these slots have been set, you can see that they are present by passing the `slotNames` message to `dog`.

# Methods

Let's look at how you can define a method. Here we're defining a `greet` method on the `Dog` prototype.

{% highlight io %}
Dog greet := method(
  "Woof! My name is #{name}." interpolate println
)
{% endhighlight %}

If you want to define a method that accepts arguments, you can define it like this:

{% highlight io %}
sum_of_squares := method(a, b,
  a*a + b*b
)
{% endhighlight %}

# Lists

The way lists work in Io is pretty neat. Let's look at what we can do with a list of numbers:

{% highlight io %}
numbers := list(2, 1, 4, 3)
numbers sort                #==> list(1, 2, 3, 4)
numbers sum                 #==> 10
numbers average             #==> 2.5
numbers map(* 10)           #==> list(20, 10, 40, 30)
numbers select(x, x%2 == 0) #==> list(2, 4)
{% endhighlight %}

# Control flow structures

Let's take a quick tour of the control flow structures that are available in Io.

{% highlight io %}
# simple if else condition has the following structure
# if(<condition>, <then do this>, <else do this>)
if(answer == 42, "correct", "wrong")

# Smalltalk style conditions are also available
(answer == 42) ifTrue("correct") ifFalse("wrong")

# While loops
a := 1
while(a <= 5,
  a println
  a = a+1
)

# For loops
for(a, 1, 5,
  a println
)
{% endhighlight %}

# Final thoughts

I have only looked at the basic features of the language here. So far, I've been really impressed with how much flexibility it offers despite the simplicity of the syntax and the object model.

One big problem with Io is how hard it is to Google for it, so finding online resources for it is pretty hard. I came across the language in Bruce Tate's excellent Seven Languages in Seven Weeks book, but after the book, I've found very little stuff online except for the guide and docs on the language website.

Io has some interesting concurrency features, but I haven't explored it much yet. Hopefully that will turn into another post here. In the meanwhile, you can read more about Io by following the links below.

# Further reading

* [Io Programming Guide](http://iolanguage.org/scm/io/docs/IoGuide.html)
* [Blame it on Io! A slow-paced introduction to the Io language](http://ozone.wordpress.com/2006/03/15/blame-it-on-io/)
* [Little manual of cloning for Io programmers](http://ozone.wordpress.com/2006/03/20/little-manual-of-cloning-for-io-programmers/)
