// SPDX-License-Identifier: GPL-3.0-or-later

export default function (eleventyConfig) {
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  eleventyConfig.addShortcode(
    "iso8601",
    (date) => `${new Date(date).toLocaleDateString()}`,
  );

  eleventyConfig.addShortcode(
    "niceDate",
    (date) =>
      `${new Date(date).toLocaleDateString("en-GB", { dateStyle: "full" })}`,
  );
}
