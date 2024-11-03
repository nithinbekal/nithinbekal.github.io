
# nithinbekal.com

This repository contains the Jekyll theme and content of my blog.

### Want to use this theme?

* Remove the existing content

```
$ rm -rf about notes slides _posts/*.md keybase.txt CNAME resume.html
```

* Edit the details from `_config.yml`.
  Make sure you leave the Google Analytics config blank
  if you don't use it.
* Change title in `index.html`

### Rake tasks

- `rake draft`:
  Creates a draft post in `_drafts`.
- `rake publish`:
  Prompts to pick a file from the `_drafts` folder,
  and publishes that to `_posts`.
- `rake unpublish`:
  Moves a file from `_posts` to `_drafts`.
