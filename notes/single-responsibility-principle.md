---
layout: page
title: "Single Responsibility Principle"
date:  2015-07-19 22:17:50
---

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

**Some quick notes based on
[Uncle Bob's talk on SRP](https://vimeo.com/43592685)**:

Things that change for the same reasons
should be grouped together.
e.g. If our software generates a report,
and the view contains SQL queries,
changes to the view could be initiated by
the DBA or the person using that report.

**Responsibilities** should map with
the person initiating the change to the module.

Isolate code such that
changes requested by people
who request one kind of change
doesn't impact code that affects
people who request
a different kind of change.
Eg. Changes requested by an accountant
should not impact modules
that would be affected by
changes required by a clerk
who uses the generated reports.

