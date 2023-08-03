---
layout: post
title: "Highlighting liquid code in Jekyll"
date:  2023-08-02
categories: jekyll
---

Recently I discovered that
any liquid code we put in a Jekyll post
gets evaluated by the liquid engine.
This means that if you put in
[a code snippet for listing posts](/posts/jekyll-posts-by-year/),
you will see the actual HTML rendered,
with all the posts.

As an example,
try putting some liquid tags inside a markdown code block:

```liquid
{%raw %}{{ "foo" | upcase }}{% endraw %}
```

This is going to look like this:

```
FOO
```

So how are we seeing the raw liquid code above?
There are two ways
we can prevent liquid code from being evaluated.

The first option is to
**wrap the code in the
<code>&#123;&#37; raw &#37;&#125;</code> tag**.
This would look like this:

{% assign open = '{%' %}

```liquid
{% raw %}{% raw %} {{ "foo" | upcase }}{% endraw %} {{ open }} endraw %}
```

The second option is to **use HTML entities**
like `&#123;` and `&#125;`
for the opening and closing curly braces, respectively.
We would need to type something like this
in the markdown file:

```liquid
&#123;&#123; "foo" | upcase &#125;&#125;
```

Unfortunately,
if we put this
inside markdown fenced code blocks
using <code>&#96;&#96;&#96;</code>,
the actual entity will be rendered as-is
rather than the intended character.
We will need to explicitly wrap the code
with
<code>&lt;pre&gt;</code>
and
<code>&lt;code&gt;</code>
tags
to make this work.

## Meta problem: How do we print the raw/endraw tags?

At this point,
you might be wondering:
If the raw/endraw tags
are used to escape the other tags,
how is the <code>&#123;&#37; endraw &#37;&#125;</code> tag
appearing on this page?
Because if you tried wrapping 
<code>&#123;&#37; endraw &#37;&#125;</code>
itself inside another set of raw/endraw tags,
it will look like this:

```liquid
{{ open }} raw %}{{open}} endraw %}{{ open }} endraw %}
```

The first endraw tag
will terminate the block,
and we will end up with a liquid error!

To solve this problem,
we will need to break up these tags
so that the opening tag token "`{{ open }}`"
is a separate liquid variable.
You might want to put this line
before the code block,
or it will appear as an empty line.

```liquid
{% raw %}{% assign open = "{%" %}{% endraw %}
```

Now to render
the <code>&#123;&#37; raw &#37;&#125;</code> tag,
we can do something like this:

```liquid
{% raw %}{{ open }} raw %}{% endraw %}
```

We can now go back to
printing the code
with raw and endraw tags.
To display the string
"<code>&#123;&#37; raw &#37;&#125;&#123;&#37; endraw &#37;&#125;&#123;&#37; endraw &#37;&#125;</code>",
we need to write:

```liquid
{% raw %}{{ open }} raw %}{{ open }} endraw %}{{ open }} endraw %}{% endraw %}
```

In case you are wondering,
what kind of liquid code
did it take to print
the code block above,
here you are:

```liquid
{{ open }} raw %}{% raw %}{{ open }} raw %}{{ open }} endraw %}{{ open }} endraw %}{% endraw %}{{ open }} endraw %}
```

Now, we really have to stop.
If you're curious
what it took to print this line,
you can always look up
[the markdown code for this post](https://github.com/nithinbekal/nithinbekal.github.io/blob/master/_posts/2023-08-02-jekyll-liquid-highlight.md).

Here are a couple of other articles
that helped me figure out
how to escape liquid tags in Jekyll.
(Bonus: you can look at their markdown source
to see it in action.)

- [Writing the endraw tag in Jekyll code blocks](https://blog.slaks.net/2013-06-10/jekyll-endraw-in-code/)
  ([markdown](https://raw.githubusercontent.com/SLaks/SLaks.Blog/gh-pages/_posts/2013-06-10-jekyll-endraw-in-code.md))
- [Liquid 'raw' Tag and Fenced Code Blocks](https://rmaicle.github.io/posts/71xXldY8KeKXWgw)
  ([markdown](https://github.com/rmaicle/rmaicle.github.io/blob/master/_posts/jekyll/2014-11-12-Liquid%20'raw'%20Tag%20and%20Fenced%20Code%20Blocks.md))

---

PS. I couldn't help it.
Here's the liquid code for that last code block.
This time, I really am done! ;)


```liquid
{% raw %}{{ open }} raw %}{% raw %}{{ open }} raw %}{{ open }} endraw %}{{ open }} endraw %}{% endraw %}{{ open }} endraw %}{% raw %}{{ open }} endraw %}{% endraw %}
```

