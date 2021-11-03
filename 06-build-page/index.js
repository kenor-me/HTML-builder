const fs = require('fs');
const path = require('path');
const pathCopyDist = path.join(__dirname, 'project-dist');
const pathAssets = path.join(__dirname, 'assets');
const pathStyles = path.join(__dirname, 'styles');
const pathHTML = path.join(__dirname, 'template.html');
const pathComponents = path.join(__dirname, 'components');
const bundleCssPath = path.join(__dirname, 'project-dist/style.css');
const bundleHTML = path.join(__dirname, 'project-dist/index.html');

// создаю директорию
const fsPromises = fs.promises;
fsPromises.mkdir(pathCopyDist).then(function () {
  console.log('Directory created successfully');
}).catch(function () {
  // console.log('failed to create directory');
});

// HTML
fs.copyFile(pathHTML, bundleHTML, (err) => {
  if (err) {
    console.log('Error Found:', err);
  } else {

    fs.readdir(pathComponents, (err, files) => {
      if (err) throw err;

      fs.readFile(bundleHTML, 'utf-8', (err, data) => {
        if (err) throw err;
        else {
          files.forEach(file => {
            fs.readFile(`${pathComponents}/${file}`, 'utf-8', (err, dataType) => {
              if (err) throw err;

              const type = path.extname(file);
              const nameFile = path.basename(file, type);

              data = data.replace(`{{${nameFile}}}`, dataType);
              fs.writeFile(bundleHTML, data, 'utf-8', (err) => {
                if (err) throw err;
              });
            });
          });
        }
      });
    });
  }
});


// копирование assets
copyAssets();

function copyAssets() {
  fs.readdir(pathAssets, (err, folders) => {
    if (err) throw err;
    fs.mkdir(`${pathCopyDist}/assets`, {
      recursive: true
    }, (err) => {
      if (err) throw err;
    });

    folders.forEach(folder => {
      const pathCopyFolder = `${pathCopyDist}/assets/${folder}`;
      fs.mkdir(pathCopyFolder, {
        recursive: true
      }, (err) => {
        if (err) throw err;
      });

      fs.readdir(`${pathAssets}/${folder}`, (err, files) => {
        files.forEach(el => {
          fs.copyFile(`${pathAssets}/${folder}/${el}`, `${pathCopyFolder}/${el}`, (err) => {
            if (err) {
              console.log('Error Found:', err);
            }
          });
        });
      });
    });
  });
}


// копирование стилей в один файл
fs.writeFile(bundleCssPath, '', (err) => {
  if (err) throw err;
});

fs.readdir(pathStyles, {
  withFileTypes: true
}, function (err, items) {
  if (err) console.log(err);
  items.forEach(el => findStyles(el.name));
});

function findStyles(file) {
  const pathFile = path.join(pathStyles, file);
  const type = path.extname(file);

  if (type === '.css') {
    fs.readFile(`${pathFile}`, 'utf-8', (err, data) => {
      if (err) throw err;
      else {
        fs.appendFile(bundleCssPath, data, (err) => {
          if (err) throw err;
        });
      }
    });
  }
}