import { randomInt } from 'common/utils/math';

class MainAuthor {
  constructor() {
    this.value = randomInt(1, 10);
    this.init();
  }

  init() {
    console.log(`Hello Author ${this.value}!`);
  }
}

export default MainAuthor;
