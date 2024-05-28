---
layout: post
title: 'Review: Macbook Pro 14" (M3 Pro)'
date: 2024-05-23
categories: reviews
og_image: macbook-pro-m3.png
---

I've been using the new 14" Macbook Pro
with the M3 Pro chip for the past month.
I haven't really reviewed gadgets here before,
and this M3 review seems rather late
considering an M4 based iPad Pro is already out there.

But I had a few notes comparing this
to the M1 Pro laptop I was using for work,
and the 2019 Intel Macbook that I use
as a personal machine,
so here goes.

### Performance

As a work machine,
performance has to be the main consideration.
The most common thing I'm waiting on
is for slow test suites to finish running,
so I tried running a couple of really slow test files on both.

The results were... expected.
The tests took about 20-25% less time on the M3.
That's a decent amount of time saved waiting on tests,
but I was expecting more from a 2 generation jump.

The truly surprising result
was [when I tried running LLMs on it](/posts/comparing-llama3-phi3-gemma/).
For the same test prompt,
the M3 is very slightly slower than M1 for llama3
(29 vs 26 tokens/s),
and slighty faster for Phi-3
(41 vs 38 tok/s).
LLMs are limited by memory bandwidth,
and the M3 has 25% less bandwidth (150 GB/s)
compared to M1 (200 GB/s).
This explains why you don't see
a similar peformance bump
as the one in running tests
despite the faster processor.

Overall, I'm happy with this.
I don't do ML for my day job,
so the slower LLM inference isn't a problem.
The laptop is about 20-25% faster
for things that I do most often,
and that's what matters.

### Design

The design is great,
as is usual with Macs,
but I was surprised by how hard it is
to tell this and the M1 series laptop apart.
When I finished migrating,
I had to look at "About this Mac"
to confirm I was on the new machine.

I'm not a fan the pointless notch in the screen,
but at least they do a great job hiding it in dark mode.
I use the laptop mostly in clamshell mode,
so I don't have to put up with it most of the time.

The one thing that irks me most
about my 2019 Intel MBP is the touch bar,
and I'm glad that's not there anymore in these laptops.

### Screen

Despite my dislike of the notch,
I have to admit it's an excellent display.
But as someone that usually works with an external screen,
it doesn't really matter that much.
I sometimes wish I had the 16" model
for the times I'm coding on the couch or a coffee shop.
If I had to pick,
I'd use a 14" laptop as a personal machine
and a 16" for work
rather than the other way around
that I'm doing right now.

### Keyboard

After the debacle that was the butterfly keyboard,
Apple's keyboards have been pretty consistent
for the past few years.
I can't tell the difference between this one and the M1,
but I slightly prefer it to the one in the 2019 Intel Macbook,
which was already excellent.

### Battery

I haven't yet had a day
where I had to think about running out of battery.
It's been years since I've had to care
about battery life on Macs.
Apple claims 22 hours of battery life,
and I'm inclined to believe them.
That said, I work with the laptop
usually plugged into the monitor
and charging through the thunderbolt port,
so I'm less likely to run into low battery problems.

### Magsafe

Ever since Apple removed the Magsafe charger,
I've wished for it to come back,
I've since realized that
it's much more convenient to use USB-C for everything.
The Magsafe charger has been sitting in the shelf ever since.

## Conclusions

Overall, I like the M3 Macbook Pro
but it doesn't feel 2 generations ahead of the M1 laptop.
For a work laptop,
upgrading from an M1 makes sense.
Even an extra 20% speedup
can make a big difference to your productivity.

For a personal machine?
I'm not so sure it's worth it.
I'm probably going to stick with my 2019 Intel Macbook
for the next five years,
because that machine is fast enough
for most things.
