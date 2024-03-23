---
layout: post
title:  "A simple todo app using HTML5 and localstorage"
date:   2010-12-04 12:00:00
redirect_from:
  - /2010/a-simple-to-do-list-app-using-html5-and-local-storage/
  - /2010/12/04/a-simple-to-do-list-app-using-html5-and-local-storage/
categories:
  - javascript
---

HTML5 has brought great potential to the web applications of the future. But what about simple apps that don't even need internet, such as your to-do list? Now that local storage is implemented by all major browsers, you can easily leverage this feature to build simple apps for personal use.

[View Demo](http://demo.nithinbekal.com/html5todo/v1/) | <a target='_blank' href='http://twitter.com/home?status=A+simple+todo+list+app+using+HTML5+and+local+storage+by+%40nithinbekal+{{ site.url }}{{ page.url }}'>Share on Twitter</a>

This post will show you how to build a simple HTML5 and local storage powered to-do list. However, keep in mind that I'm only trying to show what can be accomplished with HTML5, so the code may not be perfect.

## The localStorage API

The API that we'll be using is simple. To set a value in local storage, we use <code>localStorage.setItem()</code> to save a task, and <code>localStorage.removeItem()</code> to delete one. The number of local storage items can be found by <code>localStorage.length</code>.

## The HTML markup

This to-do app consists of just one text input field and an unordered list. The initial HTML markup required for the form and the task list looks like this:

{% highlight html %}
<form id="tasks-list">
  <input id="task">
</form>

<ul id="tasks"></ul>
{% endhighlight %}

## The JavaScript

This is the JavaScript I used to load the tasks from local storage initially.


{% highlight javascript %}
$(document).ready(function() {

  // Initial loading of tasks

  var i = 0;

  for( i = 0; i &lt; localStorage.length; i++)
    $("#tasks").append("<li id='task-"+ i +"'>" + localStorage.getItem('task-'+i) +
                       " <a href='#'>Delete</a></li>");

  // Add a task
  $("#tasks-form").submit(function() {
    if ($("#task").val() != "" ) {
      localStorage.setItem( "task-"+i, $("#task").val() );
      $("#tasks").append("<li id='task-"+i+"'>"+localStorage.getItem("task-"+i) +
                         " <a href='#'>Delete</a></li>");
      $("#task").val("");
      i++;
    }
    return false;
  });

  // Remove a task

  $("#tasks li a").live("click", function() {
    localStorage.removeItem($(this).parent().attr("id"));
    $(this).parent().hide();
    for(i=0; i&lt;localStorage.length; i++) {
      if( !localStorage.getItem("task-"+i)) {
        localStorage.setItem("task-"+i, localStorage.getItem('task-' + (i+1) ) );
        localStorage.removeItem('task-'+ (i+1) );
      }
    }
  });
});
{% endhighlight %}

The first part of the above code loops through the tasks stored in local storage. The items are stored with the key, item-n, where n ranges from 1 to the size of the array.

The second part responds to form submission. When the user enters something into the text box and hits enter, the content gets appended as a list item to the &lt;ul&gt;.

On clicking the delete link, the item corresponding to that is removed, and then, looping over the list, the task keys are numbered again starting from task-1.

## Improvements

The list needs to be editable, and you will probably want to reorder it as well. With this post I only wanted to show how easy it is to get started with creating such simple apps using HTML5 and JavaScript, It's probably not really very well written JS code (I don't know enough to know if it's any good.).

To edit the tasks, we could probably use the contenteditable attribute. I will hopefully write another post very soon about how to make the list editable.

* * *

Update. Koes Bong added a lot of features features to this app and his version is available [here](http://koesbong.com/clients/self/codingtest/).
