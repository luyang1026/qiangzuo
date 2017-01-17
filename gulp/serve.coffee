$ = require './plugins'
bs = $.browserSync.create()
$.gulp.task 'serve',()->
	bs.init
		server:
			baseDir: ['.tmp/serve','src']
			routes:
				'/bower_components': 'bower_components'
				# '/app':'src/app'