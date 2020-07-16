---
layout: page
title: "Object Oriented Design"
date:  2018-06-14 22:47:15
---

**[SOLID Principles](/notes/solid/)**

- **Single responsibility principle**:
  - there should never be more than one reason for a class to change
- **Open closed principle**:
  - a module should be open for extension and closed for modification
- **Liskov substitution principle**:
  - subclasses should be substitutable for their base classes
- **Interface segregation principle**:
  - many client specific interfaces are better than one general purpose interface
- **Dependency inversion principle**:
  - Depend upon abstractions, not concretions

**Questions to ask about a piece of code**
(mentioned in Sandi Metz'
[SOLID Design](https://www.youtube.com/watch?v=v-2yFMzxqwU)
talk.)

- Is it DRY?
- Does it have one responsibility?
- Does everything in it change at the same rate?
- Does it depend on things that change less often that it does?

**Some ideas on tests
from Sandi Metz'
[SOLID Design](https://www.youtube.com/watch?v=v-2yFMzxqwU)
talk:**

- Only mock classes you own
- Don't mock/stub object under test
- If tests are hard to write, it indicates a problem with design
- TDD will punish you if you don't understand design

**Desirable characteristics of object-oriented code**,
described in Growing Object Oriented Software, Guided by Tests,
a book by Steve Freeman and Nat Pryce:

- Loosely coupled
- Highly cohesive
- Easily composable
- Context independent

**Symptoms of rotting design**

(Described in Roebrt Martin's paper,
[Design Principles and Design Patterns](https://fi.ort.edu.uy/innovaportal/file/2032/1/design_principles.pdf))

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

**[Venkat Subramaniam - Core Software Design Principles](https://vimeo.com/97541185)**
(video)

- Provides vocabulary for communicating intent
- Help build better quality software

**Object calisthenics**

This is a programming exercise suggested by Jeff Bay,
in the book Thoughtworks Anthology.
In it, he suggests following 9 "rules of thumb"
that push you towards better object oriented programming.

1. One level of indentation per method
2. Don't use `else`
3. Wrap all primitives and strings
4. First class collections
5. One dot per line
6. Don't abbreviate
7. Keep all entities small
8. No classes with > 2 instance variables
9. No getters, setters, properties

### Links

- [The Principles of OOD](http://butunclebob.com/ArticleS.UncleBob.PrinciplesOfOod)
  on Robert C Martin's blog.
