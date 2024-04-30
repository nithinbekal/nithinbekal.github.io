---
layout: post
title: "Running LLama 3 and Phi-3 locally using ollama"
date:  2024-04-29
categories: ai
og_image: ollama-llama3-phi3.png
---

Over the past few days,
there have been a couple of interesting new LLM releases
with Meta's [Llama 3](https://llama.meta.com/llama3/)
and Microsoft's [Phi-3 Mini](https://news.microsoft.com/source/features/ai/the-phi-3-small-language-models-with-big-potential/).
Aside from ChatGPT,
I haven't really played
with any of the other models,
so I decided to try running these locally
on my Macbook.

I expected that installing LLMs locally would be complicated,
but with [ollama](https://ollama.com/)
I had them running on my Intel Macbook
in a matter of minutes.

## Installation

Install `ollama`:

```
brew install ollama
```

`ollama` needs to run as a background service:

```
brew services start ollama
```

Install and run Llama 3:

```
ollama run llama3
```

This will download the 8B version of Llama 3
which is a 4.7GB file,
so it might take a couple of minutes to start.
If you want to try the 70B version,
you can change the model name to `llama3:70b`,
but remember that this might not work
on most computers.

For Phi-3,
replace that last command with
`ollama run phi3`.
This is a much smaller model at 2.3GB.

## Performance

For a very unscientific benchmark
on my Intel Macbook Pro,
I asked the same question,
"What's the best way for me to learn about LLMs?"
to both LLMs.
Llama 3 produced output at around 5 tokens/s,
while Phi-3 was much faster at 10 tokens/s.
To see the timings for LLM queries,
you can use the `--verbose` flag on the run command.

[ollama 0.1.33](https://github.com/ollama/ollama/releases/tag/v0.1.33-rc5)
was released yesterday
with official support for both these models.
I installed them before this release
and didn't run into any problems,
but it might make things perform a bit better.
