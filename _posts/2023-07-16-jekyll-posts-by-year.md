---
layout: post
title: "Jekyll: Group posts by year"
date:  2023-07-16
categories: jekyll
---

Recently,
[I changed the layout of the home page](/posts/dark-mode/)
of this blog
to group posts by year
rather than having one long list of posts.
I had to spend some time looking this up,
but it turns out Jekyll has a way
to group an array by using an expression.

```liquid
{% raw %}{% assign years = site.posts
   | group_by_exp: "post", "post.date | date: '%Y'"
%}{% endraw %}
```

Now you can use this grouped array
to iterate over years like this:

```liquid
{% raw %}{% for year in years %}
  <p>{{ year.name }}</p>

  <ul>
    {% for post in year.items %}
      <li>
        <a class='title' href='{{ post.url }}'>{{ post.title }}</a>
      </li>
    {% endfor %}
  </ul>
{% endfor %} {% endraw %}
```

Here's a screenshot of the home page of this blog
with the new and old versions:

![Jekyll posts grouped by year](/images/dark-mode-theme-vs-light-mode-home-page.png)

### Links

- [Jekyll Liquid filters](https://jekyllrb.com/docs/liquid/filters/)
- [Liquid markup for yearly groupings for this blog](https://github.com/nithinbekal/nithinbekal.github.io/blob/v2.0.0/index.html#L21-L40)
