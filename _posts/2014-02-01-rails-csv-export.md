---
layout: post
title: 'Export to CSV in Rails'
date:   2014-02-01 12:00:00
categories:
  - rails
---

Exporting data to CSV from a Rails app is as simple as adding a respond_to block to the controller action and setting the proper response headers.

As an example, let's consider a users#index action which lists the users for admin. Now if you want to allow the admin to download the list as CSV, this is how it can be done:

Require Ruby's built in CSV library in ApplicationController.

{% highlight ruby %}
require 'csv'
{% endhighlight %}

In users#index, add a respond_to block with HTML and CSV formats. In the `format.csv` block, set the 'Content-Type' and the 'Content-Disposition' headers. (The latter lets you set the name of the downloaded file.)

{% highlight ruby %}
def index
  @users = User.all
  respond_to do |format|
    format.html
    format.csv do
      headers['Content-Disposition'] = "attachment; filename=\"user-list\""
      headers['Content-Type'] ||= 'text/csv'
    end
  end
end
{% endhighlight %}

Create an erb file at app/views/users/index.csv.erb with the CSV data. Let's only include name and email fields for this example.

{% highlight erb %}
<%- headers = ['Name', 'Email'] -%>
<%= CSV.generate_line headers %>
<%- @users.each do |user| -%>
<%= CSV.generate_line([user.name, user.email]) -%>
<%- end -%>
{% endhighlight %}

Now you can link to your CSV download using the normal link helpers with the format option like this:

{% highlight erb %}
<%= link_to 'Download CSV list', users_path(format: :csv) %>
{% endhighlight %}

And that's it. It just works.
