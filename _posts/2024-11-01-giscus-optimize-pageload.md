---
layout: post
title: "Optimizing page loads for Giscus comments"
date: 2024-10-30
og_image: giscus-optimize-pageload.jpg
categories:
- jekyll
- javascript
---

A few months ago,
I removed Disqus comments from this blog,
and replaced it with [Giscus](https://giscus.app/),
which uses Github discussions for blog comments.
When I checked the pagespeed scores of this site recently,
I was surprised to see the relatively low scores.

The score was 78 on desktop and 88 on mobile.
For a blog this lightweight,
I'd have thought the scores would be in the 90s.
Turns out that the Giscus JS snippet
was adding about 330ms of blocking time
to the page load.

## Replacing the script

The script below is what you get
when you set up Giscus.
With the `data-loading="lazy"` attribute,
it actually does a great job
of not loading things until you scroll down,
but even loading the script has a cost.

```html
<script src="https://giscus.app/client.js"
        data-repo="[ENTER REPO HERE]"
        data-repo-id="[ENTER REPO ID HERE]"
        data-category="[ENTER CATEGORY NAME HERE]"
        data-category-id="[ENTER CATEGORY ID HERE]"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="0"
        data-emit-metadata="0"
        data-input-position="top"
        data-theme="dark"
        data-lang="en"
        data-loading="lazy"
        crossorigin="anonymous"
        async>
</script>
```

This can be replaced by an inline snippet
that waits for a bit
before attaching this script tag to the DOM.
First let's write a function
that adds the script tag to the page:

```html
<!-- This is where the comments will appear. -->
<div id="comments"></div>

<script>
function loadGiscusComments() {
  var script = document.createElement('script');
  script.src = "https://giscus.app/client.js";
  script.async = true;
  script.crossOrigin = "anonymous";

  script.setAttribute("data-repo", "nithinbekal/nithinbekal.github.io");
  script.setAttribute("data-repo-id", "MDEwOlJlcG9zaXRvcnkxODgzMjgxNg==");
  script.setAttribute("data-category", "Comments");
  script.setAttribute("data-category-id", "DIC_kwDOAR9dsM4CfG1P");
  script.setAttribute("data-mapping", "pathname");
  script.setAttribute("data-strict", "1");
  script.setAttribute("data-reactions-enabled", "0");
  script.setAttribute("data-emit-metadata", "0");
  script.setAttribute("data-input-position", "top");
  script.setAttribute("data-theme", "transparent_dark");
  script.setAttribute("data-lang", "en");
  script.setAttribute("data-loading", "lazy");

  document.getElementById("comments").appendChild(script);
}
</script>
```

Next, we'll trigger this function
either when the user scrolls the page,
or after 5 seconds after page load.

```javascript
// function loadGiscusComments() { ... }

var scriptLoaded = false;
function loadCommentScriptOnce() {
  if (!scriptLoaded) {
      loadGiscusComments();
      scriptLoaded = true;
  }
}

setTimeout(loadCommentScriptOnce, 5000);
window.addEventListener("scroll", loadCommentScriptOnce);
```

See the commit here: [Load Giscus after 5s or on scroll](https://github.com/nithinbekal/nithinbekal.github.io/commit/c284a03f2f44cd5672009219800f864f78ae770c#diff-e224579ed0344a76bb3837aa2d28776274c7b0f5b201514e010cc8b3277e0b74R3)

## Improvements

Once I put in the new snippet,
the pagespeed scores improved significantly,
including a 100 pagespeed score for desktop.

**Lighthouse scores**
- Desktop: 100 (previously 78)
- Mobile: 97 (previously 88)

**Total blocking time**
- Desktop: 20ms (previously 530ms)
- Mobile: 180ms (previously 460ms)

## Links

I came across
[More tips for using giscus](https://www.brycewray.com/posts/2022/07/more-tips-using-giscus/)
by Bryce Wray,
which takes another approach to this,
by only loading the comments
when someone clicks a "Show comments" button.

Another idea there was to
[use `preconnect` and `dns-prefetch` resource hints](https://www.brycewray.com/posts/2022/07/more-tips-using-giscus/#give-the-browser-a-head-start).
I might look into that at some point,
but for now I'm happy with how fast the page load is.
