---
layout: post
title: "Rake task for Jekyll stats"
date:  2024-01-26
categories:
- jekyll
- ruby
og_image: jekyll-stats.png
---

A few months ago,
I realized that I had
[written 100 posts on this blog](/posts/100-posts/).
This prompted me to add
a rake task to quickly look up
stats about this blog.
This is highly coupled to this blog's theme,
but hopefully someone might be able to
convert this to work for their own blog.

The taks prints out
the number of posts,
the total number of words written
and number of posts by year.
Here's the task from my `Rakefile`:

```ruby
require "nokogiri"

desc "Print stats about this blog"
task :stats do
  yearly_stats = Dir["_posts/*"]
    .map { |filepath| filepath.delete_prefix("_posts/").split("-").first }
    .tally
    .sort_by { |k, _v| k }
    .to_h

  total_posts = yearly_stats.values.sum(&:to_i)

  total_words = Dir["_site/posts/*/index.html"]
    .sum { |file| word_count(file) }

  puts <<~STATS
    Total posts: #{total_posts.to_s.rjust(8)}
    Total words: #{number_to_human(total_words).rjust(8)}

    Yearly stats

  STATS

  yearly_stats.each do |year, count|
    puts "#{year}\t#{count.to_s.rjust(4)}\t#{"|" * count}"
  end
end

def word_count(file)
  File.open(file) { |f| Nokogiri::HTML(f) }
    .at_css(".post .content")
    .text
    .strip
    .split
    .count
end

def number_to_human(n)
  n.to_s
    .split("")
    .reverse
    .each_slice(3)
    .map(&:join)
    .join(",")
    .reverse
end
```

If you want to customize this
for your own blog,
there are a couple of things
that might be different for you:

- The `word_count` method has a reference
  to the `".post .content"` DOM element,
  which might be different in other blogs.
- The permalink for my blog is `/posts/:title/`,
  but you might have something different,
  so you'll need to chagne the `"posts/*"` everywhere
  to match the pattern for your permalink.

When I ran `rake stats` for this blog,
this is what I saw:

```
Total posts:      110
Total words:   65,348

Yearly stats

2010       5    |||||
2011       4    ||||
2012       1    |
2013       1    |
2014      20    ||||||||||||||||||||
2015      32    ||||||||||||||||||||||||||||||||
2016      11    |||||||||||
2017       6    ||||||
2018       1    |
2019       4    ||||
2020       5    |||||
2021       1    |
2022       2    ||
2023      13    |||||||||||||
2024       4    ||||
```

Wow, 65,000 is a lot words.
That's approaching a novel's size!
