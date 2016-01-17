---
layout: revealjs
title: "Distributed Ruby"
date:  2016-01-17 22:48:22
---

<section>
  <h2 class='color-red'>Distributed Ruby</h2>
</section>

<section>
  <h3>Queue</h3>
  <pre><code class="ruby">
DRb.start_service('druby://localhost:9999', Queue.new)
DRb.thread.join
  </code></pre>
</section>

<section>
  <h3>Producer</h3>
  <pre><code class="ruby">
DRb.start_service
queue = DRbObject.new_with_uri('druby://localhost:9999')
queue.push(7)
  </code></pre>
</section>

<section>
  <h3>Consumer</h3>
  <pre><code class="ruby">
DRb.start_service
queue = DRbObject.new_with_uri('druby://localhost:9999')
loop do
  data = queue.pop
  puts "Processing #{data}"
end
  </code></pre>
</section>

<section>
  <img src="https://dl.dropboxusercontent.com/u/13430809/assets/slides.nithinbekal.com/tmux-vim/slide-7.jpg" />
</section>
