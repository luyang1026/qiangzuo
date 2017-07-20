$.noConflict()
global = window
window.jq = jQuery
global.deviceWidth = document.documentElement.clientWidth
document.documentElement.style.fontSize = "#{deviceWidth/10}px"
jq.fn.animationCss=(animationName,fn)->
		animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'
		this.addClass "animated #{animationName}"
			.one animationEnd,()->
				jq(this).removeClass "animated #{animationName}"
				fn&&fn.call jq this
				return
global.clone = (obj)->
	if typeof obj isnt 'object'
		obj
	else if obj instanceof Array
		arr = []
		for item,i in obj
			arr[i] = clone item
		arr
	else if obj instanceof Object
		json = {}
		for key,value of obj
			json[key] = clone obj[key]
		json

global.Game = class Game
	constructor:()->
		@rem = deviceWidth/10
		@pHeight = 4540
		@wHeight = jq(window).height()# screen height
		@startView = jq '.start-view'
		@beginning = jq '.start-view .beginning'
		@backdrop = jq '.backdrop'
		@btnStart = $ '.start-view .btn-start'
		@countDownNumbers = jq '.start-view .count-down .number'
		@number = 3
		@timer = null
		@seats = seatData
		@bars = barData
		@yellowSeatNum = 5
		@people = 22
		@seatR = seatData[0].length
		@seatC = 2||seatData.length
		@score = 0
		@hScore = +localStorage.getItem('hScore') or 0
		@cur = 1
		@step = -100
		@speed = 8000
		@m_bgm = $('#m_bgm').get(0)
		@m_btn = $('#m_btn').get(0)
		@m_correct = $('#m_correct').get(0)
		@m_wronge = $('#m_wronge').get(0)
		@m_countdown = $('#m_countdown').get(0)
		@m_newrecord = $('#m_newrecord').get(0)
	init:()->
		@getDomReady()
		@arrangeBars_Seats()
		@putDomSeats_Bars()
	getDomReady:()->
		jq '.content'# set content's height 
			.height "#{@pHeight/72*2}rem"
		$ 'body'
			.on 'touchmove',(ev)->
				ev.preventDefault()
	arrangeBars_Seats:()->#复制座位及扶手
		copyBars = clone barData
		for colume,c in copyBars
			for row,r in colume
				copyBars[c][r].y += @pHeight
		@bars = @bars.concat copyBars
		copySeats = clone seatData
		for column,c in copySeats
			for row,r in column
				copySeats[c][r].y += @pHeight
		@seats = seatData.concat copySeats #座位的数据结构为：1,2项是第一张图的seats(开始在页面上面)，3,4项是第二张图的seats(开始在屏幕内)
	putDomSeats_Bars:()->
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
		for column,c in @seats
			for row,r in column
				seat = row
				people = jq '<span></span>'
					.addClass 'people'
				jq '<div></div>'
					.on 'touchmove',(ev)->
						ev.stopPropagation()
					.addClass ()->
						addedClass = 'seat'
						if c%2 then addedClass+=' right' else addedClass+=' left'
						addedClass
					.css
						left:"#{seat.x/72}rem"
						top:"#{seat.y/72}rem"
						width:"#{201/72}rem"
						height:"#{178/72}rem"
					.attr
						c:c,
						r:r
					.append people
					.appendTo '.content'
Game.prototype.homePage = ()->
	@startView.show()
	@beginning.show()
	@backdrop.show()
	@beginning.animationCss 'bounceInUp'
	@homePageBindEvent()
	@hScore = +localStorage.getItem('hScore') or 0
	jq '.start-view .history-score'
		.text @hScore
	jq '.content'
		.css 'bottom',0

Game.prototype.homePageBindEvent = ()->
	_this = @
	@btnStart.off()
	@btnStart.one 'tap',()->
		_this.m_btn.play()
		_this.beginning.animationCss 'bounceOutUp',()->
				jq(this).hide _this.countDown()#start count-down

Game.prototype.countDown = ()->
	_this = @
	@m_countdown.play()
	@score = 0
	$ '.score'
		.text 0
	jq '.content'
		.css 'bottom',0
	@countDownNumbers.hide()
	@startView.show()
	@backdrop.show()
	@number--
	@timer = setTimeout ()->
		_this.countDown.call(_this)
	,1000
	if @number<0
		@number = 3
		@startView.hide()
		@backdrop.hide()
		@mStart()
		# testGo()
		clearTimeout @timer
		return
	@countDownNumbers
		.eq @number
		.show()
	return

global.game = new Game()
game.init()
testGo = ()->
	setTimeout ()->
		game.mStart()
	,10
# testGo()
game.homePage()