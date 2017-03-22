window.closeView = ()->
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
		.on 'tap',()->
			$ '.backdrop'
				.slideUp(200)
			$ '.end-view'
				.hide()
			$ '.end-view'
				.removeClass 'zoomOut zoomIn animated'
			paint()
	return