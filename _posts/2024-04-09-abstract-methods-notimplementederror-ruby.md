---
layout: post
title: "Abstract methods and NotImplementedError in Ruby"
date:  2024-04-09
categories: ruby
og_image: abstract-methods-notimplementederror-ruby.png
---

Ruby's `NotImplementedError` exception is often used
as a placeholder in abstract classes
for methods that should be implemented by subclasses.
But did you know that
this is not how this exception class
was intended to be used?

## How is it commonly (mis)used?

Let's start with an example
of a common usage pattern of `NotImplementedError`.
We have a `BaseSetting` class,
and we want to convey that
anyone subclassing this
should implement a `to_html` method.

```ruby
class BaseSetting
  def to_html
    raise NotImplementedError
  end
end

class Text < BaseSetting
  def to_html
    "<input type='text'>"
  end
end

class Number < BaseSetting
  # Forgot to implement to_html
end

TextSetting.new.to_html   #=> "<input type='text'>"
NumberSetting.new.to_html #=> 💥 NotImplementedError
```

In the above case,
the `Text` setting class
already implements `to_html`,
If we're introducing
a new `Number` setting class,
we're letting ourselves know
to implement the `to_html`
by raising the exception at runtime.
You should only see this exception
when you test the feature locally,
or run your automated tests,
and should never reach production.

## What is `NotImplementedError` actually meant for?

`NotImplementedError` is raised
when a feature isn't available
on the current platform.
An example of this is `Process.fork`.
JRuby doesn't support `fork`,
so calling that method
will raise this exception.
Here's what the docs have to say about it:

> Raised when a feature is not implemented on the current platform.
> For example, methods depending on the fsync or fork system calls
> may raise this exception
> if the underlying operating system or Ruby runtime does not support them.

## Another reason to avoid it

If the semantics of this exception
haven't convinced you to avoid it,
here's another example.
The `convert_to_html` method
tries calling `to_html`
but provides a fallback in a rescue block.
What do you think happens
when we call this with a number setting?

```ruby
def convert_to_html(setting)
  setting.to_html
rescue => e
  # do_some_exception_logging(e)
  "<input type='#{setting.class.name.downcase}'>"
end

convert_to_html(Number.new)
```

If you run the above code,
you will still see that
`NotImplementedError` will be raised.
This is because `rescue => e`
assumes that you are rescuing
an exception that inherits from `StandardError`.
`NotImplementedError` inherits from `ScriptError`,
which in turn inherits from `Exception`.

![Ruby's exception classes](https://s3.amazonaws.com/nithinbekal.com/blog/ruby-notimplementederror/not-implemented-error-inheritance.png)

Since `StandardError` is not in this inheritance chain,
the rescue doen't handle  this exception.
The only way to rescue this is
to specify one of
`NotImplementedError`,
`ScriptError` or `Exception`
like this:

```ruby
rescue NotImplementedError => e
```

Exceptions raised by abstract methods
aren't really meant to be rescued like this,
so it's not a huge problem.
However, it is important to understand
Ruby's exception handling behavior
when choosing which exception class to use.

## Python's `NotImplementedError`

If this is not how it is meant to be used,
why is this so widely used?
One explanation could be that
[python has an exception of the same name](https://docs.python.org/3/library/exceptions.html),
which is actually intended for abstract methods:

> This exception is derived from RuntimeError.
> In user defined base classes,
> abstract methods should raise this exception
> when they require derived classes to override the method,
> or while the class is being developed to indicate
> that the real implementation still needs to be added.

## Alternative approaches

There are quite a few different patterns
that you could follow,
if you wanted to avoid raising `NotImplementedError`.
I'll list a few common patterns
that come to mind.

### 1. Provide a default implementation

When possible,
provide a default implementation
in the base class
instead of raising an exception.
This eliminates the risk
breaking things in production
because we accidentally missed an implementation.
For instance,
we could replace
the `BaseSetting#to_html` method like this:


```ruby
class BaseSetting
  def to_html
    "<input type='#{self.class.name.downcase}'>"
  end
end
```

An example of this approach
is the way activerecord
infers table names from model names.
If the activerecord model is called `Post`,
it assumes that the table is called `posts`,
but also lets you override this
by explicitly setting the table name like this:

```ruby
class Post < ApplicationRecord
  self.table_name = 'articles'
end
```

This way, you only need an implementation
when you're deviating
from a convention that you've established.

### 2. Explicitly raise with a message

Providing a default implementation
might not be practical
in more complex scenarios.
If you need an abstract method
to raises an exception,
the simplest option
is to raise with a clear error message
that tells you what you need to do to fix it.

```ruby
class Base
  def foo
    raise "#{self.class} must implement the method #{__method__}"
  end
end
```

If the intention of the exception
is to remind us to implement a method,
there's no better way than to
tell us the exact steps to do this.

### 3. Create a custom exception

Another simple alternative
is to define your own exception
that inherits from `StandardError`
and raise that instead.
This approach was favored when the
[graphql-ruby gem](https://github.com/rmosolgo/graphql-ruby/issues/2067)
moved away from `NotImplementedError`.

```ruby
class BaseSetting
  class MethodNotImplemented < StandardError; end

  def to_html
    raise MethodNotImplemented
  end
end
```

### 4. Raise `NoMethodError`

Another alternative is
to raise `NoMethodError` instead.
This class inherits from `StandardError`,
so rescue clauses will also work as expected.
Saying that a class doesn't respond to the method
is closer to what we're trying to convey anyway.
This is the approach preferred in the
[Hanami framework](https://github.com/hanami/controller/pull/377).

```ruby
class BaseSetting
  def to_html
    raise NoMethodError, "You must implement #{self.class}#to_html"
  end
end
```

### 5. Write tests

In many cases
where you have a base class
and multiple implementations,
you might need to maintain
a list of subclasses.
For instance,
take the following case
where we have a `Setting` base class,
and a factory method
that needs to know
which implementation to instantiate:

```ruby
class Setting
  SETTING_CLASSES = {
    "text" => TextSetting,
    "number" => NumberSetting,
  }

  def self.for(type)
    SETTING_CLASSES[type].new
  end
end
```

Since we already have a list of subclasses,
it's easier to omit the abstract method,
and instead write a test
that ensures that each of them
responds to a the method.

```ruby
test "all setting types respond to to_html" do
  Setting::SETTING_CLASSES.each_value do |setting_class|
    assert setting_class.new.respond_to?(:to_html),
      "#{setting_class} should implement to_html method."
  end
end
```

### 6. Sorbet

Not everyone in the Ruby community
is convinced by static type checkers,
but for more complex codebases,
Sorbet is a fantastic choice.
Here's what the above base class will look like
if we added sorbet signatures:

```ruby
class Base
  extend T::Helpers

  abstract!

  sig { abstract.returns(String) }
  def foo; end
end
```

With the above setup in place,
running the typechecker
using `srb typecheck`
will tell you which subclasses
need to implement
which abstract methods.

Sorbet is gradually typed,
so if you're not a fan of type signatures,
you can just add signatures
for these kinds of classes
without changing anything else.
It is also extremely fast,
so you can get the feedback
in a couple of seconds.
With its excellent editor integrations,
you won't even need to run the command manually
to see the typechecker results.

## Closing thoughts

Although we've looked at a few altenatives
to raising `NotImplementedError`,
I want to note that
if raising this exception
is working well for your codebase,
there's no need to go back
and replace everything.

Most people know what to do
when they encounter this exception,
so maybe it's fine to use the pattern
that everyone is familiar with.
However, if you want to change their minds,
you can always send them
a link to this post. ;)
