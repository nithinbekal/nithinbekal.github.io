---
layout: post
title: "avante.nvim: AI copilot in Neovim"
date: 2024-11-04
og_image: avante-nvim.png
categories:
  - ai
  - vim
---

Lately, I've been trying out the
[Cursor](https://www.cursor.com/) IDE at work.
The editor itself is VS Code under the hood,
but it adds a bunch of AI-driven features on top,
much like Github Copilot.

I've found Cursor quite enjoyable to use,
especially in the unfamiliar corners of the codebase,
where I'm trying to understand what's going on.
However, my ideal editing environment would be
Neovim with these capabilities thrown in.

Enter [avante.nvim](https://github.com/yetone/avante.nvim),
which emulates the behavior of Cursor from within Neovim.
Over the past few days,
I've been playing around it,
and found it quite pleasant to use.

## Basic setup

The initial setup was really easy.
I copied over the config from the readme
into my lazy.nvim config,
and set the provider to Copilot.

```lua
  {
    "yetone/avante.nvim",
    dependencies = {
      "nvim-tree/nvim-web-devicons",
      "stevearc/dressing.nvim",
      "nvim-lua/plenary.nvim",
      "MunifTanjim/nui.nvim",
      {
        "MeanderingProgrammer/render-markdown.nvim",
        opts = { file_types = { "markdown", "Avante" } },
        ft = { "markdown", "Avante" },
      },
    },
    build = "make",
    opts = { provider = "copilot" },
  },
```

If you have Github Copilot already set up
using [`copilot.lua`](https://github.com/zbirenbaum/copilot.lua),
this just works out of the box!
This was great for trying out the plugin
before trying out a more advanced setup.

## Advanced setup

Now that I've played around with the plugin,
I want to set it up to use
an OpenAI API compatible proxy
that lets you use other models as well.
I've been hearing good things about Claude 3.5 Sonnet,
so I wanted to try that out first.
we'll replace the `opts = {...}` line
with a config function like this:

```lua
  {
    "yetone/avante.nvim",
    -- other config options
    config = function()
      local opts = { provider = "copilot" }

      local openai_api_url = os.getenv("OPENAI_API_CHAT_COMPLETIONS")
      if openai_api_url then
        opts.provider = "openai"
        opts.openai = {
          endpoint = openai_api_url,
          model = "anthropic:claude-3-5-sonnet",
          timeout = 30000,
          temperature = 0,
          max_tokens = 4096,
          ["local"] = false,
        }
      end

      require("avante").setup(opts)
    end,
  },
```

If the `OPENAI_API_CHAT_COMPLETIONS` env var is set,
that indicates we can use the proxy.
I've set up these env variables in `.openairc`
which is loaded in my `.zshrc` like this:

```bash
[ -f ~/.openairc ] && source ~/.openairc
```

The `.openairc` looks something like this,
where the URLs should point to some OpenAI compatible proxy:

```bash
export OPENAI_API_BASE=https://example.com
export OPENAI_API_CHAT_COMPLETIONS=https://example.com/v1/chat/completions
export OPENAI_API_KEY=some_api_key
```

## Closing thoughts

After using avante.nvim for a couple of days,
I've quite enjoyed it.
It's reasonably intuitive,
and the UI is fantastic
for something built out of vim panes.
It has a long way to go
before it can reach the intuitiveness of Cursor,
but for now I'm happy to be able to get
some of those features within Neovim.
