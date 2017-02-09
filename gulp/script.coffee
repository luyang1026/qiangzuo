$ = require './plugins'

$.gulp.task 'coffee',()->
	$.gulp.src 'src/app/**/*.coffee'
		.pipe $.plumber()
		.pipe $.coffee()
		.pipe $.gulp.dest 'src/app'
