import Cell from './Cell.js'

class Memory { 
  constructor() {
    this.cells = [new Cell()];
    this.currentIndex = 0;
  }

  getCellValue() { 
    return this.cells[this.currentIndex].getValue();
  }

  incrementCellValue() {
    this.cells[this.currentIndex].increment();
  }

  decreaseCellValue() {
    this.cells[this.currentIndex].decrement();
  }

  moveToNextCell() {
    if (this.currentIndex === this.cells.length - 1)
      this.cells.push(new Cell());
    this.currentIndex++;   
  }

  moveToPreviousCell() {
    if (this.currentIndex === 0)
      throw new Error('Cannot move left from the first cell');
    this.currentIndex--;   
  }

  jumpToCell(index) {
    if (index < 0 || index >= this.cells.length)
      throw new Error('Cell does not exist');
    this.currentIndex = index;
  }
}

export default Memory;
