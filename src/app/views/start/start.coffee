$.fn.animationCss=(animationName,fn)->
		animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'
		this.addClass "animated #{animationName}"
			.one animationEnd,()->
				$(this).removeClass "animated #{animationName}"
				fn&&fn.call $ this
				return
# beginning
$ '.start-view .beginning'
	.animationCss 'bounceInUp'

countDownTimer = null
$ '.start-view .btn-start'#click start button
	.click ()->
		$ '.start-view .beginning'
			.animationCss 'bounceOutUp',()->
				$(this).hide()
				countDown()#start count-down
				countDownTimer = setInterval countDown,1000
		return
#count-down
countDownNumber = 3
numbers = $ '.start-view .count-down .number'
countDown = ()->
	numbers.hide()
	countDownNumber--;
	if countDownNumber<0
		clearInterval countDownTimer
		$ '.start-view'
			.hide()
		mStart()
		return
	numbers
		.eq countDownNumber
		.show()
