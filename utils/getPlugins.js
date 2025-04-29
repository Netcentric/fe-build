module.exports = function getPlugins(plugins = []) {
    return plugins
        .filter(Boolean)
        .map(function (entry) {
            if (Array.isArray(entry)) {
                const [pluginName, pluginOptions] = entry;
                const pluginModule = require(pluginName);
                const pluginFn = pluginModule.default || pluginModule;
                return pluginFn(pluginOptions);
            } else if (typeof entry === 'string') {
                const pluginModule = require(entry);
                return pluginModule.default || pluginModule;
            } else {
                throw new Error(`Invalid plugin entry: ${JSON.stringify(entry)}`);
            }
        });
};