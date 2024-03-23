---
layout: post
title: "Bit array data structure in Ruby"
date:  2016-08-24 22:56:33 +05:30
categories: ruby
---

Bit arrays can be used to efficiently store a series of bit flags.
For instance, if you want to efficiently store
a set of numbers in the range 1-1000,
you could represent the set using a bit array of size 1000.

I recently came across the [bitarray gem](https://github.com/peterc/bitarray),
which is a pure Ruby implementation of the bit array data structure.
The gem uses an array of integers to represent the bit array.
It made me wonder if using `Bignum`s would simplify the code.

This was one of my silly experiments that has no real world use,
except to give me a chance to think about algorithms and Big O complexity.

## The code

`Fixnum` in Ruby allows us to store 62 bits (in computers with 64-bit words).
However, the numbers are automatically upgraded to `Bignum`
when they are longer than 62 bits.

Internally, Ruby implements `Bignum` as a list of integers anyway,
so we don't have to worry about array indexing in our implementation.
I came up with the following implementation:

{% highlight ruby %}
class BitArray
  def initialize
    @mask = 0
  end

  def []=(position, value)
    if value == 0
      @mask ^= (1 << position)
    else
      @mask |= (1 << position)
    end
  end

  def [](position)
    @mask[position]
  end
end
{% endhighlight %}

This code has the advantage of being simpler to read.
The size of `Bignum` is only limited by the size of your computer's memory,
so we can have arbitrarily large bit arrays using this technique.
So we don't have to specify the bit array size in advance.

But does it work as well as the gem?
We'll need to benchmark the code to find out.

## Some (unscientific) benchmarks

I tried some benchmarks with benchmark-ips,
and compared performance for bit arrays of size ranging from 100 to 10,000,000.
I ran separate benchmarks for bit access, setting a bit and initializing bit arrays.

The below code benchmarks setting a bit.
`V1::BitArray` is the Bignum implementation.
([Benchmark results here](https://gist.github.com/nithinbekal/423b186e5daf83b8ea2b5feb8cd0d96c).)

{% highlight ruby %}
[100, 1000, 10_000, 100_000, 1_000_000, 10_000_000].each do |x|
  max = x
  index = x - 1 # index the last bit

  b1 = BitArray.new(max) # gem
  b2 = V1::BitArray.new  # my implementation

  Benchmark.ips do |x|
    x.report('bitarray gem') do |times|
      i = 0
      while i < times
        b1[index] = 1
        i += 1
      end
    end

    x.report('using Bignum') do |times|
      i = 0
      while i < times
        b2[index] = 1
        i += 1
      end
    end

    x.compare!
  end
end
{% endhighlight %}

Here are some thoughts:
  
- For practical use, the bitarray gem is definitely much better (no surprises there!)
- The gem's implementation is better when it comes to setting bits.
  The Bignum version gets exponentially worse for larger bit array sizes.
- The Bignum version is faster (by about 1.9X) for bit access.
- Bit array initialization is faster for the Bignum version,
  but you usually initialize a bit array and spend
  most of your time setting and accessing the bits.
  So initialization time isn't that relevant.

Because the gem builds an array when the bit array is initialized,
it takes a lot of memory if you're building a huge bit array.
I tried initializing a bit array with size 1 trillion,
and the memory usage grew into many GBs before the program crashed.
~~If you need such large arrays,
you should probably use a compiled language.~~
(As Albert Smit points out in the comments,
1 trillion bits is 116GB memory,
so such a large bit array is impractical.)

## Links

- [Benchmark script and results](https://gist.github.com/nithinbekal/423b186e5daf83b8ea2b5feb8cd0d96c)
- [BitArray gem](https://github.com/peterc/bitarray)
