---
layout: page
title: "DCI: Data, Context and Interaction"
date:  2019-07-06 18:08:20
---

DCI stands for Data, Context and Interaction, and is a programming paradigm that works similarly to OOP, and is easy to implement in languages like Ruby.

An example I came across in
[this article](http://andrzejonsoftware.blogspot.com/2011/02/dci-and-rails.html),
explains how we can use mixins
to implement DCI in Rails:

```ruby
user.extend(Buyer)
user.add_to_cart(product_id, quantity)
```

Here, `User` contains little or no behavior and is only responsible for data.
A Rails controller can act at the context,
is responsible for injecting the **use case** or role into the object.
