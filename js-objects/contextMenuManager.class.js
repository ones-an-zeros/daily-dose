function contextMenuManager(){
	this.stack = [];
    this.menu = new Object();
	this.items = [];
    this.canvas = document.getElementById('viewport');
    this.body = document.getElementsByTagName('body')[0];
    this.width = '150px';
    this.height = '50px';
    this.rowHeight = 25;
}

contextMenuManager.prototype.setPosition = function(obj,height,width){
	var bodyHeight = this.canvas.offsetHeight;
	var bodyWidth = this.canvas.offsetWidth;
	var objStyle = obj.style;
    objStyle.position = 'absolute';
    objStyle.width = width;
    objStyle.minHeight = height;
    objStyle.top = ((bodyHeight-parseInt(obj.offsetHeight, 10))/2)+'px';
    objStyle.left = ((bodyWidth/2)-(parseInt(width, 10)/2))+'px';
}

contextMenuManager.prototype.setTitle = function(text){
	this.title = text;
	this.menu.title = text;
}

contextMenuManager.prototype.add = function(text, action){
	var item = [];
	item.push(text);
	item.push(action);
	this.items.push(item);
	this.menu.items = this.items;
}

contextMenuManager.prototype.show = function(){
	if(document.getElementById('pop-overlay') == void 0 ){
    		this.overlay = objectM.create('DIV',{'id':'pop-overlay'},'', this.canvas );
    } else {
    		this.overlay = document.getElementById('pop-overlay');
    		this.overlay.style.width = '100%';
    		this.overlay.style.height = '100%';
    }
    this.bodyContainer = this.overlay;
    this.menuWindow = objectM.create('DIV',{'id':'menu-window'},'', this.bodyContainer );
	
    if(this.title != void 0 && this.title != ''){
	    this.menuTitle = objectM.create('H1',{},'',  this.menuWindow );
	    	objectM.appendText(this.title, this.menuTitle);
	}
	this.menuContent = objectM.create('DIV',{'id':'menu-content'},'', this.menuWindow );
	console.log(this.items.length);
	for ( var i=0; i<this.items.length; i++ ){
	 		this.buildRow(i, this.items[i], this.menuContent );
	}
	
	this.setPosition( this.menuWindow, this.height, this.width );
	console.log('width: '+this.menuWindow.style.width);
	console.log('top: '+this.menuWindow.style.top);
}

contextMenuManager.prototype.buildRow = function(index, data, parent){
	var objref = this;
	var row = objectM.create('DIV',{'id':'menu-row-'+index, 'class':'menu-row', 'data':index},'width:100%; height:'+this.rowHeight+'px;',parent);
	var buttonDiv = objectM.create('DIV', {'id':'menu-button'}, '', row );
			objectM.appendText(data[0],buttonDiv);		
	row.addEventListener('click',function(e){ objref.menuItemClicked(e, index); });
}


contextMenuManager.prototype.menuItemClicked = function(e, index){
	var action  = this.items[index][1];
	if(typeof(action) == 'function'){
		action.call();
	}
	this.dispatchEvent('menuItemClicked');
}

contextMenuManager.prototype.close = function(){
	var overlay = document.getElementById('pop-overlay');
	overlay.style.width = '0%';
	overlay.style.height = '0%';
	objectM.remove( this.menuWindow );
}

contextMenuManager.prototype.dispatchEvent = function(eventString) {
	var event = document.createEvent('Event');
	event.initEvent(eventString, true, true);
	document.dispatchEvent(event);
}
