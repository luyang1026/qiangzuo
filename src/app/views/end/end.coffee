global = window
Game.prototype.closeView = ()->
	@hScore = +localStorage.getItem('hScore') or 0
	if @score>@hScore
		@m_newrecord.play()
		@hScore = @score
		localStorage.setItem 'hScore',@hScore
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
	$ '.this-score'
		.text @score
	$ '.h-score'
		.text @hScore
	replay.off()
	homepage.off()
	replay
		.one 'tap',()->
			_this.m_btn.play()
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
			_this.m_btn.play()
			$ '.backdrop'
				.hide(200)
			$ '.end-view'
				.hide()
			$ '.end-view'
				.removeClass 'zoomOut zoomIn animated'
			_this.paint()
			_this.homePage()
	return