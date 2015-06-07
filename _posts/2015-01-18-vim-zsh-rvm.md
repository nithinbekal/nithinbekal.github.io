---
layout: post
title: "Making Vim Play Nice With ZSH and RVM"
date:  2015-01-18 20:50:31
categories:
  - vim
  - zsh
---

Over the past few months of using vim, I've been annoyed by the fact that it keeps using the wrong version of Ruby when using plugins like [rails.vim](https://github.com/tpope/vim-rails). I fixed the problem with this:

{% highlight sh %}
sudo mv /etc/zshenv /etc/zshrc
{% endhighlight %}

It turns out that on OSX, you need to rename the `/etc/zshenv` file to `zshrc` for vim to read the PATH correctly. Now if you want to use vim plugins like [rspec.vim](https://github.com/thoughtbot/vim-rspec), they should work perfectly.

If this doesn't help fix the problem, other people have run into this problem too, and have used [other approaches](https://gabebw.wordpress.com/2010/08/02/rails-vim-rvm-and-a-curious-infuriating-bug/) to solve it. Maybe that will help.

