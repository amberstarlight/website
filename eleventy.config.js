const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addWatchTarget("./src/assets/*");
  eleventyConfig.addPlugin(syntaxHighlight);

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
