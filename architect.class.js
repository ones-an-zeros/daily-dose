function architect(){
	this.quotes = new Array();
	this.viewport = layoutM.viewport;
	var d = new Date();
	var month = d.getUTCMonth();
    var day = d.getUTCDate();
    var year = d.getUTCFullYear();
    month = month + 1;
    month = month + "";
    if (month.length == 1) {  month = "0" + month; }
    day = day + "";
    if (day.length == 1){ day = "0" + day; }
	this.currentDate = year+'-'+month+'-'+day;
}
architect.prototype.init = function(){
	contextM.newMenu();
	contextM.setTitle('Settings');
	var contentOne = "<h2>About Us</h2><span class='indent'>&nbsp;</span>Daily Dose started out as a little act of kindness that ended up meaning the world to someone.<br /><br /><span class='indent'>&nbsp;</span>My name is Nicole and I am a firm believer in the power of words and their ability to brighten someone's day up.<br /><br /><span class='indent'>&nbsp;</span>When my boyfriend Corey was working at a company called ABC mouse he was under constant stress. I began to notice more and more that his job was affecting his spirit and zest. Hoping to cheer him up, I began leaving little post-its with quotes of inspiration and messages of motivational sayings in his lunch bag.<br /><br /><span class='indent'>&nbsp;</span>He explained that finding the messages after a nerve-racking meeting made his whole day better and his worries easier to deal with. I was so happy that my small gesture cheered him up so much.<br /><br /><span class='indent'>&nbsp;</span>Together Corey and I developed Daily Dose with hopes that it can bring a smile to you when you need it most.";
	var contentTwo = "<h2>What We Do</h2><span class='indent'>&nbsp;</span>Here at Daily Dose it is our goal to deliver you the best quotes and sayings to lift you up when you need it most.<br /><br /><span class='indent'>&nbsp;</span>The quotes come with a powerful punch of motivation designed to help you gain a new outlook on life. Need a simple push in the right direction? Daily Dose is the app for you!<br /><br /><span class='indent'>&nbsp;</span>Our fans are the most important thing to us so naturally we want to here from you! Therefore we are in the process of creating a user-submitted-quotes feature complete with ratings. In the meantime you can submit your questions, comments, or concerns in the \"Contact Us\" tab. Currently Daily Dose is only compatible with Android devices. We will be Apple friendly in a few weeks.<br /><br /><span class='indent'>&nbsp;</span>If you cannot download the app, no worries! Other options include liking us on Facebook, following us on Twitter, and following us on Instagram. You can also sign up to get daily quotes sent directly to your email!<br /><br /><span class='indent'>&nbsp;</span>Thank you for all your patience and support. We hope you have a wonderful experience on your journey towards inspiration."; 
	var contentThree = "<span style='display:block;float:left;width:600px;'>"+
		"<strong>Address Info</strong><br />7440 North Sepulveda<br />Van Nuys, CA, 91405<br /><br />"+
		"</span><span style='display:block;float:left;width:600px;'><strong>Contact Info</strong><br /><strong>Website</strong>: <a href='http://www.dailydosenow.com'>DailyDoseNow.com</a><br />"+
		"<strong>Email: </strong><a href='mailto:Nicole.DailyDose@gmail.com?Subject=How%20acan%20awe%20abe%20aof%20aservice?' target='_top'>Nicole.DailyDose@gmail.com</a><br />"+
		"<strong>Phone</strong>: (818) 386-8248 </span>";
	var contentFour = ''+
		'<a target="_blank" href="https://twitter.com/dailydose_now" style="text-align:center;float:left;display:block;width:450px;"><img src="images/twitter.jpg" width="450" height="450" />Follow Us On Twitter</a>' +
		'<a target="_blank" href="https://www.facebook.com/DailyDoseNow?ref=hl" style="text-align:center;float:left;display:block;width:450px;"><img src="images/facebook.jpg" width="450" height="450" />Let\'s Get Personal </a>';
	contextM.add('About Us', 'http://www.dailydosenow.com/index.php?page=about');
	contextM.add('What We Do', 'http://www.dailydosenow.com/index.php?page=what-we-do');
	contextM.add('Contact Us', 'showPage:3');
	contextM.add('Social Networking', 'showPage:4');
	contextM.add('Exit', 'close:true',0);
	contextM.add(contentThree, '', 'content', 3);
	contextM.add('Back', 'showPage:0', 'button', 3);
	contextM.add(contentFour, '', 'content', 4);
	contextM.add('Back', 'showPage:0', 'button', 4);
	this.buildHeader();
	this.buildQuoteBox();
	var now = new Date()
		now.setHours(9);
		now.setMinutes(0);
		now.setSeconds(0);
	if(development == false ){
		window.plugin.notification.local.add({
		    id:      1,
		    title:   'Reminder',
		    message: 'Dont forget to get your Daily Dose of inspiration!',
		    repeat:  'daily',
		    date:    now
		});
		this.checkConnection();
		this.openDB();
	}else{
		requestM.ajaxGet('http://54.193.105.189/app-responder/daily-dose.inc.php', {'action':'get-quote','date':this.currentDate}, this.displayQuote, false);
	}
}
architect.prototype.setOrientation = function(){
	
}
architect.prototype.changeOrientation = function(){
	layoutM.drawStage();
}
architect.prototype.buildHeader = function(){
	var viewport = this.viewport;
	var header = objectM.create('DIV',{'class':'header'},'',viewport);
	var buttonContainer = objectM.create('DIV',{'class':'button-container'},'',header);
	var navButton = objectM.create('DIV',{'class':'navigation-button quicksand-book-regular','onclick':'architect.openNavigationMenu();'},'',buttonContainer);
		objectM.appendText('Menu',navButton);
	var h1 = objectM.create('H1',{'class':'quicksand-book-oblique-regular'},'',header);
		h1.innerHTML = '<img src="images/logo.png" />Daily Dose';
	this.header = header;
}

architect.prototype.openNavigationMenu = function(){
	var objref = this;
	contextM.show();
	//this.aboutPopup();
}


architect.prototype.buildQuoteBox = function(){
	var viewport = this.viewport;
	this.displayedQuote = this.currentDate;
	var quoteBg = objectM.create('DIV',{'id':'quote-bg','class':'quote-bg','ontouchstart':'architect.queueMove(event);'},'',viewport);
	var quote = objectM.create('DIV',{'id':'quote','class':'quote'},'',quoteBg);
	this.quoteDate = objectM.create('DIV',{'id':'quote-date','class':'quote-date quicksand-book-regular'},'',quote);
		//objectM.appendText(this.formatDate(this.currentDate), this.quoteDate);
	this.quoteText = objectM.create('DIV',{'id':'quote-text','class':'quote-text quicksand-book-regular'},'',quote);
		//objectM.appendText('"'+this.quotes[this.currentDate]['quote']+'"', this.quoteText);
	this.quoteAuthor = objectM.create('DIV',{'id':'quote-author', 'class':'quote-author quicksand-book-regular'},'',quote);
		//objectM.appendText('- '+this.quotes[this.currentDate]['author'], this.quoteAuthor);
	var navigation = objectM.create('DIV',{'id':'navigation','class':'navigation'},'',viewport);
	var previous = objectM.create('BUTTON',{'id':'previous','class':'previous quicksand-book-regular','onclick':'architect.changeQuote(\'PREV\');'},'',navigation);
		objectM.appendText('Previous',previous);
	var facebook = objectM.create('BUTTON',{'id':'facebook','class':'share quicksand-book-regular','onclick':'architect.shareFB();'},'',navigation);
		objectM.appendText('Share',facebook);
	var next = objectM.create('BUTTON',{'id':'previous','class':'next quicksand-book-regular','onclick':'architect.changeQuote(\'NEXT\');'},'',navigation);
		objectM.appendText('Next',next);
}
architect.prototype.shareFB = function(){
	var author = architect.quotes[architect.displayedQuote]['author'];
	var quote = architect.quotes[architect.displayedQuote]['quote'];
	window.plugins.socialsharing.share(
		quote+' '+author+' - Shared Via Daily Dose http://www.dailydosenow.com'
	);
}
architect.prototype.mousePosition = function(evt){
	var touch = event.touches[0];
    var pos = new Object();
    pos.x = touch.pageX;
    pos.y = touch.pageY;
    return pos;
}
architect.prototype.queueMove = function(evt){
	evt.preventDefault();
	var pos = architect.mousePosition(evt);
	architect.startPosition = pos;
	document.addEventListener('touchmove', architect.mouseMove, false);
	document.addEventListener('touchend', architect.removeMove, false);
}
architect.prototype.mouseMove = function(evt){
	evt.preventDefault();
	var pos = architect.mousePosition(evt);
	architect.currentPosition = pos;
}
architect.prototype.removeMove = function(evt){
	var startPosition = architect.startPosition;
	var curentPosition = architect.currentPosition;
	var difference = Math.abs((curentPosition.x-startPosition.x));
	if(difference>100){
		if( curentPosition.x > startPosition.x ){
			architect.changeQuote('PREV');
		} else if( curentPosition.x < startPosition.x ) {
			architect.changeQuote('NEXT'); 
		}
	}
	document.removeEventListener('touchmove', architect.mouseMove, false)
	document.removeEventListener('touchend', architect.removeMove, false)
	architect.startPosition = null;
	architect.currentPosition = null;
}
architect.prototype.addQuote = function( data ){
	var sourceData = data;
	data = JSON.parse(data);
	var dParts = data.date.split(" "); 
	var baseDate = dParts[0];
	architect.quotes[baseDate] = new Array();
	architect.quotes[baseDate]['author'] = data['author'];
	architect.quotes[baseDate]['quote'] = data['quote'];
}

architect.prototype.checkQuote = function(date){
if(date == void 0) date = architect.currentDate;
	if(date == architect.currentDate){
		this.db.transaction(function(tx) {
			tx.executeSql("SELECT * FROM post ORDER BY quote_date DESC LIMIT 1;",[],
				function(tx,result){
					var arrayResults = [];
					var len = result.rows.length;
					if(len > 0){
						if(architect.stripTime(result.rows.item(0).quote_date) == date){
							var data = new Object();
								data.date = result.rows.item(0).quote_date;
								data.author = result.rows.item(0).quote_author;
								data.quote = result.rows.item(0).quote;
								architect.displayQuote(JSON.stringify(data));
						}else{
							architect.getQuote(date);
						}
					}else{
						architect.getQuote(date);
					}
				},this.errorCB);
		},this.errorCB);
	}else{
		this.db.transaction(function(tx) {
			tx.executeSql("SELECT * FROM post WHERE quote_date like '"+ date +"%' LIMIT 1;",[],
				function(tx,result){
					var arrayResults = [];
					var len = result.rows.length;
					if(len > 0){
						if(architect.stripTime(result.rows.item(0).quote_date) == date){
							var data = new Object();
							data.date = result.rows.item(0).quote_date;
							data.author = result.rows.item(0).quote_author;
							data.quote = result.rows.item(0).quote;
							architect.displayQuote(JSON.stringify(data));
						}else{
							architect.getQuote(date);
						}
					}else{
						architect.getQuote(date);
					}
				},this.errorCB);
		},this.errorCB);
	}
}

architect.prototype.getQuote = function(date){
	architect.checkConnection();
	if(this.hasInternet){
		architect.storeQuote = true;
		requestM.ajaxGet('http://54.193.105.189/app-responder/daily-dose.inc.php', {'action':'get-quote','date':date}, architect.displayQuote, false);
	}else{
		var data = new Object();
		data.date = date;
		data.author = 'Daily Dose';
		data.quote = 'Device currently has no internet. You can look at previously viewed quotes but to view current quotes please verify your device has internet and then restart the app.';
		architect.displayQuote(JSON.stringify(data));
	}
}

architect.prototype.addQuoteToDB = function(author, quote, date){
	this.db.transaction(function(tx) {
		tx.executeSql("INSERT INTO post ('quote_date', 'quote_author', 'quote') VALUES (?, ?, ?);", [date, author,quote]);
	},this.errorCB);
}

architect.prototype.openDB = function(){
	this.db = window.sqlitePlugin.openDatabase({  
				name : "dailydose"  
			});
	this.db.transaction(this.createDB, this.errorCB);
}

architect.prototype.createDB = function(tx) {
    tx.executeSql("CREATE TABLE IF NOT EXISTS 'post' ('quote_key' integer not null primary key autoincrement, 'quote_date' text not null default current_timestamp, 'quote_author' text not null, 'quote' text not null);");
	architect.checkQuote();
}

architect.prototype.errorCB = function(err) {
	console.log("Error processing SQL: "+err.message +' code: ' + err.code);
}

architect.prototype.changeQuote = function( opt ){
	var dateObj = new Date(this.displayedQuote);
	if(opt=='PREV'){ var math = '-1'; 
 	} else { var math = '1'; }
 	var newDate = dateObj.addDays(math);
 	var day = newDate.getUTCDate();
 	var month = newDate.getUTCMonth();
    var year = newDate.getUTCFullYear();
 	var today = new Date();
    var currentDate = new Date();
 	if (newDate < today) {
	    month = month + 1;
	    month = month + "";
	    if (month.length == 1) {  month = "0" + month; }
	    day = day + "";
	    if (day.length == 1){ day = "0" + day; }
		var date = year+'-'+month+'-'+day;
		this.displayedQuote = date;
		if(development == false ){
			this.checkQuote(this.displayedQuote);
		}else{
			requestM.ajaxGet('http://54.193.105.189/app-responder/daily-dose.inc.php', {'action':'get-quote','date':this.displayedQuote}, this.displayQuote, false);
		}
	}
}
architect.prototype.parseDate = function(str){
    var s = str.split(" "),
        d = str[0].split("-"),
        t = str[1].replace(/:/g, "");
    return d[2] + d[1] + d[0] + t;
}

architect.prototype.stripTime = function(str){
    var s = str.split(" "),
        d = s[0].split("-");
    return s[0];
}

architect.prototype.formatDate = function(date){
	var weekday = new Array(7);
  		weekday[0]=  "Sunday";
  		weekday[1] = "Monday";
 		weekday[2] = "Tuesday";
  		weekday[3] = "Wednesday";
  		weekday[4] = "Thursday";
  		weekday[5] = "Friday";
  		weekday[6] = "Saturday";
 	var month = new Array();
  		month[0] = "January";
  		month[1] = "February";
  		month[2] = "March";
  		month[3] = "April";
  		month[4] = "May";
  		month[5] = "June";
  		month[6] = "July";
  		month[7] = "August";
  		month[8] = "September";
  		month[9] = "October";
  		month[10] = "November";
  		month[11] = "December";
 	var date = new Date( date );
 	var dayofweek =  date.getDay();
 	var monthofyear = date.getMonth();  
 	var dayofmonth = date.getDate()
 	var year = date.getFullYear()
 	var returnDate = weekday[dayofweek]+', '+month[monthofyear]+', '+dayofmonth+', '+year;
	return returnDate;
}
architect.prototype.displayQuote = function( data ){
	data = JSON.parse(data);
	var dParts = data.date.split(" "); 
	var baseDate = dParts[0];
	architect.quotes[baseDate] = new Array();
	architect.quotes[baseDate]['author'] = data['author'];
	architect.quotes[baseDate]['quote'] = data['quote'];
	architect.quoteText.innerHTML = '"'+data['quote']+'"';
	architect.quoteDate.innerHTML = architect.formatDate(baseDate);
	architect.quoteAuthor.innerHTML = "- "+data['author'];
	if(architect.storeQuote == true){
		architect.storeQuote = false;
		architect.addQuoteToDB(data['author'],data['quote'],data['date']);
	}
	Cufon.refresh();
}

architect.prototype.checkConnection = function() {
    var networkState = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';
	if(states[networkState] == 'No network connection'){
		this.hasInternet = false;
	}else{
		this.hasInternet = true;
	}
}
