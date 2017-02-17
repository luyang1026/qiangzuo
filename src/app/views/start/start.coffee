$.fn.extend 
	animationCss:(animationName,fn)->
		animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'
		this.addClass "animated #{animationName}"
			.one animationEnd,()->
				$(this).removeClass "animated #{animationName}"
				fn&&fn.call $ this
				return
# beginning
$ '.start-view .beginning'
	.animationCss 'bounceInUp'

$ '.start-view .btn-start'#click start button
	.click ()->
		$ '.start-view .beginning'
			.animationCss 'bounceOutUp',()->
				$(this).hide()
				countDown()
				timer = setInterval countDown,1000
		return
#count-down
countDownNumber = 3
timer
numbers = $ '.start-view .count-down .number'
countDown = ()->
	numbers.hide()
	countDownNumber--;
	console.log  countDownNumber
	numbers
		.eq countDownNumber
		.show()
	if countDownNumber<=0
		clearInterval timer
