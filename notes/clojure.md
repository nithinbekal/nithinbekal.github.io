---
layout: page
title: "Clojure"
date:  2014-09-28 21:13:10
---

Installation:

- [Setting up Clojure on OS X](https://gist.github.com/technomancy/2395913)
- [Setup notes from Nilenso Clojure workshop](https://github.com/nilenso/clojure-workshop/blob/master/preparation.md)
  (includes editor setup)
- [Screencast: Clojure+Vim Basics](https://hashrocket.com/blog/posts/screencast-clojure-and-vim-basics)

{% highlight bash %}
brew install leiningen
lein repl
{% endhighlight %}

Example code:

(ref: [Stuart Holloway: Introduction to Clojure](https://vimeo.com/68375202))

{% highlight clojure %}
(println "Hello, world")

(defn hello
  "Returns a greeting"
  [name]
  (str "Hello, " name))

;; vectors
(def v [42 :rabbit [1 2 3]])
(v 1) -> :rabbit
(peek v) -> [1 2 3]
(pop v) -> [42 :rabbit]
(subvec 1) -> [:rabbit [1 2 3]]

;; maps
(def m { :a 1 :b 2 :c 3 })
(m :b) -> 2
(:b m) -> 2
(keys m) -> (:a :b :c)
(assoc m :d 4 :c 42) -> {:d 4, :a 1, :b 2, :c 42}
(dissoc m :d) -> {:a 1 :b 2, :c 42}
(merge-with + m {:a 2 :b 3}) -> {:a 3 :b 5 :c 42}

(def user {:name "John Doe"
           :address {:zip 123456}})
(get-in user [:address :zip])
(assoc-in user [:address :zip] 123567)
-> {:name "John Doe", :address {:zip 123567}}
{% endhighlight %}

Clojure related bookmarks:

- [Try Clojure](http://tryclj.com/) - browser based REPL
- [Grimoire - Community Clojure Documentation](https://www.conj.io)
- [The Clojure Toolbox](http://www.clojure-toolbox.com) -
  A categorised directory of libraries and tools for Clojure
- [Clojure Styleguide by @bbatsov](https://github.com/bbatsov/clojure-style-guide)
- [Clojure Koans](http://clojurekoans.com/)
- [4Clojure](http://www.4clojure.com/) - interactive problems similar to Project Euler

Books and tutorials

- [Clojure for the Brave and True](http://www.braveclojure.com/) - beginner level Clojure book
- [Clojure From the Ground Up](http://aphyr.com/posts/301-clojure-from-the-ground-up-welcome)
- [Clojure Distilled](http://yogthos.github.io/ClojureDistilled.html)

Videos:

- [Rich Hickey's Greates Hits](https://changelog.com/rich-hickeys-greatest-hits/)
- [Timothy Baldridge's Clojure Videos](https://www.youtube.com/channel/UCLxWPHbkxjR-G-y6CVoEHOw/videos)

Emacs integration

- [Clojure, Emacs and Cider](https://mping.github.io/2015/11/17/clojure-emacs-cider.html)
- [Cider - Using the REPL](https://github.com/clojure-emacs/cider/blob/master/doc/using_the_repl.md)

