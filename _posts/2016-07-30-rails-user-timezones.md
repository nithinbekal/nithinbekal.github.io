---
layout: post
title: "Rails: Automatically set user timezone during signup"
date:  2016-07-30 12:32:07 +05:30
categories: rails
---

Sometimes you need to know the timezone of your users to perform some actions.
For instance, you might want to send an email to your users
every evening, at say 5pm.
To make sure that the email goes out at 5pm in their timezone,
you might want to find out what timezone they are in.

One way to do this is to use Rails'
[`time_zone_select`](http://api.rubyonrails.org/classes/ActionView/Helpers/FormOptionsHelper.html#method-i-time_zone_select)
tag and ask the user to save their time zone during sign up.
However, we can skip this step by automatically reading the timezone information
from the browser, and set it in a cookie.
This cookie can then be accessed in our Rails controller
and we can save the timezone in the User model.

### Install `jsTimezoneDetect`

To read the timezone information correctly, let's use the
[`jsTimezoneDetect`](http://pellepim.bitbucket.org/jstz/) library.
I'm not going into the details of how to add it to your Rails project,
but I recommend using [Bower](https://bower.io) to manage your frontend dependencies.
For this tutorial, I suggest following the instructions to
[setup bower with your Rails app](http://dotwell.io/taking-advantage-of-bower-in-your-rails-4-app/).

Make sure you have the library loaded correctly by opening the JS console
in the browser and typing `jstz.determine().name()`.
This should return your timezone.

### Set the timezone in a cookie

We will set a cookie called `timezone` with the string we get from `jsTimezoneDetect`.
The `setCookie` helper function sets the cookie with the value we pass in,
and sets the expiry at 24 hours.

{% highlight javascript %}
function setCookie(key, value) {
  var expires = new Date();
  expires.setTime(expires.getTime() + (24 * 60 * 60 * 1000));
  document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
}

jQuery(function() {
  var tz = jstz.determine().name();
  setCookie('timezone', tz);
})
{% endhighlight %}

We can now access the timezone from the server side using the cookie.

### Updating the user

For this example, let's assume you're using Devise for user signup.
We will override the default Devise `RegistrationsController`
and add an `after_action` hook that saves the timezone to the User model.

The code below assumes that your users table contains a `timezone` field.
Please create a migration to add the field if you don't have it.

{% highlight ruby %}
# config/routes.rb
devise_for :users, controllers: { registrations: 'registrations' }

# app/controllers/registrations_controller.rb
class RegistrationsController < Devise::RegistrationsController
  after_action :save_user_timezone, only: [:create]

  private

  def save_user_timezone
    return unless resource.persisted?
    resource.update(timezone: cookies[:timezone])
  end
end
{% endhighlight %}

Even though the above example is for Devise, we can easily modify
the `after_action` hook for non-Devise registrations controllers too.

### Next steps

You might want to make sure that you update the user
whenever they login from a new timezone.
We can achieve this by moving the `after_action` hook
to the `ApplicationController` and update the timezone if it has changed.

However, in many cases you might only want to do this during sign up
to give the user a sane default, and not want to change it
unless the user explicitly wants to change it.
In such cases, you will find the `time_zone_select` tag very useful
in creating a form for updating the timezone.
