/**
 * Browser.js : SelectorDefinition && CSSSelectorDefinition
 *
 * Code is mainly extracted from CSS_parse.js, source: internet, author: unknown.
 *
 * i.e. selector = p or h1 ,etc
 * i.e. properties = color:yellow, font-size:40pt, etc
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2002-2016 Web Semantics, Inc. (http://websemantics.io)
 * @license   http://www.opensource.org/licenses/mit-license.php
 * @link      http://oeasvg.com/browserjs
 * @since     2nd Oct 2005
 * @package   websemantics/browserjs/css
 */

function Css.SelectorDefinition( /* String */ selector, /* String */ properties) {
    var argv = Css.SelectorDefinition.arguments;
    var argc = Css.SelectorDefinition.length;
    /* String  */
    this.className = "Css.SelectorDefinition";

    /* String         */
    this.data = null;
    /* Array          */
    this.singleSelectors = null;
    /* Css.Properties */
    this.properties = null;

    this.initSelectorDefinition = function( /* String */ selector, /* String */ properties) {
        this.data = "";
        this.singleSelectors = new Array();
        this.properties = new Css.Properties(properties);
        if (properties != undefined) this.parseData(selector);
    }

    this.parseData = function( /* String */ selector) {
        return;
        selector_str = CSSParser.trim(selector_str);
        selector_str = CSSParser.whiteSpaceToSpaces(selector_str);
        selector_str = selector_str.replace(/\s*\+\s*/g, "+");
        selector_str = selector_str.replace(/\s*>\s*/g, ">");
        this.data = selector_str;
        selector_str = selector_str.replace(/ /g, CSSParser.DELIM1 + " " + CSSParser.DELIM1);
        selector_str = selector_str.replace(/\+/g, CSSParser.DELIM1 + "+" + CSSParser.DELIM1);
        selector_str = selector_str.replace(/>/g, CSSParser.DELIM1 + ">" + CSSParser.DELIM1);
        var sels = selector_str.split(CSSParser.DELIM1);
        var i, len = sels.length;
        var sel_comb = null;
        for (i = 0; i < len; i += 2) {
            if (i) sel_comb = sels[i - 1];
            this.singleSelectors.push(new CSSSingleSelector(sels[i], sel_comb));
        }
    }

    this.toString = function() {
        return this.className;
    }
    // Entry Point !
    if (argv.length > 0) this.initSelectorDefinition(selector, properties);
}

function CSSSelectorDefinition() {
    this.me = "";
}

CSSSelectorDefinition.prototype.match = function(element, pseudo) {
    // go backwards, starting from right of selector definition
    var index = this.singleSelectors.length - 1;
    var compare_elem = element;
    var selector = this.singleSelectors[index];
    if (!selector.match(compare_elem, pseudo)) return false;
    while (compare_elem && index >= 0) {
        switch (selector.combinator) {
            case " ":
                index--;
                selector = this.singleSelectors[index];
                do {
                    compare_elem = compare_elem.parentNode;
                } while (compare_elem && !selector.match(compare_elem, pseudo));
                if (!compare_elem) return false;
                break;
            case ">":
                index--;
                selector = this.singleSelectors[index];
                compare_elem = compare_elem.parentNode;
                if (!selector.match(compare_elem, pseudo)) return false;
                break;
            case "+":
                index--;
                selector = this.singleSelectors[index];
                compare_elem = CSSParser.previousSibling(compare_elem);
                if (!selector.match(compare_elem, pseudo)) return false;
                break;
            default:
                // assume first selector in definition chain, therefore comparison complete
                if (!index) return this.properties;
                else return false;
        }
        if (pseudo) pseudo = null; // only used when compare_elem == element
    }
    return false;
}