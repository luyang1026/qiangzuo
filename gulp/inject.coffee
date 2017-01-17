$ = require './plugins'

$.gulp.task 'copy',()->
	$.gulp.src 'src/index.html'
		.pipe $.gulp.dest '.tmp/serve'

$.gulp.task 'inject',['clean'],()->
	bowerScript = $.gulp.src $.mainBowerFiles(),{read:false}
	appScript = $.gulp.src 'src/**/*.js',{read:false}
	$.gulp.src 'src/index.html'
		# .pipe $.flatten()
		# .pipe $.copy '.tmp/serve/',{prefix:1}
		# .pipe $.gulp.dest '.tmp/serve/'
		.pipe $.inject bowerScript,{name:'bower'}
		.pipe $.inject appScript,{ignorePath:'src'}
		.pipe $.gulp.dest '.tmp/serve/'
