function popupManager(){
    this.stack = new Object();
    this.canvas = document.getElementById('viewport');
    this.body = document.getElementsByTagName('body')[0];
}
popupManager.prototype.setPosition = function(obj,height,width){
	var bodyHeight = this.canvas.offsetHeight;
	var bodyWidth = this.canvas.offsetWidth;
	var objStyle = obj.style;
    objStyle.position = 'absolute';
    objStyle.width = width;
    objStyle.minHeight = height;
    objStyle.top = (((bodyHeight/2)-(parseInt(obj.offsetHeight, 10)/2))-100)+'px';
    objStyle.left = ((bodyWidth/2)-(parseInt(width, 10)/2))+'px';
}
popupManager.prototype.create = function( params ){
    if( params.overlay != void 0 && params.overlay ){
    	if(document.getElementById('pop-overlay') == void 0 ){
    		this.overlay = objectM.create('DIV',{'id':'pop-overlay'},'', this.canvas );
    	} else {
    		this.overlay.style.width = '100%';
    		this.overlay.style.height = '100%';
    	}
    	this.bodyContainer = this.overlay;
    } else { this.bodyContainer = this.body; }
    this.popupWindow = objectM.create('DIV',{'id':'pop-window'},'', this.bodyContainer );
    if(params.title != void 0 && params.title != ''){
	    this.title = objectM.create('H1',{},'',  this.popupWindow );
	    	objectM.appendText(params.title, this.title);
	}
	this.popContent = objectM.create('DIV',{'id':'pop-content'},'', this.popupWindow );
	if(typeof params.content == 'string'){
		this.popContent.innerHTML = params.content;
	} else { this.popContent.appendChild(params.content); }
	switch( params.type ){
		case 'dialog':
		break;
		case 'progress':
			this.popContent.id = 'pop-content-grey';
			this.popProgressBarContainer = objectM.create('DIV',{'id':'pop-progressbar-container'},'', this.popupWindow );
			this.popProgressValues = objectM.create('DIV',{'id':'pop-progress-values'},'', this.popProgressBarContainer);
			this.popProgressValues.innerHTML = params.value + '/' + params.maxValue;
			this.popProgressBar = objectM.create('DIV',{'id':'pop-progressbar'},'', this.popProgressBarContainer );
			this.popProgress = objectM.create('DIV',{'id':'pop-progress'},'', this.popProgressBar );
			this.popProgress.style.width = '0%';
			this.maxValue = params.maxValue;
		break;
		case 'basic':
		default:
			this.close = objectM.create('SPAN',{'id':'pop-close','onclick':'popupM.closeButton()'},'', this.popupWindow );
				objectM.appendText(params.closeText, this.close);
		break;
	}
	this.setPosition( this.popupWindow, params.height, params.width );
}

popupManager.prototype.updateProgress = function( value ){
	if(this.popProgressValues){
		this.popProgressValues.innerHTML = value + '/' + this.maxValue;
		this.popProgress.style.width = ((value/this.maxValue)*100) + '%';
	}
}
popupManager.prototype.closeButton = function( obj ){
	if( this.overlay != void 0 ){
		this.overlay.style.width = '0%';
		this.overlay.style.height = '0%';
	}
	objectM.remove( this.popupWindow );
}
popupManager.prototype.close = function( e ){
	if(e === void 0 ){
		var overlay = document.getElementById('pop-overlay');
		overlay.style.width = '0%';
		overlay.style.height = '0%';
	    objectM.remove( this.popupWindow );
	} else {
		if(e.target.id == 'pop-overlay') {
			if(e.target.id == 'pop-overlay') {
			e.target.style.width = '0%';
			e.target.style.height = '0%';
		    objectM.remove( this.popupWindow );
	}
		}	
	}
}
