---
layout: post
title: Set up Git on Windows
date: 2010-08-31 12:00:00
redirect_from:
  - /2010/installing-git-and-pushing-repo-to-github/
categories: git, programming
---
In this post, I will describe the steps to install git on a windows machine, create a local repository, and then push that repo to your github account. This is a beginner level tutorial for those using windows, but except for the part about installation, it is common for all OSes.

<h2>Installation and set up</h2>

Download and install msysgit from [http://msysgit.github.io/](http://msysgit.github.io/). Msysgit comes with a GUI tool and a command line version.

Next you have to set up your name and email into git configuration. For this, open git bash and use the following commands:

{% highlight bash %}
$ git config --global user.name "Nithin Bekal"
$ git config --global user.email me@myemail.com
{% endhighlight %}

<h2>Creating the first repo</h2>

Now that the installation and configuration steps are done, let's create our first repository. Create a folder called my_project and add some files to it. I created a rails project using `rails my_poject` since that automatically generates many files and folders.

Go to the project directory

{% highlight bash %}
$ cd my_project
{% endhighlight %}

Initialize a git repository for the project:

{% highlight bash %}
$ git init
{% endhighlight %}

Add all the files in the project to the repository:

{% highlight bash %}
$ git add .
{% endhighlight %}

Make the first commit.

{% highlight bash %}
git commit -m "First commit."
{% endhighlight %}

This commits all the changes (all the files in this case, because we have a new repo here) to the repository along with the message "First commit".

<h2>Pushing the repo to Github</h2>

The next step is to push this repository to Github. First of all, you need to sign up for an account (if you don't already have one) on [Github](http://github.com/). Once you've created the account, create a new repository called my_project.

Before you can start pushing to Github, you need to create an ssh key for your computer and copy the public key to your Github account.

Create SSH key:

{% highlight bash %}
$ cd ~
$ mkdir .ssh
$ cd .ssh
$ ssh-keygen -t rsa -C "you@yourmail.com"
{% endhighlight %}

Now in giithub, go to _Account settings > Add SSH keys > Add another public key_ and copy the contents of the id_rsa.pub file there. You will have to create an ssh key and add it to github for each computer from which you want to push repos to github.

To push the local repository to github:

{% highlight bash %}
$ git remote add origin git@github.com:my_username/my_project.git
$git push origin master
{% endhighlight %}

Now if you open the page for the repository on your browser, you can see the files of your project visible there. If you have a readme file in your project folder, the contents of that file will also be displayed. That's it! Now you have the git repository available on Github.
