// SPDX-License-Identifier: GPL-3.0-or-later

import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import implicitFigures from "markdown-it-image-figures";
import { minify as htmlMinify } from "html-minifier";
import { minify as cssoMinify } from "csso";
import { minify as terserMinify } from "terser";

import matter from "gray-matter";
import fs from "fs";
import { buildOpenGraphImage } from "./util/buildImage.js";

import filters from "./util/filters.js";
import shortcodes from "./util/shortcodes.js";

const gitSha = process.env.GIT_SHA;

export default function (eleventyConfig) {
  eleventyConfig.amendLibrary("md", (mdLib) =>
    mdLib.use(implicitFigures, {
      figcaption: "title",
      link: true,
      lazy: true,
      async: true,
    }),
  );

  eleventyConfig.addPlugin(filters);
  eleventyConfig.addPlugin(shortcodes);
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addNunjucksGlobal("gitSha", gitSha);
  eleventyConfig.addNunjucksGlobal("gitShortSha", gitSha.slice(0, 7));

  eleventyConfig.addTemplateFormats("css");
  eleventyConfig.addExtension("css", {
    outputFileExtension: "css",
    compile: async function (content) {
      let result = cssoMinify(content);
      return async () => {
        return result.css;
      };
    },
  });

  eleventyConfig.addTemplateFormats("js");
  eleventyConfig.addExtension("js", {
    outputFileExtension: "js",
    compile: async function (content) {
      let result = await terserMinify(content);
      return async () => result.code;
    },
  });

  eleventyConfig.addTransform("htmlmin", function (content) {
    if (this.page.outputPath && this.page.outputPath.endsWith(".html")) {
      let minified = htmlMinify(content, {
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
}
