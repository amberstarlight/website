---
title: Switching To Helix
subtitle: Bye bye, electron text editors
date: 2023-07-01
tags:
  - linux
  - programming
---

The hardest thing to do is reprogram your muscle memory. Not only are you
fighting your brain while it tries to do things automatically (the wrong things,
to boot), you are also learning something new. It's harder the longer you've
spent training your muscle memory, too.

I'm in the process of switching away from some tools I've used for a long,
long time. Namely, I'm switching my text editor/IDE to [_Helix_][0], which is
a _Vim-like_ text editor. No more `Ctrl+S`ing for me, it's all `:w` now. That
is, if I remember to switch to NORMAL mode - inevitably leaving colons and `w`s
littered across my code. And with Helix it's [feet first into hell][1] as, upon
opening it for the first time, you're dropped into an empty scratch buffer. With
_nothing_ to guide you. If you didn't read the website, the docs, or the project
brief you might have to [kill your terminal to escape][2].

Getting used to Helix has been fun, honestly. Without the cruft and bloat of
running an entire extra Chromium process, I'm more focused. I don't feel the
need to flick through the file picker, the extensions tab, change my icon set,
or change my theme. Helix is as fast as my terminal is. Of course, that doesn't
mean that it has no features. You can install language servers (and I have, for
JavaScript through the [`typescript-language-server`][3], and Terraform via
[`terraform-ls`][4]), and you can use tree-sitter. There's no plugin system
quite yet, but I'm quite happy with simply using the language servers and
off-editor static analysis tools.

I kept some friends up to date with things I'd discovered while learning the
basics of the editor:

> helix editor day 2
>
> - i'm bad at knowing what mode i'm in
> - i just figured out you can go to any line you want if you enter normal mode,
>   and type `:n` where `n` is any line number
> - you can't move lines up or down arbitrarily like in vscode/etc. but you can
>   do `xdp` which selects the line (`x` or `nx` for any `n` lines), deletes the
>   line (`d`, storing it into the `"` register), then paste the line (`p`) at
>   any point after moving around the file

Later I learned that depending on whether you hold shift when pressing P,
the insertion happens on the current line (`p`), or the line above (`P`).
Learning tricks like this was really useful! This is the key way to stay fast.
One of my favourites is `reflow`, which uses the rulers you have set in your
`languages.toml` to reflow a selection of text onto multiple lines. I'm using
it to write this article in Markdown without having to worry about reflowing as
I write.

> helix day 3
> just used `:reflow` for the first time and it wrapped a commit message
> perfectly without any special config

What I really like about Helix, and this extends to Kakoune - is the grammar
difference. In Vi(m), deleting a word is `dw`. That sounds natural in English,
but when I go to make changes to text, what I _want to do_ is to select some
text, and then act on that selection. Helix's _select-then-act_ paradigm is
the definitive reason that I've managed to stick with it for longer than I ever
was able to with Vim. In Helix, the same action is `wd`. A small difference,
but huge usability improvements.

And as applies to Vi(m), using the keyboard for all actions is straight up much
faster than having to take a hand away to use the mouse. I agree with Gravis
(Cathode Ray Dude on YouTube and Cohost), who wrote in a thread of Tweets I can
no longer find (because Captain Divorce has, at the time of writing, [prevented
you from viewing Tweets without logging in][5]) wrote about how the mouse makes
you slower at using computers. Having to move the mouse cursor around to find
something you want is _just slower_ than hitting some keys. This is the main
part of the speed improvement, for me. Of course, you have to _learn what the
keybindings are_, but once you get past this, you're golden.

What else. Oh, there's the config file. It's TOML, instead of plain text like
a `.vimrc`, and there's no huge `.lua` boltons. I've tried to keep my config
file as small as possible, so that I'm not learning bad habits or working around
things; I wanted to learn everything as raw as possible and make improvements
later on through config. I changed the gutter (statusline), so that the
currently open file was in the centre, and I changed NOR, INS, and SEL to be
their fully-formed English words, NORMAL, INSERT, and SELECT. I also changed the
file picker property `hidden` (which shows or hides hidden files) to `false`,
because lots of config files are dotfiles. Honestly quite an odd thing to have
as a default, but I digress. I also enabled `cursorline`, which highlights
the line your cursor is on, and set `bufferline` to `always`, so that the open
buffers are always displayed on the top.

For things that don't have a language server, you can add language-specific
config in `languages.toml`. I'm not currently running [marksman][6], mostly
because the Arch package wants to also install dotnet runtimes and I'd rather
hack up a quick script to install it from the pre-built binary, so I'm using
a `languages.toml` in the `.helix` directory in this project with the basics.

I updated my [dotfiles][7] to add my Helix config and completely switched
from VS Code to Helix after only four days of using it. I'll have to rework my
dotfile linking script, though, as Helix maintainers [aren't going to be adding
any more CLI flags][8], so I can't pass `languages.toml` as an argument. I'll
have to do something like:

```sh
rm -rf "$HOME/.config/helix"
ln -s "$DOTFILES_DIR/config/helix" "$HOME/.config/helix"
```

And I can probably extend that out to any other programs that keep their config
there (some don't use `$XDG_CONFIG_HOME` which is miserable for maintaining any
complex dotfiles). Alternatively, depending on how Helix decides to move forward
with that issue, it could be specified in `config.toml` itself.

If you're already a (neo)vi(m) user with a complex configuration suite, Helix
isn't going to be the right way forward for you. You can't lift and shift your
config, and you'll have to relearn the keybinds. But, if you're coming from
something like nano, or VS Code (and you don't rely on complex plugins), maybe
it's time to give a modal text editor a try?

[0]: https://helix-editor.com/
[1]: https://www.youtube.com/watch?v=yWh9l8RSkPk
[2]: https://github.com/hakluke/how-to-exit-vim/blob/master/README.md
[3]: https://github.com/typescript-language-server/typescript-language-server
[4]: https://github.com/hashicorp/terraform-ls
[5]: https://www.theverge.com/2023/6/30/23779764/twitter-blocks-unregistered-users-account-tweets
[6]: https://github.com/artempyanykh/marksman
[7]: https://github.com/amberstarlight/.dotfiles
[8]: https://github.com/helix-editor/helix/issues/7102#issuecomment-1563907532
