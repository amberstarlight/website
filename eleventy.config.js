module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addWatchTarget("./src/assets/*.css");
  return {
    dir: {
      input: "src",
      output: "build",
      includes: ".templates/includes",
      layouts: ".templates/layouts",
      data: "data"
    }
  }
};
