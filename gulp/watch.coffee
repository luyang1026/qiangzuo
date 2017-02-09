$ = require './plugins'

$.gulp.task 'watch',['inject'],()->
	$.gulp.watch 'src/app/**/*.coffee',()->
		$.runSequence 'coffee','reload'