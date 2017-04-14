---
layout: page
title: "Emacs"
date:  2015-08-12 15:50:58
---

Although Vim is my editor of choice,
I have tried to switch to Emacs
using
[evil-mode](https://github.com/emacs-evil/evil).
I've tried
[spacemacs](https://github.com/syl20bnr/spacemacs)
in the past,
but prefer having a simpler setup.

- [My emacs config](https://github.com/nithinbekal/emacs.d)


## Installing emacs

{% highlight bash %}
brew install emacs --use-git-head --cocoa --srgb
{% endhighlight %}

Meta key doesn't work on iTerm.
To fix this, go to Prefs > Profiles > Keys.
Set "Left option key acts as" to +Esc.

## Looking up documentation

- `C-h f command-name` - find which hotkey is assigned to the command.
- `C-h k key` - find what a hotkey does

### Get mouse scrolling to work on iTerm2

{% highlight elisp %}
;; dotspacemacs/user-config
(unless window-system
  (global-set-key (kbd "<mouse-4>") 'scroll-down-line)
  (global-set-key (kbd "<mouse-5>") 'scroll-up-line))
{% endhighlight %}

<https://github.com/syl20bnr/spacemacs/issues/4591#issuecomment-223273558>

### Vim to evil-mode

- [Evil Guide: Emacs/Evil for Vim Users](https://github.com/noctuid/evil-guide)
- [Towards a vim-like Emacs](http://nathantypanski.com/blog/2014-08-03-a-vim-like-emacs-config.html)
- [From Vim to Emacs in Fourteen Days](http://blog.aaronbieber.com/2015/05/24/from-vim-to-emacs-in-fourteen-days.html)
- [My Descent Into Evil](https://medium.com/@bryangarza/my-descent-into-evil-98f7017475b6)
- [From Vim to Emacs+Evil chaotic migration guide](http://juanjoalvarez.net/es/detail/2014/sep/19/vim-emacsevil-chaotic-migration-guide/)
- [Setting up Emacs as Ruby development environment on OSX](http://crypt.codemancers.com/posts/2013-09-26-setting-up-emacs-as-development-environment-on-osx/)
- [Vim in Emacs Bootstrap](http://bling.github.io/blog/2013/09/09/vim-in-emacs-bootstrap/)
- [Configuring emacs and evil mode for Go development](http://jen20.com/2015/02/06/configuring-emacs-for-go-part-1.html)


### Elixir

- [Spacemacs and Alchemist to make Elixir of immortality](http://www.zohaib.me/spacemacs-and-alchemist-to-make-elixir-of-immortality/)

### Elisp links

* [Emergency Elisp](http://steve-yegge.blogspot.in/2008/01/emergency-elisp.html) -
  excellent tutorial for elisp by Steve Yegge

### org-mode

- [Emacs org-mode examples and cookbook](http://ehneilsen.net/notebook/orgExamples/org-examples.html)
- [Getting Started With org-mode](https://www.youtube.com/watch?v=SzA2YODtgK4)

### Paredit

- [The Animated Guide to Paredit](http://danmidwood.com/content/2014/11/21/animated-paredit.html)
- [Paredit refcard](http://pub.gajendra.net/src/paredit-refcard.pdf)

