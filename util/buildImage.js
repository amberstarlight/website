// SPDX-License-Identifier: GPL-3.0-or-later

const fs = require("fs");
const path = require("node:path");
const { createCanvas } = require("canvas");
const { BoundingBox, DrawableText } = require("./drawingHelpers");

const img = {
  width: 1200,
  height: 600,
};

const margin = {
  left: 100,
  top: 75,
  right: 50,
  bottom: 50,
};

const colours = {
  light: "#f5f9e9",
  dark: "#151515",
  accent: "#cc2851",
};

const fontMargin = 20;

function buildOpenGraphImage(
  titleString,
  subtitleString,
  bylineString,
  filePath,
) {
  const canvas = createCanvas(img.width, img.height);
  const context = canvas.getContext("2d");

  context.fillStyle = colours.light;
  context.fillRect(0, 0, img.width, img.height);

  context.fillStyle = colours.accent;
  context.fillRect(0, 0, 50, img.height);

  const title = {
    text: titleString,
    fontProperties: {
      family: "Lilex Meduim", // TODO: fix name when Lilex updates
      heightInPx: 72,
      widthInPx: 72 * 0.6,
      lineHeight: 1.4,
    },
  };

  const subtitle = {
    text: subtitleString,
    fontProperties: {
      family: "Lilex",
      heightInPx: 48,
      widthInPx: 48 * 0.6,
      lineHeight: 1.6,
    },
  };

  const byline = {
    text: bylineString,
    fontProperties: {
      family: "Lilex",
      heightInPx: 36,
      widthInPx: 36 * 0.6,
      lineHeight: 1.2,
    },
  };

  const titleBounds = new BoundingBox(
    margin.left,
    margin.top,
    img.width - (margin.left + margin.right),
    img.height - (margin.top + margin.bottom),
  );

  const titleText = new DrawableText(
    title.text,
    title.fontProperties,
    titleBounds,
    colours.dark,
  );

  const subtitleBounds = new BoundingBox(
    margin.left,
    margin.top + titleText.calcHeight() + fontMargin,
    titleBounds.widthInPx,
    titleBounds.heightInPx - (titleText.calcHeight() + fontMargin),
  );

  const subtitleText = new DrawableText(
    subtitle.text,
    subtitle.fontProperties,
    subtitleBounds,
    colours.dark,
  );

  const bylineBounds = new BoundingBox(
    margin.left,
    margin.top +
      titleText.calcHeight() +
      subtitleText.calcHeight() +
      fontMargin * 2,
    titleBounds.widthInPx,
    titleBounds.heightInPx -
      (titleText.calcHeight() + subtitleText.calcHeight() + fontMargin * 2),
  );

  const bylineText = new DrawableText(
    byline.text,
    byline.fontProperties,
    bylineBounds,
    colours.accent,
  );

  titleText.draw(context);
  subtitleText.draw(context);
  bylineText.draw(context);

  const buffer = canvas.toBuffer("image/png");
  const fileDir = path.dirname(filePath);

  if (fs.existsSync(fileDir)) {
    fs.writeFileSync(filePath, buffer);
  } else {
    fs.mkdirSync(fileDir, { recursive: true });
    fs.writeFileSync(filePath, buffer);
  }

  console.log(`[og:image] Wrote ${filePath}`);
}

module.exports = {
  buildOpenGraphImage,
};
