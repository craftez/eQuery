/**
 * eQuery library
 * @Eduardo Zamora
 */
"use strict";

(function(global){

	var document = global.document;
	var $;//** Singleton Pattern

	var selfclosing = /^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i;

    // Make sure that self-closing tags are interpreted correctly
    // Taked from: Secrets of the JavaScript Ninja, John Resig and Bear Bibeault. Chapter 14, Manipulating the DOM
    var _convert = function (html) {
        return html.replace(/(<(\w+)[^>]*?)\/>/g, function (all, front, tag) {
            return selfclosing.test(tag) ? all : front + '></' + tag + '>';
        });
    };

    // Constructor Pattern
	var eQuery = function(param) {
		var div = document.createElement('div');

		// Assume that strings that start with < are HTML
		if(param.charAt(0)==="<") {
			// Builder Pattern
			// If param is a string of type <tag/> or <tag></tag>, create an element of type 'tag'
            // And store it as element property of the eQuery object
            div.innerHTML = _convert(param);
            this.el = div.childNodes[0];
		} else if (param.charAt(0)==="#"){
			// Handle $(#id)
			this.el = document.getElementById(param.replace('#',''));
		}
	};

	// Facade Pattern
	//$().html implementation
	eQuery.prototype.html = function(html) {
		if(html) {
			this.el.innerHTML = '' + html; // Force the toString method to be executed
			return this; // Return the dQuery instance to allow chaining 
		} else {
			return this.el.innerHTML;
		}
	};

	// Facade Pattern
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

	eQuery.prototype.click = function(callback) {
		if(document.addEventListener) {
			this.el.addEventListener("click", callback);
		} else {
			this.el.attachEvent("onclick", callback);
		}
	};

	// Factory Pattern
	//Expose the $ function: $()
	$ = function(param) {
		return new eQuery(param);
	};

	//$.isArray Delegates to ECMAScript5
	$.isArray = function(obj) {
		// return Array.isArray(obj);
		if(Array.isArray) {
			return Array.isArray(obj);
		} else {
			return Object.prototype.toString.call(obj) === "[object Array]";
		}
	}

	//$.isFunction implementation
	$.isFunction = function(obj) {
		//return !!(obj && obj.constructor && obj.call && obj.apply);
		return typeof obj === 'function';
	}

	//$.isNumber implementation
	$.isNumeric = function(obj) {
		return !isNaN(parseFloat(obj)) && isFinite(obj);
	}

	//$.each implementation
	$.each = function(obj,fn) {
		var value,
			i = 0,
			length = obj.length,
			isArray = this.isArray( obj );

			if ( isArray ) {
				for (i; i < length; i++ ) {
					fn.call(null, i, obj[i]);
				}
			} else {
				for ( i in obj ) {
					if(obj.hasOwnProperty(i)) {
						fn.call(null, i, obj[i])
					}
				}
			}
	};

	//$.inArray implementation
	$.inArray = function(value, array, fromIndex) {
		fromIndex = fromIndex || 0;
		if(Array.prototype.indexOf) {
			return Array.prototype.indexOf.call(array, value, fromIndex);
		} else {
			for(var i = fromIndex; i<array.length; i++) {
				if(array[i]=== value) {
					return i;
				}
			}
			return -1;
		}
	};

	$.proxy = function(fn,obj) {
		return fn.bind(obj);
	};

	$.extend = function(target,obj) {
		var args = Array.prototype.slice.call(arguments,1);
		  for(var i =0; i< args.length; i++) {
		     for(var key in args[i]) {
		       target[key] = args[i][key];
		     }
		  }
		  return target;
	};


	// Expose the $ function: $()
	global.$ = $;
})(window);