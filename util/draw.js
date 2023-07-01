const { createCanvas } = require("canvas");
const fs = require("fs");
const formatText = require("./format");

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

const font = "Lilex Meduim";
const fontHeight = 72;
const fontWidth = fontHeight * 0.6;
const lineHeight = 1.4;

const drawBounds = {
  x: [margin.left, img.width - margin.right],
  y: [margin.top + fontHeight, img.height - margin.bottom],
};

const drawableRegion = {
  x: img.width - (margin.left + margin.right),
  y: img.height - (margin.top + margin.bottom),
};

const numDrawableGlyphs = {
  x: Math.floor(drawableRegion.x / fontWidth),
  y: Math.floor(drawableRegion.y / (fontHeight * lineHeight)),
};

const canvas = createCanvas(img.width, img.height);
const context = canvas.getContext("2d");

context.fillStyle = colours.light;
context.fillRect(0, 0, img.width, img.height);

context.fillStyle = colours.accent;
context.fillRect(0, 0, 50, img.height);

context.fillStyle = colours.dark;
context.font = `${fontHeight}px ${font}`;

const text = "The Nintendo Switch Should Have Had A D-Pad";

function drawText(text, drawBounds) {
  const formattedText = formatText(
    text,
    numDrawableGlyphs.x,
    numDrawableGlyphs.y
  );

  for (const [index, line] of formattedText.entries()) {
    context.fillText(
      line,
      drawBounds.x[0],
      drawBounds.y[0] + index * (fontHeight * lineHeight)
    );
  }
}

drawText(text, drawBounds);

context.font = "48px Lilex";
context.fillText(
  "(Somewhat) unstructured thoughts about hardware and gaming",
  drawBounds.x[0],
  drawBounds.y[0] + 2 * fontHeight * lineHeight
);

/*
  Should store the y drawing position outside of the library
  (or if this becomes a class, in there)
*/

const buffer = canvas.toBuffer("image/png");
fs.writeFileSync("./image.png", buffer);
