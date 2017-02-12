---
layout: page
title: "Python"
---

Python 2.7.10 comes packages with OS X El Capitan.
To install the latest version from homebrew:

{% highlight bash %}
brew install python

# pip and setuptools are already installed
pip install --upgrade pip setuptools

# Install virtualenv
pip install virtualenv
{% endhighlight %}

Scikit learn

{% highlight bash %}
pip install -U scikit-learn
brew install homebrew/python/numpy
brew install homebrew/python/scipy
{% endhighlight %}

Numpy depends on gcc, and if it isn't installed, homebrew will try to download
and compile it from source, which could take an hour or more to compile.

### Flask

{% highlight python %}
sudo easy_install pip

brew install python
pip install virtualenv

mkdir foo-project
cd foo-project

virtualenv venv
. venv/bin/activate

python app.py
{% endhighlight %}

### Numpy

- [Guide to Numpy](http://csc.ucdavis.edu/~chaos/courses/nlp/Software/NumPyBook.pdf) [PDF]
  by Travis E. Oliphant
