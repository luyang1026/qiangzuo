// Generated by CoffeeScript 1.12.2
(function() {
  var $;

  $ = require('./plugins');

  $.gulp.task('coffee', function() {
    return $.gulp.src('src/app/**/*.coffee').pipe($.plumber()).pipe($.sourcemaps.init()).pipe($.coffee()).pipe($.sourcemaps.write()).pipe($.gulp.dest('src/app'));
  });

}).call(this);
