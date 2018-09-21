const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    resolve: {
        modules: [path.resolve(__dirname, "src"), 'node_modules'],
        extensions: [".ts", ".tsx", ".js", ".json"],
        alias: {
            Utils: path.resolve('src/Utils/'),
            Steem: path.resolve('src/Utils/Steem'),
            Component: path.resolve('src/Component'),
            "@entry": "entry",
            "@common": "common"
        },
    },
    entry: path.resolve('src/index.tsx'),
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
                use: [{
                        loader: "babel-loader",
                        options: {
                            plugins: ['react-hot-loader/babel']
                        }
                    },
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
    devServer: {
        hot: true,
        contentBase: path.join(__dirname, 'dist'),
        publicPath: '/',
        historyApiFallback: true
    },
    plugins: [
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
        ]),
        // { from: path.resolve(__dirname, 'browserconfig.xml'), to: 'assets' },
        // { from: path.resolve(__dirname, 'src/icons'), to: 'assets/icons' }
    ]
}