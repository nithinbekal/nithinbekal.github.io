
# nithinbekal.com

This repository contains the Jekyll theme and content of my blog.

### Want to use this theme?

* Remove the existing content

{% highlight bash %}
$ rm -rf about notes slides _posts keybase.txt CNAME
{% endhighlight %}

* Create new posts directory

{% highlight bash %}
$ mkdir _posts
{% endhighlight %}

* Edit the details from `_config.yml`
* Change title in `index.html`
* Remove Google Analytics code at the end of `_layouts/default.html`

### Rake tasks

There are two rake tasks - `rake post` and `rake page` which prompt for
metadata and generate the markdown files.

