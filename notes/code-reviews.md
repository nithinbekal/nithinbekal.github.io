---
layout: page
title: "Code Reviews"
date:  2017-02-24 23:52:22
---


Notes from Derek Prior's talk,
[Implementing a Strong Code Review Culture](https://www.youtube.com/watch?v=PJjmw9TRB7s):

Advantages

- team has a better awareness of the code
- allows you to find alternative solutions
- finding bugs, although this aspect is usually overrated

As an author

- provide enough context about the change
- explain why you're making the commit

As a reviewer

- if you see something nice, compliment it.
- Ask questions rather than issue command
- example
  - bad: "extract service to reduce duplication"
  - good: "what do you think about extracting a service..."
- some ways to phrase the question
  - did you consider
  - what do you think
  - can you clarify...
- Bad ways to ask:
  - "why didn't you just..."
  - "just" makes people feel like they are being judged for missing something obvious

What to review

- do the object follow SRP?
- Naming
- complexity
- test coverage

- People perceive the reviewer negatively if they receive a lot of style comments
- Use a linting tool for enforcing style guides. eg. hound, pronto


## Links

- [Video] [Implementing a Strong Code Review Culture](https://www.youtube.com/watch?v=PJjmw9TRB7s)
- [Podcast] [Ruby Rogues 216 - Code Review Culture with Derek Prior](https://devchat.tv/ruby-rogues/216-rr-code-review-culture-with-derek-prior)
