var gulp=require('gulp');
var nodemon=require('gulp-nodemon');
var runSequence=require('run-sequence');
var webpack = require('gulp-webpack');


var assets = './shared/**/*.js';

gulp.task('nodemon', function (done) {
    nodemon({ script: './server/server.js', env: { 'NODE_ENV': 'development', 'DEBUG': 'MB:*' }})
        .on('restart', function () {
            console.log('restarted!');
        });
});

gulp.task("webpack", function() {
    return gulp.src('./client/app.js')
        .pipe(webpack({
            resolve: {
                extensions: ['', '.js']
            },
            entry: './client/app.js',
            output: {
                path: __dirname + '/build/js',
                filename: 'app.js'
            },
            devtool: "source-map",
            module: {
                loaders: [{
                    test: /\.css$/,
                    loader: 'style!css'
                }, {
                    test: /\.jsx?$/,
                    loaders: ['babel-loader?stage=1'],
                    exclude: /node_modules/
                }]
            },
            stats: {
                colors: true
            },
            devtool: 'eval-source-map',

            plugins: [
                //new webpack.HotModuleReplacementPlugin(),
                //new webpack.NoErrorsPlugin()
            ],
            externals: {
                vertx: '{}'
            }
        }))
        .pipe(gulp.dest('./build/js'));
});

gulp.task("webpack:work", function() {
    return gulp.src('./work/app.js')
        .pipe(webpack({
            resolve: {
                extensions: ['', '.js']
            },
            entry: './work/app.js',
            output: {
                path: __dirname + '/work/build/js',
                filename: 'app.js'
            },
            devtool: "source-map",
            module: {
                loaders: [{
                    test: /\.css$/,
                    loader: 'style!css'
                }, {
                    test: /\.jsx?$/,
                    loaders: ['babel-loader?stage=1'],
                    exclude: /node_modules/
                }]
            },
            stats: {
                colors: true
            },
            devtool: 'eval-source-map',

            plugins: [
                //new webpack.HotModuleReplacementPlugin(),
                //new webpack.NoErrorsPlugin()
            ],
            externals: {
                vertx: '{}'
            }
        }))
        .pipe(gulp.dest('./work/build/js'));
});


// Watch Files For Changes
gulp.task('watch', function () {
    gulp.watch('./work/**/*.js', ['webpack']);
});

gulp.task('watch:work',function(){
    gulp.watch(assets, ['webpack:work']);

});

gulp.task('default', function(){
  runSequence(
  	'nodemon',
    'watch'
  )
});