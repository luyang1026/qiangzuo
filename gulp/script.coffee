$ = require './plugins'

$.gulp.task 'coffee',()->
	$.gulp.src 'src/app/**/*.coffee'
		.pipe $.plumber()
		.pipe $.sourcemaps.init()
		.pipe $.coffee()
		.pipe $.sourcemaps.write()
		.pipe $.gulp.dest 'src/app'
