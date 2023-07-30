
require "nokogiri"

task :post do
  meta = get_metadata(:title, :slug, :categories)
  filename = "#{Time.now.strftime '%Y-%m-%d'}-#{meta[:slug]}.md"
  path = File.join('_posts', filename)
  text = <<~EOF
    ---
    layout: post
    title: \"#{meta[:title]}\"
    date:  #{Time.now.strftime('%Y-%m-%d')}
    categories: #{meta[:categories].downcase}
    ---
  EOF
  File.open(path, 'w') { |f| f << text }
end

task :page do
  meta = get_metadata(:title, :slug)
  path = File.join('.', "#{meta[:slug]}.md")
  text = <<~EOF
    ---
    layout: page
    title: \"#{meta[:title]}\"
    date:  #{Time.now.strftime('%Y-%m-%d')}
    ---
  EOF
  File.open(path, 'w') { |f| f << text }
end

desc "Print stats about this blog"
task :stats do
  yearly_stats = Dir["_posts/*"]
    .map { |filepath| filepath.delete_prefix("_posts/").split("-").first }
    .tally
    .sort_by { |k, _v| k }
    .to_h

  total_posts = yearly_stats.values.map(&:to_i).sum

  total_words = Dir["_site/posts/*/index.html"]
    .map(&method(:word_count))
    .sum

  puts ""
  puts "Total posts: #{total_posts}"
  puts "Total words: #{total_words}"
  puts ""

  puts "Yearly stats"
  puts "------------"

  yearly_stats.each do |year, count|
    puts "#{year}\t#{count.to_s.rjust(4)}\t#{"|" * count}"
  end
end

def get_metadata(*keys)
  meta = {}
  keys.each { |k| meta[k] = ask("#{k.capitalize}: ") }
  meta
end

def ask(qn)
  STDOUT.print qn
  STDIN.gets.chomp
end

def word_count(file)
  doc = File.open(file) { |f| Nokogiri::HTML(f) }
  post_div = doc.at_css('.post')

  post_content = post_div.text.strip
  total_words = post_content.split.count
end
