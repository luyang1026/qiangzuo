deviceWidth = document.documentElement.clientWidth
document.documentElement.style.fontSize = "#{deviceWidth/10}px"

global = window
C = jq('.content')
pHeight = 4540/72# picture height
wHeight = jq(window).height()# screen height
changePoint = "#{-pHeight-wHeight/(deviceWidth/10)}rem";

peopleCount = 11
# put seats
Game.prototype.putSeats = (c,r)->
	_this = @
	seat = @seats[c][r]
	people = jq '<span></span>'
		.addClass ()->
			addedClass = 'people'
			addedClass+=' occupied' if seat.occupied
		.one 'tap',(ev)->
			_this.m_wronge.play()
			_this.closeView()
			_this.mStop()
			ev.stopPropagation()
			return
	jq '<div></div>'
		.on 'touchmove',(ev)->
			ev.stopPropagation()
		.addClass ()->
			addedClass = 'seat'
			addedClass+=' yellow' if seat.yellow
			if c%2 then addedClass+=' right' else addedClass+=' left'
			addedClass
		.one 'tap',()->
			if $(this).hasClass('yellow')
				_this.m_wronge.play()
				_this.closeView()
				_this.mStop()
				return
			_this.score++
			_this.m_correct.play()
			seat.clicked = true
			$ '.score'
				.remove()
			$ '<p></p>'
				.addClass 'score animated zoomIn'
				.text _this.score
				.appendTo 'body'
		.css
			left:"#{seat.x/72}rem"
			top:"#{seat.y/72}rem"
			width:"#{201/72}rem"
			height:"#{178/72}rem"
		.append people
		.appendTo '.content'
Game.prototype.putPeopleAndBar = ()->
	jq('.content .people')
		.each (index)->
			jq this
				.css
					backgroundImage:"url(app/img/#{(index%peopleCount)+1}.png)"
					width:"#{224/72}rem"
					height:"#{145/72}rem"
					top:"#{16/72}rem"
					right:"#{11/72}rem"
	for column,c in @bars
		for row,r in column
			bar = @bars[c][r]
			jq '<i></i>'
				.addClass ()->
					addedClass = 'bar'
					if !(c%2) then addedClass+= ' left' else addedClass+=' right'
					if !(r%2) then addedClass+= ' top' else addedClass+=' bottom'
					addedClass
				.css
					width:"#{214/72}rem"
					height:"#{43/72}rem"
					top:"#{bar.y/72}rem"
					left:"#{bar.x/72}rem"
				.appendTo '.content'
Game.prototype.render = ()->
	for column,c in @seats
		for row,r in column
			@putSeats c,r
	@putPeopleAndBar()
Game.prototype.rollYSeatPeople = (part)->#从36个数据中决定5个黄座和22个被占位置,并复制1份
	if part == 'upper' #这里要分两部分去渲染，上一部分
		from = 2
		to = 4
	else
		from = 0
		to = 2
	while @yellowSeatNum
		c = u.ran from,to
		r = u.ran 0,@seatR
		if !seatData[c][r].yellow
			seatData[c][r].yellow = true
			@yellowSeatNum--
	while @people
		c = u.ran from,to
		r = u.ran 0,@seatR
		if !seatData[c][r].occupied
			seatData[c][r].occupied = true
			@people--
	# copySeats = clone seatData
	# for column,c in copySeats
	# 	for row,r in column
	# 		copySeats[c][r].y += @pHeight
	# @seats = seatData.concat copySeats #复制座位
	@render()
Game.prototype.clear = ()->
	@yellowSeatNum = 5
	@people = 22
	# @seats.splice 2,2
	$ '.content .seat,.content .seat .people'
		.off()
	$ '.content'
		.empty()
	for column,c in seatData
		for row,r in column
			delete seatData[c][r].yellow
			delete seatData[c][r].occupied
			delete seatData[c][r].clicked
Game.prototype.paint = ()->
	@clear()
	@rollYSeatPeople()

Game.prototype.over = ()->
	_this.m_wronge.play()
	_this.closeView()
	_this.mStop()

Game.prototype.check = (dis)->
	for column,c in @seats
		for seat,s in column
			# console.log @pHeight*2+dis-seat.y
			if @pHeight*2+dis-seat.y<0 and !seat.occupied and !seat.clicked
				# console.log seat,c,s,seats
				@closeView()
				@mStop()
				return false
game.paint()
Game.prototype.mStop = ()->
	@m_bgm.currentTime = 0
	@m_bgm.pause()
	jq '.content'
		.stop()
Game.prototype.mStart = ()->
	_this = @
	@m_bgm.play()
	C.animate
		bottom: "#{-(@pHeight/72)*1/4}rem",{
			step:(now,fx)->
				if now*72<_this.cur*_this.step
					# _this.check now*72
					_this.cur++
			duration:6000
			easing:'easeInCubic'
			complete:()->
				_this.mGoing()
		}
	return
Game.prototype.mGoing = ()->
	_this = @
	C.animate
		bottom:"#{-(@pHeight/72)}rem",
		{
			step:(now,fx)->
				if now*72<_this.cur*_this.step
					# _this.check now*72
					_this.cur++
				if now <= fx.end
					_this.paint()
					fx.now = 0
			duration:_this.speed
			easing:'linear'
			complete:()->
				console.log 'complete'
				_this.speed -= 500
				_this.cur = 1
				_this.mGoing()
				return	
		}
	return