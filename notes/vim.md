---
layout: page
title: 'Vim'
date:   2014-06-07 12:00:00
---

### Cheatsheet

[Vim filters tips](https://dev.to/rpalo/vim-filters-1p33);
in command mode:

```vim
" Read results of a command to cursor location:
r !pwd

" Read results of a command to line 42:
42r !pwd

" Use ruby to upcase entire file
%!ruby -ne 'puts $_.upcase'

" Use ruby to upcase current line (also works for visually selected line)
!!ruby -ne 'puts $_.upcase'
```

### Diff

Compare and diff a file on current branch with master branch version:
- Open foo.rb right tab
- Open foo.rb from master in the left tab
  - `:Gedit master:foo.rb`
- Diff the files using `:windo diffthis`
- Close diff view with `:diffoff`

### Vimscript

- [Five Minute Vimscript](http://andrewscala.com/vimscript/)

```vim
function HelloWorld()
  echo "Hello, world!"
endfunction

call HelloWorld()


function ReturnSomethign()
  return "Something"
endfunction

echo ReturnSomethign()

function Foo()
endfunction
" Returns 0 by default

function TooBigEh(foo)
  if a:foo > 10
    return 1
  end
endfunction
" Returns 1 if cond matches, falls back to 0 otherwise
" a:foo is for variable scoping - tells vimscript that it's the argument foo


" Truthiness
"  'hey' is coerced in to 0, so falsey
"  '8 hello' is coerced to 8 because it starts with a number, so truthy


" Local vars
function Foo()
  let bar = 'baz'
  return bar
endfunction


" Match url in the following line:
" foo bar http://hello.baz hai
" Matches string starting with http, until it runs into spaces
matchstr(getline('.', "http[^ ]*"))
```

### Links

- [Vim Awesome](http://vimawesome.com/) - Search for vim plugins
- [Vim and Ctags](http://andrew.stwrt.ca/posts/vim-ctags)
- [Vim Splits - Move Faster and More Naturally](http://robots.thoughtbot.com/vim-splits-move-faster-and-more-naturally)
- [Vim as your IDE](http://haridas.in/vim-as-your-ide.html)
- [Clipboard sharing in OSX](http://vim.wikia.com/wiki/Mac_OS_X_clipboard_sharing)
- [Mapping keys](http://vim.wikia.com/wiki/Mapping_keys_in_Vim_-_Tutorial_%28Part_1%29)
- [Vim, Tmux and system clipboard](https://coderwall.com/p/j9wnfw)
- [Extending Rails.vim with custom commands](http://robots.thoughtbot.com/extending-rails-vim-with-custom-commands)
- [An Extremely Quick and Simple Introduction to the Vi Text Editor](http://heather.cs.ucdavis.edu/~matloff/UnixAndC/Editors/ViIntro.html)
- [Vim for Rubyists](http://www.vimninjas.com/2012/08/28/vim-for-rubyists-part-1/)
- [Vim Revisited](http://mislav.uniqpath.com/2011/12/vim-revisited/), a post by Mislav Marohnić
- [Vim After 11 Years](http://statico.github.io/vim.html)
- [Best of Vim Tips](http://zzapper.co.uk/vimtips.html)
- [Supercharge Your Vim Into an IDE With Ctags](http://blog.sensible.io/2014/05/09/supercharge-your-vim-into-ide-with-ctags.html)
- [Vim for Elixir](https://bitboxer.de/2016/11/13/vim-for-elixir/)
- [Configuring Vim Right](https://items.sjbach.com/319/configuring-vim-right)

Screencasts

- [Vimcasts](http://vimcasts.org/)
- [Vim.watch](http://vim.watch/)
- [Derek Wyatt's Vim Tutorial Videos](http://derekwyatt.org/vim/tutorials/)

Other vim implementations

- [Vim Refined](http://vimr.org/)
- [NeoVim](http://neovim.org/)

Books

- [A Byte of Vim](http://files.swaroopch.com/vim/byte_of_vim_v051.pdf)
- [Learn Vimscript the Hard Way](http://learnvimscriptthehardway.stevelosh.com/)

Videos:

- [Ben Orenstein - Write code faster: expert-level vim (Railsberry 2012)](https://www.youtube.com/watch?v=SkdrYWhh-8s)
- [tpope's vim config and plugins](https://www.youtube.com/watch?v=MGmIJyTf8pg)
- [Impressive Ruby Productivity with Vim and Tmux by Chris Hunt](https://www.youtube.com/watch?v=gB-JSh1EVME)
- [Vim for Rails Developers](https://www.youtube.com/watch?v=9J2OjH8Ao_A)
