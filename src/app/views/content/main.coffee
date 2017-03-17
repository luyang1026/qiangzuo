deviceWidth = document.documentElement.clientWidth
document.documentElement.style.fontSize = "#{deviceWidth/10}px"

global = window
C = $('.content')
pHeight = 4540/72# picture height
wHeight = $(window).height()# screen height
changePoint = "#{-pHeight-wHeight/(deviceWidth/10)}rem";
seatR = 18
seatC = 2
# 往p2上放座位
$('<div></div>').css({
	top:s.x/72
	left:s.y/72	
}).appendTo('.content .pic2')
for s in row for row in seatData

$ '.content div'
	.height "#{pHeight}rem"

global.mStart = ()->
	C.animate 
		bottom: "#{-pHeight*1/4}rem",
	,400,'easeInCubic',()->
		mGoing()
	return
mGoing = ()->
	C.animate
		bottom:"#{-pHeight-wHeight/(deviceWidth/10)}rem",
		{
			step:(now,fx)->
				if now <= fx.end
					fx.now = 0
			duration:5000
			easing:'linear'
			complete:()->
				mGoing()
				return	
		}
	return