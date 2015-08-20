---
layout: page
title: "Haskell"
date:  2015-08-19  1:03:31
---

Example code:

{% highlight haskell %}
add a b = a + b

main = do
  print(add 1 3)

> :type add
add :: Num a => a -> a -> a
{% endhighlight %}

Lists

{% highlight haskell %}
[1, 4..10] -- [1, 4, 7]

let list = [1..10]
head list  -- 1
tail list  -- [2, 3, 4, ... 10]
filter even list  -- [2, 4, 6, 8, 10]
{% endhighlight %}

Tuples

{% highlight haskell %}
names = ("a" "b")
fst names  -- "a"
snd names  -- "b"
{% endhighlight %}

Expressions

{% highlight haskell %}
canIVote age = do
  let msg = if age > 17
            then "please vote"
            else "not yet"
  print(msg)
{% endhighlight %}

Currying

{% highlight haskell %}
add a b = a + b
-- add :: Num => a -> a -> a
{% endhighlight %}

Lazy evaluation

{% highlight haskell %}
-- Create infinite list and take 10 from it
numbers = 1 : map (+1) numbers
take 10 numbers
{% endhighlight %}

