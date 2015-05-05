/**
 * Browser.js : Tokens (Mo, Mi and Mn)
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2002-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @link      http://oeasvg.com/hotdrawjs
 * @since     9th August 2002 -> 27th Sept 2005
 * @package   websemantics/browserjs/mathml
 */

//	(1) Class: Mo 

MathML.Mo = function( /* String */ data, /* Attributes */ attrs) {
    var argv = MathML.Mo.arguments;
    var argc = MathML.Mo.length;
    /* String  */
    this.className = "MathMl.Mo";
    this.initTextData(data, attrs);
}
MathML.Mo.prototype = new TextData();

//	(2) Class: Mi 

MathML.Mi = function( /* String */ data, /* Attributes */ attrs) {
    var argv = MathML.Mi.arguments;
    var argc = MathML.Mi.length;
    /* String  */
    this.className = "MathMl.Mi";
    this.initTextData(data, attrs);
    // From W3C recomendation: FontStyle=italic if one character.
    if (data.length == 1) this.fontstyle = "italic";
}
MathML.Mi.prototype = new TextData();

//	(3) Class: Mn 

MathML.Mn = function( /* String */ data, /* Attributes */ attrs) {
    var argv = MathML.Mn.arguments;
    var argc = MathML.Mn.length;
    /* String  */
    this.className = "MathMl.Mn";
    this.initTextData(data, attrs);
}
MathML.Mn.prototype = new TextData();