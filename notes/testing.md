---
layout: page
title: "Testing"
---

# TDD

Bob Martin defines test driven development as comprised of 3 rules:

* You are not allowed to write any prod code
  without writing a failing unit test.
  (Not compiling counts as failing.)
* You're not allowed to write more of a unit test
  than is sufficient to fail.
  As soon as the test fails (or fails to compile),
  you must start writing prod code
* You are not allowed to write more prod code
  than is sufficient to pass the currently failing test.

In TDD you start with code that is very specific,
and then as you add more tests,
the code becomes more and more general.
This is because with every new test,
the test suite becomes more and more constrained.

[Robert C. Martin - Advanced TDD: The Transformation Priority Premise](https://vimeo.com/97516288)

Unit testing helps us by

1. Preventing regression
1. Helps with design

[Venkat Subramaniam: Succeeding with TDD: Pragmatic Techniques for effective mocking](https://vimeo.com/68383352)

* Hard to test indicates poor design

* Mocks - can stand in for other objects
* Stubs represent state, while mock represents behavior.

* Canary test - checks if the test env is setup
* eg. assert 1 == 1

# Links

* [Getting Testy](http://randycoulman.com//blog/2015/08/04/getting-testy-redux/) -
  a series of articles on unit testing
