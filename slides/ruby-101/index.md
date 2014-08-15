---
layout: revealjs
title: 'Ruby 101'
date: 2013-08-03 10:00:00
---

<section>
	<h1><span class='color-ruby'>Ruby</span> 101</h1>
</section>

<section>
	<h3>Hi, I'm <span class='color-ruby'>Nithin</span></h3>
	<p><a href="http://twitter.com/nithinbekal">@nithinbekal</a></p>
	<br>
	<p>
		<b><a href='http://wowmakers.com'><span class='color-wowmakers'>Wow</span><span class='color-white'>Makers</span></a></b>
		/
		<a href="http://crowdstudio.in"><span class='color-crowdstudio'>CrowdStudio</span></a>
	</p>
</section>

<section>
	<h2>"<span class='color-ruby'>Ruby</span> makes<br>programmers happy"</h2>
	<p>&mdash; <span class='color-wowmakers'>Matz</span>, the creator of Ruby</p>
</section>

<section>
	<h3><span class='color-ruby'>Hello, world!</span></h3>
	<pre><code class='ruby' data-trim contenteditable>
puts 'Hello, world!'
	</code></pre>
</section>

<section>
	<h1>A quick tour</h1>
</section>


<section>
	<h3><span class='color-ruby'>Numbers</span></h3>
	<pre><code class='ruby' data-trim contenteditable>
2 + 2      #=> 4
2 + 3.14   #=> 5.14
2 ** 100   #=> 1267650600228229401496703205376
	</code></pre>
</section>


<section>
	<h3>What about <span class='color-ruby'>data types?</span></h3>
	<pre><code class='ruby' data-trim contenteditable>
2.class                #=> Fixnum
3.14.class             #=> Float
(2**100).class         #=> Bignum
	</code></pre>
</section>


<section>
  <h3><span class='color-ruby'>Variables</span></h3>
  <pre><code class='ruby' data-trim contenteditable>
x = 1        # x is an integer (class FixNum)
x = x + 1.5  # x is now a Float
x = 'Ruby'   # Now a string

puts "Hello, #{x}!"   #=> 'Hello, Ruby!'
  </code></pre>
</section>


<section>
  <h3><span class='color-ruby'>Strings</span></h3>
  <pre><code class='ruby' data-trim contenteditable>
'Hello, world!'
'Hello'.class   #=> String 
'Hello'.size    #=> 5
  </code></pre>
</section>


<section>
  <h3><span class='color-ruby'>Arrays</span></h3>
  <pre class='fragment'><code class='ruby' data-trim contenteditable>
items = [1, 2, 3]
items << 'a'       #=> [1, 2, 3, 'a']
  </code></pre>
</section>


<section>
  <h3><span class='color-ruby'>Arrays</span></h3>
  <pre><code class='ruby' data-trim contenteditable>
x = items.pop      #=> 'a'
items              #=> [1, 2, 3]
items.push 4       #=> [1, 2, 3, 4]
  </code></pre>
</section>

<section>
  <h3><span class='color-ruby'>Ranges</span></h3>
  <pre><code class='ruby' data-trim contenteditable>
(1..3)
(1..3).class  #=> Range
(1..3).to_a   #=> [1, 2, 3]
  </code></pre>
</section>


<section>
  <h3><span class='color-ruby'>Hashes</span></h3>
  <pre><code class='ruby' data-trim contenteditable>
person = {
  name:      'Matz',
  languages: ['C', 'Python', 'Ruby']
}

# OR

person = { 'Matz' }
person[:languages] = ['C', 'Python', 'Ruby']
  </code></pre>
</section>


<section>
  <h3><span class='color-ruby'>Iteration</span></h3>
  <pre><code class='ruby' data-trim contenteditable>
(0..2).each do |i|
  puts i*2
end
  </code></pre>
</section>


<section>
  <h3><span class='color-ruby'>Conditions</span></h3>
  <pre><code class='ruby' data-trim contenteditable>
if x == 2
  do_something()
end

do_something if x == 2
  </code></pre>
</section>


<section>
  <h3><span class='color-ruby'>Conditions</span></h3>
  <pre><code class='ruby' data-trim contenteditable>
do_something if x == true
do_something if x
  </code></pre>
</section>


<section>
  <h3><span class='color-ruby'>Functions</span></h3>
  <pre><code class='ruby' data-trim contenteditable>
def sqare(x)
  x*x
end

square(3)   #=> 9
  </code></pre>
</section>


<section>
  <h3><span class='color-ruby'>Enumerables</span></h3>
  <p>Array of squares</p>
  <pre><code class='ruby' data-trim contenteditable>
list = (1..3)	

squares = list.map { |i| i * 2 }  #=> [1, 4, 9]
  </code></pre>
</section>


<section>
  <h3><span class='color-ruby'>Enumerables</span></h3>
  <p>Using our square() method</p>
  <pre><code class='ruby' data-trim contenteditable>
list = (1..3)

squares = list.map :square   #=> [1, 4, 9]
  </code></pre>
</section>


<section>
  <h3><span class='color-ruby'>Enumerables</span></h3>
  <p>Sum of the numbers</p>
  <pre><code class='ruby' data-trim contenteditable>
list = (1..3)

squares = list.reduce :+
  </code></pre>
</section>


<section>
  <h3><span class='color-ruby'>Enumerables</span></h3>
  <p>Select/reject items</p>
  <pre><code class='ruby' data-trim contenteditable>
(1..5).select { |i| i%2 == 0 }  #=> [2, 4]
(1..5).reject { |i| i%2 == 0 }  #=> [1, 3, 5]
  </code></pre>
</section>


<section>
  <h3><span class='color-ruby'>Enumerables</span></h3>
  <p>Or even shorter</p>
  <pre><code class='ruby' data-trim contenteditable>
(1..5).select :even?  #=> [2, 4]
(1..5).reject :even?  #=> [1, 3, 5]
  </code></pre>
</section>



<section>
  <h3><span class='color-ruby'>Blocks</span></h3>
  <pre><code class='ruby' data-trim contenteditable>
def foo
  puts 'Before yield'
  yield
  puts 'After yield'
end
	
foo { puts 'Inside the block' }

#=> Before yield
#=> Inside the block
#=> After yield
  </code></pre>
</section>


<section>
  <h3><span class='color-ruby'>Procs</span></h3>
  <pre><code class='ruby' data-trim contenteditable>
foo = Proc.new do
  puts 'Hello'
end

proc.call
  </code></pre>
</section>



<section>
  <h3><span class='color-ruby'>Lambda</span></h3>
  <pre><code class='ruby' data-trim contenteditable>
hello = lambda { |x| puts "Hello, #{x}!" }

hello.call 'world'   #=> Hello, world!
  </code></pre>
</section>


<section>
	<h2><span class='color-ruby'>Objects and classes</span></h2>
</section>


<section>
	<h2><span class='color-ruby'>Objects and classes</span></h2>
  <pre><code class='ruby' data-trim contenteditable>
class Dog
  def greet
    'Woof!'
  end
end

dog = Dog.new
dog.greet       #=> 'Woof!'
  </code></pre>
</section>


<section>
	<h2><span class='color-ruby'>Instance variables</span></h2>
  <pre><code class='ruby' data-trim contenteditable>
class Dog
  def name=(n)
    @name = n
  end

  def greet
    "Woof, I'm #{@name}"
  end
end

dog = Dog.new
dog.name = 'Scooby'
dog.greet           #=> 'Woof! I'm Scooby.'
  </code></pre>
</section>


<section>
  <h2><span class='color-ruby'>Constructors</span></h2>
  <pre><code class='ruby' data-trim contenteditable>
class Dog
  def initialize(name)
    @name = name
  end

  def greet
    "Woof, I'm #{@name}"
  end
end

dog = Dog.new 'Scooby'
dog.greet                #=> 'Woof! I'm Scooby.'
  </code></pre>
</section>


<section>
	<h2><span class='color-ruby'>Class variables</span></h2>
  <pre><code class='ruby' data-trim contenteditable>
class Cat
  @@sound = 'Meow'

  def greet
    @sound
  end
end

garfield = Cat.new
garfield.greet       #=> 'Meow!'
  </code></pre>
</section>


<section>
	<h2><span class='color-ruby'>Attribute accessors</span></h2>
  <pre><code class='ruby' data-trim contenteditable>
class Dog
  def name=(name)
    @name = name
  end

  def name
    @name
  end
end
  </code></pre>
</section>


<section>
	<h2><span class='color-ruby'>Attribute accessors</span></h2>
  <pre><code class='ruby' data-trim contenteditable>
class Dog
  attr_accessor :name
end

# Also
# * attr_reader
# * attr_writer
  </code></pre>
</section>



<section>
	<h2><span class='color-ruby'>Open classes</span></h2>
  <pre class='fragment'><code class='ruby' data-trim contenteditable>
class Fixnum
  def plus_five
    self + 5
  end
end

1.plus_five   #=> 6
  </code></pre>
</section>


<section>
	<h2><span class='color-ruby'>Inheritance</span></h2>
  <pre><code class='ruby' data-trim contenteditable>
class Animal
  def initialize(name)
    @name = name
  end

  def greet
    'Hello!'
  end
end
  </code></pre>
</section>


<section>
	<h2><span class='color-ruby'>Inheritance</span></h2>
  <pre><code class='ruby' data-trim contenteditable>
class Dog < Animal
  def greet
    "Hello, I'm #{@name}! Woof, woof!"
  end
end

goofy = Dog.new('Goofy')
goofy.greet      #=> "Hello, I'm Goofy! Woof, woof!"
  </code></pre>
</section>


<section>
	<h2><span class='color-ruby'>Inheritance</span></h2>
  <pre><code class='ruby' data-trim contenteditable>
class Cat < Animal
  # do nothing here
end

tom = Dog.new('Tom')
tom.greet                #=> "Hello!"
  </code></pre>
</section>


<section>
	<h2><span class='color-ruby'>Class methods</span></h2>
  <pre><code class='ruby' data-trim contenteditable>
class Dog
  def self.default_greeting
    'Woof!'
  end
end

Dog.default_greeting    #=> 'Woof!'
  </code></pre>
</section>



<section>
	<h2><span class='color-ruby'>Singletons</span></h2>
  <pre><code class='ruby' data-trim contenteditable>
class Dog
  def greet
    'Woof'
  end
end

scooby = Dog.new
scooby.greet       #=> 'Woof'
  </code></pre>
</section>


<section>
	<h2><span class='color-ruby'>Singletons</span></h2>
  <pre><code class='ruby' data-trim contenteditable>
# ... contd

def scooby.greet
  'Scooby Doo!'
end

scooby.greet       #=> 'Scooby Doo!'
  </code></pre>
</section>

<section>
	<h2><span class='color-ruby'>Modules - extend</span></h2>
  <pre><code class='ruby' data-trim contenteditable>
module Speech
  def greeting
    'Hello'
  end
end

class Dog
  extend Speech
end

Dog.greeting      #=> 'Hello'
  </code></pre>
</section>


<section>
	<h2><span class='color-ruby'>Modules - include</span></h2>
  <pre><code class='ruby' data-trim contenteditable>
module Speech
  def greet
    'Hello'
  end
end

class Dog
  include Speech
end

dog = Dog.new
dog.greet      #=> 'Hello'
  </code></pre>
</section>


<section>
	<h2><span class='color-ruby'>method_missing</span></h2>
  <pre><code class='ruby' data-trim contenteditable>
class Dog
  def method_missing(method_name, *args)
    "Ï don't understand!"
  end
end

scooby = Dog.new
scooby.hello      #=> "I don't understand!"
  </code></pre>
</section>


<section>
	<h2><span class='color-ruby'>method_missing</span></h2>
  <pre><code class='ruby' data-trim contenteditable>
class Dog
  def method_missing(method_name, *args)
    if method_name.to_s =~ /^say_(.*)/
    	"Dog says: #{$1}"
    end
  end
end

scooby = Dog.new
scooby.hello      #=> nil
scooby.say_hello  #=> 'Dog says: hello'
  </code></pre>
</section>


<section>
	<h1><span class='color-ruby'>Ecosystem</span></h1>
</section>


<section>
	<h2><span class='color-ruby'>Implementations</span></h2>
	<h3>MRI, Rubinius,</h3>
	<h3>JRuby, MacRuby...</h3>
</section>


<section>
	<h2><span class='color-ruby'>Gems</span></h2>
	<h3> <a href="http://rubygems.org">rubygems.org</a></h3>
</section>


<section>
	<h2><span class='color-ruby'>RVM</span></h2>
	<h3><a href="http://rvm.io/">rvm.io</a></h3>
	<br>
	<h4 class='fragment'>Or Rbenv, chruby</h4>
</section>

<section>
	<h1><span class='color-ruby'>Resources</span></h1>
</section>

<section>
	<h2><span class='color-ruby'>Try Ruby</span></h2>
	<p>Run Ruby code in the browser</p>
	<br>
	<h3><a href="http://tryruby.org/">tryruby.org</a></h3>
</section>


<section>
	<h2><span class='color-ruby'>Rubymonk</span></h2>
	<p>Interactive Ruby tutorials in the browser</p>
	<br>
	<h3><a href="http://rubymonk.com/">rubymonk.com</a></h3>
</section>


<section>
	<h2><span class='color-ruby'>Books</span></h2>
	<br>
  		<h3 class='fragment'>Why's Poignant Guide to Ruby</h3>
  		<h3 class='fragment'>Learn to Program</h3>
  		<h3 class='fragment'>Humble Little Ruby Book</h3>
</section>

