---
layout: page
title: "Redis"
date:  2017-02-09 14:00:45
---

{% highlight bash %}
$ brew install redis

To have launchd start redis now and restart at login:
  brew services start redis
Or, if you don't want/need a background service you can just run:
  redis-server /usr/local/etc/redis.conf
{% endhighlight %}
