---
layout: post
title: "One Year With Vim"
date:  2015-05-22 21:13:24
categories: vim
---

It's been exactly one year
since I started using vim
as my primary editor.
I had tried using it before,
but never got to the point
where I could be productive
with my everyday work.

Earlier,
I had tried to learn it outside of work
so that my productivity wouldn't be affected.
Because of that,
I wasn't using vim in places
where it would have the greatest impact.
This time,
I dove right in.
I started using it all the time.
This forced me to learn things
that I needed most
when writing code.

Instead of memorizing shortcuts,
I was learning how to perform specific actions.
Instead of learning scary commands like
`:vnew` or `:10j`,
I was focused on figuring out things like
"how do I open a new editor pane in a vertical split",
or "how do I move down 10 lines?".

The one area
where I found vim really shines
is all those things you do
when you're not actually writing code -
things like navigation,
moving blocks of code
or even having your git workflow
mostly within the editor.

# Looking to get started with vim?

If you're thinking of trying out vim,
here's some of the things I learned
when getting started with vim.

**Vimtutor** is a great way
to get comfortable
with the basic actions within vim.
It is a terminal program
that shows you a vim tutorial
and lets you learn
by editing the text within itself.
If you have vim installed on your machine,
just enter `vimtutor` on the terminal
to start the tutorial.

**Start with one of the graphical vims**
(like Macvim or Gvim).
These will allow you
to use the mouse to select text or scroll down,
or save files with ctrl+S.
This will take away
a lot of the frustration
of getting to know vim.
(That said,
give terminal vim a shot later on.
I've moved almost exclusively
to terminal vim
because it works much better
with my workflow using Tmux.)

**Don't obsess over The Vim Way**
of doing things just yet.
The closer you are to your current current editor
the less overwhelming
the learning curve will be.
Once you're comfortable with
the most common features,
you can learn more advanced features
at your own pace.

Install some plugins that will
**make it more like to your current editor**.
Need a file explorer in the sidebar?
Try [Nerdtree](https://github.com/scrooloose/nerdtree).
Missing the Ctrl+P shortcut
that you love so much in Sublime/Textmate?
Use the [Ctrl-P](https://github.com/kien/ctrlp.vim) plugin.

**Install a plugin manager like [Vundle](https://github.com/gmarik/Vundle.vim).**
This will help you
quickly install the plugins you need.
Instead of figuring out
how to get different plugins working,
you can just set up vundle
and let it take care of
managing the plugins.

**Copy someone else's vimrc.**
Having a full fledged vimrc
when you're starting out
is a huge advantage.
(Mine's available on [github](https://github.com/nithinbekal/dotfiles), btw.)
That will help with all the basic settings
that you will miss
on a fresh install of vim.

Just before getting started with vim,
I had watched
**Ben Orenstein's excellent talk on
[expert level vim](https://www.youtube.com/watch?v=SkdrYWhh-8s)**.
I copied over his vim configuration
and started trying out some of the shortcuts
he showed off in the talk.
This helped improve my productivity in those early days.

**Try out [ctags](http://andrew.stwrt.ca/posts/vim-ctags/)**
once you've spent some time on vim.
Being able to navigate
to a function definition
by hitting `ctrl-]`
is pretty sweet.
Once you're used to
navigating with ctags,
you wouldn't ever want to
navigate by opening files.

**Learn to navigate vim documentation.**
This is one of the most important ways
that you can improve your productivity with vim.
Say you want to find out what the `}` key does.
You can enter the command `:help }`
and you'll see the documentation for that shortcut.

# Wrapping up

Despite using vim for a year,
I feel like I have only
scratched the surface of
what I could learn to do with it.
Still I'm more comfortable with it
than I was with any editor
I've used before.

Even if you don't want to use vim regularly,
simply playing around with it
can be a lot of fun
because it treats editing of text
so differently than most other editors.

Happy hacking!

# Further reading/watching

* [Everyone Who Tried to Convince Me to use Vim was Wrong](http://yehudakatz.com/2010/07/29/everyone-who-tried-to-convince-me-to-use-vim-was-wrong/)
* [Video: Write Code Faster: Expert-Level Vim](https://www.youtube.com/watch?v=SkdrYWhh-8s)
* [A Byte of Vim](http://www.swaroopch.com/notes/vim/) - a book that teaches you how to use vim effectively

