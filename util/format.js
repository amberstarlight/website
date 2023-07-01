function getLines(text, lineLength) {
  const words = text.split(" ");
  let lines = [];

  /*
    there's probably a nicer way to do this,
    but I can't think of how at the moment :s
  */

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

module.exports = formatText;
