---
layout: post
title: "Getting started with Distributed Ruby (DRb)"
date:  2015-12-14 23:16:53
categories: ruby
---

The Ruby stdlib contains a little known library called dRuby,
which allows multiple Ruby processes to talk to each other over the network.
It lets you call methods on objects from another Ruby process
as if it is just another object initialized in the same program.
This is called Remote Method Invocation (RMI) 
(or Remote Procedure Call, RPC, in non-OOP languages).

## Hello, dRuby!

Let's start off with a very simple dRuby program.
We will write `server.rb` which exposes a very simple object over the network.
The object responds to a `#greet` method
and returns the string "Hello, world!".

{% highlight ruby %}
# server.rb
require 'drb/drb'

class MyApp
  def greet
    'Hello, world!'
  end
end

object = MyApp.new

DRb.start_service('druby://localhost:9999', object)
DRb.thread.join
{% endhighlight %}

Let's focus on the last two lines of the code above.
`DRb.start_service` starts a local dRuby server on port 9999.
The second argument to the method is the object that
we want to be able to call from other processes.

The final line `DRb.thread.join` is so that
the program doesn't exit immediately.
This keeps the program running until the DRb thread stops.
Start this program in one tab in the terminal.

Next, we will write another program that talks to the server.
Save the following code and run it.

{% highlight ruby %}
# client.rb
require 'drb/drb'
DRb.start_service
remote_object = DRbObject.new_with_uri('druby://localhost:9999')

remote_object.greet   #=> 'Hello, world!'
{% endhighlight %}

Here, we create an instance of `DRbObject` which proxies all method calls
to the object we shared in server.rb.
Now we can call `greet` method on `remote_object`
and the method call is sent across the network
to the process running server.rb.

Under the hood, `DRbObject` uses `method_missing`
to delegate all method calls over the network.

## Accessing a queue via DRb

Let's try something more interesting now.
We will set up a queue service that will be accessed by two other processes.
One of the processes will push data to the queue,
while the other will pull the data and process it.

{% highlight ruby %}
# queue.rb
require 'drb/drb'

queue = Queue.new

DRb.start_service('druby://localhost:9999', queue)
DRb.thread.join
{% endhighlight %}

Here we're using Ruby's built in `Queue` data structure,
which allows thread-safe push and pop operations.
Run this program in one tab in your terminal.

Next we will define a producer, which pushes data to the queue.
We could run this in the terminal using `ruby producer.rb`
but let's run this interactively in an irb session.
Start an irb session and copy the lines below.

{% highlight ruby %}
# producer.rb - or type this in an irb session
require 'drb/drb'

DRb.start_service
queue = DRbObject.new_with_uri('druby://localhost:9999')

#> queue.push(42)
#> queue.push(99)
{% endhighlight %}

Finally we need a consumer for our queue
that takes the items from the queue and processes them.
We'll write that in consumer.rb and run it in another tab.

{% highlight ruby %}
# consumer.rb
require 'drb/drb'

DRb.start_service
queue = DRbObject.new_with_uri('druby://localhost:9999')

loop do
  data = queue.pop

  # Process the data
  puts "Processing #{data}"
end
{% endhighlight %}

If you're pushing data to the queue through irb,
you will see that the consumer waits for new data to be added
when the queue becomes empty.

This is because we're using `Queue` to store our data rather than `Array`.
When the queue is empty, it suspends the calling thread (ie. consumer)
until new data is available.
If we had used `Array` instead of `Queue`,
it would continuously return nil every time we call `queue.pop`.

## Wrapping up

I'm not sure how widely dRuby is used,
but it seems like a nice option for smaller projects.
For instance, you could set up a rudimentary key-value store for a toy project
with a few lines of Ruby code instead of running Redis.

One thing to keep in mind is that you need to make your code thread-safe
if you're using DRb, when many processes are working with the same object.

## Further reading

* My notes on [Distributed Ruby](/notes/druby.html), which contains many more links
* [dRuby documentation](http://ruby-doc.org/stdlib-2.3.0_preview1/libdoc/drb/rdoc/DRb.html)
* [dRuby and Rinda: Implementation and application of distributed Ruby and its parallel coordination mechanism](http://www.druby.org/imaco_doc/ijpp_text_en.html)
