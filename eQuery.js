/**
 * eQuery library
 * @Eduardo Zamora
 */

var eQuery = function(param) {
	//If param is a string of type <tag>, create an element of type 'tag'
	//And store it as element property of the eQuery object
	var tag = param.replace(/<|>/g,'');
	this.el = document.createElement(tag);
};

//$().html implementation
eQuery.prototype.html = function(html) {
	this.el.innerHTML = html;
	return this;
};

//Override eQuery object toString method, to return the element HTML
eQuery.prototype.toString = function() {
	return this.el.outerHTML;
};

//Expose the $ function: $()
var $ = function(param) {
	return new eQuery(param);
};

//Note that the eQuery 'toString' method is being called because the 'html' method return
//the eQuery instance.

