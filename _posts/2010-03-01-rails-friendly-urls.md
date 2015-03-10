---
layout: post
title: 'Friendly URLs in Rails using to_param'
date:   2010-03-01 12:00:00
redirect_from:
  - /2010/rails-seo-friendly-urls-using-to_param/
  - /2010/03/01/rails-seo-friendly-urls-using-to_param/
categories: programming, ruby, rails
---

I've wondered about how rails websites like <a href="http://railscasts.com/">Railscasts</a> created SEO friendly URLs. I read <a href="http://www.jroller.com/obie/entry/seo_optimization_of_urls_in">this post by Obie Fernandez</a> which explains how to do this.

I've never had to use SEO friendly URLs in my projects so far and I assumed that generating these URLs is very complicated and some plugin might be at work. And like always, Rails proved me wrong and I'm amazed at how simple this is.

Suppose you had a RESTful resource called posts that had title and content fields. If you wanted the post page URLs to contain text from the title, you just have to add this <code>to_param</code> method to the Post model:

{% highlight ruby %}
class Post
  # other stuff here

  def to_param
    "#{id}-#{title.gsub(/[^a-z0-9]+/i, '-')}"
  end
end
{% endhighlight %}

Now if you had a post whose title was "SEO friendly URLs", and in your view you had <code>&lt;%= link_to @post.title, @post %&gt;</code> where @post is an instance of the Post model representing the "SEO friendly URLs" post. This will generate the following path: <code>/posts/1-SEO-friendly-URLs</code>.

As explained in Obie's post, this will only work if you pass an instance of Post as the id parameter and the actual id itself. You don't have to change anything in the controller to make this work.

This is just another one of those little tricks I discovered in rails that originally looked difficult but is actually incredibly easy to accomplish.
