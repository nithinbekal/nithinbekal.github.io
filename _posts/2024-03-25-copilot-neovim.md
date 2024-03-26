---
layout: post
title: "Copilot and Neovim"
date:  2024-03-25
categories: vim
og_image: copilot-neovim.png
---

Although I've occasionally used
Github Copilot on VS Code,
I never really got into using it inside neovim,
which is my main editor.
I had tried setting it up
using Github's [copilot.vim](https://github.com/github/copilot.vim) plugin,
but I never got it working with my setup.

Today I came across
[copilot-cmp](https://github.com/zbirenbaum/copilot-cmp),
which allows loading Copilot suggestions
as snippets in the completion menu
provided by the
[nvim-cmp](https://github.com/hrsh7th/nvim-cmp)
completion engine.
This plugin depends on
[copilot.lua](https://github.com/zbirenbaum/copilot.lua),
a Lua rewrite of copilot.vim
that plays well with neovim.

## Setup

Add it to lazy.nvim config:

```lua
local plugins = {
  -- other plugins

  {
    "zbirenbaum/copilot-cmp",
    event = "InsertEnter",
    config = function () require("copilot_cmp").setup() end,
    dependencies = {
      "zbirenbaum/copilot.lua",
      cmd = "Copilot",
      config = function()
        require("copilot").setup({
          suggestion = { enabled = false },
          panel = { enabled = false },
        })
      end,
    },
  },
}
```

Add it to nvim-cmp setup:

```lua
require("cmp").setup {
  -- other setup
  sources = {
    { name = "copilot" },
    { name = "nvim_lsp" },
    { name = "luasnip" },
    -- other sources
  },
}
```
_([Here's the commit](https://github.com/nithinbekal/dotfiles/commit/3d66b134a3193ee2cb83131cf2d8156f990bc10a)
where I added this to my config.)_

Finally run `:Copilot auth`
in the command line
to sign into copilot
and get started.

## Copilot impressions

A few months ago,
I tried using Copilot for a full day in VS Code.
Back then,
I hated it.
I found the virtual text appearing on the screen
to be quite distracting.

With nvim-cmp,
the suggestions don't show up
until I tab into the completion menu,
so it's easier to ignore them
when I don't need them.
I might actually end up
using Copilot more often this way,
and maybe even enjoy using it.
