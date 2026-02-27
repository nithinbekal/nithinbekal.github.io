---
title: Minimal Sorbet setup with inline RBS comments
layout: post
categories:
  - ruby
  - sorbet
date: 2026-02-01
og_image: minimal-sorbet-rbs-setup.png
---

I've been working through the fantastic [Crafting Interpreters](https://craftinginterpreters.com/contents.html) book, and implementing the [Lox interpreter in Ruby](https://github.com/nithinbekal/rlox). I wanted a minimal type checking setup for the code, so I decided to configure sorbet with RBS comment syntax.

First, we add the `sorbet` and `tapioca` gems to the `Gemfile`.

```ruby
gem "sorbet"
gem "tapioca", require: false
```

Next, we add a `sorbet/config` file that includes all the arguments that we would pass when running the `srb typecheck` command:

```
--dir
lib
--enable-experimental-rbs-comments
```

And that's basically it! You can now type check your Ruby codebase with `bundle exec srb typecheck`.

Based on my experience [adding Sorbet to a Rails app](https://nithinbekal.com/posts/sorbet-rails/) in the past, I expected this to be more cumbersome. Having seen how straightforward it is to get started, I think sorbet is going to be part of even my smaller Ruby projects.
