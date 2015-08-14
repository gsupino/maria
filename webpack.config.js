var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var atImport = require('postcss-import');
var customProperties = require('postcss-custom-properties');
var bemLinter = require('postcss-bem-linter');
var autoprefixer = require('autoprefixer-core');

var commonLoaders = [
    {test: /\.png$/, loader: 'url-loader'},
    {test: /\.jpg$/, loader: 'file-loader'}
];

module.exports=[
    {
        name: 'browser',
        devtool: 'eval',
        entry: {
            'main': [
                './src/client.js',
                './src/styles/index.css'
            ]
        },
        output: {
            path: __dirname + '/static/dist',
            filename: 'app.js'

        },
        resolve: {
            modulesDirectories: ['node_modules', './app'],
            extensions: ['', '.js', '.jsx']
        },
        cache: true,
        module: {
            /*
             preLoaders: [{
             test: /\.js$|.jsx$/,
             exclude: /node_modules/,
             loaders: ['eslint', 'jscs']
             }],
             */
            loaders: commonLoaders.concat([
                {
                    test: /\.jsx?$/,
                    loaders: ['babel?stage=0'],
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
                }
            ])
        },
        stats: {
            colors: true
        },
        postcss: [
            atImport({
                path: ['node_modules', './app']
            }),
            autoprefixer(),
            //bemLinter('suit'),
            customProperties()
        ],
        plugins: [
            new ExtractTextPlugin('app.css'),
            new webpack.DefinePlugin({
                __CLIENT__: true,
                __SERVER__: false,
                __DEVELOPMENT__: true,
                __DEVTOOLS__: true  // <-------- DISABLE redux-devtools HERE
            })
        ]
    }


]