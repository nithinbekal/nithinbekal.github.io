---
layout: page
title: "Vim Tips"
date:  2017-10-20 15:05:55
---

Random tips and tricks based on [my vim config](https://github.com/nithinbekal/dotfiles/blob/master/vimrc)

## Find and replace in project

- Grep for the string: `:grep string_i_wanna_replace`
- the grep will load the quickfix list with files containing the string
- `:cdo %s/string_i_wanna_replace/new_string/g | update`

Refer:

- Vimcast: [Project-wide find and replace](http://vimcasts.org/episodes/project-wide-find-and-replace/)
- Ref: [Vim's new `:cdo` command](https://chrisarcand.com/vims-new-cdo-command/)
