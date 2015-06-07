---
layout: post
title: "Disable unsafe rake tasks in Rails production environment"
date:  2015-05-18 22:01:16
categories:
  - ruby
  - rails
---

In my previous post,
I wrote about
[dropping and reseeding the DB of your Rails app](/posts/rake-db-reseed/).
This is useful in development,
but you might want to
disable such tasks in production.
Let's look at how we can do that.

First, let's define a rake task
that simply raises an exception
if you run it in production environment:

{% highlight ruby %}
# lib/tasks/skip_prod.rake
desc 'Raises exception if used in production'
task skip_prod: [:environment] do
  raise 'You cannot run this in production' if Rails.env.production?
end
{% endhighlight %}

The `rake environment` task
loads the Rails environment
and makes methods like
`Rails.env.production?` available,
so we added that as a dependency
of our task.
Now we can change the `db:reseed` task
to run this before
dropping the database.

{% highlight ruby %}
# lib/tasks/db.rake
namespace :db do
  desc 'Drop, create, migrate then seed the development database'
  task reseed: [ 'skip_prod', 'db:drop', 'db:migrate', 'db:seed' ]
end
{% endhighlight %}

This ensures that the task
always fails in production.
But what about the other tasks
that are already defined by Rails
that could cause similar damage,
like `db:drop` or `db:reset`?
We could add the `skip_prod` dependency
to these tasks.

{% highlight ruby %}
# lib/tasks/db.rake
['db:drop', 'db:reset', 'db:seed'].each do |t|
  Rake::Task[t].enhance ['skip_prod']
end
{% endhighlight %}

The `#enhance` method
adds `skip_prod` to
the very beginning of the dependencies.
So the exception is raised
before the database is dropped.

Even if you have made sure
that your data won't get deleted
by an accidental rake command,
do make sure that you've set up
regular backups of the database.
You never know what else
could mess up your data.
