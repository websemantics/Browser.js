/**
 * Browser.js : Under
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2002-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @link      http://oeasvg.com/browserjs
 * @since     9th August 2002 -> 27th Sept 2005
 * @package   websemantics/browserjs/mathml
 */

MathML.Under = function( /* Box */ base, /* Box */ under) {
    var argv = MathML.Under.arguments;
    var argc = MathML.Under.length;
    /* String  */
    this.className = "MathML.Under";

    /* Box  */
    this.base = null;
    /* Box  */
    this.under = null;

    this.initUnder = function( /* Box */ base, /* Box */ under) {
        this.initBox(0, 0, 0, 0);
        this.base = base;
        this.under = under;
    }

    this.setColor = function( /* Color */ c) {
        this.setColorBox(c);
        this.base.setColor(c);
        this.under.setColor(c);
    }

    this.paint = function( /* Graphics */ g, /* Graphics */ bgg, /* TextElement */ parent) {
        this.paintUnder(g, bgg, parent);
    }

    //*************
    // paint a Box and its subclass.
    // g: main Graphics, bgg: background Graphics
    //*************
    this.paintUnder = function( /* Graphics */ g, /* Graphics */ bgg, /* TextElement */ parent) {
        this.paintBox(g, bgg, parent);
        this.base.paint(g, bgg, parent);
        this.under.paint(g, bgg, parent);
    }

    this.recalc = function() {
        this.recalcUnder();
    }

    this.recalcUnder = function() {
        this.base.recalc();
        this.under.recalc();
        this.setWidth(Math.max(this.base.getWidth(), this.under.getWidth()));
        this.setHeight(this.base.getHeight() + this.under.getHeight());
        this.setBaseline(this.base.getBaseline());
        this.base.moveTo(this.x + (this.getWidth() - this.base.getWidth()) / 2, this.y);
        this.under.moveTo(this.x + (this.getWidth() - this.under.getWidth()) / 2, this.y + this.base.getHeight());
        this.recalcBox();
    }

    this.scale = function( /* float */ scale) {
        this.base.scale(scale);
        this.under.scale(scale);
        this.recalc();
    }

    this.toString = function() {
        return this.toStringBox() + "\n" + this.base + "\n" + this.under;
    }

    if (argv.length > 0) 
    	this.initUnder(base, under);
}

MathML.Under.prototype = new Box();