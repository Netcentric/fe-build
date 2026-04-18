const generateEntries = require('./generateEntries');

module.exports = function generateExtraEntries(config) {

    const { extraEntries } = config.clientlibs;

    if (!extraEntries || !extraEntries.length) {
        return [];
    }

    let entries = {}

    extraEntries.forEach((entry) => {
        entries = {
            ...entries,
            ...generateEntries(config, entry.extension, entry.filenamePattern, entry.cwd),
        }
    });

    return entries;

};