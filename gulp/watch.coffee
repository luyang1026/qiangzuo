$ = require './plugins'

$.gulp.task 'watch',['injection'],()->
	$.gulp.watch 'src/app/**/*.coffee',()->
		$.runSequence 'coffee','reload'
	$.gulp.watch 'src/**/*.less',()->
		$.runSequence 'reload:css'
	$.gulp.watch 'src/**/*.html',()->
		$.runSequence 'inject','reload'