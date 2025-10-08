// SPDX-License-Identifier: GPL-3.0-or-later

const tagFilter = ["all", "now", "post"];

function parseFootnotes(htmlString) {
  const footnoteRegex = /\[\^([1-9])\]/g;
  const footnotes = new Set();
  const pageURL = this.ctx.page.url;

  htmlString = htmlString.replace(footnoteRegex, (match, $1) => {
    if (!footnotes.has($1)) {
      footnotes.add($1);
      return `<sup><a id="backlink-${$1}" aria-label="Footnote #${$1}" href="${pageURL}#footnote-${$1}">[${$1}]</a></sup>`;
    }
    return `<sup><a id="footnote-${$1}" aria-label="Back to reference #${$1}" href="${pageURL}#backlink-${$1}">[${$1}]</a></sup>`;
  });

  return htmlString;
}

function parseSpoilers(htmlString) {
  const spoilerRegex = /\|\|.+\|\|/g;
  return htmlString.replace(spoilerRegex, (match, p1) => {
    const strippedSpoiler = match.replace(/\|\|/g, "");
    return `<span class="spoiler">${strippedSpoiler}</span>`;
  });
}

export default function (eleventyConfig) {
  eleventyConfig.addFilter("alphabeticSort", (arr) =>
    arr.sort((a, b) => (a > b ? 1 : -1)),
  );

  eleventyConfig.addFilter("numCommas", (value) => value.toLocaleString());

  // Credit to Zach for these
  // https://github.com/11ty/eleventy-base-blog/blob/main/_config/filters.js
  // Return the keys used in an object
  eleventyConfig.addFilter("getKeys", (target) => {
    return Object.keys(target);
  });

  eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
    return (tags || []).filter((tag) => tagFilter.indexOf(tag) === -1);
  });

  eleventyConfig.addFilter("parseFootnotes", parseFootnotes);
  eleventyConfig.addFilter("parseSpoilers", parseSpoilers);
}
