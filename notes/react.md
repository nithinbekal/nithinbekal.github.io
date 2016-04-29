---
layout: page
title: "React.js"
date:  2015-05-29 15:18:19
---


## The Hello World program

- JSbin
- enable es6/babel
- add library - react with addons

{% highlight es6 %}
ReactDOM.render( <h1>Hello, world!</h1>,
               document.body);
{% endhighlight %}

{% highlight html %}
<!DOCTYPE html>
<html>
<head>
<script src="//fb.me/react-with-addons-0.14.3.js"></script>
<script src="//fb.me/react-dom-0.14.3.js"></script>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>JS Bin</title>
</head>
<body>

</body>
</html>
{% endhighlight %}

## Create a component

{% highlight es6 %}
var HelloWorld = React.createClass({
  render() {
    return (
      <h1>Hello, world!</h1>
    )
  }
});

ReactDOM.render(<HelloWorld/>, document.body);
{% endhighlight %}

`<HelloWorld/>` is JSX - JavaScript XML tag.

## Using custom methods in the component

{% highlight es6 %}
var HelloWorld = React.createClass({
  sayHello() { return "Hello, world!" },

  render() {
    return (
      <h1>{ this.sayHello() }</h1>
    )
  }
});

ReactDOM.render(<HelloWorld/>, document.body);
{% endhighlight %}

It's better to avoid rendering to document.body directly.
There is no guarantee that it will not be manipulated by other js libs.
Always use an element that is only used by react.

{% highlight es6 %}
ReactDOM.render(<HelloWorld/>,
  document.getElementById("container"));
{% endhighlight %}

- Pete Hunt

## Props

{% highlight es6 %}
var FruitList = React.createClass({
  renderFruits() {
    var fruits = this.props.fruits.map( (fruit) =>
      <li> { fruit } </li>
    );
    return fruits;
  },

  render() {
    return (
      <ul>
        {this.renderFruits()}
      </ul>
    )
  }
});

ReactDOM.render(
  <FruitList
    fruits = {["Apple", "Mango", "Papaya"]}
  />,
  document.getElementById("container"));
{% endhighlight %}

## PropTypes

{% highlight es6 %}
var FruitList = React.createClass({
  propTypes: {
    fruits: React.PropTypes.array.isRequired
  },
  // other stuff
});
{% endhighlight %}

## State

{% highlight es6 %}
var Form = React.createClass({
  getInitialState() {
    return(
      { name: "Nithin" }
    );
  },
 
  onClick() {
    alert(this.state.name);
  },

  render() {
    console.log(this.state);

    return (
      <div>
        <h1>GCRC</h1>

        <input type="text"
               value={this.state.name}
               onChange={ (event) => {
                 this.setState({ name: event.target.value })}
               }
               value={this.state.name} />

        <input type="submit" value="Save" />
      </div>
    )
  }
});

ReactDOM.render(
  <Form />,
  document.getElementById("container"));
{% endhighlight %}

## FruitListContainer

{% highlight es6 %}


var FruitList = React.createClass({
  renderFruits() {
    var fruits = this.props.fruits.map((fruit) => {
      return (
        <li>{fruit}</li>
      )
    });

    return fruits;
  },

  render() {
    return (
      <ul>
        {this.renderFruits()}
      </ul>
    )
  }
});

var FruitListContainer = React.createClass({
  getInitialState() {
    return({ fruits: ["Orange", "Mango"] })
  },

  render() {
    return (
      <FruitList fruits={this.state.fruits} />
    )
  }
})

ReactDOM.render(
  <FruitListContainer fruits={ ["Orange"] } />,
  document.getElementById("container"));
{% endhighlight %}

## Clock tick

{% highlight es6 %}
var ClockTick = React.createClass({
  getInitialState() {
    return this.timeDict();
  },

  componentDidMount() {
    setInterval(this.updateTick, 1000);
  },

  timeDict() {
    date = new Date();
    hh = date.getHours();
    mm = date.getMinutes();
    ss = date.getSeconds();

    return { hours: hh, minutes: mm, seconds: ss };
  },

  updateTick() {
    this.setState(this.timeDict());
  },

  render() {
    return (
      <div>
        <h1>Clock tick</h1>
        <h3>
          {this.state.hours}:{this.state.minutes}:{this.state.seconds}
        </h3>
      </div>
    );
  }
})


ReactDOM.render(
  <ClockTick />,
  document.getElementById("container"));
{% endhighlight %}


**Links**

* [Learn React JS](http://videos.bigbinary.com/categories/react) (BigBinary)
* [Tiny React.js concepts](http://videos.bigbinary.com/categories/tiny-reactjs-concepts) (BigBinary)
