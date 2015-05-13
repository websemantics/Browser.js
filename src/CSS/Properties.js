/**
 * Browser.js : Properties
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

Css.Properties = function( /* String */ properties) {
    var argv = Css.Properties.arguments;
    var argc = Css.Properties.length;
    /* String  */
    this.className = "Css.Properties";

    /* Hashtable  */
    this.values = null;

    this.initProperties = function( /* String */ properties) {
        this.values = new Hashtable();
        this.parseData(properties);
    }

    this.parseData = function( /* String */ properties) {
        if (properties == undefined) return;
        var propertyBlock = properties.split(";");
        for (var i = 0; i < properties.length; i++) {
            var property = this.trim(propertyBlock[i]);
            if (this.hasContent(property)) {
                var valueBlock = property.split(":");
                var name = this.trim(valueBlock[0].toLowerCase());
                var value = this.trim(valueBlock[1].toLowerCase());
                if (this.hasContent(name) && this.hasContent(value)) this.values.put(name, value);
            }
        }
    }

    this.hasContent = function( /* String */ str) {
        return (str != undefined && str != null && str != "");
    }

    this.trim = function( /* String */ str) {
        if (str == undefined) return "";
        return str.replace(/^\s*|\s*$/g, "");
    }

    this.toString = function() {
        return this.className + " [ " + this.values.toString() + " ]";
    }

    if (argv.length > 0) 
    	this.initProperties(properties);
}