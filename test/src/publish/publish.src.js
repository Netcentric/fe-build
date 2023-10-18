import { randomInt } from "common/utils/randomInt";

class MainPublish {
  constructor() {
    this.value = randomInt(1, 10);
    this.arr = [...[0, 1, 2]];
    this.init();
  }

  init() {
    console.log(`Hello World ${this.value}!`);
  }
}
export const instace = new MainPublish();
