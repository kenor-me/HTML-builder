const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'text.txt');
let readableStream = fs.createWriteStream(file, 'utf8');
const readline = require('readline');
const {
  stdin: input,
  stdout: output
} = require('process');
const rl = readline.createInterface({
  input,
  output
});

console.log('Welcome! You can start typing your text:');

function exitInput() {
  rl.close();
  readableStream.end();
  console.log('Goodbye!');
}

rl.on('line', (input) => {
  (input === 'exit') ? exitInput(): readableStream.write(`${input}`);
});

rl.on('SIGINT', () => exitInput());