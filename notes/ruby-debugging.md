---
layout: page
title: "Ruby Debugging Tools"
date:  2018-03-23  0:54:12
---

Pry is my favorite debugging tool for Ruby.
With Rails, I use the `pry-byebug` gem
to effectively debug my code.

The `pry-rails` gem provides an easy way
to have pry console when running `rails c`.

I use this in my pryrc to get byebug style aliases:

```ruby
if defined?(PryByebug)
  Pry.commands.alias_command 'c', 'continue'
  Pry.commands.alias_command 's', 'step'
  Pry.commands.alias_command 'n', 'next'
  Pry.commands.alias_command 'f', 'finish'

  # Hit Enter to repeat last command
  Pry::Commands.command /^$/, "repeat last command" do
    _pry_.run_command Pry.history.to_a.last
  end
end
```
