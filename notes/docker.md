---
layout: page
title: "Docker"
date:  2014-09-01 14:20:05
---

## Install

To install on OSX:

{% highlight ruby %}
brew install boot2docker
boot2docker init
{% endhighlight %}

Start it by:

    boot2docker start

You will see this:

    Waiting for VM and Docker daemon to start...
    .......................ooooooooooooooooooooo
    Started.
    Writing /Users/nithin/.boot2docker/certs/boot2docker-vm/ca.pem
    Writing /Users/nithin/.boot2docker/certs/boot2docker-vm/cert.pem
    Writing /Users/nithin/.boot2docker/certs/boot2docker-vm/key.pem

    To connect the Docker client to the Docker daemon, please set:
        export DOCKER_HOST=tcp://192.168.59.103:2376
        export DOCKER_CERT_PATH=/Users/nithin/.boot2docker/certs/boot2docker-vm
        export DOCKER_TLS_VERIFY=1

To have launchd start boot2docker at login:

    ln -sfv /usr/local/opt/boot2docker/*.plist ~/Library/LaunchAgents

Then to load boot2docker now:

    launchctl load ~/Library/LaunchAgents/homebrew.mxcl.boot2docker.plist

### Bookmarks

- [Rails on Docker](http://robots.thoughtbot.com/rails-on-docker)
- [How to use Docker on OSX: The Missing Guide](http://viget.com/extend/how-to-use-docker-on-os-x-the-missing-guide)
- [Build Podcast - Docker](http://build-podcast.com/docker/)

