---
title: Exporting fly.io postgres database
categories:
- postgres
- rails
layout: post
date: 2025-06-25
---

Recently, I've been using fly.io for small hobby projects like [devlibrary](https://devlibrary.org/).
However, I've wanted to simplify the setup even further by replacing the app's postgres DB with sqlite.
To start, I needed to figure out how to export the database to my local machine.

First, start a fly proxy so you can connect to the remote database.
This will create a proxy running in `localhost:5434` for a postgres app with the name `devlibrary-db`.

```
fly proxy 5434:5432 -a devlibrary-db
```

The database dump needs a password, which can be extracted from the `DATABASE_URL` env variable. This can be fetched from:

```
fly ssh console -C "printenv" | grep DATABASE_URL
```

Then, in another terminal window run the `pg_dump` command, and enter the password when prompted:

```
pg_dump -h localhost -p 5434 -U devlibrary devlibrary > my-db-dump.sql
```

At this point, I wanted to test this by loading the data into my local database:

```
psql devlibrary < my-db-dump.sql
```

At this point, the dump is ready to be converted to a sqlite DB, but that's for another post.
