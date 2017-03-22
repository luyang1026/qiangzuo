$.noConflict()
global = window
window.jq = jQuery
# Game = ()->
pHeight = 4540/72# picture height
wHeight = jq(window).height()# screen height
global.deviceWidth = document.documentElement.clientWidth
document.documentElement.style.fontSize = "#{deviceWidth/10}px"
jq '.content>div'
	.height "#{pHeight}rem"

jq.fn.animationCss=(animationName,fn)->
		animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'
		this.addClass "animated #{animationName}"
			.one animationEnd,()->
				jq(this).removeClass "animated #{animationName}"
				fn&&fn.call jq this
				return
# beginning
jq '.backdrop'
	.show()
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
		# mStart()
	numbers
		.eq countDownNumber
		.show()
