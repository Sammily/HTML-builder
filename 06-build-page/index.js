const fs = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;
const readline = require('readline');

const dirStyles = path.join(__dirname, 'styles');
const output = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));
const outputHtml = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));
const dirAssets = path.join(__dirname, 'assets');
const dirCopy = path.join(__dirname, 'project-dist', 'assets');
const dirComp = path.join(__dirname, 'components');

// create 'project-dist' folder
fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (error) => {
  if (error) throw error;
});

// copy 'style.css' to 'project-dist' folder
fs.readdir(dirStyles, { withFileTypes: true }, (error, files) => {
  if (error) throw error;
  files.forEach(file => {
    const inputCss = fs.createReadStream(path.join(dirStyles, file.name));
    inputCss.pipe(output);
  });
});

// read line-by-line 'template.html'
const rl = readline.createInterface({
  input: fs.createReadStream(path.join(__dirname, 'template.html'))
});

// if line contains '{{???}}' then add code from '???.html' to 'index.html'
//else add lite to 'index.html'
rl.on('line', (line, error) => {
  if (error) throw error;
  if(line.trim().slice(0,2) === '{{') {
    const fileName = line.trim().replace(/[{}]/g, '');
    const inputHtml2 = fs.createReadStream(path.join(dirComp, `${fileName}.html`));
    inputHtml2.pipe(outputHtml);
  }
  else { outputHtml.write(line + '\n'); }
});

// add 'assets' folder to 'project-dist' folder
fsPromises.mkdir(dirCopy, { recursive: true });

// copy 'assets' files to 'project-dist/assets'
fs.readdir(dirAssets, { withFileTypes: true }, (error, files) => {
  if (error) throw error;
  files.forEach(file => {
    if(file.isDirectory()) {
      fsPromises.mkdir( path.join(dirCopy, file.name), { recursive: true });
      const folder = file.name;
      fs.readdir(path.join(dirAssets, file.name), (error, files) => {
        if (error) throw error;
        files.forEach(file => {
          fsPromises.copyFile(path.join(dirAssets, folder, file), path.join(dirCopy, folder, file))
            .catch(function(error) {
              console.log(error);
            });
        });
      });
    }
  });
});
