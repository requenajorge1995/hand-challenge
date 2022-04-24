import Memory from './Memory.js'

class HandInterpreter {
  constructor(input) {
    this.memory = new Memory();
    this.input = input;
    this.index = 0;

    this.loops = { fromBegin: {}, fromEnd: {} };
    this.initLoops(); 

    this.resolvers = {
      '👉': () => this.movePointerForward(),
      '👈': () => this.movePointerBackward(),
      '👆': () => this.incrementCellValue(),
      '👇': () => this.decreaseCellValue(),
      '🤜': () => this.beginLoop(),
      '🤛': () => this.endLoop(),
      '👊': () => this.printCellAssciCode(),
    };
  }

  initLoops() {
    const openLoopIndexes = [];
    this.input.forEach((instruction, index) => {
      if (instruction === '🤜')
        openLoopIndexes.push(index);
      if (instruction === '🤛') {
        if (openLoopIndexes.length === 0)
          throw new Error(`Unmatched closing loop at position ${index}`);
        const startLoopIndex = openLoopIndexes.pop();
        this.loops.fromBegin[startLoopIndex] = index;
        this.loops.fromEnd[index] = startLoopIndex;
      }
    })
    if (openLoopIndexes.length > 0)
      throw new Error(`Unmatched opening loop at position ${openLoopIndexes[0]}`);
  }

  interpret() {
    while (this.index < this.input.length) {
      const instruction = this.input[this.index];
      const resolver = this.resolvers[instruction];

      if (!resolver)
        throw new Error(`Unknown instruction: ${instruction}`);

      resolver(instruction);
      this.index++;
    }
  }


  movePointerForward() {
    this.memory.moveToNextCell();
  }

  movePointerBackward() {
    this.memory.moveToPreviousCell();
  }

  incrementCellValue() { 
    this.memory.incrementCellValue();
  }

  decreaseCellValue() {
    this.memory.decreaseCellValue();
  }

  printCellAssciCode() {
    process.stdout.write(String.fromCharCode(this.memory.getCellValue()));
  }

  beginLoop() {
    if (this.memory.getCellValue() === 0)
      this.index = this.loops.fromBegin[this.index];
  }

  endLoop() {
    if (this.memory.getCellValue() !== 0)
      this.index = this.loops.fromEnd[this.index];
  }
}

export default HandInterpreter;
