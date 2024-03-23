---
layout: post
title: "Writing and publishing an Elixir library"
date:  2016-06-13 18:13:29 +05:30
categories: elixir
---

Recently, I wrote some code to query Google Books API,
and extracted it into a Hex package.
In this article, we will walk through the process of
publishing an Elixir package to hex.pm.

Let's start by generating a new project called `google_books` using mix:

{% highlight bash %}
mix new google_books
{% endhighlight %}

The files we will be working with are `mix.exs` and `lib/google_books.ex`,
which contains the `GoogleBooks` module where we will write our code.

## Adding dependencies

Since we're working with an API,
we will need to depend on other libraries for HTTP requests and JSON parsing.
Let's add `httpoison` and `poison` libraries in mix.exs,
by editing the `deps` and `application` functions.

{% highlight elixir %}
# mix.exs
def application do
  [application: [:httpoison, :poison]]
end

# ...

defp deps do
  [
    {:httpoison, "~> 0.8.0"},
    {:poison, ">= 1.0.0"},
  ]
end
{% endhighlight %}

## Writing the code

Our library will have just one module, `GoogleBooks`,
which provides the `find_by_isbn/1` function.
This will be the code for our initial version of the package:

{% highlight elixir %}
defmodule GoogleBooks do
  @api_url "https://www.googleapis.com/books/v1/volumes"

  def find_by_isbn(isbn) do
    isbn
    |> remove_dashes
    |> build_url
    |> get_json
    |> decode_response
    |> extract_volume_info
  end

  defp remove_dashes(isbn), do: String.replace(isbn, "-", "")
  defp build_url(isbn), do: "#{@api_url}?q=isbn:#{isbn}"
  defp get_json(url), do: HTTPoison.get!(url).body
  defp decode_response(json), do: Poison.decode!(json)

  defp extract_volume_info(%{"totalItems" => 0}), do: :not_found

  defp extract_volume_info(response) do
    hd(response["items"])["volumeInfo"]
  end
end
{% endhighlight %}

This is a simple module, so we won't walk through the code itself,
and instead focus on publishing the package to Hex.
You can find the latest version of the source code on Github at
[nithinbekal/google_books.ex](https://github.com/nithinbekal/google_books.ex).

## Adding package metadata

Before we publish the package to Hex,
we need to add a description and package metadata for the package.
Make the following changes to the mix file.

{% highlight elixir %}
# mix.exs

def project do
  [app: :google_books,
    version: "0.0.1",
    elixir: "~> 1.2",
    description: "A simple wrapper for Google Books API",
    package: package,
    deps: deps]
end

def package do
  [ name: :google_books,
    files: ["lib", "mix.exs"],
    maintainers: ["Nithin Bekal"],
    licenses: ["MIT"],
    links: %{"Github" => "https://github.com/nithinbekal/google_books.ex"},
  ]
end
{% endhighlight %}

## Registering on Hex

You can register as a user on Hex by using the `mix hex.user register` command.
Skip this part if you already have registered a hex.pm account.

{% highlight elixir %}
mix hex.user register
{% endhighlight %}

You will be prompted to enter username, email and password.
A confirmation email will be sent to you,
and you need to click on the confirmation URL before continuing.

## Publishing the package to Hex

Finally, we're ready to publish the package on Hex.
We can do this using the `mix hex.publish` command.

{% highlight text %}
$ mix hex.publish
Publishing google_books 0.0.1
  Dependencies:
    httpoison ~> 0.8.0
    poison ~> 2.0
  Files:
    lib/google_books.ex
    mix.exs
  App: google_books
  Name: google_books
  Description: A simple wrapper for Google Books API
  Version: 0.0.1
  Build tools: mix
  Licenses: MIT
  Maintainers: Nithin Bekal
  Links:
    Github: https://github.com/nithinbekal/google_books.ex
  Elixir: ~> 1.2
Before publishing, please read Hex Code of Conduct: https://hex.pm/policies/codeofconduct
Proceed? [Yn]
[#########################] 100%
Published at https://hex.pm/packages/google_books/0.0.1
Don't forget to upload your documentation with `mix hex.docs`
{% endhighlight %}

Now the package is available at <https://hex.pm/packages/google_books>.
Before we wind up, we need to add one final piece to our package - documentation.

## Add documentation

First, let's add [`ex_doc`](https://github.com/elixir-lang/ex_doc)
and [`earmark`](https://github.com/pragdave/earmark)
as development dependencies in the mix.exs deps list.
ExDoc lets you generate documentation for your project.
Earmark markdown parser that ExDoc depends on to parse inline documentation.

{% highlight elixir %}
# mix.exs
{:earmark, ">= 0.0.0", only: :dev},
{:ex_doc, ">= 0.0.0", only: :dev},
{% endhighlight %}

Next, let's add some documentation for the `GoogleBooks` module
using the `@moduledoc` module attribute.

{% highlight elixir %}
defmodule GoogleBooks do
  @moduledoc """
  Provides a wrapper for the Google Books API.

  Currently only supports finding a book by ISBN.
  """

  # ...
end
{% endhighlight %}

We will also add documentation to the `find_by_isbn/1` like this:

{% highlight elixir %}
  @doc """
  Searches for a book by the given ISBN.
  Returns a map containing the book information if found.

  Returns the atom `:not_found` if there is no result.

      iex> GoogleBooks.find_by_isbn("978-1338099133")
  """
  def find_by_isbn(isbn) do
    # ...
  end
{% endhighlight %}

Now generate the docs by using `mix docs`.
You can also push the docs to <https://hexdocs.pm>
by using the `mix hex.docs` command.

You might also want some other files, like README,
included as part of the generated docs.
To do this, add this line to include README file in the docs:

{% highlight elixir %}
# mix.exs
def project do
  [ #...
    docs: [extras: ["README.md"]],
    # ...
  ]
end
{% endhighlight %}

If you generate the docs again, you will see the README file in the docs.

That's all we will cover in this post.
As you can see, it's very easy to package your Elixir code into a hex package.
If you've followed this tutorial to extract out libraries,
I'd love to hear about them - please do leave a comment here.

### Links

- [Hex.pm - Publishing a package](https://hex.pm/docs/publish)
- [Writing Documentation](http://elixir-lang.org/docs/master/elixir/writing-documentation.html)
- [`google_books` package on Github](https://github.com/nithinbekal/google_books.ex)
- [`google_books` package on Hex](https://hex.pm/packages/google_books)
- [Google Books APIs](https://developers.google.com/books/docs/overview)

