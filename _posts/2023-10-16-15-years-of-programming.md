---
layout: post
title: "15 years of programming"
date:  2023-10-16
categories: programming
---

Exactly 15 years ago, on this day,
I started my first job as a programmer.
Technically I've written code for a bit longer than that,
but this was the first time actually being paid to do it.
It's not a particularly long career,
but I've been reflecting on how much
things have changed over that time.

### Hardware

The computer I learned to program on
had a Pentium III
with 128MB of RAM.
The first real work computer I used
had similar specs.
The phone in my pocket today
probably has more computing power.

At a couple of places that I worked,
we worked using thin clients connected to remote servers.
I've been coding on a cloud dev environment
using an M1 Macbook Pro today.
That's a ridiculously powerful machine
that's essentially working as a thin client!

### Ruby

I've used Ruby and Rails
for about 12 of those 15 years.
The first app I shipped
was written using Ruby 1.8 and Rails 2.3.
Bundler and gemfiles were still not a thing
until a few months later.
I got to see 13 major releases of Ruby since then,
and it has become
almost an order of magnitude faster.

### Editors

In 2009,
I was using Netbeans
because it was a proper Rails IDE.
For the past 9 years,
I've been using Vim,
and it can probably do more "IDE" stuff
than Netbeans did back then.

Notepad++ was the first editor I used regularly.
Since then,
I've gone through Sublime Text,
Textpad,
Redcar (an editor written in Ruby),
Atom,
and VS Code
(which I still use when pair programming).

Textpad was an interesting one.
The place where I worked
*didn't have an approved text editor*,
despite 100s of devs working there.
Someone managed to get a copy of Textpad
through the company firewall,
and that became almost everybody's editor.
There were a couple of people
who still chose to code on Windows Notepad, though!

### Version control

Subversion was the version control system
for my first project.
Git had been around for a while by then,
but Github was still a new startup.
However, our choice of subversion was mainly because
it had better integration with Netbeans,
which our team used at the time.

The weirdest version control system I used
was an Excel spreadsheet.
At that place,
we would email the "version control team"
a list of files that we wanted to work on,
and they would put our name
next to the name of the file in the spreadsheet.
There was an actual VCS somewhere
(Visual Source Pro),
but we programmers weren't trusted with using it.

### Deployment

The first app I deployed
was to one of those shared hosting providers.
Deploying the app was ridiculously finicky.
I don't remember the details,
but it involved rsync-ing the code,
and then ssh-ing in to restart the server
(and praying that things work!).

At the next place,
things were even worse.
We had manual deploys once a week.
Every Wednesday at 2am,
this guy would compile exe files,
and use Remote Desktop to copy them into the server.
If you didn's send in your code by the previous afternoon,
you'd have to wait till next Wednesday,
unless you were putting out serious fires.

By 2012,
I was working on a Rails codebase once again,
and we set up Capistrano
so we could run `cap deloy` locally.
This seemed like a radical idea at the time,
but all of this is such a far cry
from the niceties that we enjoy today,
like CI pipelines or Heroku or Github Actions.

### Wrapping up

When I look back over the 15 years,
the improvement in tooling that we use
has been incredible.
I couldn't even have imagined
tools like GPT or Copilot back then!

Each passing year
has also made it painfully obvious
how little I know about programming
and how much there is left to learn.
I hope I'll still be enjoying this profession
in another 15 years time!
