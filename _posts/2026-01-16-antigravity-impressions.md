---
title: "Google Antigravity: First Impressions"
layout: post
categories: ai
date: 2026-01-16
og_image: antigravity-impressions.png
---

For the past few weeks, I've been playing around with Antigravity, Google's new AI powered code editor. It has a free tier, so I wanted to see how well it worked for hobby projects. At work, I primarily use Cursor and Claude Code with Opus. I also have a Cursor Pro subscription for personal use, and wanted to see if Antigravity could replace it.

This editor is a VS Code fork like Cursor, which made it easier to get started. It was able to import my Cursor settings as soon as I opened the app, so there wasn't much to set up.

### Fixing some bugs

To take it for a spin, I decided to fix some bugs in [devlibrary.org](https://devlibrary.org/)'s Elixir codebase. I've been putting off fixing some annoying bugs there because my Elixir is a bit rusty, so AI assistance is a great way to build some momentum. I picked a note I made about an annoyance and just pasted it in the chat without any additional context:

> When a search has no results, there's an "add book" button. I don't want it anymore

Gemini 3 Pro was able to figure out the context and make the changes quickly. However, this was a very simple fix, so I decided to pick something a fair bit more complex. Again, my prompt was just the text from my todo list:

> Fix bug that prevents saving book with newly created authors or categories

This was a bug with a LiveSelect component that I'd unsuccessfully tried to fix with Cursor a few times. However, Antigravity has a browser agent that opens up the local server in the browser and clicks around to reproduce the issue. This is particularly effective when fixing UI bugs. It's also great when I want to offload some manual testing to the agent.

### Tab completion

Cursor's strongest feature has always been tab completion. I think Cursor is still far ahead of Antigravity in this regard. When you rename a variable, Cursor lets you hit tab rapidly to jump to the next instance and update it. Antigravity does have a similar tab feature, but it feels slower and less reliable. It has sometimes ended up inserting a tab character rather than jumping to the next position.

### Available models

Antigravity is the showcase for Gemini 3 Pro, but also provides Claude Sonnet, Opus, and GPT-OSS 120B. Since I started using this, they have added Gemini 3 Flash as well. Being a lightweight model, Flash has more generous limits.

I've really enjoyed using Gemini Flash. It is extremely fast, and great for offloading lightweight, boilerplate-y work to AI. It may not be the best for serious work, but for small hobby projects, you probably don't need the firepower of Gemini 3 Pro or Opus.

Cursor has a wider range of models, with many versions of GPT5 being available in addition to Claude and Gemini, but I've hardly reached for GPT in the past year. Claude models are easily the best available option, with Gemini not far behind, so I'm not missing much.

### Rate limits

I'm still playing with the free tier, where I hit the rate limits for both Gemini and Claude's bigger models in 3 days, and had to wait 4 more days for it to reset. Gemini Flash lasted much longer, but I eventually ran into limits there as well. That said, I was still surprised by how long I was able to use it with the free quotas. The browser agent also has rate limits, which is rather frustrating.

There's been a lot of chatter lately about how much Google is limiting the quotas even in the Pro plans. However, considering how generous the free tier is, I don't think I'll run into the limits if I got the Pro plan. For personal use, it's not a dealbreaker, and for work, the Ultra plan is probably better suited.

The AI Pro plan costs $20 (27 CAD here in Canada) and includes 2TB of storage. Considering that I already pay 14 CAD for that much storage right now, the pricing looks very tempting compared to the $20 that I'm paying Cursor for the sporadic use.

### Verdict

So far, I'm really enjoying using Antigravity. The experience is similar to that of Cursor for the most part, even though the UX does feel a bit less polished at times.

The pricing makes it a very attractive option. It's easy to play around with the free tier. But even the $20 tier is a steal considering the 2TB of storage, and increased rate limits for non coding AI tools.
