---
layout: page
title: "Builder Pattern"
date:  2016-04-08 19:08:55
---

Builder pattern allows the instantiation of a complex object
in a step by step manner.
For example, in Ruby, we could do this:

{% highlight ruby %}
class Person
  attr_accessor :first_name, last_name, :age

  def initialize(&blk)
    instance_eval(&blk) if block_given?
  end
end

person = Person.new do
  self.first_name = 'Nithin'
  self.last_name = 'Bekal'
  self.age = 27
end
{% endhighlight %}

Real world use of builder pattern - Builder::XMLMarkup

Links

- [Builder Pattern in Ruby](http://blog.rubygeek.com/2009/11/24/builder-pattern-in-ruby/)
