export function randomInt(min = 0, max = 1) {
  return Math.round(random(min, max));
}

export function random(min = 0, max = 1) {
  return Math.random() * (max - min) + min;
}
