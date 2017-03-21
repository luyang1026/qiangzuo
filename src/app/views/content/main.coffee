deviceWidth = document.documentElement.clientWidth
document.documentElement.style.fontSize = "#{deviceWidth/10}px"

global = window
C = jq('.content')
pHeight = 4540/72# picture height
wHeight = jq(window).height()# screen height
changePoint = "#{-pHeight-wHeight/(deviceWidth/10)}rem";
seatR = 18
seatC = 2
peopleCount = 11
score = 0
# put seats
putSeats = (c,r)->
	seat = seatData[c][r]
	people = jq '<span></span>'
		.addClass ()->
			addedClass = 'people'
			addedClass+=' occupied' if seat.occupied
	jq '<div></div>'
		.addClass ()->
			addedClass = 'seat'
			addedClass+=' yellow' if seat.yellow
			if c then addedClass+=' right' else addedClass+=' left'
			addedClass
		.css
			left:"#{seat.x/72}rem"
			top:"#{seat.y/72}rem"
			width:"#{201/72}rem"
			height:"#{178/72}rem"
		.append people
		.appendTo '.content .pic2'
putPeopleAndBar = ()->
	jq('.content .people')
		.each (index)->
			jq this
				.css
					backgroundImage:"url(app/img/#{(index%peopleCount)+1}.png)"
					width:"#{224/72}rem"
					height:"#{145/72}rem"
					top:"#{16/72}rem"
					right:"#{11/72}rem"
	for column,c in barData
		for row,r in column
			bar = barData[c][r]
			jq '<i></i>'
				.addClass ()->
					addedClass = 'bar'
					if !c then addedClass+= ' left' else addedClass+=' right'
					if !(r%2) then addedClass+= ' top' else addedClass+=' bottom'
					addedClass
				.css
					width:"#{214/72}rem"
					height:"#{43/72}rem"
					top:"#{bar.y/72}rem"
					left:"#{bar.x/72}rem"
				.appendTo '.content .pic2'
bindEvent = ()->
	$ '.content .seat'
		.on 'tap',()->
			console.log 'seat'
			$ '.score'
				.remove()
			$ '<p></p>'
				.addClass 'score animated zoomIn'
				.text ++score
				.appendTo 'body'
	$ '.content .seat .people'
		.on 'tap',(ev)->
			closeView()
			ev.stopPropagation()
rollYSeatPeople = ()->
	num = 5
	people = 22
	while num
		c = u.ran 0,seatC
		r = u.ran 0,seatR
		if !seatData[c][r].yellow
			seatData[c][r].yellow = true
			num--
	while people
		c = u.ran 0,seatC
		r = u.ran 0,seatR
		if !seatData[c][r].occupied
			seatData[c][r].occupied = true
			people--
clear = ()->
	$ '.pic2'
		.empty()
	for column,c in seatData
		for row,r in column
			delete seatData[c][r].yellow
			delete seatData[c][r].occupied
window.paint = ()->
	clear()
	rollYSeatPeople()
	for column,c in seatData
		for row,r in column
			putSeats c,r
	putPeopleAndBar()
	bindEvent()

paint()
jq '.content>div'
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