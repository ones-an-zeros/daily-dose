function eventManager(){
  	this.stack = new Array();
}

eventManager.prototype.fire = function( e ){
    var type = e.type;
    var obj = e.target;
    var index = obj.getAttribute('event');  
    if(index == null){ var index = obj.parentNode.getAttribute('event'); }
    var event = this.stack[index];
    if(event!=void 0){
	    if(event.trigger[type].param == null ){ event.trigger[type].func.apply(event.trigger[type].scope,[e]);
	    } else { event.trigger[type].func.apply( event.trigger[type].scope,[event.trigger[type].param] ); }
    }
}

eventManager.prototype.findObject = function ( obj ){
  	var stack = this.stack;
  	var i = stack.length;
  	while(i--){
    	var event = this.stack[i];
    	if(event != void 0 && event.domObj == obj){
      		return i;
    	}
  	}
  	return null;
}

eventManager.prototype.add = function( obj, type, func, param, scope ){
  	var stack = this.stack;
  	var objref = this;
  	if( typeof obj == 'string'){ var obj = document.getElementById( obj ); }
  	if( param === void 0 ){ var param  = null; }
  	var test = this.findObject( obj );
  	if( test != null ){
    	var index = test;
    	var event = stack[index];
    	event.trigger[type] = new Object();
    	event.trigger[type].func = func;
    	event.trigger[type].param =  param;
    	obj.setAttribute('event', index);
  	} else {
    	var event = new Object();
    	event.domObj = obj;
    	event.trigger = new Array();
    	event.trigger[type] = new Object();
    	event.trigger[type].func = func;
    	event.trigger[type].param =  param;
    	event.trigger[type].scope = scope;
    	stack.push( event );
    	var index = (stack.length-1);
    	obj.setAttribute('event', index);
  	}
  	obj.addEventListener( type, objref.fire.bind(objref)) ;
}

eventManager.prototype.remove = function( index ){
  	this.stack.splice(index,1);
}

