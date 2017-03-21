$.noConflict()
window.jq = jQuery
jq.fn.animationCss=(animationName,fn)->
		animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'
		this.addClass "animated #{animationName}"
			.one animationEnd,()->
				jq(this).removeClass "animated #{animationName}"
				fn&&fn.call jq this
				return
# beginning
jq '.start-view .beginning'
	.animationCss 'bounceInUp'

countDownTimer = null
jq '.start-view .btn-start'#click start button
	.click ()->
		jq '.start-view .beginning'
			.animationCss 'bounceOutUp',()->
				jq(this).hide()
				countDown()#start count-down
				countDownTimer = setInterval countDown,1000
		return
#count-down
countDownNumber = 3
numbers = jq '.start-view .count-down .number'
countDown = ()->
	numbers.hide()
	countDownNumber--;
	if countDownNumber<0
		clearInterval countDownTimer
		jq '.start-view'
			.hide()
		mStart()
		return
	numbers
		.eq countDownNumber
		.show()
