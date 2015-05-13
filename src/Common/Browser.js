/**
 * Browserjs.js : Browserjs
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2002-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @link      http://oeasvg.com/browserjs
 * @since     9th August 2002 -> 27th Sept 2005 -> 4th May 2015
 * @package   websemantics/browserjs/mathml
 */

Browserjs.prototype = new Node();

function Browserjs() {
    var argv = Browserjs.arguments;
    var argc = Browserjs.length;
    var xhtmlNS = "http://www.w3.org/1999/xhtml";

    /* String  */
    this.className = "Browserjs";

    /* Vector   */
    this.documents = new Vector();

    this.parse = function() {
        // Summary:
        // Parse the document for XHTML/MathML and SVG fragments
        
        /* NodeList */
        nl = svgDocument.getElementsByTagNameNS(xhtmlNS, "html");
        
        for (var i = 0; i < nl.length; i++) {
            
            var root = nl.item(i);
            // Add the default CSS style on the html element.
            var attr = new Attributes(root, true);
            root.setAttribute('style', attr.getStyle());

            this.documents.addElement(new Browserjs.Document(root, this));
            // var CSSParser = new Css.Parser(root);
            // var style = root.getElementsByTagName("style").item(0);
            // //alert(style.parentNode+" == "+style.firstChild.data);
            // //alert(style.parentNode.hasChildNodes());
            // var CSSParser = new Css.Parser(root);

        }

        this.paint();
        this.recalc();
    }

    this.draw = function( /* Graphics */ g) {
        this.paint(g);
    }

    this.paint = function( /* Graphics */ g) {
        // Summary:
        // Paint all documents
        var e = new Enumerator(this.documents);
        
        while (e.hasMoreElements()) 
            e.nextElement().paint(g);
    }

    this.recalc = function() {
        // Summary:
        // Recalc all documents found embbeded inside the SVG document.
        var e = new Enumerator(this.documents);
        while (e.hasMoreElements()) e.nextElement().recalc();
    }

}
