
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

def get_metadata(*keys)
  meta = {}
  keys.each { |k| meta[k] = ask("#{k.capitalize}: ") }
  meta
end

def ask(qn)
  STDOUT.print qn
  STDIN.gets.chomp
end

