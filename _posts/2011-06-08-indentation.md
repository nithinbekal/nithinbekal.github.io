---
layout: post
title:  "Tabs vs. spaces for indentation"
date:   2011-06-08 12:00:00
redirect_from:
  - /2011/tabs-vs-spaces-for-indentation/
categories: programming
---

A few days ago I was arguing with a friend about the right way to indent code.
Being a spaces-for-indentation fanatic myself, I complained about the hard tabs
he was using in one of his Github repos and he in turn expressed shock that I
actually waste time on this space-for-indentation thing.

If you are an indentation fanatic, you would probably, like me, classify
programmers into 4 categories:

1. People indenting with spaces
2. People indenting with tabs '\t'
3. People who mix spaces and tabs
4. People who don't indent

Did I hear you mutter "That 4th type are NOT programmers"? Of course they
aren't. In fact, in my book they are right up there alongside Sauron's minions,
Lord Voldemort's Death-Eaters, and Darth Vader and the Sith as the most evil
creatures that ever walked on the earth.

Unfortunately for those of us that try to hold on to our sanity, there are
hiring managers out there who hire these people and let them pollute others'
beautifully written code. As long as they are allowed to write code, we might
as well accept the fact that they exist in the programming world.

Which brings me to the type 3 folks. Their mixture of tabs and spaces makes it
a nightmare to read code, but at least you can convert the tabs in most editors
and get something close to readable code. At least they try to indent, and
that's a lot better than code that's fully left aligned. Anyway, if you're one
of the people doing this... stop it. Just stop. Please.

That finally leaves the two sets of programmers that indent exclusively using
either spaces or tabs. Personally I prefer spaces, but that's probably because
I write Ruby code often and using two spaces for indentation is the common
convention in the Ruby community.

# Why use tabs?

Tabs for indentation has one clear advantage over spaces. You can customize how
much indentation should appear. For instance, if your teammate likes 8 column
indentation (what kind of people do you work with?) and you prefer 4 columns,
well, you don't have to do anything. Once you've set your editor to display 4
column tabs, you don't have to worry about how many columns your teammates see.
As long as you both consistently use hard tabs, you'll both be fine.

# Why use spaces?

Most Ruby and Python programmers would swear by spaces-for-indentation. People
in both these communities almost unanimously agree with indenting with spaces
and it's especially important in Python because of its use of whitespace for
delimiting blocks.

The best thing about this is that it makes the code look consistent everywhere.
Since everybody in these communities uses the same indentation rules, it's not
much of a problem, but no such consensus in many other languages.

# Conventions

While looking around for conventions in major open source projects on
indentation, I came across the [Linux coding style](https://www.kernel.org/doc/Documentation/CodingStyle)
document:

> Tabs are 8 characters, and thus indentations are also 8 characters. There are
> heretic movements that try to make indentations 4 (or even 2!) characters deep,
> and that is akin to trying to define the value of PI to be 3. Rationale: The
> whole idea behind indentation is to clearly define where a block of control
> starts and ends. Especially when you've been looking at your screen for 20
> straight hours, you'll find it a lot easier to see how the indentation works if
> you have large indentations.

I find this strange. Draconian almost. Eight character indentation seems so
1980. And yet one of the most important open source projects in the world
imposes these rules, and some of the best programmers in the world follow them.
In such cases, using tabs for indentation makes sense, because then heretics
like me can set the tab width to 4 (or even 2! - what madness!) and happily
read the code.

(To the author of the document quoted above: If you've been looking at your
screen for 20 hours straight, that means you ought to be taking a break, rather
than increasing indent levels on your program.) ;-)

Anyway, what's most important about indentation is that you -and your team - do
it consistently and follow the same guidelines. Here's what Jeff Atwood of
Coding Horror has to say of tabs v/s spaces in
[Death to the Space Infidels](http://www.codinghorror.com/blog/2009/04/death-to-the-space-infidels.html):

> Choose tabs, choose spaces, choose whatever layout conventions make sense to
> you and your team. It doesn't actually matter which coding styles you pick.
> What does matter is that you, and everyone else on your team, sticks with those
> conventions and uses them consistently.

Which he cheekily followed up with:

> That said, only a moron would use tabs to format their code.

I certainly won't disagree with that. The second part, especially.

## Related articles:

* Jeff Atwood (Coding Horror): [Death to the Space Infidels](http://www.codinghorror.com/blog/2009/04/death-to-the-space-infidels.html)
* Jamie Zawinski: [Tabs v/s Spaces: An Eternal Holy War](http://www.jwz.org/doc/tabs-vs-spaces.html)
* [400,000 GitHub repositories, 1 billion files, 14 terabytes of code: Spaces or Tabs?](https://medium.com/@hoffa/400-000-github-repositories-1-billion-files-14-terabytes-of-code-spaces-or-tabs-7cfe0b5dd7fd#.vdnrrzikp) -
  provides some interesting data.
  98.67% of Ruby files on Github are indented with spaces,
  making it the most consistent language in this regard.
