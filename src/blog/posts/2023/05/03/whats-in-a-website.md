---
title: What's In A Website?
subtitle: (or "I've Made A Website, Part 2")
date: 2023-05-03
---

If you read my first post, "I Made A Website", you'll know that this site uses
[11ty][1]. *"That's fantastic"*, you might think, *"but **how** does it use 11ty?"*
Maybe you want to know where the site is hosted? How is it built?

I'm glad you asked.

## Code

We're not using any of the starter projects or templates 11ty offers, because
that would ~~be too smart~~ be way more than I needed to get a website 'working'.
Besides, it would skip the opportunity for my personal design to emerge naturally!
Instead, I started completely barebones:

```sh
yarn init -2
yarn add @11ty/eleventy -D
```

As for my chosen template language, I'm using [nunjucks][2], because Mozilla
makes it, it's basically a Jinja port, and I'm a Firefox user. 11ty defaults to
[LiquidJS][3], which is probably also a great choice, but we need to change to
nunjucks in `eleventy.config.js`:

```js
module.exports = function (eleventyConfig) {
  return {
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  }
};
```

Next, I really had to do something about the default directories. Something just
feels *wrong* about building out to `_site/`, and including from directories 
prefixed with underscores.

```js
module.exports = function (eleventyConfig) {
  return {
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "build",
      includes: ".templates/includes",
      layouts: ".templates/layouts",
      data: "data"
    }
  }
};
```

We really need some CSS. Let's add an `assets/` folder that we copy into the build
folder, and watch for any changes (to force a rebuild):

```js
eleventyConfig.addPassthroughCopy("src/assets");
eleventyConfig.addWatchTarget("./src/assets/*");
```

Cool, now I can drop stuff in `src/assets` and it'll get included at build time.
This is where I have my main `bundle.css`, alongside webfont files and images -
although those aren't committed to the repository. Binary files can get copied
to the S3 bucket in a separate operation.

[1]: https://www.11ty.dev
[2]: https://github.com/mozilla/nunjucks
[3]: https://liquidjs.com/
