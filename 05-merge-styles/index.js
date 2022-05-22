const fs = require('fs');
const path = require('path');
const { pipeline } = require('stream');

const dir = path.join(__dirname, 'styles');
const output = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

fs.readdir(dir, { withFileTypes: true }, (error, files) => {
  if (error) throw error;
  files.forEach(file => {
    if(!file.isDirectory() && path.extname(file.name) === '.css') {
      const input = fs.createReadStream(path.join(dir, file.name));
      pipeline(
        input,
        output,
        error => {
          if (error) throw error;
        }
      );
    }
  });
});
