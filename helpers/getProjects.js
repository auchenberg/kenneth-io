const matter = require('gray-matter');
let _ = require('lodash');

export function getProjects() {
  const path = require('path');
  const fs = require('fs');

  let file = path.join(process.cwd(), 'data/projects.json');
  const contents = fs.readFileSync(file, 'utf-8');

  let speaking = JSON.parse(contents);

  return speaking;
}
