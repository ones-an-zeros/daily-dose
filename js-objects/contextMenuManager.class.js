function contextMenuManager(){
	this.stack = [];
    this.menu = new Object();
	this.items = [];
	this.items[0] = [];
    //this.canvas = document.getElementById('viewport');
	this.canvas = layoutM.viewport;
    this.body = document.getElementsByTagName('body')[0];
    this.width = '1000px';
    this.height = '1300px';
    this.rowHeight = 80;//45;
    this.menu.pages = [];
    this.currentPageShown = 0;
    this.currentPageEdit = 0;
    this.isOpen = false;
}

contextMenuManager.prototype.setPosition = function(obj,height,width){
	/*
	var bodyHeight = this.canvas.offsetHeight;
	var bodyWidth = this.canvas.offsetWidth;
	if(bodyHeight == 0) bodyHeight = window.innerHeight;
	var objStyle = obj.style;
    objStyle.position = 'absolute';
    objStyle.width = width;
    objStyle.minHeight = height;
	objStyle.top = ((bodyHeight/2)-(parseInt(height, 10)/2)-100)+'px';
    objStyle.left = ((bodyWidth/2)-(parseInt(width, 10)/2))+'px';
    */
}

contextMenuManager.prototype.setTitle = function(text){
	this.title = text;
	this.menu.title = text;
}

contextMenuManager.prototype.add = function(text, action, type, page){
	if(page == void 0){
		page = this.currentPageEdit;
	}else if(page != this.currentPageEdit){
		this.currentPageEdit = page;
		if(this.items[page] == void 0){
			this.items[page] = [];
		}
	}
	switch(type){
		case 'content':
			this.addContent(text,page);
			break;
		case 'button':
		default:
			this.addButton(text,action,page);
			break;
	}
}


contextMenuManager.prototype.addButton = function(text, action, page){
	var item = [];
	item.push('button');
	item.push(text);
	item.push(action);
	this.items[page].push(item);
	this.menu.pages[page] = this.items[page];
}

contextMenuManager.prototype.addContent = function(text, page){
	var item = [];
	item.push('content');
	item.push(text);
	this.items[page].push(item);
	this.menu.pages[page] = this.items[page];
}

contextMenuManager.prototype.show = function(page){
	if(page != void 0){
		this.currentPageShown = page;
		this.clear();
	} else {
		if(this.isOpen == false){
			this.isOpen = true;
		} else {
			this.close();
			return true;
		}
	
	}
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
	    this.menuTitle = objectM.create('H1',{'class':'quicksand-book-regular'},'',  this.menuWindow );
	    objectM.appendText(this.title, this.menuTitle);
	    
	}
	this.menuContent = objectM.create('DIV',{'id':'menu-content','class':'allowScroll'},'', this.menuWindow );
	for ( var i=0; i<this.menu.pages[this.currentPageShown].length; i++ ){
	 	this.buildRow(i, this.menu.pages[this.currentPageShown][i], this.menuContent );
	}
	
	this.setPosition( this.menuWindow, this.height, this.width );
	Cufon.refresh();
}

contextMenuManager.prototype.buildRow = function(index, data, parent){
	var objref = this;
	switch(data[0]){
		case 'button':
		
			var row = objectM.create('DIV',{'id':'menu-row-'+index, 'class':'menu-row quicksand-book-regular', 'data':index},'width:100%; height:'+this.rowHeight+'px;',parent);
			if(data[1]=='Back'||data[1]=='Exit'){
				var position = 'position:absolute;bottom:20px;left:20px;';
			} else {
				var position = '';
			}
			var buttonDiv = objectM.create('DIV', {'id':'menu-button'}, 'line-height:'+this.rowHeight+'px;'+position, row );
				objectM.appendText(data[1],buttonDiv);
				//buttonDiv.addEventListener('click',function(e){ objref.menuItemClicked(e, index); });
				buttonDiv.addEventListener('touchend',function(e){ objref.menuItemClicked(e, index); });
			break;
		case 'content':
			var row = objectM.create('DIV',{'id':'menu-row-'+index, 'class':'menu-row', 'data':index},'width:100%;',parent);
			var contentDiv = objectM.create('DIV', {'id':'menu-text','class':'allowScroll'}, '', row );
				contentDiv.innerHTML = data[1];
			break;
		default:
	}
}


contextMenuManager.prototype.menuItemClicked = function(e, index){
	var action  = this.menu.pages[this.currentPageShown][index][2];
	if(typeof(action) == 'function'){
		action.call();
	}else if(typeof(action) == 'string'){
		if(action.indexOf(':') > -1){
			action = action.split(":");
			switch(action[0]){
				case 'showPage':
					this.show(parseInt(action[1]));
					break;
				case 'close':
					this.close();
					break;
				default:
			}
		}
	}
	this.dispatchEvent('menuItemClicked');
}

contextMenuManager.prototype.close = function(){
	this.currentPageShown = 0;
	this.isOpen = false;
	var overlay = document.getElementById('pop-overlay');
	overlay.style.width = '0%';
	overlay.style.height = '0%';
	objectM.remove( this.menuWindow );
}

contextMenuManager.prototype.clear = function(){
	objectM.remove( this.menuWindow );
}

contextMenuManager.prototype.newMenu = function(){
	this.menu = new Object();
	this.items = [];
	this.items[0] = [];
	this.menu.pages = [];
    this.currentPageShown = 0;
    this.currentPageEdit = 0;
}

contextMenuManager.prototype.dispatchEvent = function(eventString) {
	var event = document.createEvent('Event');
	event.initEvent(eventString, true, true);
	document.dispatchEvent(event);
}
