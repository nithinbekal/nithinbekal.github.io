---
title: "Law of Demeter"
layout: page
---

Any method of an object should only call methods on:

- itself
- any params that were passed into the method
- any objects it created
- any composite objects

Also known as Principle of Least Knowledge.

> Each unit should have only limited knowledge about other units: only units "closely" related to the current unit. Or: Each unit should only talk to its friends; Don't talk to strangers. [>](http://www.ccs.neu.edu/research/demeter/demeter-method/LawOfDemeter/general-formulation.html)

## Advantages

- results in loosely coupled code
- classes are isolated from distant classes
- makes code more maintainable

## References

- [The Paperboy, the Wallet and the Law of Demeter](http://www.ccs.neu.edu/research/demeter/demeter-method/LawOfDemeter/paper-boy/demeter.pdf) [PDF]
- [Practical Object Oriented Design in Ruby: Interfaces](http://www.informit.com/articles/article.aspx?p=1834700&seqNum=6), by Sandi Metz
