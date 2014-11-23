---
layout: post
title: "Flip Flop Operator in Ruby"
date:  2014-11-21 17:27:41
categories: ruby
---

The flip flop operator is one of those weird features of Ruby that most people aren't even aware of. It's one of the many Perlisms that sneaked into Ruby, but hasn't caught on. In this post, we will look at what flip-flop operators are, and where you can use them.

# What is it?

The flip flop operator is a range (`..`) operator used between two conditions in a conditional statement. It looks like this:

{% highlight ruby %}
(1..20).each do |x|
  puts x if x == 5 .. x == 10
end
{% endhighlight %}

The condition evalutaes to false every time it is evaluated until the first part evaluates to true. Then it evaluates to true until the second part evaluates to true. In the above example, the flip-flop is turned on when `x == 5` and stays on until `x == 10`, so the numbers from 5 to 10 are printed.

# Another example

Let's take another example that sheds more light on this operator's behavior. Imagine you're parsing a file which has markers called `indent` and `dedent` in it. Whenever you encounter a line that contains `indent` you need to turn ON indentation for all lines after that, and turn it OFF when you come across a line that contains `dedent`.

As an example, this is the text we're trying to transform:

{% highlight text %}
zero indentation
indent
inside block
dedent
after the block
indent
another block
dedent
end of file
{% endhighlight %}

And this is what the output should look like:

{% highlight text %}
zero indentation
  indent
  inside block
  dedent
after the block
  indent
  another block
  dedent
end of file
{% endhighlight %}

In this case, we would need to keep track of whether or not we've turned on indentation. The flip-flop operator does this out of the box for us.

{% highlight ruby %}
lines = File.readlines('somefile')

lines.each do |line|
  if line =~ /^indent/ .. line =~ /^dedent/
    puts " " + line
  else
    puts line
  end
end
{% endhighlight %}

Now the operator starts looking a bit more useful. You could read this as: starting from the lines containing `indent`, until you encounter `dedent`, add two spaces at the start of the line.

# Is it going to be removed from Ruby?

There is an [open issue in Ruby's issue tracker](https://bugs.ruby-lang.org/issues/5400) asking for the feature to be removed from Ruby. This is from before Ruby 2.0 was released, and Matz stated that if it were to be removed, it would have to wait till Ruby 3.0.

> Under the current plan, I am not going to remove flip-flop from 2.0, since we are not going to made incompatible changes anytime soon. We have to wait until 3.0. (--Matz)

I'm not a big fan of the syntax, and have never had to use it any of my code. If it were to be removed in the future, it wouldn't be missed too much.

There hasn't been any activity on this issue in the past year, so there's no decision yet about whether or not it will disappear some day. But it's good to be aware of the syntax in case you come across the syntax when reading other people's code.

# Links

* [Feature #5400 - Remove flip-flops in 2.0](https://bugs.ruby-lang.org/issues/5400) - the discussion on the Ruby issue tracker

