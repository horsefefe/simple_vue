const path = require('path');

module.exports = {
    entry: './index.js',
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, 'bundle'),
        filename: 'bundle.js'
    }
};
