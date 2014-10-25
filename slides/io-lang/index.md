---
layout: revealjs
title: "Programming in Io"
date:  2014-10-25 16:30:00
---

<section>
  <h1>Io</h1>
</section>

<section>
  <h2>Prototype based programming</h2>
</section>

<section>
  <h3>Steve Dekorte, 2002</h3>
</section>

<section>
<pre><code class="smalltalk">
Account := Object clone
Account balance := 0
</code></pre>
</section>

<section>
<pre><code class="smalltalk">
Account deposit := method(amount,
  balance = balance + amount
)
</code></pre>
</section>

<section>
<pre><code class="smalltalk">
account := Account clone
account deposit(100)
account balance println
</code></pre>
</section>

<section>
<pre><code class="smalltalk">
Animal := Object clone

Animal type
==> Animal
</code></pre>
</section>

<section>
<pre><code class="smalltalk">
Animal slotNames
==> list(type)

Animal description := "Something"

Animal slotNames
==> list(type, description)
</code></pre>
</section>

<section>
<pre><code class="smalltalk">
Dog := Animal clone

Dog type
==> Dog

Dog description
==> something
</code></pre>
</section>

<section>
<pre><code class="smalltalk">
Dog slotNames
==> list(type)

Dog description := "Man's best friend"
Dog slotNames
==> list(type, description)
</code></pre>
</section>

<section>
<pre><code class="smalltalk">
dog = Dog clone
dog type
==> Dog

dog slotNames
==> list()
</code></pre>
</section>

<section>
<pre><code class="smalltalk">
dog name := "Pluto"

dog slotNames
==> list(name)
</code></pre>
</section>

<section>
<pre><code class="smalltalk">    Io> Lobby
    ==>  Object_0x7fe5eac1c220:
    Animal           = Animal_0x7fe5eafc51d0
    Dog              = Dog_0x7fe5ec095020
    Lobby            = Object_0x7fe5eac1c220
    Protos           = Object_0x7fe5eac1b510
    _                = Object_0x7fe5eac1c220
    dog              = Dog_0x7fe5eae91740
    exit             = method(...)
    forward          = method(...)
    set_             = method(...)
</code></pre>
</section>

<section>
<h3>Lists</h3>
<pre><code class="smalltalk">
a := list(2, 1, 4, 3)
a sort
a sum
a average
a pop
</code></pre>
</section>

<section>
<h3>Lists</h3>
<pre><code class="smalltalk">
a := list(2, 1, 4, 3)

a select(i, i%2 == 0)
==> list(2, 4)

a map(* 10)
==> list(20, 10, 40, 30)
</code></pre>
</section>

<section>
<h3>Looping</h3>
<pre><code class="smalltalk">
x := 0
while(x < 5,
  x println
  x = x + 1
)
</code></pre>
</section>

<section>
<h3>Looping</h3>
<pre><code class="smalltalk">
for(i, 1, 5,
  i println
)
</code></pre>
</section>

<section>
<h3>Conditions</h3>
<pre><code class="smalltalk">
if(answer == 42,
  "Correct answer!" println,
  "Wrong answer!" println
)
</code></pre>
</section>

<section>
<pre><code class="smalltalk">
my_if := method(cond, then_do, else_do,
  if(cond, then_do, else_do)
)
</code></pre>
</section>

<section>
<pre><code class="smalltalk">
my_if(answer == 42,
  "Launch missiles" println,
  "Abort" println
)
</code></pre>
</section>

<section>
<pre><code class="smalltalk">
my_if := method(
  if(call evalArgAt(0),
    call evalArgAt(1),
    call evalArgAt(2)
  )
)
</code></pre>
</section>

<section>
<h1>iolanguage.org</h1>
<br/>
<h2>@nithinbekal</h2>
<h3>nithinbekal.com</h3>
</section>

