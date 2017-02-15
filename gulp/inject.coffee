$ = require './plugins'

# $.gulp.task 'copy',()->
# 	$.gulp.src 'src/index.html'
# 		.pipe $.gulp.dest '.tmp/serve'

$.gulp.task 'inject',()->
	bowerScript = $.gulp.src $.mainBowerFiles(),{read:false}
	appScript = $.gulp.src ['src/**/*.js','!src/dev/**/*.js'],{read:false}
	appStyle = $.gulp.src ['src/**/*.css','!src/dev/**/*.css'],{read:false}
	appHtml = $.gulp.src ['src/app/**/*.html','!src/dev/**/*.html']
	$.gulp.src 'src/index.html'
		# .pipe $.flatten()
		# .pipe $.copy '.tmp/serve/',{prefix:1}
		# .pipe $.gulp.dest '.tmp/serve/'
		.pipe $.plumber()
		.pipe $.inject bowerScript,{name:'bower'}
		.pipe $.inject appScript,{ignorePath:'src'}
		.pipe $.inject appStyle,{ignorePath:'src'}
		.pipe $.inject appHtml,{
			starttag:'<!-- inject:{{path}} -->',
			transform:(filePath,file)->
				console.log filePath
				file.contents.toString('utf8')
			relative:true
		}
		.pipe $.gulp.dest '.tmp/serve/'

$.gulp.task 'injection',(done)->
	$.runSequence 'clean',['coffee','less'],'inject',done