---
layout: page
title: "Rails"
date:  2015-02-19 14:20:05
---

Other notes related to Rails:

- [Rails Testing](/notes/rails-testing/)

### Rails setup

- [GoRails: Setup Ruby On Rails on Ubuntu 16.10 Yakkety Yak](https://gorails.com/setup/ubuntu/16.10) - Detailed installation instructions. Also contains setup instructions for other OSes.

### Debugging techniques

- [Debugging Action Callbacks (aka Filters) in Rails](https://hashrocket.com/blog/posts/debugging-action-callbacks-aka-filters-in-rails)

### Rails application servers

* [A Comparison of Popular Ruby Application Servers](https://blog.engineyard.com/2014/ruby-app-server-arena-pt1)
  on the Engine Yard blog (Passenger, Unicorn, Thin, Puma)
* [Ruby on Rails Server Options](http://stackoverflow.com/questions/4113299/ruby-on-rails-server-options/4113570#4113570)
  (StackOverflow question)

### Rails metrics

* [Pssst... your Rails application has a secret to tell you](http://signalvnoise.com/posts/3091-pssst-your-rails-application-has-a-secret-to-tell-you) on 37signals blog
* [ActiveSupport::Notifications, statistics and using facts to improve your site](http://www.reinteractive.net/posts/141-activesupport-notifications-statistics-and-using-facts-to-improve-your-site)
* [Using Statsd and Graphite from a Rails App](http://www.spacevatican.org/2012/9/18/using-statsd-and-graphite-from-a-rails-app/)
* Setup Statsd and Graphite: [1](http://www.kinvey.com/blog/89/how-to-set-up-metric-collection-using-graphite-and-statsd-on-ubuntu-1204-lts) [2](http://the.randomengineer.com/2014/05/04/monitor-application-events-in-real-time/)
* [Practical Guide to Statsd/Graphite Monitoting](http://matt.aimonetti.net/posts/2013/06/26/practical-guide-to-graphite-monitoring/)
* [Docker Image for Graphite and Statsd](https://github.com/hopsoft/docker-graphite-statsd)

### Rails Deployment

* [capistrano-ec2tag](https://github.com/douglasjarquin/capistrano-ec2tag) - A Capistrano plugin to deploy to Amazon EC2 instances based on their tags
* [Capistrano 3 Upgrade Guide](https://semaphoreapp.com/blog/2013/11/26/capistrano-3-upgrade-guide.html)
* [Configuring Rails Environments](http://eng.joingrouper.com/blog/2014/09/02/configuring-rails-environments/)

### Rails Internals

- [A Visual Trace of How Rails Responds to a Request](https://rails-trace.chriszetter.com/)
- [The Lifecycle of a Request](https://blog.skylight.io/the-lifecycle-of-a-request/)
- [Examining The Internals Of The Rails Request/Response Cycle](http://www.rubypigeon.com/posts/examining-internals-of-rails-request-response-cycle/)
- [Diving in Rails - The request handling](http://blog.siami.fr/diving-in-rails-the-request-handling)

### Rails and Databases

- [Rails Database Best Practices](http://blog.carbonfive.com/2016/11/16/rails-database-best-practices/)

### Rails API applications

- [Learn how to build a modern API on Michael Hartl's Rails 5 tutorial](https://github.com/vasilakisfil/rails5_api_tutorial)

#### Indexing in Rails

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

### Authentication from scratch

- [Railscasts: Authentication from scratch](http://railscasts.com/episodes/250-authentication-from-scratch?view=asciicast)
- [A Basic User Authentication Model in Rails 4](http://nycda.com/blog/basic-user-authentication-model-in-rails-4/)
- [User Authentication from Scratch](http://www.emilyplatzer.io/2014/06/29/user-authentication.html)

### Rate limiting

- [Prop](https://github.com/zendesk/prop)
- [sidekiq-throttler](https://github.com/gevans/sidekiq-throttler)
- [sidekiq-rate-limiter](https://github.com/enova/sidekiq-rate-limiter)
- [redlock-rb](https://github.com/leandromoreira/redlock-rb)

### Contributing to Rails

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

