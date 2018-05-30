---
layout: page
title: "Git"
date:  2015-06-18 13:51:55
---

## Cherry pick commit from another branch

{% highlight bash %}
# this is where I want the commit:
git checkout -b feature-b

# cherry pick the commit:
git cherry-pick 383b7be
{% endhighlight %}

### Books

- [Pro Git (Scott Chacon and Ben Straub)](https://git-scm.com/book/en/v2)

Tutorials:

- [A Visual Git Reference](https://marklodato.github.io/visual-git-guide/index-en.html<Paste>)
- [A Successful Git branching model](http://nvie.com/posts/a-successful-git-branching-model/)
- [Thoughbot Guide - Git](https://github.com/thoughtbot/guides/tree/master/protocol/git)
- [Auto-squashing git commits](https://robots.thoughtbot.com/autosquashing-git-commits)
- [Ry's Git Tutorial](http://rypress.com/tutorials/git/index)
