const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const htmlmin = require("html-minifier");
const csso = require("csso");
const gitSha = require("node:child_process")
  .execSync("git rev-parse HEAD")
  .toString()
  .trim();

module.exports = function (eleventyConfig) {
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  eleventyConfig.addShortcode(
    "niceDate",
    (date) =>
      `${new Date(date).toLocaleDateString("en-GB", { dateStyle: "full" })}`
  );
  eleventyConfig.addNunjucksGlobal("gitSha", gitSha);
  eleventyConfig.addNunjucksGlobal("gitShortSha", gitSha.slice(0, 7));

  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addTemplateFormats("css");
  eleventyConfig.addExtension("css", {
    outputFileExtension: "css",
    compile: async function (content) {
      let result = csso.minify(content);
      return async (data) => {
        return result.css;
      };
    },
  });

  eleventyConfig.addTransform("htmlmin", function (content) {
    if (this.page.outputPath && this.page.outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }
    return content;
  });

  eleventyConfig.addPassthroughCopy("src/assets/fonts");
  eleventyConfig.addPassthroughCopy("src/assets/img");
  eleventyConfig.addWatchTarget("./src/assets/*");

  eleventyConfig.addFilter("alphabeticSort", (arr) => {
    arr.sort((a, b) => (a.data.title > b.data.title ? 1 : -1));
    return arr;
  });

  eleventyConfig.addGlobalData("eleventyComputed.permalink", function () {
    return (data) => {
      if (data.draft && !process.env.BUILD_DRAFTS) return false;
      return data.permalink;
    };
  });

  eleventyConfig.addGlobalData(
    "eleventyComputed.eleventyExcludeFromCollections",
    function () {
      return (data) => {
        if (data.draft && !process.env.BUILD_DRAFTS) return true;
        return data.eleventyExcludeFromCollections;
      };
    }
  );

  eleventyConfig.on("eleventy.before", ({ runMode }) => {
    if (runMode === "serve" || runMode === "watch")
      process.env.BUILD_DRAFTS = true;
  });

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
