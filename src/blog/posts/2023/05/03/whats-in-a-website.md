---
title: What's In A Website?
subtitle: (or "I've Made A Website, Part 2")
date: 2023-05-03
---

If you read my first post, "[I Made A Website][0]", you'll know that this site
uses [11ty][1]. _"That's fantastic"_, you might think, _"but **how** does it use
11ty?"_ Maybe you want to know where the site is hosted? How is it built?

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
    htmlTemplateEngine: "njk",
  };
};
```

Next, I really had to do something about the default directories. Something just
feels _wrong_ about building out to `_site/`, and including from directories
prefixed with underscores. We need to note here that the `includes` and `layouts`
directories are expecting to be subfolders of `input`:

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
      data: "../data",
    },
  };
};
```

We really need some CSS. If you're following along at home, let's add an
`assets/` folder that gets copied into the build folder, and watch for any
changes (to force rebuilds):

```js
eleventyConfig.addPassthroughCopy("src/assets");
eleventyConfig.addWatchTarget("./src/assets/*");
```

Cool, now I can drop stuff in `src/assets` and it'll get included at build time.
This is where I have my main `bundle.css`, alongside webfont files and images -
although those aren't committed to the repository. Binary files can get copied
out to the host in a separate operation.

Oh, but I need _content_! The magic part, really. That's either HTML or Markdown
files, in a neat directory structure under `src/`. For posts (like this), I'll
write Markdown files. For more specific pages, I'll write HTML. If you've used
other SSGs (static site generators), you may have heard of _front-matter_, and
that's still a thing with 11ty. For example, this page has the following front
matter:

```yaml
---
title: What's In A Website?
subtitle: (or "I've Made A Website, Part 2")
date: 2023-05-03
---
```

This also allows me to pick out which layout to use for things. All blog posts
are set to use the `post.njk` template, which itself extends off the `base.njk`
template. You can do that for an entire directory by making a `json` file, and
that's how I'm setting the layout for all my blog posts:

```json
{
  "layout": "post.njk"
}
```

Making sure it's in the same directory as the files you want to target.

### Hosting

There were a number of ways I could have gone about doing this, and everyone
has an opinion on which way is the best! The 11ty documentation has a lot of
[suggestions][4], but as a DevOps Engineer I had an idea in mind: AWS. Yes, I
know that AWS isn't really in the spirit of the free and open web, and that I
could have used GitHub Pages for free, but CloudFront's free tier is now _very_
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

### Building & Deploying

Building the site is really simple. Infact, it's one command:

```sh
> npx @11ty/eleventy
[11ty] Writing build/index.html from ./src/index.html (njk)
... # additional output removed for brevity
[11ty] Copied 8 files / Wrote 6 files in 0.18 seconds (v2.0.1)
```

This drops out all the files into `build/`, which can then be synced to the S3
bucket with the AWS CLI:

```sh
> aws s3 sync build/ s3://my-s3-bucket
upload: build/index.html to s3://my-s3-bucket/index.html
... # etc, for all files
```

And of course, I wouldn't do that manually, so deployment is done via pipeline
on GitHub Actions. Their `ubuntu-latest` image ships with `node` and `yarn`, so
it's a case of installing the AWS CLI, checking out the repo, running
`yarn install`, `yarn build`, then `aws s3 sync`. I don't keep images or the
webfont files in the Git repo (because my brain won't let me), so I just upload
those to the bucket when I need to (infrequently) using the same AWS CLI command.

### In Summary

That was a fairly comprehensive explanation of what's going on to make this site,
and I didn't include all of the things that are going on. If you're interested
in making your own site using 11ty, the [documentation][6] is a good place to
look next. If you want to see the actual code, you can do so [on my GitHub][7].

There's still a few things I want to build for this site. I'd like a place for
people to be able to view my photography, or at least some selections from my
work, so that will be the next thing that I document building.

Until next time, keep building for the web!

[0]: /blog/i-made-a-website/
[1]: https://www.11ty.dev
[2]: https://github.com/mozilla/nunjucks
[3]: https://liquidjs.com/
[4]: https://www.11ty.dev/docs/deployment/
[5]: https://calculator.aws/
[6]: https://www.11ty.dev/docs/
[7]: https://github.com/amberstarlight/website
