---
title: "JavaScript"
layout: page
---

## Books

- [Eloquent JavaScript](http://eloquentjavascript.net/)
- [JavaScript Allonge](https://leanpub.com/javascript-allonge/read)
- [JavaScript Design Patterns](http://addyosmani.com/resources/essentialjsdesignpatterns/book/) (by Addy Osmani)
- [Exploring ES6](https://leanpub.com/exploring-es6/read)

## Random notes

{% highlight javascript %}
// Setting context

var greet = function() { console.log('Hello, ' + this); }
greet('world!')      // breaks
greet.call('world!') // 'Hello, world!'

// Constructors and prototypes

var Car = function(year) { this.year = year }

Car.prototype.miles = 0;
Car.prototype.drive = function(distance) {
  this.miles += distance;
}

// What happens on c = new Car(2015)
// 1. Memory is allocated for c
// 2. Constructor is called with c as the context
//    ie. Car.call(c, 2015)
// 3. The __proto__ for c is set to Car.__proto__

var c1 = new Car(2015)
var c2 = new Car(2015)

c1.drive(10)
console.log(c1.miles) // 10

console.log(c2.miles) // 0
// Might expect that this too is set to 10
// because miles is defined on Car.prototype
// But when a property is being set,
// it is set on the instance and not the proto
// 'Get' is deep, 'Set' is shallow
{% endhighlight %}

([Rediscovering JS - Venkat Subramaniam](https://vimeo.com/68331936))

