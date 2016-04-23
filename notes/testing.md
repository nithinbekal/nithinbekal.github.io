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

# Notes from TDD: By Example (Kent Beck)

Rules for TDD:

- Write new code only if an automated test has failed
- Eliminate duplication

Red-Green-Refactor

- Red: Write a failing test (might not even compile)
- Green: Make the test work
- Refactor: Eliminate all the duplication

TDD cycle:

- Quickly add a test
- Run all tests and see one fail
- make a little change
- run all tests and see them all succeed
- refactor to remove duplication

Strategies for getting from Red to Green:

- Fake It: Return a constant and gradually replace constants with variables
  until you have the real code
- Use Obvious Implementation: Type in the real implementation
- Triangulation: Only generalize code when a new test example demands a more
  generalized solution
  - useful when there isn't an immediate path for refactoring
  - add examples that change different axes of variability to make the solution
    clearer

When you have an objection to the design of the code

- translate that objection into a failing test
- get the code to compile with a stub implementation
- make the test work by typing in what seems like the right code

The red-green-refactor cycle can help you when you aren't sure about the design
- use shorter steps when you aren't confident about the overall design, and
longer ones when you know where you're going.

Three steps in a test:

- Arrange: create some objects
- Act: stimulate them
- Assert: check the results

Test coupling

- for performance, it might make sense to couple some tests - we could keep the
  Arrange stage constant, and vary the Act and Assert stages
- makes order of tests important, so changing the order could fail tests,
  or they could pass despite the code being incorrect

