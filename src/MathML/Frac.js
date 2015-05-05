/**
 * Browser.js : Frac
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2002-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @link      http://oeasvg.com/hotdrawjs
 * @since     9th August 2002 -> 27th Sept 2005
 * @package   websemantics/browserjs/mathml
 */

MathML.Frac = function( /* Box */ numerator, /* Box */ denominator, /* Attributes */ attrs) {
    var argv = MathML.Frac.arguments;
    var argc = MathML.Frac.length;
    /* String  */
    this.className = "MathML.Frac";

    /* Box  */
    this.numerator = null;
    /* Box  */
    this.denominator = null;
    /* float  */
    this.iscale = 1 / (new FontMetrics()).pt2px; // Make the scale factor in pixles
    /* float  */
    this.linethickness = 1;

    this.initFrac = function( /* Box */ numerator, /* Box */ denominator, /* Attributes */ attrs) {
        this.initBox(0, 0, 0, 0);
        this.numerator = numerator;
        this.denominator = denominator;
        this.numerator.scale(scaleFraction);
        this.denominator.scale(scaleFraction);
        this.setAttributes(attrs);
    }

    this.setAttributes = function( /* Attributes */ attrs) {
        if (!this.setAttributesBox(attrs)) return;
        if (attrs.linethickness != undefined) this.linethickness = parseFloat(attrs.linethickness);
        else this.linethickness = 1;
    }

    this.setColor = function( /* Color */ c) {
        this.setColorBox(c);
        this.numerator.setColor(c);
        this.denominator.setColor(c);
    }

    this.createSVGContent = function( /* Graphics */ g, /* Graphics */ bgg, /* SVGTextElement */ parent) {
        this.createSVGContentFrac(g, bgg, parent);
    }

    //*************
    // Private: 
    // createSVGContentBox: Used to create the background color
    //*************
    this.createSVGContentFrac = function( /* Graphics */ g, /* Graphics */ bgg, /* SVGTextElement */ parent) {
        this.createSVGContentBox(g, bgg, parent);
        g.setColor(this.fColor);
        this.Node = g.drawRect(this.x, this.y + this.numerator.getHeight() + this.iscale, this.getWidth(), this.linethickness);
    }

    this.paint = function( /* Graphics */ g, /* Graphics */ bgg, /* SVGTextElement */ parent) {
        this.paintFrac(g, bgg, parent);
    }

    //*************
    // paint a Box and its supScriptclass.
    // g: main Graphics, bgg: background Graphics
    //*************
    this.paintFrac = function( /* Graphics */ g, /* Graphics */ bgg, /* SVGTextElement */ parent) {
        this.paintBox(g, bgg, parent);
        this.numerator.paint(g, bgg, parent);
        this.denominator.paint(g, bgg, parent);
    }

    this.recalc = function() {
        this.recalcFrac();
    }

    this.recalcFrac = function() {
        this.numerator.recalc();
        this.denominator.recalc();
        this.setWidth(Math.max(this.numerator.getWidth(), this.denominator.getWidth()));
        this.setHeight(this.numerator.getHeight() + this.denominator.getHeight() + (2 * this.iscale) + this.linethickness);
        this.setBaseline(this.numerator.getHeight() + (1 * this.iscale) + this.linethickness / 2 + this.denominator.getHeight() * 0.40);
        this.recalcBox();
    }

    this.moveContentTo = function( /* float */ x, /* float */ y) {
        this.moveContentToFrac(x, y);
    }

    this.moveContentToFrac = function( /* float */ x, /* float */ y) {
        this.moveContentToBox(x, y);
        this.numerator.moveTo(x + (this.getWidth() - this.numerator.getWidth()) / 2, y);
        this.denominator.moveTo(x + (this.getWidth() - this.denominator.getWidth()) / 2, y + this.numerator.getHeight() + (2 * this.iscale) + this.linethickness);
        if (this.Node != null) {
            this.setColor(this.fColor);
            this.Node.setSize(this.getWidth(), this.linethickness);
            this.Node.translate(x, y + this.numerator.getHeight() + this.iscale);
        }
    }

    this.scale = function( /* float */ scale) {
        this.numerator.scale(scale);
        this.denominator.scale(scale);
        this.iscale *= (scale / (new FontMetrics()).pt2px); // Make the scale factor in pixels
        this.linethickness *= scale;
        this.recalc();
    }

    this.toString = function() {
        return this.toStringBox() + "\n" + this.base + "\n" + this.supScript;
    }

    if (argv.length > 0) 
    	this.initFrac(numerator, denominator, attrs);
}

MathML.Frac.prototype = new Box();