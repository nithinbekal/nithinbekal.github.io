---
layout: post
title:  "Complex has_many :through associations"
date:   2014-04-16 12:00:00
categories: programming, rails
---

`has_many :through` associations can get a bit complicated when they involve self-referential relationships. Let's take Twitter as an example to state this problem. User A follows users B and C, but not D. This is represented by the `Follow` model. Each User also has may tweets.

We now need to define an association `followed_tweets` on users such that `a.followed_tweets` will return all the tweets by users B and C, but not the ones by D.

{% highlight ruby %}
class User
  has_many :tweets

  has_many :follows
  has_many :followed_users, through: :follows
  has_many :followers, through: :follows, inverse_of: :follower
end

class Follow
  belongs_to :follower, class_name: 'User', foreign_key: 'follower_id'
  belongs_to :followed_user, class_name: 'User', foreign_key: 'followed_user_id'
end

class Tweet
  belongs_to :user
end
{% endhighlight %}

In migrations:

{% highlight ruby %}
create_table :users do |t|
  # ...
end

create_table :tweets do |t|
  t.references :user
  # ...
end

create_table :follows do |t|
  t.references :follower
  t.references :followed_user
end
{% endhighlight %}

Before we can define the `followed_tweets` relation on User, we must first define a `followed_tweets` relation on Follow.

{% highlight ruby %}
class Follow
  has_many :followed_tweets, through: :followed_user, source: :tweets
  # ...
end
{% endhighlight %}

Now we can use `follow.followed_tweets` instead of `follow.followed_user.tweets`. This also means that we can write a `has_many :followed_tweets, through: :follows` relation on the User model.

Here's what the relations look like now:

{% highlight ruby %}
class User
  has_many :tweets

  has_many :follows
  has_many :followers, through: :follows, inverse_of: :follower
  has_many :followed_users, through: :follows

  has_many :followed_tweets, through: :follows
end

class Follow
  belongs_to :follower, class_name: 'User', foreign_key: 'follower_id'
  belongs_to :followed_user, class_name: 'User', foreign_key: 'followed_user_id'
  has_many :followed_tweets, through: :followed_user, source: :tweets
end

class Tweet
  belongs_to :user
end
{% endhighlight %}

Here's a [blog post](http://blog.hasmanythrough.com/2007/10/30/self-referential-has-many-through) that clearly explains self-referential `has_many :through` associations. (Warning: the examples are from Rails 2.0.) In our example, that would be the association representing a user having many followers or followed_users.

However, we have explored this to one more level, ie. a `has_many :through` association where the "through" attribute indirectly references the same model (User) as the source.
