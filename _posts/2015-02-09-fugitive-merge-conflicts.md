---
layout: post
title: "Fixing git merge conflicts from vim using vim-fugitive"
date:  2015-02-09 11:40:21
categories: git, vim
---

The [vim-fugitive](https://github.com/tpope/vim-fugitive)
plugin is very useful when it comes to
working with git from vim.
Whenever I run into a merge conflict,
I always have trouble remembering the exact steps
needed to resolve them.
There's an excellent
[Vimcasts video](http://vimcasts.org/episodes/fugitive-vim-resolving-merge-conflicts-with-vimdiff/),
explaining this in detail,
but this post will be a quick cheatsheet
on what to do to resolve a conflict.

The scenario is that we're on the master branch
and trying to merge `my-feature-branch` into master
using `git merge my-feature-branch`.
The same two lines have been edited on both branches,
so we have a merge conflict.

If you have vim-fugitive installed,
you can open the diff using the `:Gdiff` command.
This opens 3 buffers,
with the target branch (ie. master)
on the left,
and the merge branch on the right.
The central buffer shows the file with the conflict markers.
The unmerged file in the middle buffer
would look something like this:

{% highlight text %}
no conflicts here
problem starts after this line

<<<<<<< HEAD
this is from the current branch - master
let's call this the target branch
=======
this is from the feature branch we're trying to merge
we want this line to be present after the merge
>>>>>>> my-feature-branch

no conflicts here either
{% endhighlight %}

If you look at the filenames
at the bottom of the left and right buffers,
you'll see something like this:

{% highlight text %}
Left:  /path/to/repo/.git//2/foo.txt
Right: /path/to/repo/.git//3/foo.txt
{% endhighlight %}

Note the `2` and `3` that are the part of the path.
We can use partial buffer names,
ie. `//2` and `//3`,
to refer to the buffers
when we want to pick one of the changes from those buffers.
(The numbers there could be different for your buffers,
so edit the commands below accordingly.)

We want the changes from the feature branch to be kept,
and delete the rest.
To do this,
keep the cursor on the first line of the conflict marker,
ie. the line with `<<<<<<< HEAD` on it.

Now run the `diffget` command with the name of the buffer
that you want to merge in.
In the above example,
we wanted to keep the changes from the feature branch,
which contains `//3` in the buffer name.
So we can run the command
`:diffget //3`
to get the changes into the middle buffer.

This will mess with how the diffs get displayed,
so you can run `:diffupdate` to refresh the diffs.
If you're using the
[vim-unimpaired plugin](https://github.com/tpope/vim-unimpaired),
you can navigate between changesets
with `]c` and `[c`.

Once you've fixed all the conflicts,
keep only the merged buffer open,
and close the other buffers.
(Running the `:only` command
will close all buffers except the currently active one.)
You can now save and commit the file
with the conflicts resolved.

