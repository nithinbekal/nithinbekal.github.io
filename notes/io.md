---
layout: page
title: "Io"
date:  2015-06-11 22:34:20
---

Io is a prototype based language created by Steve Dekorte in 2002.

{% highlight io %}
Animal := Object clone
Animal slotNames

Animal description := "not a plant"

Mouse := Animal clone
jerry := Mouse clone
{% endhighlight %}

Anything that starts with uppercase has a "type" slot. The jerry object doesn't have this.

{% highlight io %}
Animal type
Mouse type
mouse type

Animal slotNames
Mouse slotNames
jerry favoriteFood := "Cheese"

Mouse slotNames
jerry slotNames
{% endhighlight %}

Io calls parent object if a slot doesn't exist.

{% highlight io %}
jerry description
==> Not a plant
jerry description = "Super mouse"
{% endhighlight %}

Methods:

{% highlight io %}
Mouse hello := method("Scampers away" println)
jerry hello := method("Hello yourself" println)

jerry getSlot("hello")
==> method(...)
{% endhighlight %}

Get prototype of the object

{% highlight io %}
jerry proto
==> Mouse
Mouse proto
==> Animal
{% endhighlight %}

The master namespace is called Lobby.

Basic rules

- everything is an object
- you send messages to objects
- objects are created by cloning prototypes
- objects remember their prototype
- objects have slots (which are hashes/dicts)
- slots can contain other objects or methods
- a message returns value in a slot or invokes the method there
- if the method is not present, the object passes it to prototype

Lists

{% highlight io %}
ls := list(2, 4, 1, 3)
ls sort
ls sum
ls average
ls pop
{% endhighlight %}

Maps

{% highlight io %}
capitals = Map clone
capitals atPut("India", "New Delhi")
capitals keys
capitals values
capitals at("India")
{% endhighlight %}

Singletons

- true, false, nil are singletons
- Everything except false and nil are true

{% highlight io %}
true clone
==> true
false clone
==> false
{% endhighlight %}

We can make our own objects singletons

{% highlight io %}
Duck := Object clone
Duck clone := Duck
d1 := Duck clone
d2 := Duck clone
d1 == d2
==> true
{% endhighlight %}

Looping

{% highlight io %}
if(cond, "true", "false")
i := 1
while(i <= 5, i println; i = i+1)

for(i, 1, 5, i println)
{% endhighlight %}

Operator table

{% highlight io %}
OperatorTable
==> ...

OperatorTable addOperator("xor", 11)
true xor := method(bool, if(bool, false, true))
false xor := method(bool, if(bool, true, false))
{% endhighlight %}

## Links

* [Io Guide](http://iolanguage.org/scm/io/docs/IoGuide.html)
* [HN discussion about Io](https://news.ycombinator.com/item?id=8867575)
* [Io has a very clean mirror](http://viewsourcecode.org/why/hackety.org/2008/01/05/ioHasAVeryCleanMirror.html) (Why the Lucky Stiff)
