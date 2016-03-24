/**
 * Browser.js : AttributeSelector
 *
 * Code is mainly extracted from CSS_parse.js, source: internet, author: unknown.
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2002-2016 Web Semantics, Inc. (http://websemantics.io)
 * @license   http://www.opensource.org/licenses/mit-license.php
 * @link      http://oeasvg.com/browserjs
 * @since     2nd Oct 2005
 * @package   websemantics/browserjs/css
 */

function Css.AttributeSelector( /* String */ attributes) {
    var argv = Css.AttributeSelector.arguments;
    var argc = Css.AttributeSelector.length;
    /* String  */
    this.className = "Css.AttributeSelector";

    /* Array  */
    this.attributeNames = null;
    /* Array  */
    this.attributeValues = null;
    /* Array  */
    this.attributeContains = null;
    /* Array  */
    this.attributeBegins = null;


    this.initAttributeSelector = function( /* String */ attributes) {
        this.attributeNames = new Array();
        this.attributeValues = new Array();
        this.attributeContains = new Array();
        this.attributeBegins = new Array();
        this.parseData(attributes);
    }

    this.parseData = function( /* String */ attributes) {
        if (attributes == undefined) return;
        var attrArray = attributes.match(/\[[^\]]*\]/g);
        for (var i = 0; i < attrArray.length; i++) {
            var attr = attrArray[i].slice(1, -1).split("=");
            if (attr.length == 1) {
                this.attributeNames.push(new Css.Attribute(attr[0], null));
            } else if (attr[0].charAt(attr[0].length - 1) == "~") {
                this.attributeContains.push(new Css.Attribute(attr[0].slice(0, -1), attr[1].slice(1, -1)));
            } else if (attr[0].charAt(attr[0].length - 1) == "|") {
                this.attributeBegins.push(new Css.Attribute(attr[0].slice(0, -1), attr[1].slice(1, -1)));
            } else {
                this.attributeValues.push(new Css.Attribute(attr[0], attr[1].slice(1, -1)));
            }
        }
    }

    this.match = function(elem) {
        if (this.attributeNames.length && !this.matchNames(elem)) return false;
        if (this.attributeValues.length && !this.matchValues(elem)) return false;
        if (this.attributeContains.length && !this.matchContains(elem)) return false;
        if (this.attributeBegins.length && !this.matchBegins(elem)) return false;
        return true;
    }

    this.matchNames = function(elem) {
        var i, len = this.attributeNames.length;
        for (i = 0; i < len; i++) {
            if (elem.getAttribute(this.attributeNames[i].name) == undefined) return false;
        }
        return true;
    }

    this.matchValues = function(elem) {
        var i, len = this.attributeValues.length;
        for (i = 0; i < len; i++) {
            if (elem.getAttribute(this.attributeValues[i].name) != this.attributeValues[i].value) return false;
        }
        return true;
    }

    this.matchContains = function(elem) {
        var i, len = this.attributeContains.length;
        var attrib, re;
        for (i = 0; i < len; i++) {
            attrib = elem.getAttribute(this.attributeContains[i].name);
            if (attrib == undefined) return false;
            re = new RegExp("(^| )" + this.attributeContains[i].value + "( |$)", "g");
            if (!attrib.match(re)) return false;
        }
        return true;
    }

    this.matchBegins = function(elem) {
        var i, len = this.attributeBegins.length;
        var attrib;
        for (i = 0; i < len; i++) {
            attrib = elem.getAttribute(this.attributeBegins[i].name);
            if (attrib == undefined) return false;
            if (attrib == this.attributeBegins[i].value || attrib.indexOf(this.attributeBegins[i].value + "-") != 0) {
                
                // allows for exact match or exact match upto first "-" in separated list
                return false;
            }
        }
        return true;
    }

    this.toString = function() {
        return this.className;
    }

    if (argv.length > 0) 
    	this.initAttributeSelector(attributes);
}