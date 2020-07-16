---
layout: page
title: "Shell"
date:  2017-10-25 22:21:11
---

### Pipes

```sh
cat hello.txt
echo 'Hello!'
# Sends to stdout

echo 'Bye!' > bye.txt # write to file
echo 'Bye again' >> bye.txt # Append

cat non-existent-file 2> errors.txt # redirect stderr
cat existing-file 2> errors.txt # errors.txt is empty
# prints file contents

# Combined output - both stdout and stderr
cat hello.txt non-existent.txt &> combined.txt

# Throw away all output
cat hello.txt non-existent.txt &> /dev/null

# pipes and stdin
sort hello.txt | grep Hello | sed 's/Hello/Hey/'
```

### Scripting

```sh
#! /bin/sh

set -e
set -o pipefail

echo 'Hello'
```

```sh
chmod +x hello.sh
./hello.sh
```

`set -e` - stop and raise immediately on any error. Always exit early.

`set -o pipefail` - without this, a command is considered to be failing if any
of the commands in a pipeline fail.

Eg. `grep foo missing-file.txt | sed 's/hello/hey'` 

The grep fails, and writes empty string to stdout, so sed won't fail. This
command is considered ok by default, but `pipefail` exits as soon as grep fails.

`$?` - most reent exit code - 0 indicates success

`foo && bar` - second thing runs only if first succeeds.

An example script:

```
$ ls services
rails.service postgres.service some-other-file.txt

$ cat services/rails.service
name rails
port 3000

$ cat services/postgres.service
name postgres
port 5432
```

```sh
#! /bin/bash

set -e
set -o pipefail

# Exit early if no arguments given
# Usage: ./this-file.sh services-dir
if [ $# -eq 0 ]; then
  echo "Error: Provide the name of the services directory."
  exit 64 # Recommended code for wrong number of args
fi

print_services() {
  # -q option -> quiet
  if grep -q port "$1" && grep -q name "$1"; do
    name=$(grep name "$1" | sed 's/name //')

    if [ $port -lt 5000 ]; then
      echo "Greater than 5000"
    fi

    echo "$1: $name $port"
  else
    echo "$1 Missing name or port"
  fi
}

for file in $1/*.service; do
  print_service "$file"
end
```

- [Use the Unofficial Bash Strict Mode (Unless You Looove Debugging)](http://redsymbol.net/articles/unofficial-bash-strict-mode/)

### Other zsh tips

Inserting last argument in zsh:

- Use `!$` to insert last command's arg or `ESC-.`
- `!*` inserts all args

`fc` or “fix command”: if you make a mistake in a command, like `git pull orgiin master`, run `fc`
it will open the command in an editor where you can fix the typo. once you save and close, the new command will run

When you find yourself typing a long command (like a `curl` request) and it becomes hard to navigate on the terminal’s readline, you can hold `⌃` (control) and then type `x e`.
This will open up your $EDITOR and allow to edit your command more conveniently. When you save and close, the text will show up on the readline and will not be executed automatically. So you can still review it before hitting Enter.


### Bookmarks

- [10 fresh zsh tricks you may not know](http://chneukirchen.org/blog/archive/2013/03/10-fresh-zsh-tricks-you-may-not-know.html)
* [Master Your Z Shell with These Outrageously Useful Tips](http://reasoniamhere.com/2014/01/11/outrageously-useful-tips-to-master-your-z-shell/)
