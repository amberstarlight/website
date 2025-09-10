---
title: Refactoring Nunjucks Templates
subtitle: (or "Components Before It Was Cool")
date: 2023-06-21
tags:
  - website
  - eleventy
---

_This is the third article in the "I Made A Website" series. If you haven't read
parts [one][1] and [two][2], don't forget to check them out to get the full background._

I added word counts to my articles. Primarily so that if you are about to read
something of mine, you know what you're in for. Or more accurately, how long the
ride's going to be. This gave me the opportunity to refactor my site's Nunjucks
templates a bit, and made me think about components on the Web. This post may
look code-heavy, but I assure you there is nothing complex happening here.

## Word Counts

I'll get the word counts bit out of the way first. I'm using a solution provided
by [Bryce Wray][3] (thank you!), but with the reading time removed (I don't think
it can be accurate for the various types of people reading my content). I'm doing
this directly in Nunjucks, and it's 3 lines of templating:

```njk {% raw %}
{% set regExpCode = r/<pre class=(.|\n)*?<\/pre>/gm %}
{% set fixedContent = content | replace(regExpCode, "") | striptags %}
{% set wordCount = fixedContent | wordcount %}{% endraw %}
```

As Bryce says in his post, `set regExpCode` builds a regular expression that
searches for the HTML stuff that Eleventy's syntax highlighting plugin adds to
code blocks. That regex matches anything inside `<pre></pre>` tags (that have
any `class`), an example being the code block you saw above this paragraph. Open
your [developer tools][9] (F12 in Chrome/Firefox) and poke around. Stay curious!

We don't want to count stuff inside code blocks as "words" for the purposes of
an article's word count. `set fixedContent` uses the regex we made to get rid
of code blocks in the post's `content`, then `striptags` gets rid of all the tags
and chomps superfluous whitespace.

Still with me? Next part's really easy. `set wordCount` runs the clean string we
now have through Nunjucks' `wordcount`. Which is _almost_ perfect. We then need
a one-liner in `eleventy.config.js`:

```js
eleventyConfig.addFilter("numCommas", (value) => value.toLocaleString());
```

Which just puts this word count number we have, a very literal `integer`, through
JavaScript's `Number.prototype.toLocaleString()` to get something a little more
readable. For example; word counts of 1000 will appear as '1,000'. Bryce chose to
do a standard function, but I made it an arrow function to make it a one-liner.

And we use it in the layout like so:

```njk {% raw %}
<h3>{% niceDate page.date %} &bullet; {{ wordCount | numCommas }} words</h3>
{% endraw %}
```

You can also see my Eleventy [shortcode][4] `niceDate` here, as a bonus. You
could, if you wanted, instead do all of the word counting through a shortcode/filter
in a similar way, but I think Bryce's solution is really clean, especially when we
abstract it away into a Nunjucks macro.

## Components?

At the same time as adding the word count, I did some refactoring of my Nunjucks
templates so that I had some reusable parts, or [_components_][5], if you will.

Back when I was set on using React for my website, I had written a fair few
components. For the uninitiated, components are just reusable pieces of code.
You could just as well call them _functions_ (they are) but on the Web they are
slightly different as they compose not only functionality but also _markup_. Thus,
web components = wrapping parts of markup and functionality into _a function_
that you can pass parameters into, keeping your code DRY (Do {not} Repeat
Yourself). In the world of lightweight SSGs, (we're not talking about Gatsby here
because that's literally just React With Addons), components are still really
useful! Nobody wants to copy and paste the same thing over and over (with all
the problems that comes with) and it's effective for code splitting at a smaller
level than just templates/layouts.

Let's do an example; there are multiple places on my site where I show blog post
information (that is, the title, subtitle, post date, word count) and they're
presenting the same information, using the same code. So let's encapsulate that
into a function we can pass a post _object_ into. This makes use of Nunjucks'
`macro`. According to the [documentation][6], "[it] allows you to define reusable
chunks of content." _Perfect_.

Here's my entire macro:

```njk {% raw %}
{% macro postInfo(post) %}

{% set regExpCode = r/<pre class=(.|\n)*?<\/pre>/gm %}
{% set fixedContent = post.content | replace(regExpCode, "") | striptags %}
{% set wordCount = fixedContent | wordcount %}

<h2><a href="{{ post.url }}">{{ post.data.title }}</a></h2>
<p>{{ post.data.subtitle }}</p>
<small>{% niceDate post.date %} &bullet; {{ wordCount | numCommas }} words</small>

{% endmacro %}
{% endraw%}
```

Hey look! There's that word count templating stuff! And some HTML to render it
out nicely. Then it becomes a case of using that function wherever I need post
info. Maybe that's on the [home page](/) to display the latest post:

```njk {% raw %}
{%- from "components/postInfo/macro.njk" import postInfo -%}
  {% for post in collections.post | reverse | first %}
  {{ postInfo(post) }}
{% endfor %}
{% endraw %}
```

Or on the [blog page](/blog), to make a list of all posts:

```njk {% raw %}
{%- from "components/postInfo/macro.njk" import postInfo -%}
  {% for post in collections.post | reverse %}
  {{ postInfo(post) }}
{% endfor %}
{% endraw %}
```

And yes, the only difference between those two is the addition of running the
posts collection through Nunjucks' `first` filter to get a single item for the
home page. That's something I'll probably come back to with a collection filter,
but it works fine for now.

If you've used React (or anything similar) you'll recognise the paradigm:

- import the component (`from file import function`)
- prepare the dataset (`for x in y`)
  - call the function in the loop with the data (`function(x)`)

This isn't specific to Nunjucks, given that it's effectively a port of Jinja2
(from 2008). Component-based design has been around for a long, long time. To
make the point, we didn't need full-fat JavaScript libraries to do this. We can
enjoy modern takes on development but do it lean! At the time of writing, if
you're reading my website you haven't downloaded any client side JavaScript. With
the cache disabled, if you hit my last post you'll transfer 1.03MB. 984kB of which
is the _jpeg in the footer_.

Eleventy does have first-class support for 'WebC', a new [framework-independent
web-component language][7]. You'll note that this is another project of Zach
Leatherman (the fine fellow behind Eleventy). I haven't gone down this route
(because I haven't actually explored it yet), but it looks quite powerful and
a good replacement for some of the templating languages that are beginning to
show their age. Zach's said before that Nunjucks isn't that well maintained.
To be frank, I'd agree; their documentation is unfortunately lacking more
concrete examples and some parts of it effectively say _"dunno, go look at jinja2's
docs"_.

I will most likely continue to use Nunjucks, though, because I've started (so
I'll finish) and so far I haven't hit any edge cases that make me want to rip
everything up and start afresh. That isn't to say that I'm going to _ignore_
the trend away from these dedicated templating languages: I'll keep an
eye on WebC - but so many in frontend do the JavaScript equivalent of
[distro hopping][8] every few months as the latest framework hits GitHub. Just
because something new turns up doesn't mean the thing you were just using has
suddenly become useless!

[1]: /blog/i-made-a-website/
[2]: /blog/whats-in-a-website/
[3]: https://www.brycewray.com/posts/2022/09/word-count-reading-time-eleventy/
[4]: https://www.11ty.dev/docs/shortcodes/
[5]: https://react.dev/reference/react/Component
[6]: https://mozilla.github.io/nunjucks/templating.html#macro
[7]: https://github.com/11ty/webc
[8]: https://www.youtube.com/watch?v=l60MnDJklnM
[9]: https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Tools_and_setup/What_are_browser_developer_tools
