// SPDX-License-Identifier: GPL-3.0-or-later

function dateTimeSlug(date) {
  const now = new Date(date);

  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();
  const hour = now.getHours();
  const mins = now.getMinutes();

  const dateString = `${year}-${month}-${day}-${hour}-${mins}`;
  return dateString;
}

export default function (eleventyConfig) {
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  eleventyConfig.addShortcode(
    "iso8601",
    (date) => `${new Date(date).toLocaleDateString("en-GB")}`,
  );

  eleventyConfig.addShortcode(
    "niceDate",
    (date) =>
      `${new Date(date).toLocaleString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })}`,
  );

  eleventyConfig.addShortcode(
    "postedTime",
    (date) =>
      `${new Date(date).toLocaleString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      })}`,
  );

  eleventyConfig.addShortcode("dateSlug", (date) => dateTimeSlug(date));
}
