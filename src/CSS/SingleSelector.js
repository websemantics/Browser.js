/**
 * Browser.js : SingleSelector
 *
 * Code is mainly extracted from CSS_parse.js, source: internet, author: unknown.
 *
 * Supported:
 * ---------
 * - ID selectors
 * - Class selectors
 * - Multiple class definitions (i.e. LI.red.level)
 * - Element selectors
 * - Selector groups
 * - Child selectors
 * - Descendants
 * - Adjacent selectors
 * - Attribute selectors
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2002-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @link      http://oeasvg.com/browserjs
 * @since     2nd Oct 2005
 * @package   websemantics/browserjs/css
 */

function Css.SingleSelector( /* String */ selector, /* String */ selectorComb) {
    var argv = Css.SingleSelector.arguments;
    var argc = Css.SingleSelector.length;
    /* String  */
    this.className = "Css.SingleSelector";

    /* String */
    this.data = null; // Row data: selector
    /* String */
    this.id = null; // p#name
    /* String */
    this.type = null; // p
    /* Css.ClassSelector */
    this.classes = null; // p.name
    /* String */
    this.combinator = null; // either " ", ">", or "+"; can be null/undefined
    /* String */
    this.attributes = null; // Css.AttributeSelector; p[attribute], p[attribute=value]

    this.initSingleSelector = function( /* String */ selector, /* String */ selectorComb) {
        this.data = selector;
        this.combinator = selectorComb;
        this.type = "*";
        this.classes = "*";
        this.id = "*";
        this.attributes = "*";
        this.parseData(selector);
    }

    this.parseData = function( /* String */ selector) {
        var pcs;
        if (selector.indexOf(":") != -1) {
            pcs = selector.split(":");
            selector = pcs[0];
            this.pseudoclass = pcs[1];
        }
        if (selector.indexOf("[") != -1) {
            pcs = [selector.indexOf("["), selector.lastIndexOf("]")];
            this.attributes = new CSSAttributeSelector(selector.substring(pcs[0], pcs[1] + 1));
            selector = selector.substring(0, pcs[0]) + selector.substring(pcs[1] + 1);
        }
        if (selector.indexOf("#") != -1) {
            pcs = selector.split("#");
            selector = pcs[0];
            this.id = pcs[1];
        }
        if (selector.indexOf(".") != -1) {
            pcs = selector.indexOf(".");
            this.classes = new CSSClassSelector(selector.substring(pcs + 1));
            selector = selector.substring(0, pcs);
        }
        if (selector) this.type = selector.toLowerCase();
    }

    this.match = function(element, pseudo) {
        if (element.nodeType == Node.TEXT_NODE) element = element.parentNode;
        if (!element || element.nodeType != Node.ELEMENT_NODE) return false;
        if (this.type != "*" && element.tagName.toLowerCase() != this.type) return false;
        if (this.id != "*" && element.getAttribute("id") != this.id) return false;
        if (pseudo && pseudo != this.pseudoclass) return false;
        if (this.classes != "*" && !CSSParser.arrayContainsEach(CSSParser.getElementAttributeList(element, "class"), this.classes)) return false;
        if (this.attributes != "*" && !this.attributes.match(element)) return false;
        return true;
    }

    this.toString = function() {
        return this.className;
    }
    // Entry Point !
    if (argv.length > 0) this.initSingleSelector(selector, selectorComb);
}