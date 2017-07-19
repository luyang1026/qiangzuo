$ = require './plugins'

# $.gulp.task 'copy',()->
# 	$.gulp.src 'src/index.html'
# 		.pipe $.gulp.dest '.tmp/serve'

$.gulp.task 'inject',()->
	bowerScript = $.gulp.src $.mainBowerFiles(),{read:false}
	appScript = $.gulp.src ['src/**/*.js','!src/dev/**/*.js','!src/app/views/start/start.js','!src/app/views/content/data.js'],{read:false}
	startScript = $.gulp.src ['src/app/views/content/data.js','src/app/views/start/start.js'],{read:false}
	appStyle = $.gulp.src ['src/**/*.css','!src/dev/**/*.css'],{read:false}
	appHtml = $.gulp.src ['src/app/**/*.html','!src/dev/**/*.html']
	$.gulp.src 'src/index.html'
		# .pipe $.flatten()
		# .pipe $.copy '.tmp/serve/',{prefix:1}
		# .pipe $.gulp.dest '.tmp/serve/'
		.pipe $.plumber()
		.pipe $.inject bowerScript,{name:'bower'}
		.pipe $.inject $.streamSeries(startScript,appScript),{ignorePath:'src'}
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