
# nithinbekal.com

This repository contains the Jekyll theme and content of my blog.

### Want to use this theme?

* Remove the existing content

```
$ rm -rf about notes slides _posts keybase.txt CNAME
```

* Create new posts directory

```
$ mkdir _posts
```

* Edit the details from `_config.yml`. Make sure you leave the Disqus and
  Google Analytics configs blank if you don't use them.
* Change title in `index.html`

### Rake tasks

There are two rake tasks - `rake post` and `rake page` which prompt for
metadata and generate the markdown files.

