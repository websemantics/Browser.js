/**
 * Browser.js : Sub
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2002-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @link      http://oeasvg.com/hotdrawjs
 * @since     9th August 2002 -> 27th Sept 2005
 * @package   websemantics/browserjs/mathml
 */

MathML.Sub = function( /* Box */ base, /* Box */ subScript) {
    var argv = MathML.Sub.arguments;
    var argc = MathML.Sub.length;
    /* String  */
    this.className = "MathML.Sub";

    /* Box  */
    this.base = null;
    /* Box  */
    this.subScript = null;

    this.initSub = function( /* Box */ base, /* Box */ subScript) {
        this.initBox(0, 0, 0, 0);
        this.base = base;
        this.subScript = subScript;
        this.subScript.scale(scaleSub);
    }

    this.setColor = function( /* Color */ c) {
        this.setColorBox(c);
        this.base.setColor(c);
        this.subScript.setColor(c);
    }

    this.paint = function( /* Graphics */ g, /* Graphics */ bgg, /* TextElement */ parent) {
        this.paintSub(g, bgg, parent);
    }

    //*************
    // paint a Box and its subScriptclass.
    // g: main Graphics, bgg: background Graphics
    //*************
    this.paintSub = function( /* Graphics */ g, /* Graphics */ bgg, /* TextElement */ parent) {
        this.paintBox(g, bgg, parent);
        this.base.paint(g, bgg, parent);
        this.subScript.paint(g, bgg, parent);
    }

    this.recalc = function() {
        this.recalcSub();
    }

    this.recalcSub = function() {
        this.base.recalc();
        this.subScript.recalc();
        this.setWidth(this.base.getWidth() + this.subScript.getWidth());
        this.setHeight(Math.max(this.base.getHeight(), this.base.getHeight() * subLoc + this.subScript.getHeight()));
        this.setBaseline(this.base.getBaseline());
        this.recalcBox();
    }

    this.moveContentTo = function( /* float */ x, /* float */ y) {
        this.moveContentToSub(x, y);
    }

    this.moveContentToSub = function( /* float */ x, /* float */ y) {
        this.moveContentToBox(x, y);
        this.base.moveTo(x, y);
        this.subScript.moveTo(x + this.base.getWidth(), y + this.base.getHeight() * subLoc);
    }

    this.scale = function( /* float */ scale) {
        this.base.scale(scale);
        this.subScript.scale(scale);
        this.recalc();
    }

    this.toString = function() {
        return this.toStringBox() + "\n" + this.base + "\n" + this.subScript;
    }

    if (argv.length > 0) 
    	this.initSub(base, subScript);
}

MathML.Sub.prototype = new Box();