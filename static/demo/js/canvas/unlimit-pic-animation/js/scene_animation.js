var scene_animation = function(){
	var w = $("#container").width();
	var h = $("#container").height();
	var imgInitialW = 750;
	var imgInitialH = 1206;
	var scaleImg = imgInitialW / imgInitialH;
	var scaleW = imgInitialW / w; //2.34
	var scaleH = imgInitialH / h; //2.12
	var canvas = document.querySelector("#scene");
	var ctx = canvas.getContext("2d");
	var bufcanvas = document.createElement("canvas");
	var bufctx = bufcanvas.getContext("2d");
	var bgx = scaleW > scaleH ? (imgInitialW - scaleH * w) / 2  : 0;
	var bgy = scaleW > scaleH ? 0 : (imgInitialH - scaleW * h) / 2;
	var bgw = scaleW > scaleH ? imgInitialW - bgx * 2 : imgInitialW;
	var bgh = scaleW > scaleH ? imgInitialH : imgInitialH - bgy * 2;
	var changeTimes = 300;
	var crange = 1;
	var animationTimer;
	var p = [[0,0,0,0],
			 [552, 42, 155, 245],
			 [316, 478, 63, 100],
			 [346, 166, 110, 182],
			 [157, 342, 102, 138],
			 [144, 491, 70, 119],
			 [63, 332, 289, 520],
			 [319, 313, 106, 178],
			 [189, 186, 344, 585],
			 [505, 267, 120, 185],
			 [410, 216, 278, 512],
			 [483, 924, 95, 151],
			 [368, 646, 247, 424],
			 [115, 19, 97, 154],
			 [115, 28, 357, 560],
			 [430, 75, 165, 280],
			 [429, 262, 299, 524],
			 [90, 886, 166, 259],
			 [163, 660, 270, 511],
			 [599, 210, 116, 185],
			 [423, 191, 288, 504],
			 [465, 924, 30, 66],
			 [bgx, bgy, bgw, bgh]];
	var ps = ["img/1.jpg",
			  "img/2.jpg",
			  "img/3.jpg",
			  "img/4.jpg",
			  "img/5.jpg",
			  "img/6.jpg",
			  "img/6_5.jpg",
			  "img/7.jpg",
			  "img/7_5.jpg",
			  "img/8.jpg",
			  "img/8_5.jpg",
			  "img/9.jpg",
			  "img/9_5.jpg",
			  "img/10.jpg",
			  "img/10_5.jpg",
			  "img/11.jpg",
			  "img/11_5.jpg",
			  "img/12.jpg",
			  "img/12_5.jpg",
			  "img/13.jpg",
			  "img/13_5.jpg",
			  "img/14.jpg"];
	return {
		initScene : function(){
			var that = this;
			canvas.width = w;
			canvas.height = h;
			bufcanvas.width = canvas.width;
			bufcanvas.height = canvas.height;
			that.animationCount = changeTimes;
			that.pages = [];
			that.pageos = [];
			for(var i = 1,a = p.length;i < a;i++){
				that.pages.push({
					startx: p[i-1][0],
					starty: p[i-1][1],
					startw: p[i-1][2],
					starth: p[i-1][3],
					
					mpx: bgx,
					mpy: bgy,
					mpw: bgw,
					mph: bgh,
					
					endx: p[i][0],
					endy: p[i][1],
					endw: p[i][2],
					endh: p[i][3]
				});
			}
			for(var j = 0,b = ps.length;j < b;j++){
				if(j == 0){
					that.pageos.push({
						img : this.imgFactory(ps[j]),
						startX : that.pages[j].mpx,
						startY : that.pages[j].mpy,
						imgDrawWidth : that.pages[j].mpw,
						imgDrawHeight : that.pages[j].mph,
						canvasStartX : 0,
						canvasStartY : 0,
						canvasDrawWidth : w,
						canvasDrawHeight : h
					});
				}else{
					that.pageos.push({
						img : this.imgFactory(ps[j]),
						startX : that.pages[j].startx,
						startY : that.pages[j].starty,
						imgDrawWidth : that.pages[j].startw,
						imgDrawHeight : that.pages[j].starth,
						canvasStartX : 0,
						canvasStartY : 0,
						canvasDrawWidth : w,
						canvasDrawHeight : h
					});
				}
			}
			that.pageos[0].img.onload = function(){
				that.drawImg(that.pageos[1], that.pageos[0]);
			};
		},
		imgFactory : function(imgsrc){
			var img = new Image();
			img.src = imgsrc;
			return img;
		},
		drawImg : function(img1, img2){
			bufctx.clearRect(0, 0, w, h);
			bufctx.drawImage(img1.img, img1.startX, img1.startY, img1.imgDrawWidth, img1.imgDrawHeight, img1.canvasStartX, img1.canvasStartY, img1.canvasDrawWidth, img1.canvasDrawHeight);
			if(img2 != null){
				bufctx.drawImage(img2.img, img2.startX, img2.startY, img2.imgDrawWidth, img2.imgDrawHeight, img2.canvasStartX, img2.canvasStartY, img2.canvasDrawWidth, img2.canvasDrawHeight);
			}
			ctx.clearRect(0, 0, w, h);
			ctx.drawImage(bufcanvas, 0, 0, canvas.width, canvas.height);
		},
		updateImg : function(np, n1p, bg_n, bg_n1){
			var that = this;
			that.animationCount = that.animationCount - crange;
			if(that.animationCount > 0){
				var dx = (n1p.startx - n1p.mpx) / changeTimes;
				var dy = (n1p.starty - n1p.mpy) / changeTimes;
				var dw = (n1p.mpw - n1p.startw) / changeTimes;
				var dh = (n1p.mph - n1p.starth) / changeTimes;
				bg_n1.startX -= dx;
				bg_n1.startY -= dy;
				bg_n1.imgDrawWidth += dw;
				bg_n1.imgDrawHeight += dh;
				
				bg_n.canvasStartX = dx * (changeTimes - that.animationCount) * w / bg_n1.imgDrawWidth;
				bg_n.canvasStartY = dy * (changeTimes - that.animationCount) * h / bg_n1.imgDrawHeight;
				bg_n.canvasDrawWidth = np.endw / (np.endw + dw * (changeTimes - that.animationCount)) * w;
				bg_n.canvasDrawHeight = np.endh / (np.endh + dh * (changeTimes - that.animationCount)) * h;
				that.drawImg(bg_n1 ,bg_n);
			}else{
				that.animationCount  = changeTimes;
				curp++;
			}
		}
	};
}();