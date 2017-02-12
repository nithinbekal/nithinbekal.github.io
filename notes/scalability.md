---
layout: page
title: "Scalability"
date:  2016-10-10 19:20:29
---

- [High Scalability - All Time Favorites](http://highscalability.com/all-time-favorites/)
- [How Shopify Scales To Handle Flash Sales From Kanye West And The Superbowl](http://highscalability.com/blog/2015/11/2/how-shopify-scales-to-handle-flash-sales-from-kanye-west-and.html)
  (2015)
- [Instagram Architecture Update: What’s New With Instagram?](http://highscalability.com/blog/2012/4/16/instagram-architecture-update-whats-new-with-instagram.html)
  (2012)
- [Why Are Facebook, Digg, And Twitter So Hard To Scale?](http://highscalability.com/blog/2009/10/13/why-are-facebook-digg-and-twitter-so-hard-to-scale.html)
  (2009)
  - **Pull on demand** -
    "To find out if one of your friends has added a new favorite band Facebook
    actually queries all your friends to find what's new. They can get away
    with this but because of their awesome infrastructure."
    - Difficult when there are lots of followers. FB has a 5000 friend limit.
  - **Push on change** - when user makes a change, it is pushed out to all followers.
    - changes are stored in each user's account
    - works better for large number of followers, eg. Twitter, Digg.
- [High Scalability: Google Architecture](http://highscalability.com/google-architecture)
  (2008)
- [What are the scaling issues to keep in mind while developing a social network feed?](https://www.quora.com/What-are-the-scaling-issues-to-keep-in-mind-while-developing-a-social-network-feed/answer/Ari-Steinberg)
- [Scaling Online Social Networks without Pains](http://netdb09.cis.upenn.edu/netdb09papers/netdb09-final3.pdf)
  (PDF)

Rails

- [What if I Tell You That Ruby on Rails Is Scalable](https://rubygarage.org/blog/ruby-on-rails-is-scalable)

Shopify

- [Shopify in Multiple Datacenters (Simon Eskildsen) - Full Stack Fest 2016](https://www.youtube.com/watch?v=7UyDK2bDjc4&list=WL&index=2)
