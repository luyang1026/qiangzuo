function Game(){
	this.screen = document.querySelector('.screen');
	this.content = document.querySelector('.content');
	this.scoreEle = document.querySelector('.score');
	this.contentHeight = this.content.clientHeight;
	this.speed = 10;
	this.screenHeight = this.screen.clientHeight;
	this.n = 0;
	this.t = null;
	this.score = 0;
	this.seat = 30;
	this.status = 'prestart';
}
Game.prototype = {
	start:function(){
		if(this.status=='started')return;
		this.n = 0;
		this.score = 0;
		this.scoreEle.textContent = 0;
		var _this = this;
		clearInterval(this.t);
		this.t = setInterval(function(){
			_this.go();
		},30);
		this.status = 'started';
	},
	continue:function(){
		if(this.status!='pause')return;
		var _this = this;
		clearInterval(this.t);
		this.t = setInterval(function(){
			_this.go();
		},30);
		this.status = 'started';
	},
	go:function(){
		this.n = this.n - this.speed;
		if(this.contentHeight+this.n<this.screenHeight){
			this.n = 0;
		}
		this.content.style.top = this.n+'px';
	},
	pause:function(){
		clearInterval(this.t);
		this.status = 'pause';
	},
	init:function(){
		this.domready();
	},
	domready:function(){
		var _this = this;
		// for (var i = 0; i < this.seat; i++) {
		// 	var span = document.createElement('span');
		// 	span.onmousedown = span.ontouch = function(){
		// 		if(_this.status!='started')return;
		// 		_this.score ++;
		// 		document.querySelector('.score').textContent = _this.score;
		// 	}
		// 	span.className = 'seat';
		// 	this.content.appendChild(span);
		// }
		// arr.sort(function(a,b){
		// 	return Math.random()-0.5
		// })
	}
}
