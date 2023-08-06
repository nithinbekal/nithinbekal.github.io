---
layout: post
title: "Ruby and Jupyter Notebooks"
date:  2023-08-01
categories:
- ruby
- ai
---

Today, I was working through
Andrew Ng's excellent short course
on [building systems with ChatGPT](https://www.deeplearning.ai/short-courses/).
The course uses Jupyter notebooks
for running the Python code.

While figuring out Python syntax,
one question came to mind:
does Ruby have something similar to Jupyter notebooks?
Turns out that you can just use Jupyter notebooks with Ruby
if you setup the [iruby kernel](https://github.com/SciRuby/iruby).
This kernel is available as a gem,
and the setup is really simple.

## Setting up Jupyter and iruby

First, install Jupyter using Python's pip installer.

```bash
pip install jupyter
```

Next, install the iruby gem.

```bash
gem install iruby
```

Finally, register iruby as a kernel for Jupyter.

```bash
iruby register --force
```

Open the jupyter notebook:

```bash
jupyter notebook
```

Now if you go Kernel -> Change kernel
in the toolbar,
you will see Ruby as one of the options.

At this point, we're ready to create our first Ruby notebook.
When you create a new notebook,
you will see Ruby as one of the available kernels.
You can pick that and run `puts "Hello, world!"`
just to make sure you have it working correctly.

## Creating our first notebook

I wanted to play around with the OpenAI API,
so I need to install the
[`ruby-openai` gem](https://github.com/alexrudall/ruby-openai).
This can be done in the notebook via [bundler's inline gemfile definition](/posts/bundler-inline-gemfile/).
Put this in the first cell:

```ruby
require "bundler/inline"

gemfile do
  source "https://rubygems.org"

  gem "dotenv", require: "dotenv/load"
  gem "ruby-openai"
end
```

Aside from `ruby-openai`,
I have also included `dotenv` here
so that I can store OpenAI credentials
in a `.env` file in the notebooks folder.
This `.env` file should look like:

```
OPENAI_ACCESS_TOKEN=your_key
```

The `require: "dotenv/load"` in the gemfile definition
reads the `.env` file and updates the environment with it.
We can now use it
to initialize the OpenAI client:

```ruby
client = OpenAI::Client.new(access_token: ENV["OPENAI_ACCESS_TOKEN"])
  ```

And use one of the examples from the `ruby-openai` README:

```ruby
response = client.chat(
  parameters: {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "Hello!"}],
    temperature: 0.7,
  }
)
```

If you have a valid OpenAI access token,
you should see a response
containing something like
"Hello! How can I assist you today?".

And that's it!
That's all it took
to get to a working playground
for exploring ChatGPT.
I'm excited to see
how I can make notebooks
a part of my workflow.
I can see notebooks being useful
when building up small scripts,
or when learning about
how a feature of Ruby works.
I'm also considering
using a notebook
to draft this year's
[what's new in Ruby](/posts/ruby-3-2/) article
using markdown cells mixed with code blocks.
