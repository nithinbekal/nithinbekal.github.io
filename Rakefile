
require "nokogiri"

desc "Create a new draft"
task :draft do
  fetch_attributes(:title, :slug, :categories)
    .then { write_to_file(dir: "_drafts", attributes: _1, layout: "post") }
end

desc "Create a new page"
task :page do
  fetch_attributes(:title, :slug)
    .then { write_to_file(dir: "notes", attributes: _1, layout: "page") }
end

desc "Publish a draft"
task :publish do
  draft_files = Dir.glob('_drafts/*.md')
  cmd = ['fzf', '--prompt=Select a draft to publish: ', '--layout=reverse', '--height=40%']
  draft_file = IO.popen(cmd, 'r+') do |fzf|
    fzf.puts draft_files
    fzf.close_write
    fzf.gets&.strip
  end

  next if draft_file.empty?

  filename = File.basename(draft_file)
  new_filename = "#{Time.now.strftime('%Y-%m-%d')}-#{filename}"
  new_path = File.join('_posts', new_filename)

  content = File.read(draft_file)
    .sub(/^date: .+$/, "date: #{Time.now.strftime('%Y-%m-%d')}")

  File.open(draft_file, 'w') { |f| f << content }
  File.rename(draft_file, new_path)
  puts "Draft published as #{new_path}"
end

desc "Unpublish a post"
task :unpublish do
  committed_files = `git ls-files _posts/*.md`.split("\n")
  post_files = Dir.glob('_posts/*.md') - committed_files
  post_file = IO.popen(['fzf', '--prompt=Select a post to unpublish: ', '--layout=reverse', '--height=40%'], 'r+') do |fzf|
    fzf.puts post_files
    fzf.close_write
    fzf.gets&.strip
  end

  next if post_file.empty?

  filename = File.basename(post_file)
  new_filename = filename.sub(/^\d{4}-\d{2}-\d{2}-/, '')
  new_path = File.join('_drafts', new_filename)

  File.rename(post_file, new_path)
  puts "Post unpublished as #{new_path}"
end

desc "Print stats about this blog"
task :stats do
  yearly_stats = Dir["_posts/*"]
    .map { |filepath| filepath.delete_prefix("_posts/").split("-").first }
    .tally
    .sort_by { |k, _v| k }
    .to_h

  total_posts = yearly_stats.values.sum(&:to_i)

  total_words = Dir["_site/posts/*/index.html"]
    .sum(&method(:word_count))

  puts <<~STATS
    Total posts: #{total_posts.to_s.rjust(8)}
    Total words: #{number_to_human(total_words).rjust(8)}

    Yearly stats

  STATS

  yearly_stats.each do |year, count|
    puts "#{year}\t#{count.to_s.rjust(4)}\t#{"|" * count}"
  end
end

def fetch_attributes(*keys)
  keys.to_h { |k| [k.to_s, ask("#{k.capitalize}: ")] }
end

def write_to_file(dir:, attributes:, layout: "post")
  attributes["layout"] = layout
  attributes["date"] = Time.now.strftime("%Y-%m-%d")
  content = YAML.dump(attributes) + "\n---"

  path = File.join(dir, "#{file}.md")
  File.write(path, content)
end

def ask(qn)
  STDOUT.print qn
  STDIN.gets.chomp
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
    .chars
    .reverse
    .each_slice(3)
    .map(&:join)
    .join(",")
    .reverse
end
