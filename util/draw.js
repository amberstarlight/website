const canvasWidth = 1200;
const canvasHeight = 600;
const fontSizeInPx = 64;
const lineHeight = 1.6;

const margin = {
  left: 100,
  top: 50,
  right: 50,
  bottom: 50,
};

const drawBounds = {
  x: [margin.left, canvasWidth - margin.right],
  y: [margin.top, canvasHeight - margin.bottom],
};

const drawableRegion = {
  x: canvasWidth - (margin.left + margin.right),
  y: canvasHeight - (margin.top + margin.bottom),
};

const numDrawableGlyphsX = Math.floor(drawableRegion.x / fontSizeInPx);
const numDrawableGlyphsY = Math.floor(
  drawableRegion.y / (fontSizeInPx * lineHeight)
);

console.log(numDrawableGlyphsX, numDrawableGlyphsY);

const { createCanvas } = require("canvas");
const fs = require("fs");

const canvas = createCanvas(canvasWidth, canvasHeight);
const context = canvas.getContext("2d");

context.fillStyle = "#000";
context.font = `${fontSizeInPx}px monospace`;
context.fillText(
  "The quick brown fox jumps over the lazy dog",
  drawBounds.x[0],
  drawBounds.y[0]
);

const buffer = canvas.toBuffer("image/png");
fs.writeFileSync("./image.png", buffer);
