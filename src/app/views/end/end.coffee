window.closeView = ()->
	homepage = $ '.end-view .homepage-btn'
	replay = $ '.end-view .replay-btn'
	share = $ '.end-view .share-btn'
	$ '.end-view'
		.show ()->
			$ '.end-view .ending'
				.addClass 'zoomIn animated'
	replay
		.on 'tap',()->
			$ '.end-view .ending'
				.removeClass 'zoomIn animated'
			$ '.end-view .ending'
				.addClass 'zoomOut animated'
			$ '.backdrop'
				.hide()
			$ '.end-view'
				.hide()
			console.log 'omg'
			paint()
	return