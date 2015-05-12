---
layout: page
title: "Postgresql"
---


    $ brew install postgresql

To have launchd start postgresql at login:

    ln -sfv /usr/local/opt/postgresql/*.plist ~/Library/LaunchAgents

Then to load postgresql now:

    launchctl load ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist

Or, if you don't want/need launchctl, you can just run:

    postgres -D /usr/local/var/postgres

Then:

    $ createdb

If you run into the error:

    PGError: ERROR:  new encoding (UTF8) is incompatible with the encoding of the template database (SQL_ASCII)
    HINT:  Use the same encoding as in the template database, or use template0 as template.

To fix this, do the following from psql prompt:

    UPDATE pg_database SET datistemplate = FALSE WHERE datname = 'template1';
    DROP DATABASE template1;
    CREATE DATABASE template1 WITH TEMPLATE = template0 ENCODING = 'UNICODE';
    UPDATE pg_database SET datistemplate = TRUE WHERE datname = 'template1';
    \c template1
    VACUUM FREEZE;

