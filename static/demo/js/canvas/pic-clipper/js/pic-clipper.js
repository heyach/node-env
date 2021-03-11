function initCutShade(cw, ch){
	var w = $(".cut_shade").width();
	var h = $(".cut_shade").height();
	var t = $(".cut_shade .cut_t");
	var b = $(".cut_shade .cut_b");
	var l = $(".cut_shade .cut_l");
	var r = $(".cut_shade .cut_r");
	var c = $(".cut_shade .cut_rect");
	c.width(cw);
	c.height(ch);
	c.css({
		"left": (w - c.width()) / 2,
		"top": (h - c.height()) / 2 
	});
	t.css({
		"top": 0,
		"left": (w - c.width()) / 2,
		"width": c.width(),
		"height": (h - c.height()) / 2 
	});
	b.css({
		"bottom": 0,
		"left": (w - c.width()) / 2,
		"width": c.width(),
		"height": (h - c.height()) / 2 
	});
	l.css({
		"top": 0,
		"left": 0,
		"width": (w - c.width()) / 2,
		"height": h 
	});
	r.css({
		"top": 0,
		"right": 0,
		"width": (w - c.width()) / 2,
		"height": h 
	});
}
function moveCutRect(){
	var mpos = {},
		dmpos = {},
		elmOffset = {},
		mouseEvent = ("ontouchstart" in window) ? 
			{down: 'touchstart',move: 'touchmove',up: 'touchend', leave : "mouseleave"} : 
			{down: 'mousedown',move: 'mousemove',up: 'mouseup', leave : "mouseleave"},
		mousedown = false;
	var w = $(".cut_shade").width();
	var h = $(".cut_shade").height();
	var t = $(".cut_shade .cut_t");
	var b = $(".cut_shade .cut_b");
	var l = $(".cut_shade .cut_l");
	var r = $(".cut_shade .cut_r");
	var c = $(".cut_shade .cut_rect");
	var cl, ct;
	document.querySelector(".cut_rect").addEventListener(mouseEvent.down,function(e){
		if(e.touches == undefined){
			mpos.tx = e.pageX;
			mpos.ty = e.pageY;
		}
		mousedown = true;
		cl = parseInt(c.css("left"));
		ct = parseInt(c.css("top"));
	},false);
	document.querySelector(".cut_rect").addEventListener(mouseEvent.move,function(e){
		if(e.touches == undefined && mousedown){
			dmpos.dtx = e.pageX - mpos.tx;
			dmpos.dty = e.pageY - mpos.ty;
		}
		var ncl = cl + dmpos.dtx;
		var nct = ct + dmpos.dty;
		if(ncl < 0){
			ncl = 0;
		}
		if(ncl > w - c.width()){
			ncl = w - c.width();
		}
		if(nct < 0){
			nct = 0;
		}
		if(nct > h - c.height()){
			nct = h - c.height();
		}
		$(".cut_rect").css({
			"left": ncl,
			"top": nct
		});
		t.css({
			"height": nct,
			"left": ncl
		});
		b.css({
			"height": h - nct - c.height(),
			"left": ncl
		});
		l.css({"width": ncl});
		r.css({"width": w - ncl - c.width()});
	},false);
	document.querySelector(".cut_rect").addEventListener(mouseEvent.up,function(e){
		mpos = {};
		elmOffset = {};
		mousedown = false;
	},false);
	document.querySelector(".cut_rect").addEventListener(mouseEvent.leave,function(e){
		mpos = {};
		elmOffset = {};
		mousedown = false;
	},false);
}
$(function(){
	$(".btn_set_cut").bind("click",function(){
		var cw = $(".cut_w").val().trim() || 200;
		var ch = $(".cut_h").val().trim() || 120;
		if(cw > 400){cw = 400;}
		if(ch > 400){ch = 400;}
		initCutShade(cw, ch);
	});
	$(".btn_cut").bind("click",function(){
		var cutRect = $(".cut_shade .cut_rect");
		var cutRectL = parseInt(cutRect.css("left"));
		var cutRectT = parseInt(cutRect.css("top"));
		var canvas = document.createElement("canvas");
		var cutCanvas = document.getElementById("cut_canvas");
		canvas.width = $(".cut_rect").width();
		canvas.height = $(".cut_rect").height();
		var ctx = canvas.getContext("2d");
		ctx.drawImage(cutCanvas, cutRectL, cutRectT, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
		var finalImage = canvas.toDataURL();
		$(".upload_img").append("<img src='" + finalImage + "'>");
		$(".cut_canvas,.btn_cut").hide();
		$(".upload_img").show();
	});
	
	$("#upload_file").change(function(e){
		var files = e.target.files;
		if(files&&files.length > 0){
			var file = files[0];
			var reader = new FileReader();
			reader.onloadstart = function(){
				console.log("正在上传文件...");
			};
			reader.readAsDataURL(file);
			reader.onloadend = function(e){
				var base64 = this.result;
				$(".upload_result,.cut_canvas,.btn_cut").show();
				var image = new Image();
				image.src = base64;
				var canvas = document.getElementById("cut_canvas");
				canvas.width = 400;
				canvas.height = 400;
				var ctx = canvas.getContext("2d");
				image.onload = function(){
					var iw = image.width;
					var ih = image.height;
					ctx.clearRect(0, 0, canvas.width, canvas.height);
					if(iw > ih){
						ctx.drawImage(image, 0, 0, image.width, image.height, 0, (canvas.height - canvas.width * image.height / image.width) / 2, canvas.width, canvas.width * image.height / image.width);
					}else{
						ctx.drawImage(image, 0, 0, image.width, image.height, (canvas.width - canvas.height * image.width / image.height) /2 , 0, canvas.height * image.width / image.height, canvas.height);
					}
				};
				initCutShade();
				moveCutRect();
			};
			reader.onerror = function () {
				console.log("上传文件失败，请重试...");
			};
		}else{
			console.log("未进行拍照或选取照片，请重试...");
		}
	});
});
	