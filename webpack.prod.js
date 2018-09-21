const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = {
    resolve: {
        modules: [path.resolve(__dirname, "src"), 'node_modules'],
        extensions: [".ts", ".tsx", ".js", ".json"],
        alias: {
            Utils: path.resolve(__dirname, 'src/Utils/'),
            Steem: path.resolve(__dirname, 'src/Utils/Steem'),
            Component: path.resolve(__dirname, 'src/Component'),
        },
    },
    entry: path.resolve(__dirname, 'src/index.tsx'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: ''
    },
    module: {
        rules: [{
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader'
            },
            {
                test: /\.tsx?$/,
                use: [
                    "babel-loader",
                    'awesome-typescript-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        // new BundleAnalyzerPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.EnvironmentPlugin({
            'NODE_ENV': 'development'
        }),
        new CopyWebpackPlugin([{
                from: path.resolve(__dirname, 'src/index.html')
            },
            {
                from: path.resolve(__dirname, 'public/_redirects')
            },
            {
                from: path.resolve(__dirname, 'public/manifest.json')
            },
            {
                from: path.resolve(__dirname, 'public/favicon.ico')
            },
            {
                from: path.resolve(__dirname, 'public/images'),
                to: 'images'
            },
        ]),
        // { from: path.resolve(__dirname, 'browserconfig.xml'), to: 'assets' },
        // { from: path.resolve(__dirname, 'src/icons'), to: 'assets/icons' }
    ]
}