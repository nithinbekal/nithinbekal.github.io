---
layout: page
title: 'My Wiki'
date:   2014-06-07 12:00:00
---

Quick links:

- [Object Oriented Design](/notes/object-oriented-design/)
- [Code reviews](/notes/code-reviews/)
- [SOLID principles](/notes/solid/)
- [Testing](/notes/testing/)
- [Design Patterns](/notes/design-patterns/)
- [Programming Languages](/notes/lang/)
- [Ruby](/notes/ruby/)
- [Elixir](/notes/elixir/)
- [Vim](/notes/vim/)

## Complete listing of notes

{% assign notes = site.pages | sort: "title" %}

<ul>
  {% for note in notes %}
    {% if note.url contains "/notes/" %}
      <li><a href="{{ note.url }}">{{ note.title }}</a></li>
    {% endif %}
  {% endfor %}
</ul>
