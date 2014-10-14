/**
 * eQuery library
 * @Eduardo Zamora
 */
(function(global){

	var document = global.document;
	var $;

	var selfclosing = /^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i;

    // Make sure that self-closing tags are interpreted correctly
    // Taked from: Secrets of the JavaScript Ninja, John Resig and Bear Bibeault. Chapter 14, Manipulating the DOM
    var _convert = function (html) {
        return html.replace(/(<(\w+)[^>]*?)\/>/g, function (all, front, tag) {
            return selfclosing.test(tag) ? all : front + '></' + tag + '>';
        });
    };

	var eQuery = function(param) {
		var div = document.createElement('div');
		// Assume that strings that start with < are HTML
		if(param.charAt(0)==="<") {
			// If param is a string of type <tag/> or <tag></tag>, create an element of type 'tag'
            // And store it as element property of the eQuery object
            div.innerHTML = _convert(param);
            this.el = div.childNodes[0];
		} else if (param.charAt(0)==="#"){
			// Handle $(#id)
			this.el = document.getElementById(param.replace('#',''));
		}
	};

	//$().html implementation
	eQuery.prototype.html = function(html) {
		if(html) {
			this.el.innerHTML = '' + html; // Force the toString method to be executed
			return this; // Return the dQuery instance to allow chaining 
		} else {
			return this.el.innerHTML;
		}
	};

	//$().text implementation
	eQuery.prototype.text = function(text) {
		if(text) {
			this.el.textContent = text;
			return this;  // Return the dQuery instance to allow chaining 
		} else {
			return this.el.textContent;
		}
	};

	//Override eQuery object toString method, to return the element HTML
	eQuery.prototype.toString = function() {
		return this.el.outerHTML;
	};

	//Expose the $ function: $()
	global.$ = function(param) {
		return new eQuery(param);
	};

	$ = global.$;

	//$.each implementation
	$.each = function(obj,callback) {
		var value,
			i = 0,
			length = obj.length,
			isArray = $.isArray( obj );

			if ( isArray ) {
				for (i; i < length; i++ ) {

					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}

		return obj;
	};

	//$.inArray implementation
	$.inArray = function(value, array) {
		var length = array.length;
		if (array) {
			return array.indexOf(value);
		}
		return -1;
	}

	//$.isArray Delegates to ECMAScript5
	$.isArray = function(obj) {
		return Array.isArray(obj);
	}

	//$.isFunction implementation
	$.isFunction = function(obj) {
		return !!(obj && obj.constructor && obj.call && obj.apply);
	}

	//$.isNumber implementation
	$.isNumeric = function(obj) {
		return !isNaN(parseFloat(obj)) && isFinite(obj);
	}


})(window);