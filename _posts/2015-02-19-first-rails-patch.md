---
layout: post
title: "How I submitted my first patch to Rails (and you can too!)"
date:  2015-02-19 22:34:10
categories: rails, open-source
---

Making your first contribution
to a large open source project like Rails
seems daunting at first.
A good way to get started is
to submit patches to improve the documentation.

In my previous post,
[I wrote about the `local_assigns` method](/posts/rails-optional-locals/),
and how the documentation for it was missing.
This gave me an excellent opportunity to
get my first commit into Rails by adding the documentation.

If you're looking to get started
with submitting your own patch to Rails,
here's how you can do it in 4 simple steps:

1. Fork the [rails/rails](https://github.com/rails/rails)
   repo on Github and 
   clone your fork to your local machine.
2. Create a new branch for your patch
   and make your changes there.
   Add `[ci skip]` to your commit message
   so that the Rails CI servers skip
   running tests for your documentation commit.
3. Push your changes to your Github repo
   and open a pull request to the main Rails repo.
4. Once you've opened a PR,
   someone from the Rails team will
   provide feedback, suggesting improvements,
   or accept the changes and merge the PR.
   Congratulations, you now have your first commit on Rails!

There are lots of open issues in Rails,
so it might take some time for your patch to be merged.
In the meanwhile,
you might want to make sure your local copy of Rails
is up-to-date with the upstream Rails repo.
To do this, follow these steps:

{% highlight bash %}
$ git remote add rails git://github.com/rails/rails.git
$ git fetch rails
$ git checkout master
$ git rebase rails/master
{% endhighlight %}

This adds the main Rails repo as a remote called `rails`,
and fetches all new changes form it.
You can update your fork with the latest commits from upstream by:

{% highlight bash %}
$ git push origin master
{% endhighlight %}

Before I submitted this patch,
I was under the impression that it would be a lot of work
to get a patch accepted into Rails.
Which is why I wrote this down -
in the hopes that it convinces someone else
to give it a shot.
If you see something about the docs that could be improved,
you now know how easy it is to contribute. :)

# Links

* [Contributing to the Rails Documentation](http://edgeguides.rubyonrails.org/contributing_to_ruby_on_rails.html#contributing-to-the-rails-documentation)
* [How to land your first patch in Rails](http://codeulate.com/2011/02/how-to-land-your-first-patch-in-rails/) (Ben Orenstein)
