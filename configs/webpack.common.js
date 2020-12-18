const paths = require('./paths');

const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [paths.src + '/index.js'],
    output: {
        path: paths.build,
        filename: '[name].bundle.js',
        publicPath: '/',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: paths.static + '/index.html', // template file
            filename: 'index.html', // output file
        }),
        new CopyWebpackPlugin({
            patterns: [
            {
                from: paths.static,
                to: paths.build,
                    // добавилось нижеследующее
                globOptions: {
                    ignore: ['**/index.html'],
                },
            },],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(scss|css)$/,
                use: ['style-loader',
                    { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } },
                    //{ loader: 'postcss-loader', options: { sourceMap: true } },
                    //{ loader: 'sass-loader', options: { sourceMap: true } },
                ],
            },
        ]
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, "../src")
        }
    }
};
