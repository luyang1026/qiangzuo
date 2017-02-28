deviceWidth = document.documentElement.clientWidth
document.documentElement.style.fontSize = "#{deviceWidth/10}px"

global = window
C = $('.content')
pHeight = 4577/72# picture height
wHeight = $(window).height()# screen height
$ '.content div'
	.height "#{pHeight}rem"

global.mStart = ()->
	C.animate 
		bottom: "#{-pHeight*1/2}rem"
	,5500,'easeInCubic',()->
		mGoing()
	return
mGoing = ()->
	C.animate
		bottom:"#{-pHeight*2+wHeight/(deviceWidth/10)}rem"
	,7000,'linear',()->
		C.css 'bottom',0
		mGoing()
