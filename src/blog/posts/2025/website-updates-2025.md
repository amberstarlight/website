---
title: Eleventy, Nunjucks, and Footnotes
subtitle: Website upgrades for 2025
date: 2025-10-08
tags:
  - website
  - eleventy
  - programming
---

Whilst working on bigger blog posts for this website, I ran into the issue that
I don't have support for footnotes! I've come up with a solution, and I'm going
to include an example of a footnote[^1] in this post, so we can see it working.

I have tried previously to add footnote support using [markdown-it-footnote][0]
but I wasn't really a fan of this package. I'm also a bit wary of just adding
a package to deal with it, given the recent [npm supply chain attacks][1]. Even
though this website only uses dependencies to build static pages, I still have
to install all the packages to develop locally - and the less packages I have,
the better.

After doing some research for prior art I stumbled across [this post by
Kevin Loughead][2], who wrote a footnote parser plugin from scratch for their
purposes. This is great! A really clever solution and putting it into a Nunjucks
filter to boot. I've made some changes to adapt this to my website:

- I am using `<sup>` tags for the footnote links (the [superscript element][3]).
  I think it's better to use a semantic tag here rather than moving or resizing
  it in CSS.

- I have added ARIA labels to make the footnotes more accessible for
  screen-readers. I want to give everyone reading this website the best possible
  chance of understanding and being able to engage with the content. This is
  initially a first pass; I think there is probably room for improvement.

- I'm not using CSS selectors or a class to fix the 'sticky nav problem', but
  what luck that Kevin mentioned this because it gave me a clue as to how to fix
  it. Instead, I'm using [scroll-margin-top][4] which is supported by [>94% of
  browsers][5] (at the time of writing).

The only other thing I need to do now to make this look like traditional
blogging website footnotes is to add a horizontal rule above the notes section.
With this filter, I have to add in the `hr` and the footnotes manually at the
bottom of the Markdown document.

## Other Website Upgrades

There are other website updates that I've been making over the last few months,
some of which are behind the scenes and some that are improvements to the user
experience:

- The blog now has [pagination](/blog/2).
- The post tagging system has been surfaced as a [tag index](/blog/tags). You
  can filter by each tag.
- I removed `markdown-it-spoiler` and created a spoiler parsing filter in the
  same vein as Kevin's footnote parser.
- I created a [Makefile][6] to automate some of the tasks I do regularly on this
  project, along with making it suitable for use in CI.
- I have made some CSS tweaks, including [text-underline-offset][7] on links
  to improve legibility, and an improved colour palette for dark mode. I really
  like dark mode on this website now, It feels comfy.

To surface these changes, I plan to create a changelog page. I would like to
autogenerate this using a `CHANGELOG.md` in the repository root, aligned with
the [Keep a Changelog][8] standard.

I may not publish many blog posts, but I do enjoy carving out a space that is
truly mine on the web; it's a little bit of resistance against the corporate
web, against AI slop, and against auto-generated content. I continue to create
for my own enjoyment - and that's the way I think it should be.

---

### Notes

[^1] There isn't a standard mechanism for implementing footnotes in HTML
documents, so there are plenty of different ways to do this. I'm choosing
simplicity as I think it becomes more maintainable.

[0]: https://github.com/markdown-it/markdown-it-footnote
[1]: https://github.blog/security/supply-chain-security/our-plan-for-a-more-secure-npm-supply-chain/
[2]: https://www.kevinloughead.com/blog/footnotes/
[3]: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/sup
[4]: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-margin-top
[5]: https://caniuse.com/?search=scroll-margin-top
[6]: https://github.com/amberstarlight/website/blob/main/Makefile
[7]: https://developer.mozilla.org/en-US/docs/Web/CSS/text-underline-offset
[8]: https://keepachangelog.com/en/1.1.0/
