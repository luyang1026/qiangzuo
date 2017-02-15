$ = require './plugins'
bs = $.browserSync.create()
$.gulp.task 'serve',['watch'],()->
	bs.init
		server:
			baseDir: ['.tmp/serve','src']
			routes:
				'/bower_components': 'bower_components'
				# '/app':'src/app'

$.gulp.task 'reload',()->
	bs.reload()
	return
$.gulp.task 'reload:css',['less'],()->
	$.gulp.src 'src/all.css'
		.pipe bs.reload {stream:true}