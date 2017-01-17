$ = require('./gulp/plugins')
requireDir = require 'require-dir'
requireDir 'gulp'

$.gulp.task 'clean',(done)->
	$.del '.tmp'
		.then ()->
			done()
			return;
	return;
$.gulp.task 'default',['inject']