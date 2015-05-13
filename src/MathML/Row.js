/**
 * Browser.js : Row
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2002-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @link      http://oeasvg.com/browserjs
 * @since     9th August 2002 -> 27th Sept 2005
 * @package   websemantics/browserjs/mathml
 */

MathML.Row = function( /* Box */ child) {
    var argv = MathML.Row.arguments;
    var argc = MathML.Row.length;
    /* String  */
    this.className = "MathML.Row";

    /* Vector  */
    this.children = null;
    /* Vector  */
    this.lines = null; // A collection of row objects

    this.initRow = function( /* Box */ child) {
        this.initBox(0, 0, 0, 0);
        this.children = new Vector();
        this.lines = new Vector();
        this.addChild(child);
    }

    this.addChild = function( /* Box */ child) {
        var ret = null;

        if (child != undefined && child != null) 
            ret = this.children.addElement(child);

        this.recalc();
        return ret;
    }

    this.childAt = function( /* int */ i) {
        return this.children.elementAt(i);
    }


    /* Enumeration */
    this.getChildren = function() {
        // Summary: 
        // Returns an Enumeration for accessing the contained children
        return new Enumerator(this.children);
    }

    this.setColor = function( /* Color */ c) {

        this.setColorBox(c);
        
        /* Enumerator */
        var children = this.getChildren();
        while (children.hasMoreElements()) {
            var child = children.nextElement();
            child.setColor(c);
        }
    }

    this.paint = function( /* Graphics */ g, /* Graphics */ bgg, /* TextElement */ parent) {
        this.paintRow(g, bgg, parent);
    }

    this.paintRow = function( /* Graphics */ g, /* Graphics */ bgg, /* TextElement */ parent) {
        // Summary:
        // paint a Box and its subScriptclass.
        // g: main Graphics, bgg: background Graphics
        this.paintBox(g, bgg, parent);
        /* Enumerator */
        var c = this.getChildren();
        while (c.hasMoreElements()) {
            var child = c.nextElement();
            child.paint(g, bgg, parent);
        }
    }

    this.recalc = function() {
        this.recalcRow();
    }

    this.recalcRow = function() {
        /* Enumerator */
        var c = this.getChildren();
        while (c.hasMoreElements()) {
            var child = c.nextElement();
            child.recalc();
        }
        var w = 0;
        var hu = 0; // height under the baseline
        var ho = 0; // height over the baseline
        /* Enumerator */
        var c = this.getChildren();
        while (c.hasMoreElements()) {
            var child = c.nextElement();
            var t_ho = child.getBaseline();
            var t_hu = child.getHeight() - t_ho;
            if (t_hu > Math.abs(hu)) hu = t_hu;
            if (t_ho > Math.abs(ho)) {
                ho = t_ho;
                this.setBaseline(child.getBaseline());
            }
            w += child.getWidth();
        }
        this.setWidth(w);
        this.setHeight(hu + ho);
        this.recalcBox();
    }

    this.moveContentTo = function( /* float */ x, /* float */ y) {
        this.moveContentToRow(x, y);
    }

    this.moveContentToRow = function( /* float */ x, /* float */ y) {
        this.moveContentToBox(x, y);
        var dx = 0;
        /* Enumerator */
        var c = this.getChildren();
        while (c.hasMoreElements()) {
            var child = c.nextElement();
            child.moveTo(x + dx, y - child.getBaseline() + this.getBaseline());
            dx += child.getWidth();
        }
    }

    this.scale = function( /* float */ scale) {
        /* Enumerator */
        var c = this.getChildren();
        while (c.hasMoreElements()) {
            var child = c.nextElement();
            child.scale(scale);
        }
        this.recalc();
    }

    this.toString = function() {
        return this.toStringBox();
    }

    if (argv.length >= 0) 
      this.initRow(child);
}

MathML.Row.prototype = new Box();