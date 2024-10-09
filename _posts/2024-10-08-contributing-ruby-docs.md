---
layout: post
title: "Contributing to Ruby docs"
date:  2024-10-08
categories: ruby
og_image: contributing-ruby-docs.png
---

Last week,
I came across a few small improvements
that I could make to the Ruby docs.
In the past,
I've found the idea of contributing to the Ruby repo quite daunting,
but I found that it's actually pretty straightforward.

I made some notes about the steps
to get things set up locally,
and I'm sharing these here
in the hope that
I can convince someone else
how easy it is to contribute!

## Getting set up to make changes to docs

First, I forked the ruby repo,
and cloned my fork:

```bash
git clone git@github.com:nithinbekal/ruby.git
```

Before I could run the configure scripts,
I had to install `autoconf`:

```bash
brew install autoconf
```

Next, you generate the configure script:

```bash
./autogen.sh
```

And then run the configure script:

```bash
./configure
```

We need a build directory
where we can generate the documentation site:

```bash
mkdir build && cd build
```

And finally,
we can generate the HTML docs.
The first run of this command will take some time,
but subsequent runs should be faster.

```
make html
```

This will display a link to the generated documentation.
We can now make changes to the inline YARD docs
for methods and classes,
and run the `make html` command
to update the generated docs
and verify that everything renders correctly.

## Tips

- To make changes to the style of the docs,
  you'll need to update the theme in [ruby/rdoc](https://github.com/ruby/rdoc)
  which gets synced with the main repo.
- To update the [Ruby language website](https://www.ruby-lang.org/en/),
  you'll need to fork [ruby/www.ruby-lang.org](https://github.com/ruby/www.ruby-lang.org).
- Now that Ruby has extracted some gems
  out of the stdlib,
  some of the docs need to be updated
  in the gems' own repo,
  even though ruby/ruby also contains that code.
  - This happened when I tried
    [updating the docs for `Benchmark.realtime`](https://github.com/ruby/benchmark/pull/25)
    in the [ruby/ruby](https://github.com/ruby/ruby) repo.
    Turns out I needed to update
    the docs in the [ruby/benchmark](https://github.com/ruby/benchmark) repo,
    which periodically gets synced into the main repo.

## Wrapping up

I recently came across the article,
[Why is language documentation still so terrible?](https://walnut356.github.io/posts/language-documentation/),
which is what prompted me to look for ways to improve Ruby docs.
I was blown away by how quickly
the core team reviewed and merges my PRs.
I hope this little how-to
helps you contribute to the docs too!
