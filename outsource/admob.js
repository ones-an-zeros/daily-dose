var admob_ios_key = '';
var admob_android_key = 'ca-app-pub-5231668809835913/2089722986';
var adId = (navigator.userAgent.indexOf('Android') >=0) ? admob_android_key : admob_ios_key;
	function onLoad() {
	document.addEventListener("deviceready", onDeviceReady, false);
	
	// more callback to handle Ad events
	document.addEventListener('onReceiveAd', function(){
	});
	document.addEventListener('onFailedToReceiveAd', function(data){
	});
	document.addEventListener('onPresentAd', function(){
	});
	document.addEventListener('onDismissAd', function(){
	});
	document.addEventListener('onLeaveToAd', function(){
	});
}
function createAd() {
	if ( window.plugins && window.plugins.AdMob ) {
	    var am = window.plugins.AdMob;
	    am.createBannerView(
                            {
                            'publisherId': adId,
                            'adSize': am.AD_SIZE.BANNER,
                            'bannerAtTop': false
                            }, function() {
                            am.requestAd( { 'isTesting':true }, function() {
                                         am.showAd( true );
                                         }, function() {
                                         alert('failed to request ad');
                                         })
                            }, function(){
                            alert( "failed to create ad view" );
                            });
                            
                            layoutM.getSize();
                            alert(layoutM.windowHeight);
	} else {
		alert('AdMob plugin not available/ready.');
	}
}
function removeAd() {
    if ( window.plugins && window.plugins.AdMob ) {
	    var am = window.plugins.AdMob;
	    am.destroyBannerView();
    }

}
function onDeviceReady() {
	createAd();
}
function showAd( bshow ) {
	if ( window.plugins && window.plugins.AdMob ) {
	    var am = window.plugins.AdMob;
	    am.showAd( bshow, function(){}, function(){ alert('please create ad first'); } );
	} else {
		alert('AdMob plugin not available/ready.');
	} 
}
function showInterstitialAd() {
    var am = window.plugins.AdMob;
    am.createInterstitialView(
                              {
                              'publisherId': adId,
                              },
                              function() {
                              am.requestInterstitialAd( { 'isTesting':true }, function() {}, function() {
                                                       alert('failed to request ad');
                                                       });
                              },
                              function() {
                              alert("Interstitial failed");
                              }
                              );
}
function onResize() {
    var msg = 'web view: ' + window.innerWidth + ' x ' + window.innerHeight;
    document.getElementById('sizeinfo').innerHTML = msg;
}
document.body.addEventListener('touchmove',function(e){
	    e = e || window.event;
	    var target = e.target || e.srcElement;
	    //in case $altNav is a class:
	    if (!target.className.match(/\baltNav\b/))
	    {
	        e.returnValue = false;
	        e.cancelBubble = true;
	        if (e.preventDefault)
	        {
	            e.preventDefault();
	            e.stopPropagation();
	        }
	        return false;//or return e, doesn't matter
	    }
	    //target is a reference to an $altNav element here, e is the event object, go mad
	},false);