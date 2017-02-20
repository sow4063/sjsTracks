const path = require('path');
const PATHS = {
}
module.exports = env => {
    return {
        entry: {
            app: path.resolve(__dirname, 'client', 'app', 'root.module.js')
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: `[name].js`
        }
    };
}


