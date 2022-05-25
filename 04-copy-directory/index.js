const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const dir = path.join(__dirname, 'files');
const dirCopy = path.join(__dirname, 'files-copy');

fsPromises.mkdir(dirCopy, { recursive: true });

async function deleteFiles(){
  fs.readdir(dirCopy, (error, files) => {
    if (error) throw error;
    files.forEach(file => {
      fs.unlink(path.join(dirCopy, file), error => {
        if(error) throw error;
      }); 
    });
  });
}

function copyFiles(){
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
}

async function copyDirectory() {
  try {
    await deleteFiles();
    copyFiles();
  } catch(error) {
    console.log(error);
  }
}

copyDirectory();
