/**
 * Browser.js : MathML
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2002-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @link      http://oeasvg.com/browserjs
 * @since     9th August 2002 -> 27th Sept 2005
 * @package   websemantics/browserjs/mathml
 */

var scaleSup = 0.4; // The scale applied to the script of the Sup schemata
var scaleSub = 0.4; // The scale applied to the script of the Sub schemata
var subLoc = 0.6; // The relative location of the script to the base (the top of the script is located 60% from the top of the base)
var supLoc = 0.3; // The relative location of the script to the base (the bottom of the script is located 40% from the top of the base)
var scaleFraction = 0.80;

MathML.prototype = new CSSBox();

function MathML( /* Box */ child) {
    var argv = MathML.arguments;
    var argc = MathML.length;
    /* String  */
    this.className = "MathML";

    /* Vector */
    this.child = null;

    this.initMathML = function( /* Box */ child) {
        this.initCSSBox();
        this.child = child;
        this.setCSSBox(5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0); // Padding*4, Border*4 and Margin*4 [l,r,t,b]
    }

    this.paint = function( /* Graphics */ g, /* Graphics */ bgg, /* TextElement */ parent) {
        this.paintMathML(g, bgg, parent);
    }

    //*************
    // paint a Box and its subScriptclass.
    // g: main Graphics, bgg: background Graphics
    //*************
    this.paintMathML = function( /* Graphics */ g, /* Graphics */ bgg, /* TextElement */ parent) {
        this.paintBox(g, bgg, parent);
        if (this.child != null) child.paint(g, bgg, parent);
    }

    this.recalc = function() {
        this.recalcMathML();
    }

    this.recalcMathML = function() {
        if (this.child == null) return false;
        this.child.recalc();
        this.setInnerWidth(this.child.getWidth());
        this.setInnerHeight(this.child.getHeight());
        this.setBaseline(this.child.getBaseline());
        this.recalcCSSBox();
    }

    this.moveContentTo = function( /* float */ x, /* float */ y) {
        this.moveContentToMathML(x, y);
    }

    this.moveContentToMathML = function( /* float */ x, /* float */ y) {
        this.moveContentToBox(x, y);
        x += this.getDx();
        y += this.getDy();
        if (this.child != null) {
            this.child.moveTo(x, y);
        }
    }

    if (argv.length > 0) 
    	this.initMathML(child);
}