---
title: Fixing Copyright Notices
subtitle: SPDX licence standards applied in 15 lines of bash
date: 2024-03-02
tags:
  - linux
  - programming
---

Recently, I've been working on [_starlight_][5] - a project that I've had in my
stable since 2021, aimed at replacing the frontend portion of [Zigbee2MQTT][0]
with a simpler and more user friendly interface. Originally called
`zigbee-webui`, and originally just a React frontend, _starlight_ has now become
a monorepo with a React frontend (soon to be reworked with Vite and rewritten
with TypeScript) and a TypeScript Express backend (an API).

If you're someone who writes code in the open like me, you have probably seen
the classic GNU GPL licence notice in files;

```md
This program is free software: you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software
Foundation; either version 3 of the License, or (at your option) any later
version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with
this program. If not, see https://www.gnu.org/licenses/.
```

Now, this is massive and unwieldy - but GNU.org suggests that you should have
these notices in _every file_, "including build scripts, configure files, and
makefiles". Some time ago I came across the _Software Package Data Exchange_
(SPDX) standard, which summates the entire licence of a file down to a single
line right at the top of each file:

```md
SPDX-License-Identifier: GPL-3.0-or-later
```

I've been using [SPDX licence IDs][1] in this project since the [26th of June
2022][2], but only recently did I stumble upon an incredibly useful article
about copyright statements, ["How and why to properly write copyright statements
in your code"][3]. As it turns out, there is actually a strong case to add a
copyright disclaimer to each file. Thankfully SPDX has us covered here too:

```md
SPDX-FileCopyrightText: © $YEAR $AUTHOR <$EMAIL>
```

In the above linked article, you'll read that we want only the _creation year
of the file_ in our copyright disclaimer. And we need to update this in every
file with an SPDX header. _Right_. So the problem statement is this; _can I,
programmatically, find and update all of the files with a copyright notice that
states the file's creation date?_

We can use some of `git`'s subcommands to find out information about our checked
in files. `git log` can get us the commit where any given file was added, using
`--diff-filter=A`. If you've moved files around, then you also want `--follow`.
From this, we can tailor this even further to get just a `YYYY-MM-DD` string for
any given file - the date the file was added - using `--format=%as`. Using bash
parameter expansion, we can grab just the year, too. Now we have a command to
get back the addition year for any file:

```sh
#!/bin/bash

file_addition_year () {
  local file
  local date

  file=$1
  date=$(git log --diff-filter=A --follow --format=%as "$file")
  echo "${date:0:4}"
}

# file_addition_year frontend/src/App.js
# 2021
```

We would probably want some extra handling for this in case we're not in a git
repository, to be on the safe side, but since this is just a quick script to
fetch some data, I think this is ok.

In order to add a copyright header to all the files, we can make use of `sed` to
prepend the text that we want to all our files. To work through all the files I
want to update, I'm using `find` and a `while read` loop:

```sh
find . \
  -iname '*.js' \
  -o -iname '*.ts' \
| while read -r file; do
    year=$(file_addition_year "$file")
    sed -i \
      "1s;^;// SPDX-FileCopyrightText: © ${year} Amber Cronin <software@amber.vision>\n;" \
      "$file"
  done
```

And that's how I updated all the copyright notices in _starlight_. I also make
use of a good pre-commit hook from [Lucas-C on GitHub][4] to add the licence
header to specific files, which I'd recommend using for all projects.

[0]: https://www.zigbee2mqtt.io/
[1]: https://spdx.dev/learn/handling-license-info/
[2]: https://github.com/amberstarlight/starlight/commit/6eece984ad4739a6a32539cf336c8ace39b29795
[3]: https://matija.suklje.name/how-and-why-to-properly-write-copyright-statements-in-your-code
[4]: https://github.com/Lucas-C/pre-commit-hooks?tab=readme-ov-file#insert-license
[5]: https://github.com/amberstarlight/starlight
