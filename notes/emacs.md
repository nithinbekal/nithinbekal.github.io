---
layout: page
title: "Emacs"
date:  2015-08-12 15:50:58
---

{% highlight bash %}
brew install emacs --use-git-head --cocoa --srgb
{% endhighlight %}

Meta key doesn't work on iTerm.
To fix this, go to Prefs > Profiles > Keys.
Set "Left option key acts as" to +Esc.

{% highlight elisp %}
(require 'package)
(add-to-list 'package-archives
             '("melpa" . "http://melpa.org/packages/") t)
             
(package-initialize)
{% endhighlight %}

* M-x package-refresh-contents
* M-x package-list-packages
* M-x package-install RET evil RET

{% highlight elisp %}
(require 'evil)
(evil-mode t)
{% endhighlight %}

Relative numbering https://github.com/coldnew/linum-relative

## Links

* [From Vim to Emacs+Evil chaotic migration guide](http://juanjoalvarez.net/es/detail/2014/sep/19/vim-emacsevil-chaotic-migration-guide/)
* [Setting up Emacs as Ruby development environment on OSX](http://crypt.codemancers.com/posts/2013-09-26-setting-up-emacs-as-development-environment-on-osx/)
* [Vim in Emacs Bootstrap](http://bling.github.io/blog/2013/09/09/vim-in-emacs-bootstrap/)
* [Configuring emacs and evil mode for Go development](http://jen20.com/2015/02/06/configuring-emacs-for-go-part-1.html)

# Elisp links

* [Emergency Elisp](http://steve-yegge.blogspot.in/2008/01/emergency-elisp.html) -
  excellent tutorial for elisp by Steve Yegge
