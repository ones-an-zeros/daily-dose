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
}
architect.prototype.buildHeader = function(){
	var viewport = this.viewport;
	var header = objectM.create('DIV',{'id':'header'},'',viewport);
		objectM.appendText('Daily Dose', header);
	this.header = header;
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
	var twitter = objectM.create('BUTTON',{'id':'twitter','onclick':'architect.changeQuote(\'PREV\');'},'',navigation);
		objectM.appendText('Twitter',twitter);
	var facebook = objectM.create('BUTTON',{'id':'facebook','onclick':'architect.shareFB();'},'',navigation);
		objectM.appendText('Facebook',facebook);
	var next = objectM.create('BUTTON',{'id':'previous','onclick':'architect.changeQuote(\'NEXT\');'},'',navigation);
		objectM.appendText('>',next);
		
}
architect.prototype.shareFB = function(){
	window.plugins.socialsharing.share('Message only')
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
	var d = new Date(this.displayedQuote);
	var month = d.getUTCMonth();
	if(opt=='PREV'){ var day = (d.getUTCDate()-1);
 	} else { var day = (d.getUTCDate()+1); }	
    var year = d.getUTCFullYear();
    month = month + 1;
    month = month + "";
    if (month.length == 1) {  month = "0" + month; }
    day = day + "";
    if (day.length == 1){ day = "0" + day; }
	var date = year+'-'+month+'-'+day;
	this.displayedQuote = date;
	requestM.ajaxGet('http://54.193.105.189/app-responder/daily-dose.inc.php', {'action':'get-quote','date':this.displayedQuote}, this.displayQuote, false);
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
