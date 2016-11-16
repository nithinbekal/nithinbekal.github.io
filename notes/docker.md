---
layout: page
title: "Docker"
date:  2014-09-01 14:20:05
---

# Docker for Rails Development

{% highlight bash %}
brew install docker docker-machine docker-compose
{% endhighlight %}

{% highlight bash %}
docker-machine create --driver virtualbox default
{% endhighlight %}

{% highlight docker %}
FROM ruby:2.2.0

RUN apt-get update -qq && apt-get install -y build-essential

# for postgres
RUN apt-get install -y libpq-dev

# for nokogiri
RUN apt-get install -y libxml2-dev libxslt1-dev

# for a JS runtime
RUN apt-get install -y nodejs

ENV APP_HOME /myapp
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

ADD Gemfile* $APP_HOME/
RUN bundle install

ADD . $APP_HOME
{% endhighlight %}

{% highlight docker %}
version: '2'
services:
  db:
    image: postgres:9.4.1
    ports:
      - "5432:5432"

  web:
    build: .
    command: bin/rails server --port 3000 --binding 0.0.0.0
    ports:
      - "3000:3000"
    links:
      - db
    volumes:
      - .:/app
{% endhighlight %}



## Install

To install on OSX:

{% highlight ruby %}
brew install boot2docker
boot2docker init
{% endhighlight %}

Start it by:

{% highlight ruby %}
boot2docker start
{% endhighlight %}

You will see this:

{% highlight text %}
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
{% endhighlight %}

To have launchd start boot2docker at login:

{% highlight text %}
ln -sfv /usr/local/opt/boot2docker/*.plist ~/Library/LaunchAgents
{% endhighlight %}

Then to load boot2docker now:

{% highlight text %}
launchctl load ~/Library/LaunchAgents/homebrew.mxcl.boot2docker.plist
{% endhighlight %}

### Bookmarks

- [Rails on Docker](http://robots.thoughtbot.com/rails-on-docker)
- [How to use Docker on OSX: The Missing Guide](http://viget.com/extend/how-to-use-docker-on-os-x-the-missing-guide)
- [Build Podcast - Docker](http://build-podcast.com/docker/)

