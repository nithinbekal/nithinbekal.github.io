---
layout: page
title: "Software Architecture"
date:  2015-08-19  0:17:25
---

Architecture is a high level design of the system
with interconnectivity of the components
that make the system.

* [Venkat Subramaniam - Towards an Evolutionary Architecture](https://vimeo.com/97537675)

* Architecture involves making
  strategic desicions, not tactical ones
* strategic decisions set us on a certain path
* eg. libs, frameworks, DBs.

We make architectural decisions at the start of projects
when we know the least about what we're building.
Our understanding of the reqs can only increase after that point.

Prioritize features based on value provided and architectural significance.

* [Who Needs an architect - Martin Fowler](http://martinfowler.com/ieeeSoftware/whoNeedsArchitect.pdf)

How do we deal with architecture?

* Keep it simple
  - recognize what we're really solving
  - get to the core of the problem
* Refactor aggressively
  - "Make it work, make it better real soon"
  - "Build the software and throw it away,
    now you have a way to build the real software" - Fred Brooks
* Reversibility
  - Think about how you can back out of a decision
  - eg. language choice is really hard to reverse
* Postpone decisions until the last responsible moment
  - can you make your app DB agnostic?
  - The last responsible moment for choice of DB
    is just before deployment
* Follow YAGNI

Extensibility

- Make things extensible is to solve problems
  that we really need to solve today
- Make things usable first. Reusability comes later.

Minimize libs and frameworks usage

