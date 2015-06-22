---
layout: post
title: "Gradual engagement with Rails"
date:  2015-06-06 20:00:00
categories: rails
---

When a visitor reaches your website,
you might want to allow them
to use some of the functionality of your app
without creating an account.
This is often useful
in e-commerce applications
where you might want to allow users
to add items to cart
and only prompt them
to create an account at checkout.

This UX technique
is called gradual engagement.
Not requiring signup right away
increases the chances of
visitors trying it out and
is a great way to increase conversions.
In this post,
we will walk through
adding lazy registration
to a simple app.

Our app allows users to
submit short "posts" on the site.
So let's start with
a simple `PostsController`
where users can submit posts.
Right now,
it looks like this:

{% highlight ruby %}
class PostsController < ApplicationController
  before_action :authenticate_user!

  def create
    @post = current_user.posts.build(post_params)
    if post.save
      redirect_to @post, notice: 'Post saved'
    else
      render 'new'
    end
  end
end
{% endhighlight %}

Before the post is created,
the `authenticate_user!` method
prompts the user to login
if the aren't already.

To keep track of posts
created by guest users,
we create a `Guest` model,
with a `token` field
which will contain
a randomly generated token
that we will store in the session.
The `Post` and `Guest` models
look like this:

{% highlight ruby %}
# app/models/post.rb
class Post < ActiveRecord::Base
  belongs_to :user
  belongs_to :guest
end

# app/models/guest.rb
class Guest < ActiveRecord::Base
  has_many :posts
end
{% endhighlight %}

We can now rewrite `posts#create` method
so that we associate `Guest` to each post.

{% highlight ruby %}
class PostsController < ApplicationController
  def create
    @post = Post.new(post_params)
    @post.user  = current_user
    @post.guest = guest_user

    if post.save
      redirect_after_save
    else
      render 'new'
    end
  end

  private
  def redirect_after_save
    if user_signed_in?
      redirect_to @post, notice: 'Post saved'
    else
      redirect_to register_path, notice: 'Please create an account to continue'
    end
  end
end
{% endhighlight %}

Let's review the changes we've made here:

* There is no `authenticate_user!` filter,
  so visitors will be allowed to submit posts
  even if they aren't signed in.
* Instead of `current_user.posts.new(post_params)`,
  we're instantiating a `Post`
  and then assigning the user.
  This automatically sets user to `nil`
  if a user isn't signed in.
* In the `@post.guest = guest_user` line,
  we're assigning a guest user record.
  Note that we haven't defined `guest_user` method yet,
  and will be defining it in `ApplicationController` next.
* After saving a post,
  we're redirecting to registration page
  if a user isn't signed in.
  For signed in users,
  we're redirecting to
  the post page as we were before.

We called a `guest_user` method in `posts#create`,
so let's go ahead and define it
in `ApplicationController`.
This looks for a Guest record
based on a guest token.
This token is created when
the method is called for the first time
and stored in the session.

{% highlight ruby %}
# app/controllers/application_controller.rb
class ApplicationController
  # other stuff ...

  def guest_user
    Guest.where(token: guest_token).first_or_create
  end

  private
  def guest_token
    session[:guest_token] ||= SecureRandom.uuid
  end
end
{% endhighlight %}

We now have the guest records,
and we need to associate them to the user
once they have completed registration.
I'll quickly walk through
how we could do this with [Devise](https://github.com/plataformatec/devise),
but you could alter this easily
to work with whatever authentication system
you're using.

In Devise you'll need to override
the default registrations controller,
and call an `setup_account` method
after the user account is created.

{% highlight ruby %}
# config/routes.rb
devise_for :users, controllers: { registrations: 'registrations' }

# app/controllers/registrations_controller.rb
class RegistrationsController < Devise::RegistrationsController
  after_action :setup_account, only: :create

  private

  def setup_account
    return unless resource.persisted?
    guest_user.posts.each do |post|
      post.user = resource
      post.save
    end
  end
end
{% endhighlight %}

In the above example,
the `setup_account` method gets called
even if there's a validation error
when saving a user account,
so we need the
`return unless resource.persisted?`
line to skip the setup
in case of validation errors.

Now that you've added
lazy registration to your app,
there are a few more things
you might want to look into:

* Sometimes an existing user might create a post
  without signing in,
  so you will need to check after login
  if the user has created any posts
  and associate those posts as well.

* Over time,
  a lot of guest accounts and posts
  might accumulate in the database.
  If you don't want to keep them,
  you might want to 
  write a cron job
  that periodically checks
  and deletes old records.

I'll not cover those things
and end this tutorial here.
Hopefully this has given you ideas
about how you could improve the experience
of the users of your web apps.

**Further reading**

* [Sign Up Forms Must Die](http://alistapart.com/article/signupforms) -
  an article on A List Apart
  about user registration UX.
* [A lesson in gradual engagement](http://www.uxbooth.com/articles/a-lesson-in-gradual-engagement/)
  is another article that
  talks about the topic
  from the UX point of view.
* [Gradual engagement with Rails and Devise](http://www.codediode.io/lessons/364-gradual-engagement-with-rails-and-devise) -
  goes into building this feature in detail
  and uses a similar approach to the one used here.
* [A cookie based approach to handling guest users](http://craftingruby.com/posts/2015/06/20/cookie-based-approach-to-guest-users.html)
