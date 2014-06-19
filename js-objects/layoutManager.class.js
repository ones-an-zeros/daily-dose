function layoutManager( width, height ){
    this.body = document.getElementsByTagName('body')[0];
    this.width = width;
    this.height = height;
    this.getSize();
    this.drawStage();
}

layoutManager.prototype.drawStage = function(){
	var scaleWidth = (this.windowWidth/this.width);
	var scale = '-ms-transform: scale('+scaleWidth+');-webkit-transform: scale('+scaleWidth+');transform: scale('+scaleWidth+');';
	if(this.isMobile()){
		var scaleWidth = (this.windowWidth/this.width);
		var scale = '-ms-transform: scale('+scaleWidth+');-webkit-transform: scale('+scaleWidth+');transform: scale('+scaleWidth+');';
	} else {	
		var scale = '-ms-transform: scale(.75);-webkit-transform: scale(.75);transform: scale(.75);';
	}
	this.viewport = objectM.create('DIV',{'id':'viewport'},'width:'+this.width+'px;height:'+this.height+'px;'+scale,this.body);
}
layoutManager.prototype.isMobile = function() { 
	if( navigator.userAgent.match(/Android/i)
		|| navigator.userAgent.match(/webOS/i)
		|| navigator.userAgent.match(/iPhone/i)
		|| navigator.userAgent.match(/iPad/i)
		|| navigator.userAgent.match(/iPod/i)
		|| navigator.userAgent.match(/BlackBerry/i)
		|| navigator.userAgent.match(/Windows Phone/i)
		){	return true; } else { return false; }
}
// Get the size of the stage
layoutManager.prototype.getSize = function(){
    var winW = 630, winH = 460;
    if (document.body && document.body.offsetWidth) {
		winW = document.body.offsetWidth;
		winH = document.body.offsetHeight;
    }
    if (document.compatMode=='CSS1Compat' &&
		document.documentElement &&
		document.documentElement.offsetWidth ) {
		winW = document.documentElement.offsetWidth;
		winH = document.documentElement.offsetHeight;
    }
    if (window.innerWidth && window.innerHeight) {
		winW = window.innerWidth;
		winH = window.innerHeight;
    }
    alert(window.innerHeight);
    this.windowHeight = winH;
    this.windowWidth = winW;
}