---
layout: post
title: "Script to bump Ruby version in Rails app"
date: 2024-07-03
og_image: bump-ruby-script.png
categories:
- ruby
- rails
---

Any time I need to bump a Ruby version in a Rails repo,
I need to find which files
have hardcoded references to the version.
The 3 files that usually have hardcoded versions are
`Dockerfile`, `Gemfile` and `.tool-versions`.
I wrote a script to automate
Ruby version bumps by putting this
in `bin/bumpruby`:

```ruby
#!/usr/bin/env ruby

unless (new_version = ARGV[0])
  puts "💥 Usage: bin/bumpruby <version>"
  return
end

system("asdf install ruby #{new_version}")
system("asdf shell ruby #{new_version}")
puts "\n⭐️ Switched to ruby #{new_version}"

def bump_ruby_version(file_name, pattern, replacement)
  content = File.read(file_name)
  new_content = content.gsub(pattern, replacement)
  File.write(file_name, new_content)
  puts "⭐️ Replaced version in #{file_name}"
end

bump_ruby_version(".tool-versions", /ruby \d+\.\d+\.\d+/, "ruby #{new_version}")
bump_ruby_version("Dockerfile", /ARG RUBY_VERSION=\d+\.\d+\.\d+/, "ARG RUBY_VERSION=#{new_version}")
bump_ruby_version("Gemfile", /ruby "\d+\.\d+\.\d+"/, "ruby \"#{new_version}\"")

puts "⭐️ Bundle install"
system("bundle install")

puts "⭐️ Running tests"
system("bin/rails test")
```

Now we can use it like this
to bump to Ruby 3.3.3:

```bash
bin/bumpruby 3.3.3
```

Usually when minor Ruby versions are released,
it's because there's an important bug or vulnerability fix,
so it makes sense to upgrade right away.
I have a couple of toy apps
deployed to fly.io
that I don't touch very often.
Having a command to do that
means I'm less likely to procrastinate
when it comes to version bumps.
