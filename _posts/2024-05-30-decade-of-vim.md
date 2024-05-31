---
layout: post
title: "A decade of vim"
date: 2024-05-30
categories: vim
og_image: decade-of-vim.png
---

Almost exactly 10 years ago,
I started using vim as my main text editor.
I wrote a version of this article
when I'd been [using Vim for a year](/posts/one-year-with-vim/),
so it was fun to look back
at how I used it back then.

## Evolution over 10 years

Thinking back to 2014,
a lot has changed about how I use vim,
most notably the fact that
I technically don't use vim anymore,
because I use neovim! 😉

**Neovim**

Almost 7 years ago,
[I replaced vim with neovim]( https://github.com/nithinbekal/dotfiles/commit/65ee0730efa12aa4ded5aef28435d4dd07e937f7),
and have never looked back.
It's faster,
has better defaults
and has excellent LSP support.
It is backwards compatible with vim,
so I was able to switch to it without changing
a single line of my `.vimrc`
and then slowly migrated
to neovim-specific config.

**Lua for config**

The move to Neovim meant that
I was no longer tied to vimscript,
which is one of the less enjoyable languages
I've had to use.
Instead, you can use lua,
a more modern and less quirky language.
About a year ago,
[I rewrote my config in Lua](https://github.com/nithinbekal/dotfiles/pull/2).

**Ctags to LSP**

For a long time,
I relied on ctags to be able to navigate codebases.
Unfortunately, it wasn't too reliable
and the setup was too finicky.

The language server protocol
was introduced in VS Code,
and has since become the most popular, editor-agnostic way
of adding IDE like features to any editor.
LSP now provides a much more effective way
to navigate codebases,
alongside providing other benefits
like highlighting syntax and linter errors,
better syntax highlighting,
and dimming type signatures.

**From tmux to vim terminal**

Tmux used to be an important part of my workflow.
It allowed me to spin up multiple panes
with all the project dependencies
(vim, console, server, background jobs)
with a simple command.
However, nowadays neovim's built in terminal is good enough
that I just open a terminal pane
for the shell, dev console or running tests.
Anything that I don't need to see
(like servers and background jobs)
can always run in a separate terminal window.

**Mouse**

When I started with vim,
I was pretty fanatical
about doing things The Vim Way ™️
and not leaving the home row.
I had even disabled arrow keys,
But these days,
I've even enabled mouse scrolling in the editor.
When working with large files in unfamiliar codebases,
it's much easier to sit back and scroll with the mouse
than navigate with the keyboard.

**Plugins**

Moving to neovim meant that
I could now use a whole new set of lua plugins
that weren't available to me before.
Aside from a set of plugins from the legendary [tpope](https://github.com/tpope?tab=repositories),
almost all of the plugins have been replaced by newer ones.

**Macros**

A couple of years ago,
I got to attend a vim workshop
from [Drew Neill of Vimcasts fame](http://vimcasts.org/).
Before then, I had used macros occasionally,
but I hadn't realized how powerful they can be.
This has made text manipulation so much easier.

**VS Code**

At work, I often pair program with others.
VS Code is the standard editor at work,
so I often find myself using it during pairing sessions.
I've set up neovim integration in it,
so I'm still using vim keybindings.

## What's next?

My config has been constantly evolving,
but there's not much I want to drastically change
aside from wanting to try
[nvim-dap](https://github.com/mfussenegger/nvim-dap),
a Debugger Adapter Protocol client
that lets you use neovim to debug code
via breakpoints and stepping through the code.

A lot has changed in the 10 years
since I started using vim.
I hope that in the next 10 years
I'll learn just as much about this wonderful editor
as I did in the past decade.

In the first draft of this post,
I had a section on getting started with vim,
similar to the section in my
[one year with vim](/posts/one-year-with-vim/) post.
Eventually it grew long enough
that I've moved into a separate post
which I'll post some other day.
