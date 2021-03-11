function Sketchpad(canvasId){
	this.canvasId = canvasId;
	this.x = 0;
	this.y = 0;
	this.dx  =0;
	this.dy = 0;
	this.canvas = null;
	this.ctx = null;
	this.centerX = 0;
	this.centerY = 0;
	this.score = 0;
	this.point = [];
	this.mouseEvent = ("ontouchstart" in window) ? 
			{down: 'touchstart',move: 'touchmove',up: 'touchend'} : 
			{down: 'mousedown',move: 'mousemove',up: 'mouseup'},
	this.mousedown = false;
	this.drawType = "freeline";
	this.drawColor = "#d3c294";
	this.bgColor = "#dfdfdf";
	this.events = [];
	this.drawFreeLineD = this.drawFreeLineDown.bind(this);
	this.drawFreeLineM = this.drawFreeLineMove.bind(this);
	this.drawFreeLineU = this.drawFreeLineUp.bind(this);
	this.drawRectD = this.drawRectDown.bind(this);
	this.drawRectM = this.drawRectMove.bind(this);
	this.drawRectU = this.drawRectUp.bind(this);
	this.eraserD = this.eraserDown.bind(this);
	this.eraserM = this.eraserMove.bind(this);
	this.eraserU = this.eraserUp.bind(this);
}
function Toast(cnt){
	var target = $(".toast");
	target.html(cnt);
	target.fadeIn();
	setTimeout(function(){
		target.fadeOut();
	},1500);
}
Sketchpad.prototype.init = function(w, h){
	var that = this;
	that.canvas = document.getElementById(that.canvasId);
	that.canvas.width = w;
	that.canvas.height = h;
	that.ctx = that.canvas.getContext("2d");
};
Sketchpad.prototype.drawArc = function(x, y, r, c){
	var that = this;
	that.ctx.beginPath();
	that.ctx.arc(x, y, r/2, 0, Math.PI * 1, true);
	that.ctx.fillStyle = c;
	that.ctx.fill();
	that.ctx.closePath();
};
Sketchpad.prototype.drawLine = function(p1, p2, c){
	var that = this;
	that.ctx.moveTo(p1.x, p1.y);
	that.ctx.lineTo(p2.x, p2.y);
	that.ctx.strokeStyle = c;
	that.ctx.lineWidth = 3;
	that.ctx.stroke();
};
Sketchpad.prototype.drawAgain = function(){
	var that = this;
	that.ctx.clearRect(0, 0, that.canvas.width, that.canvas.height);
	that.point = [];
}
Sketchpad.prototype.removeAllListener = function(){
	var that = this;
	that.events.forEach(function(item, index){
		that.canvas.removeEventListener(item.type, item.handler);
	});
}
Sketchpad.prototype.drawFreeLineDown = function(e){
	var that = this;
	if(e.touches == undefined){
		that.x = e.pageX;
		that.y = e.pageY;
	}else{
		that.x = e.touches[0].clientX;
		that.y = e.touches[0].clientY;
	}
    that.centerX = $("#" + that.canvasId).offset().left;
    that.centerY = $("#" + that.canvasId).offset().top;
	that.mousedown = true;
    that.point.push({ x : that.x, y : that.y });
};
Sketchpad.prototype.drawFreeLineMove = function(e){
	var that = this;
	if(e.touches == undefined && that.mousedown){
		that.dx = e.pageX - that.x;
		that.dy = e.pageY - that.y;
	    var nx = e.pageX - $("#" + that.canvasId).offset().left;
	    var ny = e.pageY - $("#" + that.canvasId).offset().top;
	    that.point.push({ x : e.pageX, y : e.pageY });
	}else if(e.touches != undefined && that.mousedown){
		that.dx = e.touches[0].clientX - that.x;
		that.dy = e.touches[0].clientY - that.y;
	    var nx = e.touches[0].clientX - $("#" + that.canvasId).offset().left;
	    var ny = e.touches[0].clientY - $("#" + that.canvasId).offset().top;
	    that.point.push({ x : e.touches[0].clientX, y : e.touches[0].clientY });
	}
	that.drawArc(nx, ny, 0.6, that.drawColor);
    if(that.point.length >= 2){
    	var point1 = {
    		x : that.point[that.point.length - 2].x - $("#" + that.canvasId).offset().left,
    		y : that.point[that.point.length - 2].y - $("#" + that.canvasId).offset().top
    	};
    	var point2 = {
    		x : that.point[that.point.length - 1].x - $("#" + that.canvasId).offset().left,
    		y : that.point[that.point.length - 1].y - $("#" + that.canvasId).offset().top
    	};
    	that.drawLine(point1, point2, that.drawColor);
    }
};
Sketchpad.prototype.drawFreeLineUp = function(e){
	var that = this;
	that.mousedown = false;
};
Sketchpad.prototype.drawRectDown = function(e){
	var that = this;
	that.mousedown = true;
	Toast("该功能即将开放");
};
Sketchpad.prototype.drawRectMove = function(e){
	var that = this;
};
Sketchpad.prototype.drawRectUp = function(e){
	var that = this;
	that.mousedown = false;
};
Sketchpad.prototype.eraserDown = function(e){
	var that = this;
	if(e.touches == undefined){
		that.x = e.pageX;
		that.y = e.pageY;
	}else{
		that.x = e.touches[0].clientX;
		that.y = e.touches[0].clientY;
	}
    that.centerX = $("#" + that.canvasId).offset().left;
    that.centerY = $("#" + that.canvasId).offset().top;
	that.mousedown = true;
};
Sketchpad.prototype.eraserMove = function(e){
	var that = this;
	if(e.touches == undefined && that.mousedown){
		that.dx = e.pageX - that.x;
		that.dy = e.pageY - that.y;
	    var nx = e.pageX - $("#" + that.canvasId).offset().left;
	    var ny = e.pageY - $("#" + that.canvasId).offset().top;
	}else if(e.touches != undefined && that.mousedown){
		that.dx = e.touches[0].clientX - that.x;
		that.dy = e.touches[0].clientY - that.y;
	    var nx = e.touches[0].clientX - $("#" + that.canvasId).offset().left;
	    var ny = e.touches[0].clientY - $("#" + that.canvasId).offset().top;
	}
	that.drawArc(nx, ny, 30, that.bgColor);
};
Sketchpad.prototype.eraserUp = function(e){
	var that = this;
	that.mousedown = false;
};