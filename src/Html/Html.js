/**
 * Browser.js : Html / Em / A 
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2002-2016 Web Semantics, Inc. (http://websemantics.io)
 * @license   http://www.opensource.org/licenses/mit-license.php
 * @link      http://oeasvg.com/browserjs
 * @since     9th August 2002 -> 28th August 2005
 * @package   websemantics/browserjs/html
 */

function Html() {;
}

Html.Em = function( /* String */ data, /* Attributes */ attrs) {
    var argv = Html.Em.arguments;
    var argc = Html.Em.length;
    /* String  */
    this.className = "Html.Em";
    this.initTextData(data, attrs);
}

Html.Em.prototype = new TextData();

Html.A = function( /* String */ data, /* Attributes */ attrs) {
    var argv = Html.A.arguments;
    var argc = Html.A.length;
    /* String  */
    this.className = "Html.A";
    this.initTextData(data, attrs);
}
Html.A.prototype = new TextData();

function cloneObject(what) {
    for (var i in what) {
        if (typeof what[i] == 'object') {
            this[i] = new cloneObject(what[i]);
        } else this[i] = what[i];
    }
}