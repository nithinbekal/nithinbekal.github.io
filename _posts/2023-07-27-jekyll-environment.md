---
layout: post
title: "Jekyll: Skip analytics scripts in development"
date:  2023-07-27
categories: jekyll
---

When [updating this site](/posts/dark-mode/),
I was looking for a way
to skip rendering some scripts locally.
For example, you might not want
Google Analytics to record
every local page visit
you make when proofreading a post,
or hide the Disqus comments section.

Jekyll exposes the [environment](https://jekyllrb.com/docs/configuration/environments/)
that it is running in
via `jekyll.environment`.
This means that you can skip these scripts locally
by doing something like this:

```liquid
{% raw %}{% if jekyll.environment == "production" %}
  <!-- script goes here -->
{% endif %}{% endraw %}
```

If you're using Github Pages,
the environment is already set as `production` for you.
However, if you are compiling it for production yourself,
you can set the `JEKYLL_ENV` environment variable
when running `jekyll build`.

```bash
JEKYLL_ENV=production jekyll build
```
