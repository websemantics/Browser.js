/**
 * Browser.js : Over
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2002-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @link      http://oeasvg.com/browserjs
 * @since     9th August 2002 -> 27th Sept 2005
 * @package   websemantics/browserjs/mathml
 */

MathML.Over = function( /* Box */ base, /* Box */ over) {
    var argv = MathML.Over.arguments;
    var argc = MathML.Over.length;
    /* String  */
    this.className = "MathML.Over";

    /* Box  */
    this.base = null;
    /* Box  */
    this.over = null;

    this.initOver = function( /* Box */ base, /* Box */ over) {
        this.initBox(0, 0, 0, 0);
        this.base = base;
        this.over = over;
    }

    this.setColor = function( /* Color */ c) {
        this.setColorBox(c);
        this.base.setColor(c);
        this.over.setColor(c);
    }

    this.paint = function( /* Graphics */ g, /* Graphics */ bgg, /* TextElement */ parent) {
        this.paintOver(g, bgg, parent);
    }

    //*************
    // paint a Box and its subclass.
    // g: main Graphics, bgg: background Graphics
    //*************
    this.paintOver = function( /* Graphics */ g, /* Graphics */ bgg, /* TextElement */ parent) {
        this.paintBox(g, bgg, parent);
        this.base.paint(g, bgg, parent);
        this.over.paint(g, bgg, parent);
    }

    this.recalc = function() {
        this.recalcOver();
    }

    this.recalcOver = function() {
        this.base.recalc();
        this.over.recalc();
        this.setWidth(Math.max(this.base.getWidth(), this.over.getWidth()));
        this.setHeight(this.base.getHeight() + this.over.getHeight());
        this.setBaseline(this.base.getBaseline() + this.over.getHeight());
        this.base.moveTo(this.x + (this.getWidth() - this.base.getWidth()) / 2, this.y + this.over.getHeight());
        this.over.moveTo(this.x + (this.getWidth() - this.over.getWidth()) / 2, this.y);
        this.recalcBox();
    }

    this.scale = function( /* float */ scale) {
        this.base.scale(scale);
        this.over.scale(scale);
        this.recalc();
    }

    this.toString = function() {
        return this.toStringBox() + "\n" + this.base + "\n" + this.over;
    }

    if (argv.length > 0) 
    	this.initOver(base, over);
}

MathML.Over.prototype = new Box();