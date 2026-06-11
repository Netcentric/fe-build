import { randomInt } from "common/utils/randomInt";
import { random } from "common/utils/random";

class MainAuthor {
  constructor() {
    this.value = randomInt(1, 10);
    this.value2 = random(1, 10);
    this.init();
  }

  init() {
    console.log(`Hello Author ${this.value} author ${this.value2}!`);
  }
}

export const instace = new MainAuthor();
