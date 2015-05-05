/**
 * Browser.js : GroupStyle
 *
 * Code is mainly extracted from CSS_parse.js, source: internet, author: unknown.
 *
 * p,em,strong { color : red;
 *               font-size:12pt;
 *  		         text-align:center;
 *		         }
 *
 * VAR selectorsGroup = p,em,strong
 * VAR declarationsGroup = color : red; font-size:12pt; text-align:center;
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2002-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @link      http://oeasvg.com/hotdrawjs
 * @since     2nd Oct 2005
 * @package   websemantics/browserjs/css
 */

Css.GroupStyle = function( /* String */ selectorsGroup, /* String */ declarationsGroup) {
    var argv = Css.GroupStyle.arguments;
    var argc = Css.GroupStyle.length;
    /* String  */
    this.className = "Css.GroupStyle";

    /* Array  */
    this.selectors = null; // Contains instances of Css.SelectorDefinition

    this.initGroupStyle = function( /* String */ selectorsGroup, /* String */ declarationsGroup) {
        this.parseData(selectorsGroup, declarationsGroup);
    }

    this.parseData = function( /* String */ selectorsGroup, /* String */ declarationsGroup) {
        // Split selectorsGroup (p,em#head,h1) into single selectors,..
        this.selectors = selectorsGroup.split(",");
        var len = this.selectors.length;
        for (var i = 0; i < len; i++) {
            var selector = this.selectors[i];
            this.selectors[i] = new Css.SelectorDefinition(selector, declarationsGroup);
        }
    }

    this.match = function( /* Element */ element, /* Object */ pseudo) {
        var len = this.selectors.length;
        for (var i = 0; i < len; i++)
            if (this.selectors[i].match(eleme, pseudo)) return this.selectors[i].properties;
        return false;
    }

    this.toString = function() {
        return this.className + "[ Selectors" + this.selectors + " ]";
    }

    if (argv.length > 0) 
    	this.initGroupStyle(selectorsGroup, declarationsGroup);
}