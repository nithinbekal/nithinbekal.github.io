---
layout: page
title: "Coupling"
date:  2017-01-14 20:25:41
---

__Two or more things are 'coupled' if changes in on affects any of the others.__

*Orthogonality* is the word used to describe decoupling or independence.

Advantages of Orthogonality

* Isolation: bad design can be fixed before it spreads to other parts of the system.
* Less fragile: problems caused by a change are restricted to a particular area
* Better tested: isolated components are easier to test.
* Avoid lock in: interfaces to 3rd party interfaces will be isolated, thereby avoiding lock in.

How to maintain orthogonality

* Decoupled code: modules shouldn't reveal anything unnecessary to other modules. They should also not rely on other modules' implementation.
* Avoid global data
* Avoid similar functions

Links

- [Reducing Coupling](https://martinfowler.com/ieeeSoftware/coupling.pdf) -
  Martin Fowler [PDF]
