function slider(){
	this.container = null;
	this.quotes = new Array();
	this.currentQuote = 0;
	this.text = null;
}
slider.prototype.init = function(data){
	var data = JSON.parse(data);
	this.quotes = data;
}
slider.prototype.next = function(){
	if(slider.container==null){ 
		slider.container = document.getElementById('slide-container');
		var tmp = this.container.getElementsByClassName('slider-image');
		slider.imageContainer = tmp[0];
		slider.text = document.getElementById('text-span');
		slider.textContainer = this.text.parentNode;
	}
	var container = slider.container;
	var imageContainer = slider.imageContainer;
	var textContainer = slider.textContainer;
	var text = slider.text;
	textContainer.classList.remove("scroll-up");
	textContainer.classList.add("scroll-down");
	setTimeout(
		function(){
			imageContainer.classList.remove("bg-fade-in");
			imageContainer.classList.add("bg-fade-out");
			var number = Math.floor(Math.random() * 3) + 1;
			setTimeout( 
				function(){
					text.innerHTML = slider.quotes[slider.currentQuote]['quote']+' - '+slider.quotes[slider.currentQuote]['quote-author'];
					Cufon.refresh();
					imageContainer.style.backgroundImage = 'url(../images/slider-images/slide'+number+'.jpg)';
					imageContainer.classList.remove("bg-fade-out");
					imageContainer.classList.add("bg-fade-in");
					setTimeout(
						function(){
							textContainer.classList.remove("scroll-down");
							textContainer.classList.add("scroll-up");
						}
					,1000);
				}	
			,1000);	
		}
	,1000);
	slider.currentQuote++;
	if(slider.currentQuote>=slider.quotes.length){ slider.currentQuote = 0; }
}
