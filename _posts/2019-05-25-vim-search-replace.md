---
layout: post
title: "Vim: Search and Replace Across All Project Files"
date:  2019-05-25 12:00:00
categories: vim
---

TLDR:
The `grep` and `cfdo` commands
let you easily perform
search and replace
across all files in a project.
To replace the string `original_string`
with `new_string`,
run this in command mode.

```
:grep original_string
:cfdo %s/original_string/new_string/g | write
```

---

Although I've been using Vim for years,
I keep forgetting
the exact commands
to perform a search and replace
across all project files,
and keep having to look it up.

Let's walk through
what exactly is going on
in the two commands listed above.

```vim
:grep original_string
```

The first command is easy enough -
`grep` searches for the given string
across all files in the project
and loads the results into a quickfix list.
You can look at the results
by opening the quickfix window using `:copen`.

```vim
:cfdo %s/original_string/new_string/g | write
```

The `cfdo` command is
a fairly recent addition to Vim -
it was only introduced in Vim 7.4.
It runs the given command
on each file in the quickfix list.

The command being executed is pretty simple.
The first part is a typical vim substitute command.
The bar (`|`) is the separator character in vim -
it lets us execute two commands in a single line.
`write` is the same as doing `:w` in command mode.
(You could also abbreviate that to `w` there.)
