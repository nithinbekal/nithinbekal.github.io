---
layout: post
title: "Logseq: How to write custom slash commands"
date:  2023-02-10  1:00:00 -05:00
categories: logseq
---

Writing a custom slash command for Logseq is pretty easy.
You can a "Review" slash command
by adding an entry
to the `:commands` setting in `config.edn`:

```clojure
:commands
[
  ["Review", "TODO: [[Code Review]] "]
]
```

This lets you start typing `/review`
to get "Review" as one of the options
in the command palette like this:

![Logseq custom slash command example](/images/logseq-custom-slash-commands-example.png "Logseq custom slash command example")

This autocompletes to `TODO [[Code Review]]`,
and you can add a link after that.

I add these kinds of TODO tasks
in my journal multiple times a day.
The slash command
only saves a couple of seconds,
but it's so satisfying not to have to
manually type that out every time
I copy a link to a PR to review.
