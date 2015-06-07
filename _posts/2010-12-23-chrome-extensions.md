---
layout: post
title: How to Create a Google Chrome Extension
date: 2010-12-23 12:00:00
redirect_from:
  - /2010/how-to-create-a-google-chrome-extension/
category:
  - programming
---

Creating an extension for Google Chrome is incredibly simple. With the knowledge of basic HTML and JavaScript, you can start building useful plugins in a matter of minutes.

This article will focus on creating the extension, and not on building the application. We will be using the todo list app I created in a previous tutorial. <a href="http://nithinbekal.com/2010/a-simple-to-do-list-app-using-html5-and-local-storage/">Read the tutorial here</a>, and <a href="http://demo.nithinbekal.com/html5todo/v1/">see the demo here</a>.

The first step in creating an extension is to create a manifest file that will contain the details of your extension. Create a directory for your extension and create a file `manifest.json` there. Enter the following code into the file:

{% highlight json %}
{
  "name": "Todo List",
  "version": "1.0",
  "description": "A simple todo list.",
  "browser_action": {
    "default_icon": "todo.jpg"
  }
}
{% endhighlight %}

You will need to add an image to the folder and change the value corresponding to "default_icon" to the name of that file.

In Chrome, go to Options > Tools > Extension and then enable the developer mode. Click on "Load unpacked extension" button and select the folder that contains your manifest.json file. You will now be able to see your app's icon in the top right, next to the wrench icon.

The next thing to do is to add the application. Get the <a target="_blank" href="https://gist.github.com/751839">code for the todo app from github</a>, and save it as index.html. Now add <code>"popup": "index.html"</code> after the line containing default_icon in the manifest file and click on the reload link for this extension in Chrome's extensions tab. The code should look like this now:

{% highlight json %}
{
  "name": "Todo List",
  "version": "1.0",
  "description": "A simple todo list.",
  "browser_action": {
    "default_icon": "todo.jpg",
    "popup": "index.html"
  }
}
{% endhighlight %}

Clicking on the icon will now open a small popup right below the icon with the Todo app. You can now add tasks to the todo list and they will be available when you reopen the browser later.

<!-- [caption id="attachment_506" align="alignnone" width="277" caption="Todo App - Google Chrome extension"]<a href="http://nithinbekal.com/2010/how-to-create-a-google-chrome-extension/html5todo_chrome_ext/" rel="attachment wp-att-506"><img src="http://nithinbekal.com/wp-content/uploads/2010/12/html5todo_chrome_ext-277x300.png" alt="Todo App - Google Chrome extension" title="html5todo_chrome_ext" width="277" height="300" class="size-medium wp-image-506" /></a>[/caption] -->

This was a quick introduction to show you how to create a simple Chrome extension. Take a look at <a target="_blank" href="http://code.google.com/chrome/extensions/overview.html">Google Chrome extensions page</a>, go through the documentation and start creating awesome extensions.
