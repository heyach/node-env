
function startPreload(manifest,loadProgressCall,loadCompleteCall) {
	preload = new createjs.LoadQueue(true);
	preload.installPlugin(createjs.Sound);
	preload.on("fileload", function(event){});
	preload.on("progress", function(event){
		//console.log(preload.progress);
		//stage.update();
		if(typeof loadProgressCall  == "function"){
			loadProgressCall();
		}
	});
	// loadcom要用到initstage的this对象，这样改变this指向后，影响了preloadjs的执行
	// this.preload.on("complete", this.loadComplete(InitStage.bind(this)));
	preload.on("complete", function(event){
		console.log("load com");
		if(typeof loadCompleteCall  == "function"){
			loadCompleteCall();
		}
	});
	preload.on("error", function(event){
		console.log("load error!", event.text);
	});
	preload.loadManifest(manifest);
};

function InitStage(canvasId,initCall) {
	canvas = document.getElementById(canvasId);
	canvas.width = $("#container").width();
	canvas.height = $("#container").height();
	stage = new createjs.Stage(canvas);
	container = new createjs.Container();
	stage.addChild(container);
	if(typeof initCall  == "function"){
		initCall();
	}
	createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick", stage);
}