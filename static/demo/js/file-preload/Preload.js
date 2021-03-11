function PreLoading(imgArr,audioArr,cb){
	this.isPreLoad = false; 
	this.loadImgNum = 0;  
	this.loadAudioNum = 0;  
	this.loadProgress = 0;
	this.loadImgCom = false;
	this.loadAudioCom = false;
	this.imgArr = (typeof imgArr != "object") ? [imgArr] : imgArr;
	this.audioArr = (typeof audioArr != "object") ? [audioArr] : audioArr;
	if(typeof cb === "function"){
		this.uploadProgress = cb;
	}
}
PreLoading.prototype.preLoadImg = function(){
	var c = this; 
	for(var a = c.imgArr, b = 0, d = a.length; b < d; b++){
      var image = new Image();
      image.onload = function(){
      	c.countLoadImgNum(image);
      }
      image.src = a[b];
	}
};
PreLoading.prototype.countLoadImgNum = function(image){
	var c = this;
	c.loadImgNum++;
	c.uploadProgress(image);
	if(c.loadImgNum == c.imgArr.length){
		c.loadImgCom = true;
	}
};
PreLoading.prototype.preLoadAudio = function(){
	var c = this;
	for(var a = c.audioArr, b = 0, d = a.length; b < d; b++){
		var audio = new Audio();
		audio.onloadedmetadata = function(){
			c.countLoadAudioNum(audio);
		}
		audio.src = a[b];
	}
};
PreLoading.prototype.countLoadAudioNum = function(){
	var c = this;
	c.loadAudioNum++;
	if(c.loadAudioNum == c.audioArr.length){
		c.loadAudioCom = true;
	}
};