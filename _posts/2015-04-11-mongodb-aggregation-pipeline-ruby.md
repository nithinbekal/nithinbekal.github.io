---
layout: post
title: "Working With MongoDB's Aggregation Pipelines in Ruby"
date:  2015-04-11 17:54:26
categories: mongodb, ruby, rails
---

If you needed to create a report
with details of how many users signed up for your app each month,
it would be trivial to do using SQL.
All you need to do is write a `group_by` query
and voila, there's your report.

I've always missed SQL's aggregation features in MongoDB.
The standard way to achieve this was to use map-reduce jobs.
When you do this in Ruby,
it ends up being very inelegant,
with strings containing JavaScript code
sprinkled inside the Ruby.

Recently I found out that MongoDB ships with
[aggregation pipelines](http://docs.mongodb.org/manual/core/aggregation-pipeline/)
since version 2.2.
This makes it much simpler to do such queries
without using map-reduce.

# Testing in the Mongo shell

Before writing any Ruby,
let's play around with the feature in Mongo shell.
For the sake of simplicity,
let's only consider the users collection to contain 3 fields -
id, email and a `created_at` date.
A single document from the collection might look like this:

{% highlight javascript %}
{ "_id"        : ObjectId("54c0..."),
  "email"      : "nithin@example.com",
  "created_at" : ISODate("2015-01-22T08:46:20.541Z") }
{% endhighlight %}

To get our report, we use aggregation pipelines like this:

{% highlight javascript %}
db.users.aggregate([stage1, stage2])
{% endhighlight %}

Here `stage1` and `stage2` are stages of the pipeline
that transform the data to create the final result set.
Each stage performs some transformation on the collection
and passes the resulting documents to the next stage.

Let's look at how we can build up the pipelines.
The pipelines are simple hashes
that describe the operations to be performed
on the data.

First of all, we need to
extract the month and year from the signup date.
For this, we can use a transformation called `$project`.
We'll put this in a variable called `project`
that we can later use in place of `stage1` above.

{% highlight javascript %}
project = {
  '$project': {
    signup_year:  { '$year':  '$created_at' },
    signup_month: { '$month': '$created_at' }
  }
}
{% endhighlight %}

This transforms each document into the form shown below.
The year and month of the signup date
are extracted into the `signup_year` and `signup_month` fields.
This makes it easy for us to group the documents
by year and month in the next stage.

{% highlight javascript %}
[ {"_id": ObjectId('54c0...'), "signup_year": 2015, "signup_month":  1},
  {"_id": ObjectId('54c0...'), "signup_year": 2014, "signup_month": 12},
  ... ]
{% endhighlight %}

The next stage of the pipeline is the `$group` stage.
This is similar to `group by` in SQL.
The below code for the group stage tells MongoDB
to group the data by month and year.
The `signups: { '$sum': 1 }` line
adds 1 for each occurence of the year/month combination.

{% highlight javascript %}
group = {
  '$group': {
    '_id': { year: '$year', month: '$month' },
    signups: { '$sum': 1 }
  }
}
{% endhighlight %}

Let's now go back to the line where we used the aggregation pipeline
and replace `stage1` and `stage2` by the variables `project` and `group`.

{% highlight javascript %}
db.users.aggregate( [project, group] )
{% endhighlight %}

The hashes we created tell MongoDB
how to transform the data
to convert it into the required form.
This will produce the final result in this form:

{% highlight javascript %}
    [ {"_id": {"year": 2015, "month": 1}, "signups": 11},
  {"_id": {"year": 2015, "month": 2}, "signups": 21},
  {"_id": {"year": 2015, "month": 3}, "signups": 26} ]
{% endhighlight %}

# Ruby and mongoid

Now let's try doing the same in Ruby
using the `mongoid` gem.
Assuming that we have a `User` model
that talks to MongoDB,
we can write:

{% highlight ruby %}
User.collection.aggregate([project, group])
{% endhighlight %}

For the `project` and `group` variables,
you just need to copy the code we typed into the mongo shell.
Since Ruby's syntax for hashes is so similar to JavaScript's,
we don't even have to change anything there.

In this way we could easily apply
more transformations on the collection.
For instance, if we needed to sort the results,
we could do this:

{% highlight ruby %}
sort = { '$sort': { '_id.year': 1, '_id.month': 1 } }
User.collection.aggregate([project, group, sort])
{% endhighlight %}

Even though I've used Mongoid gem in this example,
it's not actually necessary to use this feature.
We could actually accomplish this with the `moped` gem,
which is the driver `mongoid` uses to talk to the database.
Using `moped` we would do:

{% highlight ruby %}
session = Moped::Session.new([ "127.0.0.1:27017" ])
session.use 'db_name'
session[:users].aggregate([project, group, sort])
{% endhighlight %}

Here, `session[:users]` returns the same object as `User.collection`
from the previous example.

Letting MongoDB take care of this responsibility
means that our Ruby programs have to deal with
less data and fewer object allocations.

If you find yourself doing such operations
by fetching the entire collection
and then transforming it in Ruby,
you will find aggregation pipelines a very useful tool.
Take a look at
[the list of available stage operators](http://docs.mongodb.org/manual/reference/operator/aggregation/#aggregation-pipeline-operator-reference)
that you can use.

# Links

* [Aggregation Pipeline - MongoDB Manual](http://docs.mongodb.org/manual/core/aggregation-pipeline/)
* [Mongoid and the MongoDB Aggregation Framework](http://blog.joshsoftware.com/2013/09/05/mongoid-and-the-mongodb-aggregation-framework/)
