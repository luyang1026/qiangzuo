deviceWidth = document.documentElement.clientWidth
document.documentElement.style.fontSize = "#{deviceWidth/10}px"
global = window
animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'
content = $('.content')
cHeight = 4577
wHeight = $(window).height()
content.height(cHeight)
s = ['start','go','run']


##
global.move_start = ()->
	$('.content').addClass 'start'
	i = 1
	$('.content').one animationEnd,()->
		console.log s[i]
		switch s[i]
			when 'go'
				$(this).addClass 'go'
			when 'run'
				$(this).addClass 'run'
		i++
		return
	return
# move_start()