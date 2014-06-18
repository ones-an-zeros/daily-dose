function requestManager(){
	
}
requestManager.prototype.makeRequest = function(){
	if (typeof XMLHttpRequest !== 'undefined') {
        this.request = new XMLHttpRequest();  
   } else {
	    var versions = [
	        "MSXML2.XmlHttp.5.0",   
	        "MSXML2.XmlHttp.4.0",  
	        "MSXML2.XmlHttp.3.0",   
	        "MSXML2.XmlHttp.2.0",  
	        "Microsoft.XmlHttp"
	    ];
	
	    var xhr;
	    for(var i = 0; i < versions.length; i++) {  
	        try {  
	            xhr = new ActiveXObject(versions[i]);  
	            break;  
	        } catch (e) {
	        }  
	    }
	    this.request = xhr;
	}
}
requestManager.prototype.ajaxSend = function(url, callback, method, data, sync){
	this.makeRequest();
	var x = this.request;
    x.open(method, url, sync);
    x.onreadystatechange = function() {
        if (x.readyState == 4) {
            callback(x.responseText)
        }
    };
    if (method == 'POST') {
        x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }
    x.send(data)
}
requestManager.prototype.ajaxGet = function(url, data, callback, sync) {
	this.makeRequest();
    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
   this.ajaxSend(url + '?' + query.join('&'), callback, 'GET', null, sync)
};
requestManager.prototype.ajaxPost = function(url, data, callback, sync) {
    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    this.ajaxSend(url, callback, 'POST', query.join('&'), sync)
};
