/**
 * Browser.js : Attribute
 *
 * Code is mainly extracted from CSS_parse.js, source: internet, author: unknown.
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2002-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @link      http://oeasvg.com/browserjs
 * @since     2nd Oct 2005
 * @package   websemantics/browserjs/css
 */

function Css.Attribute( /* String */ name, /* String */ value) {

    var argv = Css.Attribute.arguments;
    var argc = Css.Attribute.length;
    /* String  */
    this.className = "Css.Attribute";

    /* String  */
    this.name = null;
    /* String  */
    this.value = null;

    this.initAttribute = function( /* String */ name, /* String */ value) {
        this.name = name;
        this.value = value;
    }

    this.toString = function() {
        return this.className + " [Name: " + this.name + ", Value: " + this.value + " ]";
    }

    if (argv.length > 0) 
    	this.initAttribute(name, value);
}