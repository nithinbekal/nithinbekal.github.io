---
layout: post
title: "Rails: Benchmark.ms deprecated"
date:  2024-09-26
categories:
  - rails
  - ruby
---

Today I stumbled upon
[this PR](https://github.com/rails/rails/pull/52746)
which deprecates the `Benchmark.ms` monkeypatch in Rails,
without a replacement.
It's a handy method for instrumenting
different parts of the code.
Here's how you might use it:

```ruby
time_in_ms = Benchmark.ms { sleep 0.5 }
#=> 501.8
```

This will no longer work in Rails 8.1
(8.0 beta was just released today,
so it will still work for some time).
But if you look at the original implementation,
all it does is call `Benchmark.realtime`,
and multiply the time in seconds by `1000`.

```ruby
def ms(&blk)
  1000 * realtime(&blk)
end
```

I think the easiest way to replace it
is to manually multiply by `1000`
when we need the time in ms.


```ruby
t = Benchmark.realtime { sleep 0.5 } #=> 0.5018...
time_in_ms = t * 1000                #=> 501.8...
```

Another alternative is to use `ActiveSupport::Benchmark`
which provides a more flexible version of `realtime`:

```ruby
time_in_ms = ActiveSupport::Benchmark.realtime(:float_millisecond) { sleep 0.5 }
#=> 501.8
```

I think I prefer using the first version,
because the calculation is simple enough,
there's no dependency on `ActiveSupport`,
and it's less verbose!
