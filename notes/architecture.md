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
* Minimize libs and frameworks usage

Extensibility

- Make things extensible is to solve problems
  that we really need to solve today
- Make things usable first. Reusability comes later.

**[Design stamina hypothesis](https://www.martinfowler.com/bliki/DesignStaminaHypothesis.html)**

Proposed by Martin Fowler.
Design has lower payoff early in the lifecycle,
but there is an inflection point at which design starts paying off.
Before that point, design costs money - after, it saves.

### Notes: [Design Principles and Design Patterns](https://fi.ort.edu.uy/innovaportal/file/2032/1/design_principles.pdf) (Robert C Martin)

Architecture at different levels:

- architecture patterns that define
  the overall shape and structure of software applications
- architecture that is specifically related
  to the purpose of the software application
- architecture of the modules and their interconnections
  -> main focus of the paper

**Symptoms of rotting design**

- **Rigidity**:
  tendency for software to be difficult to change,
  even in simple ways
- **Fragility**:
  tendency of the software to break in many places every time it is changed
- **Immobility**:
  inability to reuse software from other projects
  or from parts of the same project
- **Viscosity**:
  - _Viscosity of design_:
  design preserving methods are harder to employ than hacks.
  - _Viscosity of environment_: dev environment is slow and inefficient.
  e.g. slow compile times, long CI cycle.

Causes:

- change in requirements that were not anticipated in the initial design.
- changes that introduce new and unplanned for _dependencies_.
- changes that need to be made quickly,
  by developers unfamiliar with the original design philosophy.

Solution

- Make code resilient to change
- Create dependency firewalls

Redesigning the software is the wrong approach here,
because the old design continues to evolve and change,
and the new design must keep up.

**Principles of Object Oriented Class Design**

- **Open Closed Principle**
  - we want to be able to change what the modules do,
    without changing the source code of the modules.
- **Liskov Substitution Principle**
  - LSP can be restated in terms of design by contract:
    - A derived class is substitutable for its base class if:
      - Its preconditions are no stronger than the base class method.
      - Its postconditions are no weaker than the base class method.
    - _Derived methods should expect no more and provide no less._
  - Example of Liskov violation:
    Circles are a type of ellipse,
    but have a single focus.
    If a `Ellipse#set_foci(a, b)` method exists,
    `Circle` should also implement it, but would need to ignore one of the args.
    This is a violation of the contract,
    because `circle.focus_b` would return `a`, because `b` was ignored.
- **Dependency Inversion Principle**
  - depending upon interfaces or abstract functions and classes,
    rather than upon concrete functions and classes
  - Every dependency in the design should target an interface, or an abstract class.
    No dependency should target a concrete class.
  - However, if you have tried and true modules
    that are concrete, but not volatile,
    depending upon them is not so bad
- **Interface Segregation Principle**
  - If you have a class that has several clients,
    rather than loading the class with all the methods that the clients need,
    create specific interfaces for each client
    and multiply inherit them into the class.

**Principles of Package Architecture**

_Package Cohesion Principles:_

- **Release Reuse Equivalency Principle**:
  _The granule of reuse is the granule of release._
  - A reusable element (component, class, or a cluster of classes)
    cannot be reused unless it is managed by a release system of some kind.
  - Group reusable classes into packages
  - Makes life easy for reusers
- **Common Closure Principle**:
  _Classes that change together, belong together._
  - Minimize the number of packages that change
    in any given release cycle of a product.
  - Group together classes that are likely to change together
  - Makes life easier for maintainers
- **Common Reuse Principle**:
  _Classes that aren’t reused together should not be grouped together._
  - A new package release requires the effort
    of revalidating the changes before upgrade,
    even if nothing of interest changed.
  - Makes life easy for reusers

The above 3 principles are mutually exclusive -
they can't be simultaneously satisfied.

_Package coupling principles:_

These principles govern the interrelationships between packages.

- **Acyclic Dependencies Principle**:
  _The dependencies betwen packages must not form cycles._
  - Transitive dependencies between modules
    can cause every module to depend upon every other module.
- **Stable Dependencies Principle**:
  _Depend in the direction of stability._
  - Stability is related to the amount of work required to make a change.
  - _Stability metrics:_
    - _Afferent Coupling (Ca)_:
      The number of classes outside the package
      that depend upon classes inside the package.
      (i.e. incomming dependencies)
    - _Efferent Coupling:_
      The number of classes outside the package
      that classes inside the package depend upon.
      (i.e. outgoing dependencies)
    - _Instability (I)_: `Ce/(Ca+ce)`
      - has a range of 0 to 1.
  - If there are no outgoing dependencies,
    then `I = 0` and the package is stable.
  - If there are no incomming dependencies
    then `I = 1` and the package is instable.
  - _Depend upon packages whose `I` metric is lower than yours._
  - This principle is a restatement of Dependency Inversion Principle.
  - It states the packages that are the most depended upon (i.e. stable)
    should also be the most abstract.
- **Stable Abstractions Principle**:
  _Stable packages should be abstract packages._
  - _Abstractness metrics_:
    - Abstractness `A = Na/Nc`
      - Na - # of classes in package
      - Nc - # of abstract classes in package
    - `I` should increase as `A` decreases
    - A position on the line (in the I vs A graph below) means that
      the package is abstract in proportion to its incomming dependencies
      and is concrete in proportion to its outgoing dependencies.
  - _Distance metrics_:
    - How far is a package from the main sequence?
    - Distance, `D = |A + I - 1| / √2`
    - Normalized distance `D′ = | A + I – 1 |`

```
 1|\
  | \
  |  \
↑ |   \
A |    \
  |     \
  |      \
  |_______\_
 0  I →    1
```

**Patterns of Object Oriented Architecture**

- Abstract server
  - When a client depends directly on a server, the DIP is violated.
    Changes to the server will propogate to the client,
    and the client will be unable to easily use similar servers.
  - An abstract interface between the client and server solves this problem.
  - It becomes a "hinge point" upon which the design can flex.
  - Different server implementations can be bound
    to an unsuspecting client.
- Adapter
  - inserting an abstract interface is infeasible
    when the server is third party software,
    or is so heavily depended upon that it cannot easily be changed
  - An adapter can be used to bind the abstract interface to the server
  - It is n object that implements the abstract interface
    to delegate to the server
  - Every method of the adpater simply translates and then delegates
- Observer
  - Used when one element needs to take action
    when another element detects something,
    and we don't want the detector to know about the actor.
  - Example:
    A `Sensor` derives from `Subject`,
    and `Meter` derives from an `Observer` interface.
    `Meter` uses `Subject#register` to register itself
    to `Sensor`'s list of observers.
    When reading changes, `Sensor` calls `Subject#notify`,
    which calls `#update` on each registered `Observer`.
- Bridge
  - Creates a strong seperation between the interface and implementation
- Abstract factory
  - allows that dependency upon the concrete class to exist in a single place.

### References

- [Design Principles and Design Patterns](https://fi.ort.edu.uy/innovaportal/file/2032/1/design_principles.pdf):
  paper by Robert Martin
