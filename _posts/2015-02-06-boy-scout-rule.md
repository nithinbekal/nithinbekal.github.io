---
layout: post
title: "The Boy Scout Rule"
date:  2015-02-06 21:21:53
categories: refactoring
---

The boy scouts have a rule -
"Always leave the campground cleaner than you found it."
Uncle Bob Martin proposed
[the programming equivalent of the rule](http://programmer.97things.oreilly.com/wiki/index.php/The_Boy_Scout_Rule):

> Always check a module in cleaner than when you checked it out.

This piece of advice is especially relevant
in cases where fixing a mess in one go is very difficult.

Some time ago,
I was in a situation where
we had to drastically change the functionality of the app
just a few days before launch.
We weren't too comfortable with TDD,
so we decided to give up on tests
and just get the thing out the door first.
We didn't even bother with keeping existing tests green.

When we shipped the project,
a huge chunk of the test suite was failing,
and we couldn't tell how many of them were because of actual bugs.
Luckily there weren't any serious bugs,
but we found ourseleves
maintaining a horribly broken test suite.

Fixing the entire mess at once seemed scary,
so we started following the Boy Scout rule to clean things up gradually.
This meant following two simple guidelines:

* Always make sure all the tests pass
  for the part of the codebase you're working on.
* When you add new code,
  make sure the tests pass
  for all the existing methods it touches.

Within a month, we were down to a handful of failing tests.
These were of the harder-to-fix variety,
but suddenly the task started looking manageable.
After wrestling with these tests
for a couple of days,
we finally got to 100% passing test suite.

We still didn't have very good test coverage,
but the codebase got more and more
maintainable as time went on.
We have continued following the rule
and kept improving the tests for anything we touched.

No matter how much we try,
codebases always get worse with time
if we aren't actively working against the rot.
Following the Boy Scout Rule is a great way
for teams to do this.

