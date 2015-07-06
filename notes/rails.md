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

{% highlight bash %}
cd rails-dev-box
vagrant up
{% endhighlight %}

This will take a lot of time the first time. A LOT.

{% highlight bash %}
git clone git@github.com:nithinbekal/rails.git
{% endhighlight %}

The current directory will be mounted as /vagrant in the vagrant box.

{% highlight bash %}
vagrant ssh
cd /vagrant/rails
bundle
{% endhighlight %}

Get the latest changes from upstream rails:

{% highlight bash %}
git remote add rails git://github.com/rails/rails.git
git fetch rails
git checkout master
git rebase rails/master

git push origin master

bundle exec rake test
{% endhighlight %}

- takes long long time to run

**Rails Testing**

* [Golden Master Testing](http://www.sitepoint.com/golden-master-testing-refactor-complicated-views/) (Katrina Owen)
* [High Low Testing](http://mikepackdev.com/blog_posts/39-high-low-testing)
* [Testing Client Side Views in Rails Apps](http://blog.arkency.com/2013/09/testing-client-side-views-in-rails-apps/)
* [Writing Deterministic and Performant Specs with Capybara](http://blog.carbonfive.com/2013/07/26/writing-deterministic-performant-specs-with-capybara/)

**Rails application servers**

* [A Comparison of Popular Ruby Application Servers](https://blog.engineyard.com/2014/ruby-app-server-arena-pt1)
  on the Engine Yard blog (Passenger, Unicorn, Thin, Puma)
* [Ruby on Rails Server Options](http://stackoverflow.com/questions/4113299/ruby-on-rails-server-options/4113570#4113570)
  (StackOverflow question)

**Rails metrics**

* [Pssst... your Rails application has a secret to tell you](http://signalvnoise.com/posts/3091-pssst-your-rails-application-has-a-secret-to-tell-you) on 37signals blog
* [ActiveSupport::Notifications, statistics and using facts to improve your site](http://www.reinteractive.net/posts/141-activesupport-notifications-statistics-and-using-facts-to-improve-your-site)
* [Using Statsd and Graphite from a Rails App](http://www.spacevatican.org/2012/9/18/using-statsd-and-graphite-from-a-rails-app/)
* Setup Statsd and Graphite: [1](http://www.kinvey.com/blog/89/how-to-set-up-metric-collection-using-graphite-and-statsd-on-ubuntu-1204-lts) [2](http://the.randomengineer.com/2014/05/04/monitor-application-events-in-real-time/)
* [Practical Guide to Statsd/Graphite Monitoting](http://matt.aimonetti.net/posts/2013/06/26/practical-guide-to-graphite-monitoring/)
* [Docker Image for Graphite and Statsd](https://github.com/hopsoft/docker-graphite-statsd)

**Rails Deployment**

* [capistrano-ec2tag](https://github.com/douglasjarquin/capistrano-ec2tag) - A Capistrano plugin to deploy to Amazon EC2 instances based on their tags
* [Capistrano 3 Upgrade Guide](https://semaphoreapp.com/blog/2013/11/26/capistrano-3-upgrade-guide.html)
* [Configuring Rails Environments](http://eng.joingrouper.com/blog/2014/09/02/configuring-rails-environments/)

**Rails Internals**

* [Diving in Rails - The request handling](http://blog.siami.fr/diving-in-rails-the-request-handling)

# Indexing in Rails

* Always add index for foreign keys

{% highlight ruby %}
# Bad
create_table(:tweets) do |t|
  t.string  :text
  t.integer :user_id
end

# OK
create_table(:tweets) do |t|
  t.string  :text
  t.integer :user_id
end
add_index :posts, :user_id

# Better - automatically adds user_id field and creates index
create_table(:tweets) do |t|
  t.string     :text
  t.references :user
end
{% endhighlight %}

* [When to add indexes in a table in Rails](http://stackoverflow.com/questions/3658859/when-to-add-what-indexes-in-a-table-in-rails)
* [Using indexes in Rails - Choosing additional indexes](https://tomafro.net/2009/08/using-indexes-in-rails-choosing-additional-indexes)
* [Add index when the field is used for ordering](http://stackoverflow.com/questions/4445507/rails-created-at-when-user-for-ordering-should-you-add-an-index-to-the-table)
* [Using indexes in Rails - Index your associations](https://tomafro.net/2009/08/using-indexes-in-rails-index-your-associations)
* [Rails Guides: Association basics](http://edgeguides.rubyonrails.org/association_basics.html)
* [Finding and Indexing: You May Be Doing It Wrong](https://railsmachine.com/articles/2012/05/22/finding-and-indexing-you-may-be-doing-it-wrong/)
