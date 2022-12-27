const package = require('./package.json');
const fs = require('fs');

delete package.devDependencies
delete package.scripts

fs.writeFile('./npm/package.json', JSON.stringify(package), err => {
  if (err) {
    throw new Error(err);
  }
});