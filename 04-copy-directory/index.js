const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const dir = path.join(__dirname, 'files');
const dirCopy = path.join(__dirname, 'files-copy');

fsPromises.mkdir(dirCopy, { recursive: true });
fs.readdir(dir, (error, files) => {
  if (error) throw error;
  files.forEach(file => {
    fsPromises.copyFile(path.join(dir, file), path.join(dirCopy, file))
      .then(function() {
        console.log(`File ${file} copied`);
      })
      .catch(function(error) {
        console.log(error);
      });
  });
});
