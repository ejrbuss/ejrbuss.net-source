const withLess = require('@zeit/next-less')

module.exports = withLess({
    webpackDevMiddleware(config) {
        config.watchOptions = {
            ignored: [
                /\.git\//,
                /\.next\//,
                /deps/,
                /node_modules/,
            ]
        }
        return config;
    },
});