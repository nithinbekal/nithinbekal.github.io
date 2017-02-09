---
layout: page
title: "Tell Don't Ask"
date:  2017-01-14 20:10:10
---

>  Procedural code gets information then makes decisions. Object-oriented code tells objects to do things.

-- Alec Sharpe, Smalltalk by Example

> endeavor to tell objects what you want them to do; do not ask them questions about their state, make a decision, and then tell them what to do.

-- [pragprog blog](http://pragprog.com/articles/tell-dont-ask)

Making decisions outside the object violates encapsulation

An example from the [Thoughtbot blog](http://robots.thoughtbot.com/tell-dont-ask):

{% highlight ruby %}
def check_for_overheating(system_monitor)
  if system_monitor.temperature > 100
    system_monitor.sound_alarms
  end
end
{% endhighlight %}

Better:

{% highlight ruby %}
system_monitor.check_for_overheating

class SystemMonitor
  def check_for_overheating
    if temperature > 100
      sound_alarms
    end
  end
end
{% endhighlight %}

Checking `is_a?` in Ruby is another type of tell-dont-ask violation.


