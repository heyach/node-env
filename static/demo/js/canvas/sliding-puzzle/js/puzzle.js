function Puzzle() {
	this.w = canvas.width;
	this.h = canvas.height;
	this.gw = null;
	this.gh = null;
	this.headerContainer = new createjs.Container();
	this.footerContainer = new createjs.Container();
	this.lv3GameContainer = new createjs.Container();
	this.lv4GameContainer = new createjs.Container();
	this.previewContainer = new createjs.Container();
	this.lv3Addr = null;
	this.lv3Items = ["puzzle_lv3_1", "puzzle_lv3_2", "puzzle_lv3_3", "puzzle_lv3_4", "puzzle_lv3_5", "puzzle_lv3_6", "puzzle_lv3_7", "puzzle_lv3_8", "puzzle_lv3_9" ];
	this.lv4Addr = null;
	this.lv4Items = ["puzzle_lv4_1", "puzzle_lv4_2", "puzzle_lv4_3", "puzzle_lv4_4", "puzzle_lv4_5", "puzzle_lv4_6", "puzzle_lv4_7", "puzzle_lv4_8", "puzzle_lv4_9", "puzzle_lv4_10", "puzzle_lv4_11", "puzzle_lv4_12", "puzzle_lv4_13", "puzzle_lv4_14", "puzzle_lv4_15", "puzzle_lv4_16" ];
	this.startTime = new Date().getTime();
	this.initialArray = [ [ 2, 1 ], [ 1, 1 ], [ 2, 0 ], [ 3, 2 ], [ 3, 1 ], [ 2, 2 ], [ 3, 0 ], [ 1, 2 ] ];
	this.tmpArray = [ [ 2, 1 ], [ 1, 1 ], [ 2, 0 ], [ 3, 2 ], [ 3, 1 ], [ 2, 2 ], [ 3, 0 ], [ 1, 2 ] ];
	this.initialLv4Array = [[1,1],[1,2],[1,3],[2,0],[2,1],[2,2],[2,3],[3,0],[3,1],[3,2],[3,3],[4,0],[4,1],[4,2],[4,3]];
	this.tmpLv4Array = [[1,1],[1,2],[1,3],[2,0],[2,1],[2,2],[2,3],[3,0],[3,1],[3,2],[3,3],[4,0],[4,1],[4,2],[4,3]];
	stage.addChild(this.headerContainer, this.footerContainer, this.lv3GameContainer, this.lv4GameContainer);
	createjs.Touch.enable(stage);
}
Puzzle.prototype.init = function(){
	var that = this;
	bgPuzzle = new createjs.Bitmap(preload.getResult('bg_puzzle'));
	bgPuzzle.scaleX = this.w / bgPuzzle.image.width;
	bgPuzzle.scaleY = this.h / bgPuzzle.image.height;
	bgPuzzle.x = 0;
	bgPuzzle.y = 0;
	container.addChild(bgPuzzle);

	bgHeader = new createjs.Bitmap(preload.getResult('puzzle_header'));
	bgHeader.scaleX = this.w / bgHeader.image.width;
	bgHeader.scaleY = bgHeader.scaleX;
	bgHeader.y = 10;
	this.headerContainer.addChild(bgHeader);

	bgFooter = new createjs.Bitmap(preload.getResult('puzzle_footer'));
	bgFooter.scaleX = this.w / bgFooter.image.width;
	bgFooter.scaleY = bgFooter.scaleX;
	bgFooter.y = this.h - bgFooter.getBounds().height * bgFooter.scaleY - 10;
	this.footerContainer.addChild(bgFooter);

}
Puzzle.prototype.initLv3 = function() {
	var that = this;
	bgLv3Game = new createjs.Bitmap(preload.getResult('bg_lv3'));
	bgLv3Game.x = -2;
	bgLv3Game.y = -2;
	this.lv3GameContainer.addChild(bgLv3Game);
	this.lv3GameContainer.x = (this.w - bgLv3Game.getBounds().width) / 2;
	this.lv3GameContainer.y = 0.32 * this.h;
	this.gw = bgLv3Game.getBounds().width - 4;
	this.gh = bgLv3Game.getBounds().height - 4;

	previewImg = new createjs.Bitmap(preload.getResult('preview_lv3'));
	this.lv3GameContainer.addChild(previewImg);
	previewImg.scaleY = this.gh / 3 / previewImg.getBounds().height;
	previewImg.scaleX = previewImg.scaleY;
	previewImg.x = this.gw - previewImg.getBounds().width * previewImg.scaleX;
	previewImg.y = -this.gh / 3 - 10; 
	previewImg.shadow = new createjs.Shadow("#f0ff00", 0, 0, 40);

	this.lv3Addr = 
		    [	[ { x : 0, y : -this.gh / 3, v : 0}, {}, {} ], 
			  	[ { x : 0, y : 0, v : 1}, { x : this.gw / 3, y : 0, v : 1}, { x : this.gw / 3 * 2, y : 0, v : 1} ], 
	            [ { x : 0, y : this.gh / 3, v : 1}, { x : this.gw / 3, y : this.gh / 3, v : 1}, { x : this.gw / 3 * 2, y : this.gh / 3, v : 1} ], 
	            [ { x : 0, y : this.gh / 3 * 2, v : 1}, { x : this.gw / 3, y : this.gh / 3 * 2, v : 1}, { x : this.gw / 3 * 2, y : this.gh / 3 * 2, v : 1} ]
			];

	puzzle_tmp = new createjs.Bitmap(preload.getResult('puzzle_tmp_lv3'));
	puzzle_tmp.scaleX = (this.gw + 10) / 3 / (puzzle_tmp.getBounds().width);
	puzzle_tmp.scaleY = this.gh / 3 / puzzle_tmp.getBounds().height;
	
	for ( var i = 0, a = this.lv3Items.length; i < a; i++) {
		this.lv3Items[i] = new createjs.Bitmap(preload.getResult(this.lv3Items[i]));
		this.lv3Items[i].scaleX = this.gw / 3 / this.lv3Items[i].getBounds().width;
		this.lv3Items[i].scaleY = this.gh / 3 / this.lv3Items[i].getBounds().height;
		this.lv3Items[i].info = [ Floor(i / 3) + 1, i % 3 ];
	}
	
	this.initialArray.sort(this.randomSort);
	while(this.tmpArray.toString() == this.initialArray.toString()){
		this.initialArray = this.initialArray.sort(this.randomSort);
	}
	
	puzzle_tmp.addr = [ 0, 0 ];
	puzzle_tmp.x = this.lv3Addr[0][0].x - 2;
	puzzle_tmp.y = this.lv3Addr[0][0].y - 2;
	this.lv3GameContainer.addChild(puzzle_tmp);

	this.lv3Items[0].addr = [ 1, 0 ];
	this.initialArray.splice(0, 0, this.lv3Items[0].addr);

	for(var j = 0,b = this.lv3Items.length;j<b;j++ ){
		this.lv3Items[j].addr = this.initialArray[j];
	}
	for ( var k = 0, c = this.lv3Items.length; k < c; k++) {
		this.lv3Items[k].x = this.lv3Addr[this.lv3Items[k].addr[0]][this.lv3Items[k].addr[1]].x;
		this.lv3Items[k].y = this.lv3Addr[this.lv3Items[k].addr[0]][this.lv3Items[k].addr[1]].y;
		this.lv3GameContainer.addChild(this.lv3Items[k]);
	}
	for(var m = 0,d = this.lv3Items.length + 1;m < d;m++){
		if(m == this.lv3Items.length){
			puzzle_tmp.addEventListener("mousedown",handleLv3Down.bind(this));
			puzzle_tmp.addEventListener("pressmove",handleLv3Move.bind(this));
			puzzle_tmp.addEventListener("pressup",handleLv3Up.bind(this));
		}else {
			this.lv3Items[m].addEventListener("mousedown",handleLv3Down.bind(this));
			this.lv3Items[m].addEventListener("pressmove",handleLv3Move.bind(this));
			this.lv3Items[m].addEventListener("pressup",handleLv3Up.bind(this));
		}
	}
	previewImg.addEventListener("click",function(){
		that.showPreview("3");
	});
}
Puzzle.prototype.initLv4 = function() {
	var that = this;
	bgLv4Game = new createjs.Bitmap(preload.getResult('bg_lv4'));
	bgLv4Game.x = -2;
	bgLv4Game.y = -2;
	this.lv4GameContainer.x = (this.w-bgLv4Game.getBounds().width)/2;
	this.lv4GameContainer.y = 0.32*this.h;
	this.gw = bgLv4Game.getBounds().width - 4;
	this.gh = bgLv4Game.getBounds().height - 4;
	this.lv4GameContainer.addChild(bgLv4Game);
	
	previewImg = new createjs.Bitmap(preload.getResult('preview_lv4'));
	this.lv4GameContainer.addChild(previewImg);
	previewImg.scaleY = this.gh / 4 / previewImg.getBounds().height;
	previewImg.scaleX = previewImg.scaleY;
	previewImg.x = this.gw - previewImg.getBounds().width * previewImg.scaleX;
	previewImg.y = -this.gh * 0.25 - 10;
	previewImg.shadow = new createjs.Shadow("#FF0000", 0, 0, 50);
	
	this.lv4Addr = [[{x:0,y:-this.gh/4,v:0},{},{},{}],
			[{x:0,y:0,v:1},{x:this.gw/4,y:0,v:1},{x:this.gw/4*2,y:0,v:1},{x:this.gw/4*3,y:0,v:1}],
			[{x:0,y:this.gh/4,v:1},{x:this.gw/4,y:this.gh/4,v:1},{x:this.gw/4*2,y:this.gh/4,v:1},{x:this.gw/4*3,y:this.gh/4,v:1}],
			[{x:0,y:this.gh/4*2,v:1},{x:this.gw/4,y:this.gh/4*2,v:1},{x:this.gw/4*2,y:this.gh/4*2,v:1},{x:this.gw/4*3,y:this.gh/4*2,v:1}],
			[{x:0,y:this.gh/4*3,v:1},{x:this.gw/4,y:this.gh/4*3,v:1},{x:this.gw/4*2,y:this.gh/4*3,v:1},{x:this.gw/4*3,y:this.gh/4*3,v:1}]];
	
	puzzle_tmp = new createjs.Bitmap(preload.getResult('puzzle_tmp_lv4'));
	puzzle_tmp.scaleX = (this.gw + 16) / 4 / puzzle_tmp.getBounds().width;
	puzzle_tmp.scaleY = this.gh / 4 / puzzle_tmp.getBounds().height;
	
	for ( var i = 0, a = this.lv4Items.length; i < a; i++) {
		this.lv4Items[i] = new createjs.Bitmap(preload.getResult(this.lv4Items[i]));
		this.lv4Items[i].scaleX = this.gw / 4 / this.lv4Items[i].getBounds().width;
		this.lv4Items[i].scaleY = this.gh / 4 / this.lv4Items[i].getBounds().height;
		this.lv4Items[i].info = [ Floor(i / 4) + 1, i % 4 ];
	}
	
	this.initialLv4Array.sort(this.randomSort);
	while(this.tmpLv4Array.toString() == this.initialLv4Array.toString()){
		this.initialLv4Array = this.initialLv4Array.sort(this.randomSort);
	}
	puzzle_tmp.addr = [ 0, 0 ];
	puzzle_tmp.x = this.lv4Addr[0][0].x - 2;
	puzzle_tmp.y = this.lv4Addr[0][0].y - 2;
	this.lv4GameContainer.addChild(puzzle_tmp);
	
	this.lv4Items[0].addr = [ 1, 0 ];
	this.initialLv4Array.splice(0, 0, this.lv4Items[0].addr);
	
	for(var j = 0,b = this.lv4Items.length;j<b;j++ ){
		this.lv4Items[j].addr = this.initialLv4Array[j];
	}
	
	for ( var k = 0, c = this.lv4Items.length; k < c; k++) {
		this.lv4Items[k].x = this.lv4Addr[this.lv4Items[k].addr[0]][this.lv4Items[k].addr[1]].x;
		this.lv4Items[k].y = this.lv4Addr[this.lv4Items[k].addr[0]][this.lv4Items[k].addr[1]].y;
		this.lv4GameContainer.addChild(this.lv4Items[k]);
	}

	for(var m = 0,d = this.lv4Items.length + 1;m < d;m++){
		if(m == this.lv4Items.length){
			puzzle_tmp.addEventListener("mousedown",handleLv4Down.bind(this));
			puzzle_tmp.addEventListener("pressmove",handleLv4Move.bind(this));
			puzzle_tmp.addEventListener("pressup",handleLv4Up.bind(this));
		}else {
			this.lv4Items[m].addEventListener("mousedown",handleLv4Down.bind(this));
			this.lv4Items[m].addEventListener("pressmove",handleLv4Move.bind(this));
			this.lv4Items[m].addEventListener("pressup",handleLv4Up.bind(this));
		}
	}
	
}
Puzzle.prototype.randomSort = function(a, b){
	return Math.random() > .5 ? -1 : 1;
}
Puzzle.prototype.clearCheckLv3 = function(){
	for(var i =0,a = this.lv3Items.length;i < a;i++){
		if(!this.compareAddr(this.lv3Items[i].info, this.lv3Items[i].addr)){return false;}
	}
	var dur = (new Date().getTime() - this.startTime)/1000;
	for(var i = 0,a = this.lv3Items.length;i < a;i++){
		this.lv3Items[i].removeAllEventListeners();
	}
	this.lv3GameContainer.removeAllChildren();
	stage.removeChild(this.lv3GameContainer);
	alert("use" + dur + "pass3");
	// createjs.Touch.disable(stage);
	this.initLv4();
}
Puzzle.prototype.clearCheckLv4 = function(){
	for(var i =0,a = this.lv4Items.length;i < a;i++){
		if(!this.compareAddr(this.lv4Items[i].info, this.lv4Items[i].addr)){return false;}
	}
	var dur = (new Date().getTime() - this.startTime)/1000;
	this.lv4GameContainer.removeAllChildren();
	for(var i = 0,a = this.lv4Items.length;i < a;i++){
		this.lv4Items[i].removeAllEventListeners();
	}
	createjs.Touch.disable(stage);
	alert("use" + dur + "pass4");
}
Puzzle.prototype.showPreview = function(lv){
	stage.addChild(this.previewContainer);
	console.log(lv);
}
Puzzle.prototype.compareAddr = function(a,b){
	if(a.length != b.length){
		return false;
	}
	for(var i = 0;i < a.length;i++){
		if(a[i] != b[i]){
			return false;
		}
	}
	return true;
}
var dev = {
		x : 0,
		y : 0,
		dx : 0,
		dy : 0
}
function handleLv3Down(e){
	dev.x = e.rawX;
	dev.y = e.rawY;
}
function handleLv3Up(e){
}
function handleLv3Move(e){
	dev.dx = e.rawX - dev.x;
	dev.dy = e.rawY - dev.y;
	if(dev.dx > 10 || dev.dx <= 10 || dev.dy > 10 || dev.dy <= -10){
		handlerLv3(e, this);
	}
}
function handlerLv3(e,puzzle){
	if(dev.dx > 10){
		if(e.target.addr[1] + 1 <= 2){
			if(puzzle.lv3Addr[e.target.addr[0]][e.target.addr[1]+1].v == 0){
				puzzle.lv3Addr[e.target.addr[0]][e.target.addr[1]].v = 0;
				puzzle.lv3Addr[e.target.addr[0]][e.target.addr[1] + 1].v = 1;
				e.target.addr[1] = e.target.addr[1] + 1;
				e.target.x = puzzle.lv3Addr[e.target.addr[0]][e.target.addr[1]].x;
			}
		}
		puzzle.clearCheckLv3();
		return;
	}
	if(dev.dx <= -10){
		if(e.target.addr[1] - 1 >= 0){
			if(puzzle.lv3Addr[e.target.addr[0]][e.target.addr[1]-1].v == 0){
				puzzle.lv3Addr[e.target.addr[0]][e.target.addr[1]].v = 0;
				puzzle.lv3Addr[e.target.addr[0]][e.target.addr[1] - 1].v = 1;
				e.target.addr[1] = e.target.addr[1] - 1;
				e.target.x = puzzle.lv3Addr[e.target.addr[0]][e.target.addr[1]].x;
			}
		}
		puzzle.clearCheckLv3();
		return;
	}
	if(dev.dy > 10){
		if(e.target.addr[0] + 1 <= 3){
			if(puzzle.lv3Addr[e.target.addr[0] + 1][e.target.addr[1]].v == 0){
				puzzle.lv3Addr[e.target.addr[0]][e.target.addr[1]].v = 0;
				puzzle.lv3Addr[e.target.addr[0] + 1][e.target.addr[1]].v = 1;
				e.target.addr[0] = e.target.addr[0] + 1;
				e.target.y = puzzle.lv3Addr[e.target.addr[0]][e.target.addr[1]].y;	
			}
		}
		puzzle.clearCheckLv3();
		return;
	}
	if(dev.dy <= -10){
		if(e.target.addr[0] - 1 >= 0){  // 数组上边界
			if(puzzle.lv3Addr[e.target.addr[0] - 1][e.target.addr[1]].v == 0){ // 预移位判断
				puzzle.lv3Addr[e.target.addr[0]][e.target.addr[1]].v = 0;
				puzzle.lv3Addr[e.target.addr[0] - 1][e.target.addr[1]].v = 1;
				e.target.addr[0] = e.target.addr[0] - 1;
				e.target.y = puzzle.lv3Addr[e.target.addr[0]][e.target.addr[1]].y;
			}
		}
		puzzle.clearCheckLv3();
		return;
	}
}

function handleLv4Down(e){
	dev.x = e.rawX;
	dev.y = e.rawY;
}
function handleLv4Up(e){
}
function handleLv4Move(e){
	dev.dx = e.rawX - dev.x;
	dev.dy = e.rawY - dev.y;
	if(dev.dx > 10 || dev.dx <= 10 || dev.dy > 10 || dev.dy <= -10){
		handlerLv4(e, this);
	}
}
function handlerLv4(e,puzzle){
	if(dev.dx > 10){
		if(e.target.addr[1] + 1 <= 3){
			if(puzzle.lv4Addr[e.target.addr[0]][e.target.addr[1]+1].v == 0){
				puzzle.lv4Addr[e.target.addr[0]][e.target.addr[1]].v = 0;
				puzzle.lv4Addr[e.target.addr[0]][e.target.addr[1] + 1].v = 1;
				e.target.addr[1] = e.target.addr[1] + 1;
				e.target.x = puzzle.lv4Addr[e.target.addr[0]][e.target.addr[1]].x;
			}
		}
		puzzle.clearCheckLv4();
		return;
	}
	if(dev.dx <= -10){
		if(e.target.addr[1] - 1 >= 0){
			if(puzzle.lv4Addr[e.target.addr[0]][e.target.addr[1]-1].v == 0){
				puzzle.lv4Addr[e.target.addr[0]][e.target.addr[1]].v = 0;
				puzzle.lv4Addr[e.target.addr[0]][e.target.addr[1] - 1].v = 1;
				e.target.addr[1] = e.target.addr[1] - 1;
				e.target.x = puzzle.lv4Addr[e.target.addr[0]][e.target.addr[1]].x;
			}
		}
		puzzle.clearCheckLv4();
		return;
	}
	if(dev.dy > 10){
		if(e.target.addr[0] + 1 <= 4){
			if(puzzle.lv4Addr[e.target.addr[0] + 1][e.target.addr[1]].v == 0){
				puzzle.lv4Addr[e.target.addr[0]][e.target.addr[1]].v = 0;
				puzzle.lv4Addr[e.target.addr[0] + 1][e.target.addr[1]].v = 1;
				e.target.addr[0] = e.target.addr[0] + 1;
				e.target.y = puzzle.lv4Addr[e.target.addr[0]][e.target.addr[1]].y;	
			}
		}
		puzzle.clearCheckLv4();
		return;
	}
	if(dev.dy <= -10){
		if(e.target.addr[0] - 1 >= 0){  // 数组上边界
			if(puzzle.lv4Addr[e.target.addr[0] - 1][e.target.addr[1]].v == 0){ // 预移位判断
				puzzle.lv4Addr[e.target.addr[0]][e.target.addr[1]].v = 0;
				puzzle.lv4Addr[e.target.addr[0] - 1][e.target.addr[1]].v = 1;
				e.target.addr[0] = e.target.addr[0] - 1;
				e.target.y = puzzle.lv4Addr[e.target.addr[0]][e.target.addr[1]].y;
			}
		}
		puzzle.clearCheckLv4();
		return;
	}
}
