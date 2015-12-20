---
layout: post
title: "Confident Ruby (Avdi Grimm)"
date:  2015-12-20 22:30:00
categories: ruby, books, book-reviews
---

The book is about patterns for structuring your code.
Rather than high level design patterns,
it focuses on lower level code structure.
Specifically, it focuses on writing "confident" methods -
methods that aren't littered with nil-checks,
and tell a clear story about what it is doing.
The author explains 32 patterns,
grouped into the 4 main responsibilities of a method:

1. Collecting input
1. Performing work
1. Delivering output
1. Handling errors

The section on collecting input covers more than half the book, and rightly so.
This part of the book is about
catching the corner cases at the boundary of the code,
and this makes the other three stages much easier to deal with.

The patterns explained here are all things
that you can start using right away.
For instance, one of the patterns is using Kernel methods
like `Array()` or `Integer()` instead of `to_a` or `to_i`
to stricly coerce the type of input into a core type.
Another pattern is using `Hash#fetch` instead of `Hash#[]`
to avoid propagating nils through your methods.

`NoMethodError on nil` is something we've all been frustrated by,
and many of the patterns (including the two mentioned above)
help deal with such problems.
The Null Object pattern is examined in detail,
and many alternatives for handling nils are discussed.
Using these techniques will have an immediate impact
on the quality of your code.

I loved the examples used in the book.
Every one of them does an excellent job
illustrating the pattern being discussed.
Towards the end of the book,
there are a couple of examples of actual refactorings
of code from open source projects.
Walking through these refactorings really helps reinforce
the ideas spread over the book.

Although the book focuses on method construction,
there are a lot of lessons to learn here about object design.
However, this is not a book for people unfamiliar with Ruby.
If you're trying to figure out if this book is right for you,
[watch Avdi's Confident Ruby talk](https://www.youtube.com/watch?v=T8J0j2xJFgQ)
which covers many of the patterns.

This is also not a book about object oriented design.
Sandi Metz'
[Practical Object-Oriented Design in Ruby](http://amzn.to/1Odgh0u)
is a great complement to this book if that's what you're looking for.

Another one of my favorite intermediate books for Rubyists is
[Eloquent Ruby](http://amzn.to/1mcT2H4)
by Russ Olsen.
(I've [reviewed Eloquent Ruby here](/posts/review-eloquent-ruby/).)
For anyone past the Ruby basics stage,
these three are the most important Ruby books out there.
Reading them will greatly impact how you write Ruby.

**Links**

* [Confident Ruby](http://amzn.to/1mcUut7) on Amazon
* [The book's website](http://www.confidentruby.com)

