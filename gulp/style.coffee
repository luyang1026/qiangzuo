$ = require './plugins'

$.gulp.task 'less',()->
	$.gulp.src ['src/**/*.less','!src/dev/**/*.less']
		.pipe $.plumber()
		.pipe $.sourcemaps.init()
		.pipe $.concat('all.less')
		.pipe $.less()
		.pipe $.autoprefixer()
		.pipe $.concat('all.css')
		.pipe $.sourcemaps.write()
		.pipe $.gulp.dest 'src'