function FlyFlower(imgId, x, y, scaleX, scaleY, rotation, alpha, airPower, windPower) {
	this.flower = new createjs.Bitmap(preload.getResult(imgId));
	this.flower.regX = this.flower.getBounds().width/2 || 0;
	this.flower.regY = this.flower.getBounds().height/2 || 0;
	this.flower.x = x + this.flower.regX || 0;
	this.flower.y = y + this.flower.regY || 0;
	this.flower.scaleX = scaleX || 1;
	this.flower.scaleY = scaleY || 1;
	this.flower.rotation = rotation || 0;
	this.flower.alpha = alpha || 1;
	this.airPower = airPower || 0;
	this.windPower = windPower || 0;
	this.g = 9.8;
	this.st = new Date().getTime();
	this.sx = x || 0;
	this.sy = y || 0;
	this.timer = null;
	this.dalpha = Random(100) > 50 ? -0.003 : 0.03;
}
FlyFlower.prototype.calPos = function() {
	var dt = (new Date().getTime() - this.st)/1000; 
	this.flower.x = this.sx + this.windPower*dt*dt/2;
	this.flower.y = this.sy + (this.g - this.airPower)*dt*dt*2;
	this.flower.alpha = this.flower.alpha + this.dalpha;
	if(this.flower.y > canvas.height + this.flower.getBounds().height){ 
		clearInterval(this.timer);
		clearInterval(this.timer1);
		var e = this.flower;
		setTimeout(function(){
			container.removeChild(e);
		}, 3000);
	}
};
function FlowerFactory(e,isBegin,imgName){
	var x = RandomRange(0, canvas.width + 400) - 400;
	if(isBegin){
		var y = RandomRange(0, canvas.height + 500) - 100;
	}else{
		var y = RandomRange(0, 100) - 120;
	}
	var rotation = RandomRange(0, 90);
	var scaleX = Ceil(RandomRange(3,12))/10;
	var scaleY = scaleX;
	var alpha = Ceil(RandomRange(3,10))/10;
	var airPower = RandomRange(2, 5);
	var windPower = RandomRange(0, 12) - 3;
	var flowerId = imgName + Ceil(Random(4));
	
	e = new FlyFlower(flowerId, x, y, scaleX, scaleY, rotation, alpha, airPower, windPower);
	container.addChild(e.flower);
	e.timer = setInterval(function() {
		e.calPos(FlyFlower.bind(this));
	},30);
	e.timer1 = setInterval(function() {
		Random(100) > 50 ? e.flower.skewX += RandomRange(2, 12) : e.flower.skewY += RandomRange(2, 12);
	},30);
	return e;
}
function beginFly(imgName) {
	var tmp, flowers = [];
	flowerTimer = setInterval(function() {
		var n = FlowerFactory(tmp, false, imgName);
	}, 20);
}


