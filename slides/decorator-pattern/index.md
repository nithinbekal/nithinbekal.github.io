---
layout: revealjs
title: 'Decorator Pattern'
date: 2014-09-21 14:00:00
---
<section>
  <h2 class='color-red'>Decorator Pattern</h2>
</section>

<section>
  <pre><code class="ruby">
# Wrapper objects
# Implement original object's interface
# Delegate methods to the original object
  </code></pre>
</section>

<section>
  <pre><code class="ruby">
class Burger
  def cost
    50
  end
end
  </code></pre>
</section>

<section>
  <pre><code class="ruby">
class BurgerWithCheese < Burger
  def cost
    60 # +10 for cheese
  end
end
  </code></pre>
</section>

<section>
  <pre><code class="ruby">
class LargeBurger < Burger
  def cost
    65 # +15 for large
  end
end
  </code></pre>
</section>

<section>
  <pre><code class="ruby">
class LargeBurgerWithCheese < Burger
  def cost
    75 # +15 (for large) + 10 (for cheese)
  end
end
  </code></pre>
</section>

<section>
  <pre><code class="ruby">
class JumboBurgerWithCheese < Burger
  def cost
    90 # +15 (2xlarge) + 10 (cheese)
  end
end
  </code></pre>
</section>

<section>
  <h3>Modules</h3>
</section>

<section>
  <pre><code class="ruby">
module Cheese
  def cost
    super + 10
  end
end
  </code></pre>
</section>

<section>
  <pre><code class="ruby">
module Large
  def cost
    super + 15
  end
end
  </code></pre>
</section>

<section>
  <pre><code class="ruby">
burger = Burger.new
burger.extend(Cheese)
burger.extend(Large)
p burger.cost #=> 75
  </code></pre>
</section>

<section>
  <pre><code class="ruby">
class JumboBurger < Burger
  def cost
    80 # + 30 (2xlarge)
  end
end
  </code></pre>
</section>

<section>
  <pre><code class="ruby">
burger
burger.extend(Large)
p burger.cost #=> 65

burger.extend(Large)
p burger.cost #=> 65
  </code></pre>
</section>

<section>
  <h3>Let's try decorators</h3>
</section>

<section>
  <pre><code class="ruby">
class LargeBurger
  def initialize(burger)
    @burger = burger
  end
end
  </code></pre>
</section>

<section>
  <pre><code class="ruby">
class LargeBurger
  def cost
    @burger.cost + 15
  end
end
  </code></pre>
</section>

<section>
  <pre><code class="ruby">
class BurgerWithCheese
  def initialize(burger)
    @burger = burger
  end
end
  </code></pre>
</section>

<section>
  <pre><code class="ruby">
class BurgerWithCheese
  def cost
    @burger.cost + 10
  end
end
  </code></pre>
</section>

<section>
  <pre><code class="ruby">
burger = Burger.new
large_burger = LargeBurger.new(burger)
  </code></pre>
</section>

<section>
  <pre><code class="ruby">
jumbo_burger = LargeBurger.new(large_burger)
jumbo_cheese_burger = BurgerWithCheese.new(jumbo_burger)
  </code></pre>
</section>

<section>
  <h2>SimpleDelegator</h2>
</section>

<section>
  <pre><code class="ruby">
class BurgerDecorator < SimpleDelegator
  def initialize(burger)
    @burger = buger
    super(@burger)
  end
end
  </code></pre>
</section>

<section>
  <pre><code class="ruby">
class LargeBurger < BurgerDecorator
  def cost
    super + 15
  end
end
  </code></pre>
</section>

<section>
  <pre><code class="ruby">
class BurgerWithCheese < BurgerDecorator
  def cost
    super + 10
  end
end
  </code></pre>
</section>

<section>
  <h3>Presenter pattern</h3>
</section>

<section>
  <pre><code class="ruby">
class BasePresenter < SimpleDelegator
  def initialize(object, context)
    @model, @context = object, context
    super(@model)
  end
end
  </code></pre>
</section>

<section>
  <pre><code class="ruby">
class BasePresenter
  def h # helper method
    @context
  end
end
  </code></pre>
</section>

<section>
  <pre><code class="ruby">
class PostPresenter < BasePresenter
  def author
    h.link_to super, h.user_path(super)
  end
end
  </code></pre>
</section>

<section>
  <pre><code class="ruby">
class PostsController
  def show
    post = Post.find params[:id]
    @post = PostPresenter.new(post)
  end
end
  </code></pre>
</section>

<section>
  <h3>Another approach</h3>
</section>

<section>
  <pre><code class="ruby">
module ApplicationHelper
  def present(object)
    klass = "#{object.class}Presenter".constantize
    presenter = klass.new(object, self)
    yield(presenter) if block_given?
    presenter
  end
end
  </code></pre>
</section>

<section>
  <pre><code class="ruby">
- present(@post) do |post|
  %h1= post.title
  %p.author= post.author
  </code></pre>
</section>

<section>
  <h3>Draper</h3>
  <pre><code class='ruby'>gem install draper</code></pre>
</section>

<section>
  <pre><code class="ruby">
class PostsController
  def show
    @post = Post.find(params[:id]).decorate
  end
end
  </code></pre>
</section>

<section>
  <pre><code class="ruby">
class PostsController
  def index
    @posts = Post.all.decorate
  end
end
  </code></pre>
</section>

<section> 
  <img src="https://dl.dropboxusercontent.com/u/13430809/assets/slides.nithinbekal.com/tmux-vim/slide-7.jpg" />
</section>
