---
layout: page
title: "Code Reviews"
date:  2017-02-24 23:52:22
---

## Why do we need code reviews?

- team has a better awareness of the code
- allows you to find alternative solutions
- finding bugs (although this aspect is often overrated)

## What to review

- Are the variables, functions and modules well named?
- Is there unnecessary complexity?
- Does it have test coverage?
- Do the objects follow
  [single responsibility principle](/notes/single-responsibility-principle)?

## How to do a good code review

**Ask questions, rather than issue commands**.
For example,
"Extract service to reduce duplication"
can be rephrased as:
"What do you think about extracting this into a service?"

Some ways to phrase questions:

- did you consider...
- what do you think about...
- can you clarify...

**Compliment the good stuff**.
When you see something that was especially well written,
or you learned something new from reading the code,
let the author know.
Reviews aren't all about critiquing the code;
take some time to appreciate good code as well.

**Avoid using the word "just"**.
Saying something like
"why didn't you just use the `map` method here"
makes people feel judged
for missing something obvious.

**Don't feign surprise**.
This is similar to using the word "just".
Showing surprise that someone wasn't aware of something
("didn't you know this simpler way to do this?")
also makes people feel judged.

**Don't review things that tools should be doing for you**.
If you see a lot of coding style violations,
don't leave two dozen comments,
asking the author to fix indentation
or leave spaces either side of `=`.
Leave one comment
asking the author to run a tool like
[pronto](https://github.com/prontolabs/pronto)
or sign up for a service like
[hound](https://houndci.com).

## When requesting a review

**Explain the change**.
This can be in the form of
a link to the corresponding issue,
or a quick writeup of what you're doing.
Make it as easy as possible
for the reviewer to give you useful feedback.

**Provide context to the reviewer**.
The reviewer may not be someone familiar with the codebase.
For instance,
you might be using a convoluted approach
to work around a bug in a library.
In that case,
share a link to the bug report
or explain why you need that workaround.

**A reviewer should never have to suggest coding style changes**.
While it's annoying for you to see comments like
"please fix the indentation",
it's equally annoying for the reviewer to have to say this,
when they could be talking about the high level code.
Use tools like
[pronto](https://github.com/prontolabs/pronto)
to check for coding style violations
before requesting the review.

## After creating a PR

**Let people know that your PR is ready for review**.
Share the link on your team's chatroom,
so people know there's something to review.

**Tag people who are familiar with the code**.
Is there someone who originally wrote the module you're changing?
Ping them and ask for their opinion.

**Try to get fresh eyes to look at the code**.
This is the opposite of the previous suggestion,
but it's equally important to have
someone unfamiliar with the code take a look.
If they are able to understand the code easily,
that means it will be easy to understand
for someone else who joins the team later,
or for you 6 months from now.

## Responding to code reviews

**Don't take reviews personally**.
The review is about the code, not you.
It's not easy to convey your tone in writing,
so don't assume that the person is being mean.
It's more likely they were in a hurry,
and didn't consider how the comment might be perceived.

**Always respond to the reviewer**.
The response can be in the form of changes
made according to the review,
or it can be an explanation
of why a certain suggestion doesn't make sense
in this particular context.

**Never merge a pull request
while there are comments you haven't responded to**.
It is discouraging for a reviewer
to see a PR merged
without receiving any acknowledgement on their review.
There may be cases where you need to ship the code right now,
and don't have the time to rewrite according to the review.
Let the reviewer know why you're merging in such cases.

**Don't hesitate to push back if you disagree**
with a suggestion made by the reviewer.
If you think the suggestion doesn't make sense in this context,
reply with why you think so.
You probably are more familiar
with the constraints you were with,
so don't be compelled to make a change
just because they reviewer told you to.

**Don't be awed by senior developers**.
Junior developers often hesitate
to disagree with seniors
with the assumption that they know something you don't.
If you're not sure a suggested change makes sense,
ask follow up questions.
Even if you're wrong,
you can learn something.

## Automating reviews

People perceive the reviewer negatively if they receive a lot of style comments.
Use a linting tool for enforcing style guides. eg. hound, pronto

## Links

- [Implementing a Strong Code Review Culture](https://www.youtube.com/watch?v=PJjmw9TRB7s)
  [Video].
  A good part of my notes are based on
  this excellent talk from RailsConf 2015
  by Derek Prior.
- [Podcast] [Ruby Rogues 216 - Code Review Culture with Derek Prior](https://devchat.tv/ruby-rogues/216-rr-code-review-culture-with-derek-prior)
- [Best Kept Secrets of Peer Code Review](http://smartbear.com/SmartBear/media/pdfs/best-kept-secrets-of-peer-code-review.pdf)
  [PDF]
- [Code Review Best Practices](https://www.kevinlondon.com/2015/05/05/code-review-best-practices.html) -
  Kevin London's blog has a very nice list of
  things to look out for in code reviews.
