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

global.Game = class Game
	constructor:()->
		@pHeight = 4540/72# picture height
		@wHeight = jq(window).height()# screen height
		@startView = jq '.start-view'
		@beginning = jq '.start-view .beginning'
		@backdrop = jq '.backdrop'
		@btnStart = $ '.start-view .btn-start'
		@countDownNumbers = jq '.start-view .count-down .number'
		@number = 3
		@timer = null
		@score = 0
		@tap = jq '#m_btn'
	init:()->
		@getDomReady()
	getDomReady:()->
		jq '.content>div'# set div's height 
			.height "#{@pHeight}rem"

Game.prototype.homePage = ()->
	@startView.show()
	@backdrop.show()
	@beginning.animationCss 'bounceInUp'
	@homePageBindEvent()

Game.prototype.homePageBindEvent = ()->
	_this = @
	@btnStart.one 'tap',()->
		_this.tap.get(0).play()
		_this.beginning.animationCss 'bounceOutUp',()->
			jq(this).hide _this.countDown()#start count-down
Game.prototype.countDown = ()->
	_this = @
	m_cd = $ '#m_countdown'
	@countDownNumbers.hide()
	@startView.show()
	@backdrop.show()
	@number--
	@timer = setTimeout ()->
		_this.countDown()
	,1000
	if @number<0
		@number = 3
		@startView.hide()
		@backdrop.hide()
		clearTimeout @timer
		return
	@countDownNumbers
		.eq @number
		.show()
	m_cd.get(0).play()
	return
