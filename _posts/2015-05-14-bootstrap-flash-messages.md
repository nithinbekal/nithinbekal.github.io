---
layout: post
title: "Bootstrap flash messages in Rails"
date:  2015-05-14 22:30:47
categories: rails
---

After avoiding Bootstrap for so long,
I'm starting to see some of the advantages
that it offers.
For instance,
I needed to style flash messages today,
and turn out,
I don't have to write any CSS for it.
This is all the code I needed:

{% highlight haml %}
/ app/views/layouts/application.haml
= render 'shared/flash'
  
/ app/views/shared/_flash.haml
- flash.each do |type, message|
  %div{ class: "alert #{bootstrap_flash_class(type)} fade in" }
    = message
    %button.close{ data: { dismiss: 'alert' } } x
{% endhighlight %}

Then we add a simple helper method
to translate the flash classes 
to the bootstrap flash class names:

{% highlight ruby %}
module ApplicationHelper
  def bootstrap_flash_class(flash_type)
    { success: 'alert-success',
      error:   'alert-danger',
      alert:   'alert-warning',
      notice:  'alert-info'
    }[flash_type.to_sym] || flash_type.to_s
  end
end
{% endhighlight %}

Maybe it's not such bad idea
to start new projects with Bootstrap after all.

