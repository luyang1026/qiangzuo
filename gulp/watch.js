// Generated by CoffeeScript 1.12.2
(function() {
  var $;

  $ = require('./plugins');

  $.gulp.task('watch', ['injection'], function() {
    $.gulp.watch('src/app/**/*.coffee', function() {
      return $.runSequence('coffee', 'reload');
    });
    $.gulp.watch('src/**/*.less', function() {
      return $.runSequence('reload:css');
    });
    return $.gulp.watch('src/**/*.html', function() {
      return $.runSequence('inject', 'reload');
    });
  });

}).call(this);