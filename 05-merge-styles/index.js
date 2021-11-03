const fs = require('fs');
const path = require('path');
const filesDirectory = path.join(__dirname, 'styles');
const bundlePath = path.join(__dirname, 'project-dist/bundle.css');


fs.writeFile(bundlePath, '', (err) => {
  if (err) throw err;
});

fs.readdir(filesDirectory, {withFileTypes: true}, function (err, items) {
  if (err) console.log(err);
  items.forEach(el => findStyles(el.name));
});

function findStyles(file) {
  const pathFile = path.join(filesDirectory, file);
  const type = path.extname(file);

  if (type === '.css') {
    fs.readFile(`${pathFile}`, 'utf-8', (err, data) => {
      if (err) throw err;
      else {
        fs.appendFile(bundlePath, data, (err) => {
          if (err) throw err;
        });
      }
    });
  }
}