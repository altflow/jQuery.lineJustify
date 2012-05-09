/**
 * jquery.lineJustify.js
 * jQuery plugin to adjust font-size and letter-spacing for each line
 * to fit parent element's width
 */
(function($){
	/**
	 * adjust element width and letter-spacing for given size
	 * @param {object} element (jQuery object)
	 * @param {number} width
	 * @return {object}
	 */
	function adjustWidth(element, width) {
		$("body").append(element);
		var elementWidth = element.width();
		var diff         = width - elementWidth;
		
		if (diff/width < 0.9) {
			var letterSpacing = Math.floor(diff/element.text().length);
			element.css("letter-spacing", letterSpacing);
			elementWidth = element.width();
		}
		
		element.remove();
		element.css("width", elementWidth+"px");
		
		return element;
	}
	
	/**
	 * returns character length for given string counting single-byte as 0.5
	 * @param {string} text
	 * @return {number}
	 */
	function getLength(text) {
		var count = 0;
		
		for (var i=0, l=text.length; i<l; i++) {
			if (escape(text.charAt(i)).length < 4) {
				count += 0.5;
			} else {
				count += 1;
			}
		}
		
		return count;
	}
	
	/**
	 * returns text whose each line is wrapped by span tag
	 * @param {string} text
	 * @param {number} width
	 * @param {array} fontFamilies
	 * @return {string}
	 */
	function wrapEachLineBySpan(text, width, fontFamilies) {
		var wrapped    = "";
		var contentAry = text.split("\n");
		var str        = "";
		var numOfStr   = 0;
		var numOfFonts = $.isArray(fontFamilies) ? fontFamilies.length : 0;
		
		for (var i=0, j=0, l=contentAry.length; i<l; i++) {
			str      = $.trim(contentAry[i]);
			numOfStr = getLength(str);
			
			if(str.match(/[^\s]/)) {
				var span = $("<span id='lj-line"+i+"'></span>")
						   .addClass("l-justified")
						   .css({
								"text-align": "justify",
								"font-size": Math.floor(width/numOfStr) + "px"
							})
						   .text(str)
						   .append("<br/>");
				
				if (numOfFonts > 0) {
					span.css("font-family", fontFamilies[j%numOfFonts]);
					j++;
				}
				
				span = adjustWidth(span, width);
				wrapped += $("<div />").append(span[0]).html();
				// or just use outerHTML
				// wrapped += span[0].outerHTML;
			}
		}
		return wrapped;
	}
	
	/**
	 * adjust font-size and letter-spacing for each line width to fit with parent element
	 * @param {array} fontFamilies
	 * @return {object}
	 */
	$.fn.lineJustify = function(fontFamilies){
		
		this.each(function(){
			var $this        = $(this);
			var width        = $this.width();
			var contents     = $this.contents();
			var newNodeValue = "";
			
			for (var i=0, cLen=contents.length; i<cLen; i++) {
				if (typeof contents[i] == "object" &&
					contents[i].nodeType == 3 &&
					contents[i].nodeValue) {
					
					newNodeValue += wrapEachLineBySpan(contents[i].nodeValue, width, fontFamilies);

				} else if (typeof contents[i] == "object" && contents[i].nodeType == 1) {
					newNodeValue += $("<div />").append(contents[i]).html();
					// or just use outerHTML
					// newNodeValue += contents[i].outerHTML;
					continue;
				}
			}
			
			$this.contents().replaceWith( newNodeValue );
		});
		
		return this;
	};
})(jQuery);