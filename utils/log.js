const path = require('path');
const { rootPath, quiet } = require('../config/general.config');

const colorOptions = {
  bgblack: '\x1b[40m',
  bgblue: '\x1b[44m',
  bgcyan: '\x1b[46m',
  bggreen: '\x1b[42m',
  bgmagenta: '\x1b[45m',
  bgred: '\x1b[41m',
  bgwhite: '\x1b[47m',
  bgyellow: '\x1b[43m',
  black: '\x1b[30m',
  blink: '\x1b[5m',
  blue: '\x1b[34m',
  bright: '\x1b[1m',
  cyan: '\x1b[36m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  hidden: '\x1b[8m',
  magenta: '\x1b[35m',
  red: '\x1b[31m',
  reset: '\x1b[0m',
  reverse: '\x1b[7m',
  underscore: '\x1b[4m',
  white: '\x1b[37m',
  yellow: '\x1b[33m'
};

const color = (c, str, bg = colorOptions.reset) => `${colorOptions[c]}${str}${bg}`;

const emojis = {
  // sense of humor?
  error: [' 😐 🖕 '],
  success: [' 💪 ']
};

const random = array => array[Math.floor(Math.random() * array.length)];

const severity = {
  info: {
    icon: () => color('dim', '☞  '),
    color: 'dim'
  },
  warning: {
    icon: () => color('yellow', '⚠  '),
    color: 'yellow'
  },
  log: {
    icon: () => color('yellow', '⚠  '),
    color: 'white'
  },
  success: {
    icon: () => color('dim', `${(emojis.success)} -> `),
    color: 'green'
  },
  error: {
    icon: () => color('red', '✖  '),
    color: 'red'
  }
};

const log = (file = false, title, extra = '', sev = 'info', force = false) => {
  const fileRef = file ? `[${path.relative(rootPath, file)}] ` : '';
  const fun = sev === 'error' ? sev : 'log';
  if (!quiet || force) {
    const icon = severity[sev] ? severity[sev].icon() : '';
    console[fun](`${color('dim', fileRef)}${icon}${color(severity[sev].color, title)}${color('dim', extra)}`);
  }
};

module.exports = {
  colorOptions,
  color,
  emojis,
  random,
  severity,
  log
};
