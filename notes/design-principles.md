---
layout: page
title: "Software design principles"
date:  2015-08-18 23:20:17
---

* Provides vocabulary for communicating intent
* Help build better quality software

* [Venkat Subramaniam - Core Software Design Principles](https://vimeo.com/97541185)

## DRY

"Every piece of knowledge in a system must have
a single authoritative, aunambiguous representation."

* Don't repeat yourself
* First introduced in Pragmatic Programmer book

## YAGNI

* You Ain't Gonna Need It (yet)
* Postpone decisions until you understand the problem better


## Single responsibility principle

* "Every piece of code must have a single purpose to exist"
* Encourages higher cohesion
* Only keep things together if they really belong together
* Don't put multiple classes in a single file
* Long methods are bad because
  - hard to read
  - hard to test
  - hard to reuse
  - leads to duplication
  - hard to maintain
  - tight coupling

### Single level of abstraction (SLAP) principle

* Each method should have a single level of abstraction
* aka. Compose method pattern

## Tell, Don't Ask

* Tell your code to do something,
  don't ask it for internal state
* Avoid low level details

## Open closed principle

* A software mmodule must be open for extension, closed for modification
* Proposed by Bertrand Meyer

## Liskov Substitution Principle

* Use inheritance only if you mean substitutability
* External behavior of subclass must be compatible
  with that of parent class

## Dependency Inversion

* Depend on abstractions rather than details
* High level modules shouldn't depend on low level modules -
  both should depend on abstractions

