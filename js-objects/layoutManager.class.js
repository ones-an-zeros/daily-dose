function layoutManager( width, height ){
    this.body = document.getElementsByTagName('body')[0];
    this.viewport = null;
    this.vWidth = width;
    this.vHeight = height;
    this.hWidth = height;
    this.hHeight = width;
    this.heightVertical = false;
    this.heightHorizontal = false;
    this.height = null;
    this.width = null;
    this.getSize();
    this.drawStage();
}
layoutManager.prototype.drawStage = function(){
	if(window.orientation=='0'|| window.orientation == '180'){
		var className = 'vp-verticle';
		var height = this.vHeight;
		var width = this.vWidth;
		if(this.windowWidthV==null){ this.getSize(); }
		var windowHeight = this.windowHeightV;
		var windowWidth = this.windowWidthV;
	} else if(window.orientation == '90' || window.orientation == '-90'){
		var className = 'vp-horizontal';
		var height = this.hHeight;
		var width = this.hWidth;
		if(this.windowWidthH==null){ this.getSize(); }
		var windowHeight = this.windowHeightH;
		var windowWidth = this.windowWidthH;
	} else {
		var height = this.vHeight;
		var width = this.vWidth;
		var className = 'vp-web';
		//var className = 'vp-horizontal';
		var windowHeight = this.windowHeightV;
		var windowWidth = this.windowWidthV;
	}
	// if we are mobile find our scale
	if(this.isMobile()){ var scaleWidth = (windowWidth/width);
	} else { var scaleWidth = '.4'; }
	// Make the viewport if it doesent exist
	if(this.viewport == null){ this.viewport = objectM.create('DIV',{},'',this.body);  }
	
	// Set all the transforms
	var viewport = this.viewport
	viewport.className = className;
	viewport.style.height = height+'px';
	viewport.style.width = width+'px';
	viewport.style.webkitTransform = "scale("+scaleWidth+")";
	viewport.style.MozTransform = "scale("+scaleWidth+")";
	viewport.style.msTransform = "scale("+scaleWidth+")";
	viewport.style.OTransform = "scale("+scaleWidth+")";
	viewport.style.transform = "scale("+scaleWidth+")";
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
    if(this.isMobile){
	    winW = screen.width;
	    winH = screen.height;
	} else { 
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
   	}
    if(window.orientation=='0'|| window.orientation == '180'){
	    this.windowHeightV = winH;
	    this.windowWidthV = winW;
    } else if(window.orientation == '90' || window.orientation == '-90'){
	    this.windowHeightH = winH;
	    this.windowWidthH = winW;
    }
}