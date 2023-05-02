module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  return {
    dir: {
      input: "src",
      output: "build",
      includes: "templates/includes",
      layouts: "templates/layouts",
      data: "data"
    }
  }
};
