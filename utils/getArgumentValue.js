module.exports = (key) => {
  if (process.argv) {
    // get the last argument of the key
    const args = Array.from(process.argv)
      .filter(arg => arg.indexOf(key) >= 0).pop();

    if (args) {
      // send the value if there is a value pass
      if (args.length !== key.length) {
        return args.split(key).pop();
      }

      // return true if there is no value just the argument
      return true;
    }

    return false;
  }

  return false;
};
