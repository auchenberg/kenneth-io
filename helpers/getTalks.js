const matter = require('gray-matter');
let _ = require('lodash');

export function getTalks() {
  const path = require('path');
  const fs = require('fs');

  let file = path.join(process.cwd(), 'data/speaking.json');
  const contents = fs.readFileSync(file, 'utf-8');

  let speaking = JSON.parse(contents);

  return speaking;
}
