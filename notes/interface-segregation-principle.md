---
layout: page
title: "Interface Segregation Principle"
date:  2018-06-14 23:26:42
---

**_Many client specific interfaces are better than
one general purpose interface._**

- relevant to statically typed languages,
  where you depend on instance of a class and their interface
- make interfaces are smaller so you don't need to recompile the whole system

This does not apply to dynamic languages like Ruby,
where there is no explicit interface,
and the only requirement is that the object respond to the given method.
