---
layout: page
title: "Postgresql"
---

{% highlight bash %}
brew install postgresql
brew services start postgresql
initdb /usr/local/var/postgres
{% endhighlight %}

Manual steps
(handled by `brew services start`):

{% highlight bash %}
# Tell launchd start postgresql at login
ln -sfv /usr/local/opt/postgresql/*.plist ~/Library/LaunchAgents

# To load pg now:
launchctl load ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist

# If you don't want launchctl:
postgres -D /usr/local/var/postgres

# Finally
createdb
{% endhighlight %}

If you run into the error:

{% highlight bash %}
PGError: ERROR:  new encoding (UTF8) is incompatible with the encoding of the template database (SQL_ASCII)
HINT:  Use the same encoding as in the template database, or use template0 as template.
{% endhighlight %}

To fix this, do the following from psql prompt:

{% highlight sql %}
UPDATE pg_database SET datistemplate = FALSE WHERE datname = 'template1';
DROP DATABASE template1;
CREATE DATABASE template1 WITH TEMPLATE = template0 ENCODING = 'UNICODE';
UPDATE pg_database SET datistemplate = TRUE WHERE datname = 'template1';
\c template1
VACUUM FREEZE;
{% endhighlight %}

