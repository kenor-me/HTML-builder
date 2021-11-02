const fs = require('fs');
const path = require('path');
const linkSecretFolder = path.join(__dirname, 'secret-folder');

function displayInformation(file) {
  const pathFile = path.join(linkSecretFolder, file);
  const type = path.extname(file);
  const nameFile = path.basename(file, type);

  fs.stat(pathFile, function (err, stats) {
    if (stats.isFile()) {
      console.log(`${nameFile} - ${type.slice(1)} - ${stats['size'] / 1000}kb`);
    }
  });
}

fs.readdir(linkSecretFolder, {withFileTypes: true}, function (err, items) {
  if (err) console.log(err);
  items.forEach(el => displayInformation(el.name));
});