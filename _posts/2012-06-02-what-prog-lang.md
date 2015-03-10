---
layout: post
title: "What's This Programming Language?"
date: 2012-06-02 12:00:00
redirect_from:
  - /2012/whats-this-programming-language/
categories: programming
---

A couple of weeks ago, I came across the site "[What's that programming language?](http://wtpl.heroku.com/)", in which you're shown a snippet of code and you have to identify the programming language.

I looked around to see if there was a way to do the reverse, ie. identify the language, given a snippet of code. Since I have no idea how to actually parse code and do this, I tried doing this using the highlight.js syntax highlighting library. Highlight.js has a [highlightAuto() method](http://softwaremaniacs.org/wiki/doku.php/highlight.js:api) that can be used as a simple way of doing this.

[See the demo here.](http://demo.nithinbekal.com/what-prog-lang/)

The highlightAuto() method tries to highlight the snippet using all available languages and returns the language for which it identifies most syntactic structures. Obviously, longer code snippets are more likely to be identified.

You can [fork the code for the demo on Github](https://github.com/nithinbekal/what-prog-lang). Feel free to send in a pull request if you've made improvements to the demo. :)

## Links

* [Demo: identify the programming language using highlight.js](http://demo.nithinbekal.com/what-prog-lang/)
* [Fork the demo code on Github](https://github.com/nithinbekal/what-prog-lang)
* [Highlight.js website](http://softwaremaniacs.org/soft/highlight/en/)
* The [What's that programming language?](http://wtpl.heroku.com/) quiz that gave me this idea
* ...and the [discussion on Hacker News](http://news.ycombinator.com/item?id=3967488)
