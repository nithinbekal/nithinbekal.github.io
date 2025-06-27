---
title: Migrating Postgres to SQLite using the Sequel gem
categories:
  - postgres
  - ruby
  - sqlite
layout: post
date: 2025-06-26
---

In my previous post, I wrote about exporting the postgres database for
[devlibrary](https://devlibrary.org/) from fly.io to a local file.
Now, I want to convert that into a sqlite database,
so I can get rid of the dependency on a separate database server.

The [sequel gem](https://github.com/jeremyevans/sequel) allows connecting to one database,
and dumping the contents into another.

First, let's import that dump into local postgres database.

```
psql devlibrary_development < devlibrary-dump.sql
```

Next, we'll install `sequel` and `sqlite3` gems.

```
gem install sequel sqlite3
```

Finally, we can dump the postgres database straight into an sqlite3 database using:

```
sequel -C postgres://localhost/devlibrary_development \
    sqlite://storage/development.sqlite3
```

And that's it - we now have a sqlite3 file that can be used by a Rails app.
In fact, [devlibrary](https://devlibrary.org/) is now actually backed by a sqlite database!

