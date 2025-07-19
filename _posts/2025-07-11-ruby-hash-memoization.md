---
title: Stop memoizing Hash lookups in Ruby
categories: ruby
layout: post
date: 2025-07-11
og_image: ruby-hash-memoization.png
---

When a method performs a slow operation,
memoizing the result using instance variables is a useful optimization.
However, I've often seen people (including myself, sometimes!)
reaching for memoization for things that don't need to be optimized.

One common example is when there's a class that wraps a Hash object.
Hashes in Ruby are quite well optimized,
so do you really need to memoize the result of the hash lookup?
Let's benchmark and find out.

## Benchmarks

Let's start with a simple `Setting` class that takes a data hash with `type` and `value` keys.

```ruby
class Setting
  def initialize(data)
    @data = data
  end

  def type
    @data["type"]
  end

  def type_memoized
    @type ||= @data["type"]
  end
end
```

There's a `type` method here, and I've added a `type_memoized` method for comparison.
Now let's benchmark the two methods:

```ruby
setting = Setting.new({ "type" => "string", "value" => "hello" })

Benchmark.ips do |x|
  x.report("type") { setting.type }
  x.report("memoized type") { setting.type_memoized }
  x.compare!
end
```

Running this showed that memoization does indeed make things faster.
On my 2019 Intel Macbook, this showed a 1.31x improvement:

```
ruby 3.4.4 (2025-05-14 revision a38531fd3f) +PRISM [x86_64-darwin24]
Warming up --------------------------------------
         type     1.339M i/100ms
memoized type     1.586M i/100ms
Calculating -------------------------------------
         type     12.411M (± 1.0%) i/s   (80.57 ns/i) -     62.954M in   5.072739s
memoized type     16.214M (± 1.0%) i/s   (61.68 ns/i) -     82.453M in   5.085992s

Comparison:
memoized type: 16213611.7 i/s
         type: 12411448.7 i/s - 1.31x  slower
```

However, you will notice that in actual time per method call,
the difference is tiny - less than 20 nanoseconds on my 6 year old Macbook!
Unless you're calling this thousands of times in a loop, this will likely never be a bottleneck in your code.

## Looking up nonexistent keys

Let's look at one other case.
What happens when we memoize a lookup for a key that doesn't exist?

```ruby
setting_without_type = Setting.new({ "value" => "hello" })

Benchmark.ips do |x|
  x.report("missing key") { setting_without_type.type }
  x.report("memoized missing key") { setting_without_type.type_memoized }
  x.compare!
end
```

This time, the memoized version is actually 1.2x slower!
This is because `@data["type"]` returns nil every time,
so we don't ever return the memoized value.

```
         missing key     13.163M (± 1.4%) i/s   (75.97 ns/i) -     66.077M in   5.021125s
memoized missing key     10.853M (± 4.3%) i/s   (92.14 ns/i) -     55.153M in   5.091847s

Comparison:
         missing key: 13162501.1 i/s
memoized missing key: 10852595.0 i/s - 1.21x  slower
```

**Update**: As [@phallstorm](https://github.com/phallstrom) mentions in the comments below,
we could prevent the cache misses by using the `if defined?(@type)` memoization pattern.

```ruby
def type_memoized_correctly
  return @type if defined?(@type)
  @type = @data["type"]
end
```

At this point, we've achieved similar performance as the case where the key is present.
However, the downside is that more than half the method is now memoization logic,
without too much performance benefit.

## Nested keys

Finally, let's see what happens when we're dealing with nested hashes:

```ruby
class Setting
  # ...

  def nested_value
    @data["nested"]["value"]
  end

  def nested_value_memoized
    @nested_value ||= @data["nested"]["value"]
  end
end

setting = Setting.new({ "nested" => { "value" => "hello" } })

Benchmark.ips do |x|
  x.report("nested key") { setting.nested_value }
  x.report("memoized nested key") { setting.nested_value_memoized }
  x.compare!
end
```

This time the memoized version is about 1.6x faster.

```
         nested key     10.654M (± 5.6%) i/s   (93.86 ns/i) -     54.107M in   5.097061s
memoized nested key     16.867M (± 1.3%) i/s   (59.29 ns/i) -     85.219M in   5.053237s

Comparison:
memoized nested key: 16866963.5 i/s
         nested key: 10654347.8 i/s - 1.58x  slower
```

## Conclusion

The highlights from the benchmarks are:

- Hash lookups are already extremely fast, in the order of nanoseconds.
- 🔼 1.3x speedup on memoizing a hash lookup
- 🔼 1.6x speedup if memoizing a two-level nested hash
- 🔻 1.2x slowdown on memoizing a hash lookup where the key doesn't exist.

So, do you really need to memoize a hash lookup?
Most likely not.
Hash lookups are already optimized at the language level,
so the difference between that and instance variable lookups is already tiny.

Reserve memoization for cases where it really matters,
such as database calls or really expensive computations.

There's no need to optimize at this level unless a profiler has showed you that it will speed things up.
There's probably something in there that is multiple orders of magnitude slower that you can optimize.
