/**
 * Browser.js : ClassSelector
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

function Css.ClassSelector( /* String */ classSelector) {
    var argv = Css.ClassSelector.arguments;
    var argc = Css.ClassSelector.length;
    /* String  */
    this.className = "Css.ClassSelector";

    /* Array  */
    this.values = null;

    this.initClassSelector = function( /* String */ classSelector) {
        this.values = new Array();
        this.parseData(classSelector);
    }

    this.parseData = function( /* String */ classSelector) {
        if (classSelector == undefined) return;
        this.values = classSelector.split(".");
    }

    this.toString = function() {
        return this.className + " [Values: " + this.values + " ]";
    }

    if (argv.length > 0) 
    	this.initClassSelector(classSelector);
}