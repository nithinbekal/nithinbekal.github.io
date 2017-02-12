---
layout: page
title: "Memcached"
date:  2017-02-09 14:03:57
---

{% highlight bash %}
$ brew install memcached
To have launchd start memcached now and restart at login:
  brew services start memcached
Or, if you don't want/need a background service you can just run:
  /usr/local/opt/memcached/bin/memcached
{% endhighlight %}
