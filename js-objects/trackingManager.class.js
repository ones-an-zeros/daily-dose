function trackingManager( ip_address, site, profile_id ){
	this.profile_id = profile_id
	this.tracking_id = null;
	if( ip_address == void 0 || ip_address == ''){
		alert('You must provide an ip address!');
	} else {
		this.ip_address = ip_address;
	}
	this.browser = navigator.userAgent;
	this.site_key = site;
}
trackingManager.prototype.init = function(){
	requestM.ajaxGet('responder/tracking.responder.inc.php', {'site':this.site_key,'action':'init','browser':this.browser,'ip_address':this.ip_address,'profileId':this.profile_id}, trackingM.setParams);
}
trackingManager.prototype.setParams = function( data ){
	data = JSON.parse( data );
	trackingM.tracking_id = data.tracking_key;
}
trackingManager.prototype.addLog = function( entry ){
	requestM.ajaxGet('responder/tracking.responder.inc.php', {'site':this.site_key,'action':'addLog','entry':entry,'tracking_id':this.tracking_id}, trackingM.callback);
}
trackingManager.prototype.add = function( tracking_action ){
	requestM.ajaxGet('responder/tracking.responder.inc.php', {'site':this.site_key,'action':'add','action_key':tracking_action,'tracking_id':this.tracking_id}, trackingM.callback);
}
trackingManager.prototype.addEmailTrack = function( total ){
	requestM.ajaxGet('responder/tracking.responder.inc.php', {'site':this.site_key,'action':'addEmailTrack','amount':total,'tracking_id':this.tracking_id}, trackingM.callback);
}
trackingManager.prototype.pushFbRequest = function( request_id, amount ){
	requestM.ajaxGet('responder/tracking.responder.inc.php', {'site':this.site_key,'action':'pushFbRequest','tracking_id':this.tracking_id,'request_id':request_id,'amount':amount}, trackingM.callback);
}

trackingManager.prototype.callback = function( data ){ }
