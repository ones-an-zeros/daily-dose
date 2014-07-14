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
	//requestM.ajaxGet('http://54.193.105.189/app-responder/daily-dose.inc.php', {'action':'get-quote','date':this.currentDate}, this.addQuote, false);
	this.buildHeader();
	this.buildQuoteBox();
	this.checkConnection();
	this.openDB();
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
	}
}
architect.prototype.buildHeader = function(){
	var viewport = this.viewport;
	var navButton = objectM.create('DIV',{'id':'nav-button','onclick':'architect.openNavigationMenu();'},'',viewport);
		navButton.innerHTML = '<i class="fa fa-bars fa-5x"></i>'
	var header = objectM.create('DIV',{'id':'header'},'',viewport);
	var h1 = objectM.create('H1',{},'',header);
	objectM.appendText('Daily Dose', h1);
	this.header = header;
}

architect.prototype.openNavigationMenu = function(){
	var objref = this;
	
	var content = "Myself ( Corey Rosamond ) And Nicole Pham developed and designed daily dose after I left a company called ABCMouse.com. It was a very stressfull job for me one that I wanted very much";
	content += " to do the best I could at, to impress my superiors. Nicole saw how much stress I was under and started putting these little post-it notes in my lunches. The first time I found one was after a very ";
	content += "stressfull meeting, my reaction was amazing it made my whole day just a little better and needless to say made my worries a bit easyer to deal with. Now I foolishly did not mention this soon ";
	content += "enough to Nicole and she stoped. Needless to say I went to her and asked why, she said she did not realize they were that important to me and started again. After I left the company Nicole came ";
	content += "to me with the idea for this app and here we are. I guess the point of that story is we simply hope that Daily Dose can be that Nicole to those that need it."
	
	contextM.newMenu();
	contextM.setTitle('Menu');
	contextM.add('About', 'showPage:1');
	contextM.add('Exit', 'close:true');
	contextM.add(content, '', 'content', 1);
	contextM.add('Back', 'showPage:0', 'button', 1);
	contextM.show();
	//this.aboutPopup();
}


architect.prototype.aboutPopup = function(){
	var content = "<br /><span>Myself ( Corey Rosamond ) And Nicole Pham developed and designed daily dose after I left a company called ABCMouse.com. It was a very stressfull job for me one that I wanted very much";
	content += " to do the best I could at, to impress my superiors. Nicole saw how much stress I was under and started putting these little post-it notes in my lunches. The first time I found one was after a very ";
	content += "stressfull meeting, my reaction was amazing it made my whole day just a little better and needless to say made my worries a bit easyer to deal with. Now I foolishly did not mention this soon ";
	content += "enough to Nicole and she stoped. Needless to say I went to her and asked why, she said she did not realize they were that important to me and started again. After I left the company Nicole came ";
	content += "to me with the idea for this app and here we are. I guess the point of that story is we simply hope that Daily Dose can be that Nicole to those that need it."
	popupM.create({
			'overlay':true,
			'height':'1300px',
			'width':'1000px',
			'closeText':'close',
			'title':'What is Daily Dose',
			'content':content
	});
}
architect.prototype.buildQuoteBox = function(){
	var viewport = this.viewport;
	this.displayedQuote = this.currentDate;
	var quoteBg = objectM.create('DIV',{'id':'quote-bg','onmousedown':'architect.queueMove(event);'},'',viewport);
	var quote = objectM.create('DIV',{'id':'quote'},'',quoteBg);
	this.quoteDate = objectM.create('DIV',{'id':'quote-date'},'',quote);
		//objectM.appendText(this.formatDate(this.currentDate), this.quoteDate);
	this.quoteText = objectM.create('DIV',{'id':'quote-text'},'',quote);
		//objectM.appendText('"'+this.quotes[this.currentDate]['quote']+'"', this.quoteText);
	this.quoteAuthor = objectM.create('DIV',{'id':'quote-author'},'',quote);
		//objectM.appendText('- '+this.quotes[this.currentDate]['author'], this.quoteAuthor);
	var navigation = objectM.create('DIV',{'id':'navigation'},'',viewport);
	var previous = objectM.create('BUTTON',{'id':'previous','onclick':'architect.changeQuote(\'PREV\');'},'',navigation);
		objectM.appendText('<',previous);
	var facebook = objectM.create('BUTTON',{'id':'facebook','onclick':'architect.shareFB();'},'',navigation);
		objectM.appendText('Share',facebook);
	var next = objectM.create('BUTTON',{'id':'previous','onclick':'architect.changeQuote(\'NEXT\');'},'',navigation);
		objectM.appendText('>',next);
}
architect.prototype.mousePosition = function(evt){
	var IE = document.all?true:false
	if (IE) { 
	    tempX = event.clientX + document.body.scrollLeft
	    tempY = event.clientY + document.body.scrollTop
    } else {  
        tempX = evt.pageX
        tempY = evt.pageY
    }  
    var pos = new Object();
    pos.x = tempX;
    pos.y = tempY;
    return pos;
}
architect.prototype.queueMove = function(evt){
	evt.preventDefault();
	var pos = architect.mousePosition(evt);
	architect.startPosition = pos;
	document.addEventListener('mousemove', architect.mouseMove, false);
	document.addEventListener('mouseup', architect.removeMove, false);
}
architect.prototype.mouseMove = function(evt){
	evt.preventDefault();
	var pos = architect.mousePosition(evt);
	architect.currentPosition = pos;
}
architect.prototype.removeMove = function(evt){
	var startPosition = architect.startPosition;
	var curentPosition = architect.currentPosition;
	var difference = Math.abs((curentPosition.y-startPosition.y));
	if( curentPosition.y < startPosition.y ){
		architect.changeQuote('PREV');
	} else if( curentPosition.y > startPosition.y ) {
		architect.changeQuote('NEXT');
	}
	document.removeEventListener('mousemove', architect.mouseMove, false)
	document.removeEventListener('mouseup', architect.removeMove, false)
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
		this.checkQuote(this.displayedQuote);
		//requestM.ajaxGet('http://54.193.105.189/app-responder/daily-dose.inc.php', {'action':'get-quote','date':this.displayedQuote}, this.displayQuote, false);
	}
}
architect.prototype.parseDate = function(str){
    var s = str.split(" "),
        d = str[0].split("-"),
        t = str[1].replace(/:/g, "");
        alert(d[2]);
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