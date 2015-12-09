---
layout: page
title: "dRuby"
date:  2015-12-08 22:29:26
---

dRuby is a distributed object environment for Ruby.
dRuby and Rinda are part of Ruby stdlib.

* RMI (remote method invocation) library
* extends Ruby method calls across the network
* allows calling object methods from other processes or machines
* written completely in Ruby

Rinda:

* shared tuplespace implementation.  
* co-ordination mechanism running on dRuby.
* implementation of [linda](https://en.wikipedia.org/wiki/Linda_(coordination_language))
  co-ordination language in Ruby

Rules for passing objects between client and server:

* serializable objects are passed by value
* non-serializable - by reference

### Example code

{% highlight ruby %}
# server.rb
require 'drb/drb'

queue = SizedQueue.new(100)
DRb.start_service('druby://localhost:9999', queue)
DRb.thread.join
{% endhighlight %}


{% highlight ruby %}
# publisher.rb
require 'drb/drb'

DRb.start_service
q = DRbObject.new_with_uri('druby://localhost:9999')

100.times do |n|
  sleep(rand)
  q.push(n)
end
{% endhighlight %}

{% highlight ruby %}
# consumer.rb
require 'drb/drb'

DRb.start_service
q = DRbObject.new_with_uri('druby://localhost:9999')

100.times do |n|
  sleep(rand)
  puts q.pop
end
{% endhighlight %}


### Articles

* [dRuby and Rinda: Implementation and application of distributed Ruby and its parallel coordination mechanism](http://www.druby.org/imaco_doc/ijpp_text_en.html)
* [Reflection, Object Space and Distributed Ruby](http://ruby-doc.com/docs/ProgrammingRuby/html/ospace.html)
* [Rinda 101](https://blog.8thlight.com/jim-suchy/2008/02/11/rinda-101.html)
* [Exploring Tuple Spaces Persistence In Ruby With Blackboard](http://www.infoq.com/news/2009/07/tuple-space-blackboard)
