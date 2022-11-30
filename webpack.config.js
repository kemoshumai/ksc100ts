const webpack = require('webpack');

module.exports = {
    entry: './src/main.ts',
    target: 'node',
    mode: "development",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['ts-loader'],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.ExternalsPlugin('commonjs', [
            'llvm-bindings','pino' 
        ]) 
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    }
};