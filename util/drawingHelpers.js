// SPDX-License-Identifier: GPL-3.0-or-later

function getLines(text, lineLength) {
  const words = text.split(" ");
  let lines = [];

  let currentLine = words[0];
  words.shift();

  for (const word of words) {
    if (currentLine.length + word.length > lineLength) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine += " " + word;
    }
  }

  lines.push(currentLine);
  return lines;
}

function formatText(string, lineLength, maxLines) {
  if (string.length <= lineLength) return [string];

  let lines = getLines(string, lineLength);
  if (string.length > lineLength * maxLines) {
    lines[maxLines] = "...";
  }

  return lines;
}

class BoundingBox {
  constructor(x, y, widthInPx, heightInPx) {
    this.x = x;
    this.y = y;
    this.widthInPx = widthInPx;
    this.heightInPx = heightInPx;
  }
}

class DrawableText {
  constructor(string, fontProperties, boundingBox, colour) {
    this.string = string;
    this.fontProperties = fontProperties;
    this.boundingBox = boundingBox;
    this.colour = colour;
  }

  // calculate num glyphs we can draw in X and Y
  numDrawableGlyphs() {
    return {
      x: Math.floor(this.boundingBox.widthInPx / this.fontProperties.widthInPx),
      y: Math.floor(
        this.boundingBox.heightInPx /
          (this.fontProperties.heightInPx * this.fontProperties.lineHeight)
      ),
    };
  }

  formattedText() {
    const numDrawableGlyphs = this.numDrawableGlyphs();
    return formatText(this.string, numDrawableGlyphs.x, numDrawableGlyphs.y);
  }

  // get precomputed height so we can use it later
  calcHeight() {
    const text = this.formattedText();
    const height =
      text.length *
      (this.fontProperties.heightInPx * this.fontProperties.lineHeight);
    return height;
  }

  draw(context, debug) {
    context.fillStyle = this.colour;
    context.font = `${this.fontProperties.heightInPx}px ${this.fontProperties.family}`;
    context.textBaseline = "top";

    const text = this.formattedText();

    if (debug) {
      console.log(text);

      context.strokeRect(
        this.boundingBox.x,
        this.boundingBox.y,
        this.boundingBox.widthInPx,
        this.boundingBox.heightInPx
      );
    }

    for (const [index, line] of text.entries()) {
      const x = this.boundingBox.x;
      const y =
        this.boundingBox.y +
        index *
          (this.fontProperties.heightInPx * this.fontProperties.lineHeight);

      context.fillText(line, x, y);

      if (debug) {
        context.fillRect(x, y, this.boundingBox.widthInPx, 1);
      }
    }
  }
}

module.exports = {
  DrawableText,
  BoundingBox,
};