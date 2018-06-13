---
layout: page
title: "Ruby WTFs"
---


## Flip flop

## Heredocs

{% highlight ruby %}
def long_messages
  html_escape(<<-ONE) + '<hr />' + html_escape(<<-TWO)
    Here goes my first very long message.
    Yeehaw!
  ONE
    This is the second message which is still long.
    It is long indeed.
  TWO
end
{% endhighlight %}

### un.rb

<https://github.com/ruby/ruby/blob/84d83482c8ba1b8e7002ed8ff4c6a2c00fa4ce62/lib/un.rb>
