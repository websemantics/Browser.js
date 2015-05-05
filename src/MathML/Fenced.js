/**
 * Browser.js : Fenced
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2002-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @link      http://oeasvg.com/hotdrawjs
 * @since     9th August 2002 -> 27th Sept 2005
 * @package   websemantics/browserjs/mathml
 */

MathML.Fenced = function( /* Box */ row, /* String */ left, /* String */ right, /* Attributes */ attrs) {
    var argv = MathML.Fenced.arguments;
    var argc = MathML.Fenced.length;
    /* String  */
    this.className = "MathML.Fenced";

    /* Box  */
    this.row = null;
    /* Box  */
    this.sLeft = null;
    /* Box  */
    this.sRight = null;

    this.initFenced = function( /* Box */ row, /* String */ left, /* String */ right, /* Attributes */ attrs) {
        this.initBox(0, 0, 0, 0);
        this.sLeft = new TextData(left, attrs);
        this.sRight = new TextData(right, attrs);
        this.row = new MathML.Row(this.sLeft);
        this.row.addChild(row);
        this.row.addChild(this.sRight);
    }

    this.setColor = function( /* Color */ c) {
        this.setColorBox(c);
        this.row.setColor(c);
    }

    this.paint = function( /* Graphics */ g, /* Graphics */ bgg, /* TextElement */ parent) {
        this.paintFenced(g, bgg, parent);
    }

    //*************
    // paint a Box and its subScriptclass.
    // g: main Graphics, bgg: background Graphics
    //*************
    this.paintFenced = function( /* Graphics */ g, /* Graphics */ bgg, /* TextElement */ parent) {
        this.paintBox(g, bgg, parent);
        this.row.paint(g, bgg, parent);
    }

    this.recalc = function() {
        this.recalcFenced();
    }

    this.recalcFenced = function() {
        this.row.recalc();
        this.sLeft.scale(this.row.getHeight() / this.sLeft.getHeight());
        this.sRight.scale(this.row.getHeight() / this.sRight.getHeight());
        this.row.recalc();
        this.setWidth(this.row.getWidth());
        this.setHeight(this.row.getHeight());
        this.setBaseline(this.row.getBaseline());
        this.recalcBox();
    }

    this.moveContentTo = function( /* float */ x, /* float */ y) {
        this.moveContentToFenced(x, y);
    }

    this.moveContentToFenced = function( /* float */ x, /* float */ y) {
        this.moveContentToBox(x, y);
        this.row.moveTo(x, y);
    }

    this.scale = function( /* float */ scale) {
        this.row.scale(scale);
        this.sLeft.scale(this.row.getHeight() / this.sLeft.getHeight());
        this.sRight.scale(this.row.getHeight() / this.sRight.getHeight());
        this.row.recalc;
        this.recalc();
    }

    this.toString = function() {
        return this.toStringBox();
    }

    if (argv.length > 0) 
    	this.initFenced(row, left, right, attrs);
}

MathML.Fenced.prototype = new Box();