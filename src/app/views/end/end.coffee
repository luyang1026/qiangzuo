global = window
Game.prototype.closeView = ()->
	_this = @
	homepage = $ '.end-view .homepage-btn'
	replay = $ '.end-view .replay-btn'
	share = $ '.end-view .share-btn'
	$ '.end-view'
		.addClass 'zoomIn animated'
	$ '.end-view'
		.show()
	$ '.backdrop'
		.show()
	replay
		.one 'tap',()->
			$ '.backdrop'
				.hide(200)
			$ '.end-view'
				.hide()
			$ '.end-view'
				.removeClass 'zoomOut zoomIn animated'
			_this.paint()
			_this.countDown()
	homepage
		.one 'tap',()->
			$ '.backdrop'
				.hide(200)
			$ '.end-view'
				.hide()
			$ '.end-view'
				.removeClass 'zoomOut zoomIn animated'
			_this.paint()
			_this.homePage()
	return

window.game = new Game()
game.init()
game.homePage()
game.paint()