---
layout: post
title: "Rake task to drop and reseed database in Rails"
date:  2015-05-17 19:56:17
categories: ruby, rails
---

When working on a Rails app,
you might sometimes need to
drop the local database
and start fresh
with data loaded from db/seeds.rb,
what do you do?

Short answer:
use `rake db:reset`.
This drops the database,
then loads the schema
with `rake db:schema:load`
and then seeds the data
with `rake db:seed`.
This is what you should be using
for the vast majority of cases.

However,
during very early stages of development,
I often edit the existing migration files
instead of creating new ones.
This is useful when
I'm still figuring out the schema,
and often need to add fields
to existing models.

In such cases,
we need to run `db:migrate`
instead of `db:schema:load`
when we reset the database.
For this,
we create a new task, `db:reseed`.

{% highlight ruby %}
# lib/tasks/db.rake
namespace :db do
  desc 'Drop, create, migrate then seed the development database'
  task reseed: [ 'db:drop', 'db:migrate', 'db:seed' ] do
    puts 'Reseeding completed.'
  end
end
{% endhighlight %}

This describes a `db:reseed` task
which is dependent on the 3 other tasks.
The dependencies get executed first
and then the given block.
The block is optional,
and since it only prints a message here,
I usually remove it.

The reason `db:reset` uses `db:schema:load`
and not `db:migrate` is that
the former is much faster.
It loads the schema
that we've already generated from `db/schema.rb`
instead of going through all the migrations again.
But when we change existing migration files,
we need to run the migrations again to update
the schema file.

Editing migration files
is not a great idea,
especially when you're working in teams,
but I find this works fine
in the first few days of development
when you don't yet have
a public version of the app in production.
Once you've got the app in production,
you should definitely not
be editing migration files.
