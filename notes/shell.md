---
layout: page
title: "Shell"
date:  2017-10-25 22:21:11
---

- tail
- head
  - `head -n 5 foo.txt`

- grep
  - `grep foo bar.txt`
  - `grep -i foo bar.txt` (case insensitive)
  - `grep -E '[Ff]oo' bar.txt` (regex)
  - `grep -v foo bar.txt` (exclude matches)
  - `grep -r foo some/dir`
    - Result: "some/dir/file.txt:foo"

- sed
  - `sed 's/hello/bye/' greetings.txt` (doesn't change the file)
  - `sed -i 's/hello/bye/' greetings.txt` (changes the file)
  - `sed -i '.bkp' 's/hello/bye/' greetings.txt` (writes original file to greetings.txt.bkp)

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


- http://redsymbol.net/articles/unofficial-bash-strict-mode/

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
