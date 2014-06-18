function architect(){
	this.quotes = new Array();
	this.viewport = layoutM.viewport;
	
	var d = new Date();
	var month = d.getMonth();
    var day = d.getDate();
    var year = d.getFullYear();
    month = month + 1;
    month = month + "";
    if (month.length == 1) {  month = "0" + month; }
    day = day + "";
    if (day.length == 1){ day = "0" + day; }
	this.currentDate = year+'-'+month+'-'+day;
}
architect.prototype.init = function(){
	requestM.ajaxGet('http://54.193.105.189/app-responder/daily-dose.inc.php', {'action':'todays-quote','date':this.currentDate}, this.addQuote, false);
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
	var quote = objectM.create('DIV',{'id':'quote'},'',viewport);
	var quoteDate = objectM.create('DIV',{'id':'quote-date'},'',quote);
		objectM.appendText(this.currentDate, quoteDate);
	var quoteText = objectM.create('DIV',{'id':'quote-text'},'',quote);
		objectM.appendText(this.quotes[this.currentDate]['quote'], quoteText);
	var quoteAuthor = objectM.create('DIV',{'id':'quote-author'},'',quote);
		objectM.appendText(this.quotes[this.currentDate]['author'], quoteAuthor);
}
architect.prototype.addQuote = function( data ){
	data = JSON.parse(data);
	var dParts = data.date.split(" "); 
	var baseDate = dParts[0];
	architect.quotes[baseDate] = new Array();
	architect.quotes[baseDate]['author'] = data['author'];
	architect.quotes[baseDate]['quote'] = data['quote'];
}
