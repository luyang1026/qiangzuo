deviceWidth = document.documentElement.clientWidth
document.documentElement.style.fontSize = "#{deviceWidth/10}px"

global = window
C = jq('.content')
pHeight = 4540/72# picture height
wHeight = jq(window).height()# screen height
changePoint = "#{-pHeight-wHeight/(deviceWidth/10)}rem";
_slice = [].slice
peopleCount = 11
Game.prototype.renderSeats_People = ()->#指定哪几项,0,1即只填加第一幅的黄座和小人
	_this = @
	# console.log JSON.stringify @.seats,null,2
	for column,c in @seats
		continue if _slice.apply(arguments).indexOf(c) == -1
		for row,r in column
			seat = @seats[c][r]
			jq ".content .seat[c=#{c}][r=#{r}]"
				.removeClass 'yellow'
				.removeClass 'occupied'
			if seat.yellow
				jq ".content .seat[c=#{c}][r=#{r}]"
					.addClass 'yellow'
			if seat.occupied
				jq ".content .seat[c=#{c}][r=#{r}]"
					.addClass 'occupied'
	for c,i in arguments
		jq ".content .seat[c=#{c}],.content .seat[c=#{c}] .people"
			.off()#解绑某几项的所有事件
		jq ".content .seat[c=#{c}].occupied .people"
			.one 'tap',(ev)->#给人绑定点击结束时间
				_this.gameover()
				ev.stopPropagation()
		jq ".content .seat[c=#{c}]"
			.one 'tap',(ev)->#给黄座绑定点击结束时间
				if $(this).hasClass 'yellow'
					_this.gameover() 
				else
					_this.score++
					_this.seats[$(this).attr('c')][$(this).attr('r')].clicked = true
					$ '.score'
						.remove()
					$ '<p></p>'
						.addClass 'score animated zoomIn'
						.text _this.score
						.appendTo 'body'
		jq ".content .seat[c=#{c}] .people"
			.css
				backgroundImage:""
		jq ".content .seat[c=#{c}].occupied .people"
			.each (index)->
				jq this
					.css
						backgroundImage:"url(app/img/#{(index%peopleCount)+1}.png)"
Game.prototype.clear = ()->
	for column,c in @seats
		continue if _slice.apply(arguments).indexOf(c) == -1
		for row,r in column
			delete @seats[c][r].yellow
			delete @seats[c][r].occupied
			delete @seats[c][r].clicked
Game.prototype.render = ()->
	@clear.apply(@,arguments)
	@rollYSeatPeople.apply(@,arguments)
	@renderSeats_People.apply(@,arguments)
Game.prototype.rollYSeatPeople = ()->#从36个数据中决定5个黄座和22个被占位置,并复制1份
	@yellowSeatNum = 5
	@people = 22
	while @yellowSeatNum
		c = u.ran arguments[0],arguments[1]+1
		r = u.ran 0,@seatR
		if !@seats[c][r].yellow
			@seats[c][r].yellow = true
			@yellowSeatNum--
	while @people
		c = u.ran arguments[0],arguments[1]+1
		r = u.ran 0,@seatR
		if !@seats[c][r].occupied
			@seats[c][r].occupied = true
			@people--
	# copySeats = clone seats
	# for column,c in copySeats
	# 	for row,r in column
	# 		copySeats[c][r].y += @pHeight
	# @seats = seatData.concat copySeats #复制座位
Game.prototype.paint = ()->
	@render(2,3)
	@render(0,1)
game.paint()
Game.prototype.gameover = ()->
	_this = @
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
# game.paint()
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
				if _this.cur == 11
					console.log 2,3
					# _this.render(0,1)
				if _this.cur == 33
					console.log 2,3
					# _this.render(0,1)
				if now <= fx.end
					# _this.paint()
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