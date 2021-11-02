const fs = require('fs');
const path = require('path');
const pathDirectory = path.join(__dirname, 'files');
const pathCopyDir = path.join(__dirname, 'files-copy');

getCurrentFilenames();

const fsPromises = fs.promises;
fsPromises.mkdir(pathCopyDir).then(function () {
  console.log('Directory created successfully');
}).catch(function () {
  console.log('failed to create directory');
});

function getCurrentFilenames() {
  fs.readdir(pathDirectory, (err, files) => {
    files.forEach(file => {
      fs.copyFile(`${pathDirectory}/${file}`, `${pathCopyDir}/${file}`, (err) => {
        if (err) {
          console.log('Error Found:', err);
        }
      });
    });
  });
}