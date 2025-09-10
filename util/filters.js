// SPDX-License-Identifier: GPL-3.0-or-later

const tagFilter = ["all", "now", "post"];

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
}
