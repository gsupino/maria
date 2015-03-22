var gulp=require('gulp');
var nodemon=require('gulp-nodemon');
var runSequence=require('run-sequence');

gulp.task('nodemon', function (done) {
    nodemon({ script: './server/server.js', env: { 'NODE_ENV': 'development', 'DEBUG': 'MB:*' }})
        .on('restart', function () {
            console.log('restarted!');
        });
});


gulp.task('default', function(){
  runSequence(
    'nodemon'
  )
});