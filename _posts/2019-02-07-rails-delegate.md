---
layout: post
title: "Make Delegated Methods Private in Rails"
date:  2019-02-07 18:00:00
categories:
  - ruby
  - rails
---

Recently,
I came across some of my old code
that uses Rails'
[`delegate` method](https://api.rubyonrails.org/classes/Module.html#method-i-delegate).
Take a look at the following example,
where I'm delegating a couple of methods
to an instance variable,
but want to make them private.

```ruby
class UserDecorator
  def initialize(user)
    @user = user
  end

  def full_name
    "#{first_name} #{last_name}"
  end

  private

  delegate :first_name, :last_name, to: :@user
end
```

My intention was to make the `first_name` and `last_name` methods private.
Only `full_name` was supposed to be public here.
Let's see if this works as intended.

```ruby
user = User.new(first_name: 'John', last_name: 'Doe')
decorated_user = UserDecorator.new(user)

decorated_user.full_name #=> John Doe
decorated_user.first_name #=> John
decorated_user.last_name #=> Doe

decorated_user.methods - Object.instance_methods
#=> [:full_name, :last_name, :first_name]
```

As you can see,
we can call both the delegated methods.
They were supposed to be private!
What happened here?

The problem is that
putting `delegate` under the `private` scope
has no effect.
**Methods in Ruby
have no way of knowing
that the `private` visibility scope is set
when they are called from within a class.**
`delegate` uses `module_eval` to define
new methods with these names,
but it doesn't know
that it must make these methods private.

So what do we do
if we wish to delegate a method
without making it a part of the class' public interface?
Let's dig into how `delegate` works.
In cases like this,
I like to use the
[pry console](https://github.com/pry/pry)
to interactively inspect the behavior of the class.

```ruby
pry> cd UserDecorator
# This pry command puts us within the scope of the UserDecorator class.

pry> delegate :first_name, :last_name, to: :@user
#=> [:first_name, :last_name]

pry> instance_methods
#=> [:full_name, :last_name, :first_name]

pry> private :first_name, :last_name

pry> instance_methods
#=> [:full_name]
```

`delegate` returns the list of the delegated method names.
We can call `private` with the method names
to make them private.
This means we can explicitly make the methods private like this:

```ruby
class UserDecorator
  # def initialize...

  delegate :first_name, :last_name, to: :@user
  private :first_name, :last_name
end
```

Now, how can we avoid duplicating the list of method names?
Since `delegate` returns the list of method names,
we can pass the list to `private`
using the splat operator.

```ruby
class UserDecorator
  # def initialize...

  private *delegate(:first_name, :last_name, to: :@user)
end
```

Although this prevents duplication,
I don't find this syntax particularly intuitive.
Luckily,
Rails 6 is introducing
a new `private: true` keyword argument
to give us a cleaner syntax.

```ruby
# Rails 6+
delegate :first_name, :last_name, to: :@user, private: true
```

However,
as I write this post,
Rails 6 isn't out yet.
If you're on Rails 5.2 or below,
you'll have to use
the `private *delegate(...)` syntax for now.

### Links

- Rails PR:
  [delegate to, with `private: true` option](https://github.com/rails/rails/pull/31944)
