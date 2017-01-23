var less = require('gulp-less');
var gulp = require('gulp');
gulp.task('less',[], function() {
    gulp.src('css/*.less')
      .pipe(less())
      .pipe(gulp.dest('css'));
});
gulp.watch('css/*.less', ['less']);
gulp.task('default',['less'], function() {
    // content
});