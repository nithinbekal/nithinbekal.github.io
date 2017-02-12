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

If you see this error: `FATAL:  role "postgres" does not exist`

{% highlight sql %}
CREATE USER postgres SUPERUSER;
{% endhighlight %}


# Upgrading to 9.6

I was using 9.5.3 and upgrading to 9.6.1.

- <https://keita.blog/2016/01/09/homebrew-and-postgresql-9-5/>

{% highlight bash %}
initdb /usr/local/var/postgres9.6 -E utf8

pg_upgrade \
  -d /usr/local/var/postgres \
  -D /usr/local/var/postgres9.6 \
  -b /usr/local/Cellar/postgresql/9.5.3/bin/ \
  -B /usr/local/Cellar/postgresql/9.6.1/bin/ \
  -v

mv /usr/local/var/postgres /usr/local/var/postgres9.5

mv /usr/local/var/postgres9.6 /usr/local/var/postgres

launchctl load ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist

gem uninstall pg
bundle install

{% endhighlight %}
