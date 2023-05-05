---
title: What's In A Website?
subtitle: (or "I've Made A Website, Part 2")
date: 2023-05-03
---

If you read my first post, "[I Made A Website][0]", you'll know that this site
uses [11ty][1]. *"That's fantastic"*, you might think, *"but **how** does it use
11ty?"* Maybe you want to know where the site is hosted? How is it built?

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
      includes: "../templates/includes",
      layouts: "../templates/layouts",
      data: "../data"
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
out to the host in a separate operation.

### Hosting

There were a number of ways I could have gone about doing this, and everyone
has an opinion on which way is the best! The 11ty documentation has a lot of
[suggestions][4], but as a DevOps Engineer I had an idea in mind: AWS. Yes, I
know that AWS isn't really in the spirit of the free and open web, and that I
could have used GitHub Pages for free, but CloudFront's free tier is now *very*
generous (at the time of writing):

- 1TB of data transfer out, per month
- 10,000,000 HTTP/S requests per month
- Free SSL certificates
- No feature limits

To store the site's files, I'll use an S3 bucket. The amount of data stored will
be very low (as the site is so small), and data transfer out to CloudFront from
S3 is free. I don't expect to spend more than 1 USD per month (especially during
the S3 12-month free tier). A quick run on the [AWS Calculator][5] gave me a price
estimate of 0.05 USD per month.

Besides, it gives me the opportunity to write some Terraform, configure AWS
Cost and Usage alerts, and keep my AWS knowledge sharp.

[0]: /blog/i-made-a-website/
[1]: https://www.11ty.dev
[2]: https://github.com/mozilla/nunjucks
[3]: https://liquidjs.com/
[4]: https://www.11ty.dev/docs/deployment/
[5]: https://calculator.aws/
