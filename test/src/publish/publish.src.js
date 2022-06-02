import { randomInt } from 'common/utils/math';

class Main {
  constructor() {
    this.value = randomInt(1, 10);
    this.init();
  }

  init() {
    console.log(`Hello World ${this.value}!`);
  }
}

export default Main
