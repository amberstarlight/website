---
title: Cache-busting CSS in Eleventy
subtitle: It's available out of the box
date: 2026-07-10
tags:
  - eleventy
  - website
---

I recently noticed an issue whilst debugging a CSS problem; even though I was
invalidating my CDN's cache, viewers would still see outdated styles when they
visited this site. Whenever I change the CSS, I want end users to get the newest
version, regardless of what their browser's cache or my CDN's cache has. The
ideal way to fix this is to change the URL of your CSS; assuming you have a way
to ensure you don't reuse filenames (some sort of hashing), users would always
fetch the latest CSS file. There are many ways to do this in Eleventy, ranging
from _literally changing the CSS filename_ to complex CSS processing with
a bundler such as Webpack or esbuild.

Assuming you're using a version later than `v3.0.0-alpha.10`, Eleventy comes
with [eleventy-plugin-bundle][0] - a very simple bundler which allows you to
create content-hashed file bundles. You can also use transforms, which let you
hand off transpiling or other code changes to other tooling.

For the basic use case of hashing CSS, you can use a configuration as follows.
In your Eleventy configuration file, drop in this snippet:

```js
export default function(eleventyConfig) {
  eleventyConfig.addBundle("css");
};
```

The name of the bundle you add here should be matched when you create the bundle
in your layout files. For example, in a Nunjucks layout:

```njk
{% raw %}{%- css %}
  {# relative path(s) to your css #}
  {% include "/src/assets/reset.css"%}
  {% include "/src/assets/main.css"%}
{% endcss %}{% endraw %}
```

Then, in your base layout, replace your `link` tag to your main CSS file to use
the available shortcode `getBundleFileUrl`, and the name of the bundle you just
created.

```html
{% raw %}<link rel="stylesheet" href="{% getBundleFileUrl "css" %}"{% endraw %}>
```

This will create a content-hashed bundle file, with no extra configuration,
meaning you'll cache-bust when you change your CSS. Inspect the `head` of your
built HTML and you'll see the hashed filename. If you want to go further, this
simple bundler can be extended with transforms; I use PostCSS to transpile and
minify, for example ([see the code][1]). You could also create different bundles
for different parts of your website, if you have complex CSS that isn't in use
on every page - or bundle a small amount of critical styles to use inline in
your HTML.

[0]: https://github.com/11ty/eleventy-plugin-bundle
[1]: https://codeberg.org/amberstarlight/website/src/commit/21ba38eac36ec72b8710aca371239a42e3163442/eleventy.config.js#L57-L69
