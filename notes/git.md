---
layout: page
title: "Git"
date:  2015-06-18 13:51:55
---

## Cherry pick commit from another branch

{% highlight bash %}
# this is where I want the commit:
git checkout feature-b

# cherry pick the commit:
git cherry-pick 383b7be
{% endhighlight %}


Tutorials:

- [Ry's Git Tutorial](http://rypress.com/tutorials/git/index)

Links:

- [A Successful Git branching model](http://nvie.com/posts/a-successful-git-branching-model/)
- [Thoughbot Guide - Git](https://github.com/thoughtbot/guides/tree/master/protocol/git)
- [Auto-squashing git commits](https://robots.thoughtbot.com/autosquashing-git-commits)
