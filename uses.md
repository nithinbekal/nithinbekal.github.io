---
layout: page
title: "Uses"
date:  2026-01-21
---

List of tech that I use on a daily basis, inspired by [uses.tech](https://uses.tech/).

### Hardware

**Desk setup**

💻 Computers

- **[Macbook Pro 14"](https://www.apple.com/ca/macbook-pro/)** M5 Pro, 64GB RAM
- **Windows PC** for occasional gaming (Ryzen 5600X, RTX 1080Ti, 32GB RAM)

Accessories

- ⌨️ Keyboard: **[Ergodox EZ Shine](https://ergodox-ez.com/)**
- 🖱️ Mouse: **[Logitech MX Master 3S Wireless](https://www.amazon.com/dp/B0FB21526X/)**
- 🎧 Earbuds: **[Airpods Pro 2](https://www.amazon.com/dp/B0CP4CG1ZB/)** ([review](/posts/airpods-pro-review/))
- 🎙️ Microphone: **[Blue Yeti](https://www.amazon.com/dp/B01LY6Z2M6/)**
- 📷 Webcam: **[Logitech MX Brio](https://www.amazon.com/dp/B0BFJ4CRKD/)**
- 🔌 **[UGREEN USB 3.0 Switch](https://www.amazon.com/dp/B01N6GD9JO/)** for switching between docked laptop and PC

**On the move**

- Phone: **[Samsung S21 Ultra](https://www.amazon.com/dp/B0CKZXY7CD/)**
- Watch: **[Galaxy Watch 7 Ultra](https://www.amazon.com/dp/B0F7PKN2C8/)** ([review](/posts/galaxy-watch-7-ultra/))
- Earbuds: **[Airpods Pro 2](https://www.amazon.com/dp/B0CP4CG1ZB/)** ([review](/posts/airpods-pro-review/))
- Reading: **[Kindle Oasis](https://www.amazon.com/dp/B0CNV9F72P/)**
- **[iPad Pro 12.9" 2018](https://www.apple.com/ca/ipad-pro/)** for reading graphic novels or notetaking with [Apple Pencil](https://www.apple.com/ca/apple-pencil/)

**[Photography](https://photos.nithinbekal.com/)**

- [Canon EOS R10](https://www.amazon.com/dp/B0B2KV6D97/)
  - Lenses
    - [RF-S 18-150mm](https://www.amazon.com/dp/B0B2KSJBR4/) kit lens
    - [RF 50mm 1.8mm](https://www.amazon.com/dp/B08MFVH7SV/) prime lens
  - Storage
    - [SanDisk Extreme PRO SDXC UHS-II Memory Card - 256GB](https://www.amazon.com/dp/B0DLWS1CY9/)
    - [Lexar Professional 1667X - 256 GB](https://www.amazon.com/dp/B07NLYT72D/)
- [GoPro Hero 8 Black](https://www.amazon.com/dp/B08C7FBW4N/)
- [Polaroid Now](https://www.amazon.com/dp/B0FKT5WJ3L/)

### Software

**Terminal**

I use an installer script to set up my [dotfiles](https://github.com/nithinbekal/dotfiles) with these tools:

- **Ghostty**
- **zsh**
- **[Neovim](/posts/decade-of-vim/)** as the primary text editor ([read more](/posts/decade-of-vim/))
- **Homebrew** for installing commandline tools
- **mise** for switching tool versions
- **fzf** for fuzzy file search
- **ripgrep** for search
- **[Fira Code](https://github.com/tonsky/FiraCode)** font

**AI**

Models
- **GPT 6 Luna** is my default model, with **Sol** for planning
- **Deepseek V4 Flash** for Hermes.

Providers
- **GPT Plus** subscription is my go-to these days for the value it provides.
- **Openrouter**: I usually put $10 in credits for testing out open models
- **Deepseek API** makes Deepseek V4 Flash a lot cheaper because of much better caching compared to Openrouter.

Harnesses
- **[Pi](https://pi.dev/)** as the coding harness
- **[BB](https://getbb.app/)** to set up automations and custom UIs on top of Pi
- **ChatGPT desktop** when I'm working on front end.
  The annotate feature in the in-app browser is fantastic for iterating on UI.
- **[Hermes](https://hermes-agent.nousresearch.com/)** as an always on remote agent running on a VPS.

_See posts tagged [#AI](/categories/ai/) for more._

**Desktop apps**

- **Google Chrome** for browsing and devtools
- **[Obsidian](/posts/logseq-to-obsidian/)**, for personal note taking and journaling at home
- **[Raycast](https://www.raycast.com/)** instead of spotlight on Mac
- **[MonitorControl](https://github.com/MonitorControl/MonitorControl)** for controlling external display brightness
- **[Notunes](https://github.com/tombonez/noTunes)** for preventing Mac from accidentally opening Apple Music
- **[LM Studio](https://lmstudio.ai/)** for playing with local models.

### Tech stack 

For the past decade, I've worked primarily on **Ruby**, with a **Rails** monolith, backed by **MySQL**.
**GraphQL** acts as the API layer for a **React** front end.

For hobby projects, I typically reach for:

- **Rust** + **Axum** + **SQLite** for small apps
- **Elixir + Phoenix + SQLite** for more complex apps
- **Hetzner** VPS for hosting web apps
- **Cloudflare** for domains and CDN 

**Blogging**

- **Jekyll** with [custom theme](https://github.com/nithinbekal/nithinbekal.github.io/)
- **GitHub Pages** for hosting
- **S3** for hosting images and assets
- **Cloudflare** as a CDN 
- **Obsidian** for composing posts in markdown
