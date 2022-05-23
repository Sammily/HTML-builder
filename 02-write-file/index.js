const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

const output = fs.createWriteStream(path.join(__dirname, 'text.txt'));

stdout.write('Enter text:\n');
stdin.on('data', data => {
  if(data.toString().trim() === 'exit') {
    console.log('You typed EXIT and we say goodbye!');
    process.exit();
  }
  else{
    output.write(data);
    console.log('Added!');
    process.on('SIGINT', function() {
      console.log('Bye!');
      process.exit();
    });
  }
});
