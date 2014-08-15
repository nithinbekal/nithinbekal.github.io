---
layout: revealjs
title: 'Spelling Corrector in Ruby'
date:  2013-11-17 14:00:00
---

<section>
  <h2><span class='color-white'>Spelling Corrector in</span> <span class='color-ruby'>Ruby</span></h2>
  <p><b><a href="http://twitter.com/nithinbekal">@nithinbekal</a></b></p>
</section>

<section>
  <h2>Peter Norvig</h2>
  <p><a href="http://norvig.com/spell-correct.html">How to Write a Spelling Corrector</a></p>
</section>

<section>
  <h2>gem install spellingbee</h2>
  <pre><code class='ruby'>
    require 'spellingbee'
    speller = SpellingBee.new

    speller.correct('speling') #=> 'spelling'
  </code></pre>
</section>

<section>
  <h2>Dictionary</h2>
</section>

<section>
  <h2>Finding Candidates</h2>
  <p>Delete, Transpose, Replace, Insert</p>
</section>

<section>
  <h2>Deletions</h2>
  <pre><code class='ruby' data-trim contenteditable>
  rewd -> .ewd   r.wd   re.d   rew
          ewd    rwd    red    rew
</code></pre>
</section>

<section>
  <h2>Transpositions</h2>
  <pre><code class='ruby' data-trim contenteditable>
  rewd -> (er)wd   r(we)d   re(dw)
          erwd     rwed     redw
</code></pre>
</section>

<section>
  <h2>Replacements</h2>
  <pre><code class='ruby' data-trim contenteditable>
rewd -> (a)ewd   (b)ewd   (c)ewd ...
        r(a)wd   r(b)wd   r(c)wd ...
        re(a)d   re(b)d   re(c)d ...
        ...
  </code></pre>
</section>

<section>
  <h2>Insertions</h2>
  <pre><code class='ruby' data-trim contenteditable>
rewd -> (a)rewd (b)rewd (c)rewd ... r(a)ewd r(b)ewd ...
  </code></pre>
</section>

<section>
  <h2>Benchmarks</h2>
</section>

<section>
  <h2>Benchmarks</h2>
  <pre><code class='ruby'>
                  Time (s)        <span class='fragment'>Accuracy</span>

      Python        7.0              <span class='fragment'>74 %</span>
      Ruby          1.3              <span class='fragment'>54 %</span>

      (270 tests)
  </code></pre>
</section>

<section>
  <h2>Probability</h2>
  <pre><code class='ruby' data-trim contenteditable>
        CLEARK -> CLEAR or CLERK?
  </code></pre>
</section>

<section>
  <h2>Probability</h2>
  <p>61% accuracy</p>
</section>

<section>
  <h2>Edit distance = 2</h2>
  <p class='fragment'>45 seconds</p>
  <p class='fragment'>66% accuracy</p>
  <p class='fragment'>Well... 89%</p>
</section>

<section>
  <h2>ffi-aspell</h2>
  <p>GNU aspell</p>
</section>

<section>
  <h2>gem install spellingbee</h2>
  <p><a href="http://github.com/nithinbekal/spellingbee">github.com/nithinbekal/spellingbee</a></p>
</section>

<section>
  <h2>Thank you!</h2>
  <p class='fragment'><b>
    <a href='http://wowmakers.com'><span class='color-wowmakers'>WowMakers</span></a> /
    <a href="http://crowdstudio.in"><span class='color-crowdstudio'>CrowdStudio</span></a> /
    <a href="http://twitter.com/nithinbekal">@nithinbekal</a>
  </b></p>

</section>
