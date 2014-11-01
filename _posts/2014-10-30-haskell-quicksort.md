---
layout: post
title: "Haskell Quicksort"
date:  2014-10-30 23:46:41
categories: haskell, functional-programming
---

After three days of conversations about functional programming at Functional Conf in Bangalore this month, I wanted to give functional languages a closer look, so I signed up for [Eric Meijer's FP101 course on edX](https://courses.edx.org/courses/DelftX/FP101x/3T2014/info). Two weeks into the course, Haskell is looking quite interesting.

One thing people often mention is that functional code is easier to reason about. This is what a quick sort function looks like in Haskell:

{% highlight haskell %}
quicksort [] = []
quicksort (x:xs) = quicksort lesser ++ [x] ++ quicksort greater
  where
    lesser =  [ y | y <- xs, y < x  ]
    greater = [ y | y <- xs, y >= x ]
{% endhighlight %}

That does look a bit cryptic at first glance. For someone who is unfamiliar with Haskell, that seems a bit harder to understand than the equivalent imperative code.

But when you take a moment to think about, it starts to make sense. You start with the first element, and create a new list with that element between two sorted lists. All the lesser elements come to the left and the greater ones to the right. Now to get those two sorted lists, you need to apply the same rule recursively to them, until the reduced list is empty, in which case you return an empty list.

Haskell, and other functional languages are primarily about what needs to be done, rather than how. Coming from imperative languages, this is something that trips me up all the time.

After using Ruby as my primary language for so long, I've become slightly biased in favor of languages with syntactic sugar. This was a good reminder that there are other ways to get to readable syntax.

