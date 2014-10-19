---
layout: revealjs
title: "Fun With Ruby Metaprogramming"
date:  2014-10-18 21:14:29
---

<section>
  <h2>Fun With Ruby Metaprogramming</h2>
</section>

<section>
  <pre><code class='ruby'>
def foo
  'bar'
end
#=> :foo
  </code></pre>
</section>

<section>
  <h3>Memoization</h3>
</section>

<section>
  <pre><code class='ruby'>
def fibonacci(n)
  return 1 if n <= 1
  fib(n-1) + fib(n-2)
end
  </code></pre>
</section>

<section>
  <pre><code class='ruby'>
def fib(n)
  # ...
end
#=> :fib
  </code></pre>
</section>

<section>
  <pre><code class='ruby'>
def fib(n)
  # ...
end

memoize :fib
  </code></pre>
</section>

<section>
  <pre><code class='ruby'>
memoize def fib(n)
  # ...
end
  </code></pre>
</section>

<section>
  <pre><code class='ruby'>
class Calculator
  extend Memoization

  memoize def fib(n)
    # ...
  end
end
  </code></pre>
</section>

<section>
  <pre><code class='ruby'>
calc = Calculator.new
calc.fib(1000)
  </code></pre>
</section>

<section>
  <pre><code class='ruby'>
module Memoization
  def memoize(name)
    #
  end
end
  </code></pre>
</section>

<section>
  <pre><code class='ruby'>
def memoize(name)
  @@cache ||= {}
  @@cache[name] = {}
  # ...
end
  </code></pre>
</section>

<section>
  <pre><code class='ruby'>
def memoize(name)
  @@cache ||= {}
  @@cache[name] = {}

  fn = instance_method(name)
  # ...
end
  </code></pre>
</section>

<section>
  <pre><code class='ruby'>
def memoize(name)
  # ...
  instance_eval do
    define_method(name) do |*args|
      # ...
    end
  end
end
  </code></pre>
</section>

<section>
  <pre><code class='ruby'>
define_method(name) do |*args|
  if @@cache[name].include?(args)
    # return from @@cache
  else
    # calculate and update @@cache
  end
end
  </code></pre>
</section>

<section>
  <pre><code class='ruby'>
if @@cache[name].include?(args)
  @@cache[name][args]
else
  @@cache[name][args] = fn.bind(self).call(args)
end
  </code></pre>
</section>

<section>
  <pre><code class='ruby'>
class Calculator
  extend Memoization

  memoize def fib(n)
    # ...
  end
end
  </code></pre>
</section>

<section>
  <h3>Class methods</h3>
</section>

<section>
  <pre><code class='ruby'>
static def fib(n)
  # ...
end

Calculator.fib(100)
  </code></pre>
</section>

<section>
  <pre><code class='ruby'>
def static(name)
  fn = instance_method(name)
  define_singleton_method(name) do |*args|
    fn.bind(self.new).call(args)
  end
end
  </code></pre>
</section>

<section>
  <pre><code class='ruby'>
memoized static def fib(n)
  # ...
end

Calculator.fib(100)
  </code></pre>
</section>

<section>
  <h3>Tail call optimization</h3>
</section>

<section>
  <pre><code class='ruby'>
def factorial(n)
  n <= 1 ? n : n * factorial(n-1)
end
  </code></pre>
</section>

<section>
  <pre><code class='ruby'>
def factorial(n, acc=1)
  return acc if n <= 1
  factorial(n-1, acc*n)
end
  </code></pre>
</section>

<section>
  <pre><code class='ruby'>
class Calculator
  extend TailCallOptimization

  tail_recursive def factorial(n, acc=1)
    # ...
  end
end
  </code></pre>
</section>

<section>
  <pre><code class='ruby'>
module TailCallOptimization
  RubyVM::InstructionSequence.compile_option = {
    tailcall_optimization: true,
    trace_instruction: false
  }
end
  </code></pre>
</section>

<section>
  <pre><code class='ruby'>
module TailCallOptimization
  def tail_recursive(name)
    fn = instance_method(name)
    undef_method name
    # recompile method with TCO
  end
end
  </code></pre>
</section>

<section>
  <pre><code class='ruby'>
def tail_recursive(name)
  # ...
  RubyVM::InstructionSequence.new(<<-EOS).eval
    class #{to_s}
      #{fn.source}
    end
  EOS
end
  </code></pre>
</section>

<section>
  <h3>Other ideas</h3>
</section>

<section>
  <pre><code class='ruby'>
# Raises error if result is not a Fixnum
typecheck Fixnum, def foo
  # ...
end
  </code></pre>
</section>

<section>
  <pre><code class='ruby'>
# Please don't
public static void def main()
  # ...
end
  </code></pre>
</section>

<section> 
  <img src="https://dl.dropboxusercontent.com/u/13430809/assets/slides.nithinbekal.com/tmux-vim/slide-7.jpg" />
</section>




