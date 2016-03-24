/**
 * Browser.js : Sqrt
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2002-2016 Web Semantics, Inc. (http://websemantics.io)
 * @license   http://www.opensource.org/licenses/mit-license.php
 * @link      http://oeasvg.com/browserjs
 * @since     9th August 2002 -> 27th Sept 2005
 * @package   websemantics/browserjs/mathml
 */

MathML.Sqrt = function( /* Box */ row, /* int */ lt) {
    var argv = MathML.Sqrt.arguments;
    var argc = MathML.Sqrt.length;
    /* String  */
    this.className = "MathML.Sqrt";

    /* Box  */
    this.row = null;
    /* int  */
    this.linethickness = 1;
    /* float  */
    this.radicalSWidth = 0;
    /* float  */
    this.iscale = 1;

    this.initSqrt = function( /* Box */ row, /* int */ lt) {
        this.initBox(0, 0, 0, 0);
        this.row = row;
        this.linethickness = lt || 2;
    }

    this.setAttributes = function( /* Attributes */ attrs) {
        
        if (this.setAttributesBox(attrs)) {
            this.linethickness = (attrs.linethickness) ?  parseFloat(attrs.linethickness): 1;
        }
        
    }

    this.setColor = function( /* Color */ c) {
        this.setColorBox(c);
        this.row.setColor(c);
    }

    this.createSVGContent = function( /* Graphics */ g, /* Graphics */ bgg, /* SVGTextElement */ parent) {
        this.createSVGContentSqrt(g, bgg, parent);
    }

    this.createSVGContentSqrt = function( /* Graphics */ g, /* Graphics */ bgg, /* SVGTextElement */ parent) {
        this.createSVGContentBox(g, bgg, parent);
        g.setColor(this.fColor);
        this.Node = g.drawPolygon(this.x, this.y);
    }

    this.paint = function( /* Graphics */ g, /* Graphics */ bgg, /* TextElement */ parent) {
        this.paintSqrt(g, bgg, parent);
    }

    //*************
    // paint a Box and its subScriptclass.
    // g: main Graphics, bgg: background Graphics
    //*************
    this.paintSqrt = function( /* Graphics */ g, /* Graphics */ bgg, /* TextElement */ parent) {
        this.paintBox(g, bgg, parent);
        this.row.paint(g, bgg, parent);
    }

    this.recalc = function() {
        this.recalcSqrt();
    }

    this.recalcSqrt = function() {
        this.row.recalc();
        this.radicalSWidth = this.row.getHeight() * 0.53; // (0.53 is the aspect ratio)
        this.setWidth(this.row.getWidth() + this.radicalSWidth); // Of the radical sign char
        this.setHeight(this.row.getHeight());
        this.setBaseline(this.row.getBaseline());
        this.recalcBox();
    }

    this.moveContentTo = function( /* float */ x, /* float */ y) {
        this.moveContentToSqrt(x, y);
    }

    this.moveContentToSqrt = function( /* float */ x, /* float */ y) {
        this.moveContentToBox(x, y);

        this.row.moveTo(x + this.radicalSWidth, y);

        if (this.Node != null) {
            var xv = new Array();
            var yv = new Array();
            
            // Draw the radical sign...char hex(221A) of eurocde
            var dw = this.radicalSWidth;
            var dh = this.getHeight();
            var xPre = [0, 0.2771, 0.6747, 0.9277, 1, 1, 1, 1, 0.6887, 0.2108, 0.0421];
            var yPre = [0.4968, 0.4140, 0.82, 0, 0, 0, 0.0318, 0.0318, 0.9968, 0.4904, 0.5318];
            var i = 0;
            for (i = 0; i < xPre.length; i++) xv[i] = xPre[i] * dw;
            for (i = 0; i < yPre.length; i++) yv[i] = yPre[i] * dh;
            xv[5] += this.row.getWidth();
            xv[6] += this.row.getWidth();
            this.Node.translate(x, y);
            this.Node.setXYPoints(xv, yv);
            this.setColor(this.fColor);
        }
    }

    this.scale = function( /* float */ scale) {
        this.iscale = scale;
        this.linethickness *= scale;
        this.row.scale(scale);
        this.recalc();
    }

    this.toString = function() {
        return this.toStringBox() + "\n" + this.base + "\n" + this.subScript;
    }

    if (argv.length > 0) 
      this.initSqrt(row, lt);
}

MathML.Sqrt.prototype = new Box();