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
	requestM.ajaxGet('http://54.193.105.189/app-responder/daily-dose.inc.php', {'action':'get-quote','date':this.currentDate}, this.addQuote, false);
	this.buildHeader();
	this.buildQuoteBox();
	var now = new Date()
		now.setHours(9);
		now.setMinutes(0);
		now.setSeconds(0);
	window.plugin.notification.local.add({
	    id:      1,
	    title:   'Reminder',
	    message: 'Dont forget to get your Daily Dose of inspiration!',
	    repeat:  'daily',
	    date:    now
	});
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
	var infoMenu = new contextMenuManager();
	infoMenu.setTitle('Info');
	infoMenu.add('About', function(){infoMenu.close();});
	infoMenu.add('Exit', function(){infoMenu.close();});
	infoMenu.show();
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
	var quoteBg = objectM.create('DIV',{'id':'quote-bg'},'',viewport);
	var quote = objectM.create('DIV',{'id':'quote'},'',quoteBg);
	this.quoteDate = objectM.create('DIV',{'id':'quote-date'},'',quote);
		objectM.appendText(this.currentDate, this.quoteDate);
	this.quoteText = objectM.create('DIV',{'id':'quote-text'},'',quote);
		objectM.appendText('"'+this.quotes[this.currentDate]['quote']+'"', this.quoteText);
	this.quoteAuthor = objectM.create('DIV',{'id':'quote-author'},'',quote);
		objectM.appendText('- '+this.quotes[this.currentDate]['author'], this.quoteAuthor);
	var navigation = objectM.create('DIV',{'id':'navigation'},'',viewport);
	var previous = objectM.create('BUTTON',{'id':'previous','onclick':'architect.changeQuote(\'PREV\');'},'',navigation);
		objectM.appendText('<',previous);
	var facebook = objectM.create('BUTTON',{'id':'facebook','onclick':'architect.shareFB();'},'',navigation);
		objectM.appendText('Share',facebook);
	var next = objectM.create('BUTTON',{'id':'previous','onclick':'architect.changeQuote(\'NEXT\');'},'',navigation);
		objectM.appendText('>',next);
		
}
architect.prototype.shareFB = function(){
	window.plugins.socialsharing.share(architect.quoteText.innerHTML+' '+architect.quoteAuthor.innerHTML+' - Shared Via Daily Dose https://play.google.com/store/apps/details?id=com.ones_n_zeros.DailyDose');
}
architect.prototype.addQuote = function( data ){
	data = JSON.parse(data);
	var dParts = data.date.split(" "); 
	var baseDate = dParts[0];
	architect.quotes[baseDate] = new Array();
	architect.quotes[baseDate]['author'] = data['author'];
	architect.quotes[baseDate]['quote'] = data['quote'];
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
		requestM.ajaxGet('http://54.193.105.189/app-responder/daily-dose.inc.php', {'action':'get-quote','date':this.displayedQuote}, this.displayQuote, false);
	}
}
architect.prototype.parseDate = function(str){
    var s = str.split(" "),
        d = str[0].split("-"),
        t = str[1].replace(/:/g, "");
        alert(d[2])
    return d[2] + d[1] + d[0] + t;
}
architect.prototype.displayQuote = function( data ){
	data = JSON.parse(data);
	var dParts = data.date.split(" "); 
	var baseDate = dParts[0];
	architect.quotes[baseDate] = new Array();
	architect.quotes[baseDate]['author'] = data['author'];
	architect.quotes[baseDate]['quote'] = data['quote'];
	architect.quoteText.innerHTML = data['quote'];
	architect.quoteDate.innerHTML = baseDate;
	architect.quoteAuthor.innerHTML = data['author'];
}
