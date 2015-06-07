---
layout: post
title: 'Single quotes or double quotes?'
date: 2014-02-04 12:00:00
categories:
  - programming
---
The single quote has been under attack today. (In my team, at least). I saw this in the our team chatroom this morning:

> Why do we need to follow the "always use single quotes, unless you need interpolation" rule in our coding conventions? Why not use double quotes everywhere?

What insolence! How dare anyone question a convention we have followed religiously for <strike>years</strike> months!

The [community maintained Ruby style guide](https://github.com/bbatsov/ruby-style-guide) prefers the former, while the [Github styleguide](https://github.com/styleguide/ruby) recommends the use of double quotes everywhere. Github's convention does make sense. We need double quotes for interpolation anyway, so using them everywhere makes it consistent.

However, for me, a single quote says that the string doesn't have any interpolation magic going on inside. When I see double quotes, I immediately scan the string for expressions that are being interpolated.

For now, I've managed to save the single quotes in our codebase. Frankly though, there is no "right" option here. As I've mentioned in a similar pointless rant on [tabs vs spaces](http://nithinbekal.com/posts/indentation/), pick whatever convention the team agrees on, and then follow it consistently.

So why did I spend half an hour in the chat room defending the single quote and then write a blog post about it, you ask? I'm wondering that myself.

### Some Ruby style guides

* [Community-driven Ruby coding style guide](https://github.com/bbatsov/ruby-style-guide)
* [Github Ruby style guide](https://github.com/styleguide/ruby)
* [Xavier Shay's Ruby style guide](http://xaviershay.github.io/writing/docs/ruby_style_guide.html)
