// SPDX-License-Identifier: GPL-3.0-or-later

const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const implicitFigures = require("markdown-it-image-figures");
const htmlmin = require("html-minifier");
const csso = require("csso");
const { minify } = require("terser");
const gitSha = require("node:child_process")
  .execSync("git rev-parse HEAD")
  .toString()
  .trim();

const matter = require("gray-matter");
const fs = require("fs");
const { buildOpenGraphImage } = require("./util/buildImage");

module.exports = function (eleventyConfig) {
  eleventyConfig.amendLibrary("md", (mdLib) =>
    mdLib.use(implicitFigures, {
      figcaption: "title",
      link: true,
      lazy: true,
      async: true,
    }),
  );

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  eleventyConfig.addShortcode(
    "niceDate",
    (date) =>
      `${new Date(date).toLocaleDateString("en-GB", { dateStyle: "full" })}`,
  );
  eleventyConfig.addNunjucksGlobal("gitSha", gitSha);
  eleventyConfig.addNunjucksGlobal("gitShortSha", gitSha.slice(0, 7));

  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addTemplateFormats("css");
  eleventyConfig.addExtension("css", {
    outputFileExtension: "css",
    compile: async function (content) {
      let result = csso.minify(content);
      return async () => {
        return result.css;
      };
    },
  });

  eleventyConfig.addTemplateFormats("js");
  eleventyConfig.addExtension("js", {
    outputFileExtension: "js",
    compile: async function (content) {
      let result = await minify(content);
      return async () => result.code;
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
  eleventyConfig.addWatchTarget("./src/assets");
  eleventyConfig.addWatchTarget("./util");

  eleventyConfig.addFilter("alphabeticSort", (arr) => {
    arr.sort((a, b) => (a.data.title > b.data.title ? 1 : -1));
    return arr;
  });

  eleventyConfig.addFilter("numCommas", (value) => value.toLocaleString());

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
    },
  );

  eleventyConfig.on("eleventy.before", ({ runMode }) => {
    if (runMode === "serve" || runMode === "watch")
      process.env.BUILD_DRAFTS = true;
  });

  eleventyConfig.on(
    "eleventy.after",
    ({ dir, results, runMode, outputMode }) => {
      for (const builtPage of results) {
        if (builtPage.url.startsWith("/blog/") && builtPage.url.length >= 7) {
          const slug = builtPage.url.split("/")[2];

          fs.readFile(`./${builtPage.inputPath}`, "utf-8", (err, data) => {
            const frontMatter = matter(data);
            buildOpenGraphImage(
              frontMatter.data.title,
              frontMatter.data.subtitle,
              "amber.vision/blog",
              `build/assets/img/og/${slug}.png`,
            );
          });
        }
      }
    },
  );

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
