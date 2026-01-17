
require "nokogiri"
require "yaml"
require "date"
require "fileutils"

desc "Create a new post"
task :post do
  attributes = fetch_attributes(:title, :slug, :categories)
  slug = attributes.delete("slug")
  attributes["layout"] = "post"
  attributes["date"] = now
  content = <<~YAML
    ---
    title: #{attributes["title"]}
    layout: post
    categories: #{attributes["categories"]}
    date: #{now}
    og_image: #{slug}.png
    ---
  YAML

  path = File.join("_posts", "#{now}-#{slug}.md")
  File.write(path, content)
  FileUtils.touch("index.html")
  puts "Created #{path}"
end

desc "Create a new page"
task :page do
  fetch_attributes(:title, :slug)
    .then { write_to_file(dir: "notes", attributes: _1, layout: "page") }
end

desc "Print stats about this blog"
task :stats do
  yearly_stats = Dir["_posts/*"]
    .map { |filepath| filepath.delete_prefix("_posts/").split("-").first }
    .tally
    .sort_by { |k, _v| k }
    .to_h

  total_posts = yearly_stats.values.sum(&:to_i)
  total_words = Dir["_site/posts/*/index.html"].sum { word_count(_1) }

  puts <<~STATS
    Total posts: #{total_posts.to_s.rjust(8)}
    Total words: #{number_to_human(total_words).rjust(8)}

    Yearly stats

  STATS

  yearly_stats.each do |year, count|
    puts "#{year}\t#{count.to_s.rjust(4)}\t#{"|" * count}"
  end
end

desc "Generate OG image for a post"
task :og_image, [:post_file] do |t, args|
  post_file = args[:post_file]

  if post_file.nil? || post_file.empty?
    post_files = Dir.glob("_posts/*.md").sort.reverse
    post_file = fzf(post_files, "Select a post to generate OG image for")
    exit if post_file.nil? || post_file.empty?
  end

  unless File.exist?(post_file)
    puts "File not found: #{post_file}"
    exit 1
  end

  title_match = File.read(post_file).match(/^title: (.+)$/)
  title = YAML.load(title_match[1]) if title_match

  unless title
    puts "Could not extract title from #{post_file}"
    exit 1
  end

  slug = File.basename(post_file, ".md").sub(/^\d{4}-\d{2}-\d{2}-/, "")

  date_match = File.basename(post_file, ".md").match(/^(\d{4})-(\d{2})-(\d{2})/)
  unless date_match
    puts "Could not extract date from filename"
    exit 1
  end

  date = Date.new(date_match[1].to_i, date_match[2].to_i, date_match[3].to_i)
  formatted_date = date.strftime("%-d %b, %Y")

  output_dir = "tmp/images"
  FileUtils.mkdir_p(output_dir)
  output_path = File.join(output_dir, "#{slug}.png")

  cmd = [
    "magick", "-size", "1200x630", "xc:#2d2d2d",
    "-font", "Avenir-Heavy",
    "-pointsize", "50",
    "-fill", "#dddddd",
    "-gravity", "center",
    "-draw", "text 0,-80 \"#{title.gsub('"', '\\"')}\"",
    "-font", "Avenir-Book",
    "-pointsize", "35",
    "-fill", "#bbbbbb",
    "-draw", "text 0,0 'Nithin Bekal'",
    "-pointsize", "20",
    "-fill", "#aaaaaa",
    "-draw", "text 0,50 '#{formatted_date}'",
    output_path
  ]

  system(*cmd)
  puts output_path
end

def fetch_attributes(*keys)
  keys.to_h { |k| [k.to_s, ask("#{k.capitalize}: ")] }
end

def write_to_file(dir:, attributes:, layout: "post")
  slug = attributes.delete("slug")
  attributes["layout"] = layout
  attributes["date"] = now
  content = YAML.dump(attributes) + "---"

  path = File.join(dir, "#{slug}.md")
  File.write(path, content)
end

def now = Time.now.strftime("%Y-%m-%d")

def ask(qn)
  STDOUT.print qn
  STDIN.gets.chomp
end

def fzf(files, prompt)
  cmd = ["fzf", "--prompt=#{prompt}: ", "--layout=reverse", "--height=40%"]
  IO.popen(cmd, "r+") do |fzf|
    fzf.puts files
    fzf.close_write
    fzf.gets&.strip
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
    .chars
    .reverse
    .each_slice(3)
    .map(&:join)
    .join(",")
    .reverse
end
