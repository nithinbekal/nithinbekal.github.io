---
layout: post
title: "Regular expression matching in Ruby with <code>String#[]</code>"
date:  2015-06-04 20:52:19
categories: ruby
---

Today I learned a new way
to check if a string matches
a regular expression pattern in Ruby.
Strings have a `#[]` method
that lets us work with indexes,
but we could also use them
to check if a substring or a pattern exists.

{% highlight ruby %}
s = "Hello, world!"

# Return sub-string if present
s['world'] #=> 'world'

# Returns nil if not present
s['bye'] #=> nil

# We can also use regular expressions there
s[/e..o/] #=> 'ello'

# Capture the last word in the string
s[/ ([a-zA-z]*)([^ ]*)$/, 1] #=> 'world'
{% endhighlight %}

So this allows us to do things like
extracting parts of a string.

{% highlight ruby %}
url = 'http://nithinbekal.com/'

protocol = url[/^(.*):\/\//, 1]               #=> 'http'
hostname = url[/^#{protocol}:\/\/(.*)\//, 1]  #=> 'nithinbekal.com'
{% endhighlight %}

Because it returns nil
when there is not match,
we can also use it in conditions:

{% highlight ruby %}
if url[URL_REGEX]
  'valid url'
else
  'invalid'
end
{% endhighlight %}

This is yet another Ruby idiom
that seems completely natural
once you start using it.
I'm surprised I haven't
come across this before.

