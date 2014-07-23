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
    this.drawStage();
}
layoutManager.prototype.drawStage = function(){
	if(this.viewport!=null){
		this.viewport.style.display="none";
		this.viewport.style.visibility="hidden";
	}
	var body = this.body;
	var orientation = this.getSize();
	if(orientation == 'V'){
		var className = 'vp-verticle';
		var height = this.vHeight;
		var width = this.vWidth;
		var windowHeight = this.windowHeightV;
		var windowWidth = this.windowWidthV;
		body.style.width = windowWidth+'px'
		body.style.height = windowHeight+'px';
	} else {
		var className = 'vp-horizontal';
		var height = this.hHeight;
		var width = this.hWidth;
		var windowHeight = this.windowHeightH;
		var windowWidth = this.windowWidthH;
		body.style.width = windowWidth+'px'
		body.style.height = windowHeight+'px';
	}
	this.orientation = orientation;
	// if we are mobile find our scale
	if(this.isMobile()){ var scaleWidth = (windowWidth/width);
	} else { var scaleWidth = '.4'; }
	// Make the viewport if it doesent exist
	if(this.viewport == null){ this.viewport = objectM.create('DIV',{},'display:none;visibility:hidden;',this.body);  }
	
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
	viewport.style.display = 'block';
	viewport.style.visibility = "visible";
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
    if(winH>winW){ var orientation = 'V';
   	} else { var orientation = 'H'; }
    if(orientation == 'V'){
	    this.windowHeightV = winH;
	    this.windowWidthV = winW;
    } else {
	    this.windowHeightH = winH;
	    this.windowWidthH = winW;
    }
    return orientation;
}