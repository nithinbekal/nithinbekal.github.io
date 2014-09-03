---
layout: page
title: "Docker"
date:  2014-09-01 14:20:05
---

## Install

To install on OSX:

{% highlight ruby %}
brew install boot2docker
brew install docker
boot2docker init
{% endhighlight %}

Add this to .zshrc.

{% highlight ruby %}
    export DOCKER_HOST=tcp://$(boot2docker ip 2>/dev/null):2375
{% endhighlight %}

### Bookmarks

- [How to use Docker on OSX: The Missing Guide](http://viget.com/extend/how-to-use-docker-on-os-x-the-missing-guide)
- [Build Podcast - Docker](http://build-podcast.com/docker/)
