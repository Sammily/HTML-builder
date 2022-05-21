const fs = require('fs');

const path = require('path');
const dir = path.join(__dirname, 'secret-folder');

fs.readdir(dir, { withFileTypes: true }, (error, files) => {
  if (error) throw error;
  files.forEach(file => {
    if(!file.isDirectory()) {
      fs.stat(path.join(__dirname,'secret-folder', file.name), (error, stats) => {
        if (error) throw error;
        console.log(file.name.split('.')[0] + ' - ' + path.extname(file.name).slice(1) + ' - ' + stats.size + ' byte');
      });
    }
  });
});
