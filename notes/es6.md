---
layout: page
title: "ES6"
date:  2015-07-06 22:02:52
---

# Install node using nvm

{% highlight bash %}
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.29.0/install.sh | bash
nvm install 5.1
nvm alias default 5.1
{% endhighlight %}

Add `'use strict;'` directive at the top of the file to enable ES6 features.

* [Exploring ES6](https://leanpub.com/exploring-es6/read) (Book)
* [ES6](http://justicen.com/#/posts/74046fea9a4c61477db9) -
  explanation of ES6 features by Nick Justice

## Objects and Prototypes

{% highlight javascript %}
var foo = {} // is the same as...
var foo = new Object()

function Car(model, miles) {
  this.model = model
  this.miles = miles
}

var x = new Car("Tesla Model X", 0)
x.model // Tesla Model X
x.miles // 0

x.miles += 10

// Can also access like a hash
x["miles"] // 10
{% endhighlight %}

Functions on an object can be declared in two ways:

{% highlight javascript %}
function Car(...) { ... }
function Car.prototype.drive(distance) {
  this.miles += distance
}

// Or...

function Car(model, miles) {
  this.model = model
  this.miles = miles

  this.drive = function(distance) {
    this.miles += distance
  }
}
{% endhighlight %}

## Arrays

{% highlight javascript %}
var a = ["a", "b", "c"]
a.length // 3

// length is 1 more that highest index
a[4] = "e"
a        // ['a', 'b', 'c', , 'e']
a.length // 5
a[3]     //undefined
{% endhighlight %}

## Destructuring in ES6

{% highlight javascript %}
var [a, b, c] = [1, 2, 3]

var x = { foo: 2, bar: 4, baz: 8 }
var { foo: a, bar: b } = x
// Now a = 2, b = 4. Wow!
{% endhighlight %}

([ES6 and 7, the future of JS - Brendan Eich](https://vimeo.com/113913703))

# Class syntax

{% highlight javascript %}
class Employee {
  constructor(fName, lName) {
    this.fName = fName;
    this.lName = lName;
  }

  fullName() {
    return `${this.fName} ${this.lName}`;
  }

  calculateSalary() {
    return 10000;
  }
}

// Inheritance
class Manager extends Employee {
  constructor(fName, lName, bonus) {
    this.fName = fName;
    this.lName = lName;
    this.bonus = bonus;
  }

  calculateSalary() {
    super.calculateSalary() + this.bonus;
  }
}

{% endhighlight %}

# Iterators

{% highlight javascript %}
let powersOfTwo = {
  [Symbol.iterator]() {
    let power = -1;
    return {
      next() {
        return { done: false, value: Math.pow(2, ++power) }
      }
    }
  }
}

for(let n of powersOfTwo) {
  if (n > 1024) break;
  console.log(n);
}
{% endhighlight %}

# Generators

{% highlight javascript %}
// Similar to iterators
    let powersOfTwo = {
      *[Symbol.iterator]() {
        let power = -1;
        while(true) yield Math.pow(2, ++power); 
      }
    }

    for(let n of powersOfTwo) {
      if (n > 1024) break;
      console.log(n);
    }
{% endhighlight %}

