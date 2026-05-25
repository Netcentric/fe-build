import { randomInt } from "common/utils/randomInt";

class MainPublish {
  constructor() {
    this.value = randomInt(1, 10);
    this.arr = [...[0, 1, 2]];
    this.obj = {
      name: 'test'
    };
    this.init();
  }

  init() {
    const { name } = this.obj;
    console.log(`Hello World ${this.value}! ${name}`);
  }
}
export const instace = new MainPublish();
