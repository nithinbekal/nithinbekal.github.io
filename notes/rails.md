---
layout: page
title: "Rails"
date:  2015-02-19 14:20:05
---

Contributing to Rails

- Install Virtualbox - https://www.virtualbox.org/wiki/Downloads
- Install Vagrant - http://www.vagrantup.com/downloads
- Clone rails-dev-box - https://github.com/rails/rails-dev-box
- git clone https://github.com/rails/rails-dev-box.git

cd rails-dev-box
vagrant up

This will take a lot of time the first time. A LOT.

git clone git@github.com:nithinbekal/rails.git

The current directory will be mounted as /vagrant in the vagrant box.

vagrant ssh
cd /vagrant/rails
bundle


# Get the latest changes from upstream rails
git remote add rails git://github.com/rails/rails.git
git fetch rails
git checkout master
git rebase rails/master

# Update your fork with changes from upstream
git push origin master

# Run tests
bundle exec rake test

- takes long long time to run
