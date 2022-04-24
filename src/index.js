import fs from 'fs'
import HandInterpreter from './HandInterpreter.js'

// const test1 = fs.readFileSync('test1.hand', 'utf8');
// console.log('\nTest 1:');
// console.log(test1)
// new HandInterpreter(parseData(test1)).interpret();

// const test2 = fs.readFileSync('test2.hand', 'utf8');
// console.log('\nTest 2:');
// console.log(test2)
// new HandInterpreter(parseData(test2)).interpret();

const input = fs.readFileSync('input.hand', 'utf8');
console.log('\nInput:');
console.log(input)
new HandInterpreter(parseData(input)).interpret();

function parseData(data) {
  return [...new Intl.Segmenter().segment(data)].map(x => x.segment);
} 
