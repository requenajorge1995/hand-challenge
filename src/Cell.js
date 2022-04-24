class Cell {
  static minValue = 0;
  static maxValue = 255;

  constructor() {
    this.value = 0;
  }

  getValue() {
    return this.value;
  }

  increment() {
    if (this.value === Cell.maxValue) 
      this.value = Cell.minValue;
    else
      this.value++;
  }

  decrement() {
    if (this.value === Cell.minValue) 
      this.value = Cell.maxValue;
    else
      this.value--;
  }
}

export default Cell;
