---
layout: page
title: "Docker"
date:  2014-09-01 14:20:05
---

## Install

To install on OSX:

    brew install boot2docker
    brew install docker
    boot2docker init

Add this to .zshrc.

    export DOCKER_HOST=tcp://$(boot2docker ip 2>/dev/null):2375
