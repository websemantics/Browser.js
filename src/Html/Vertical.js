/**
 * Browser.js : Vertical
 *
 * Vertical Layout Manager,..
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2002-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @link      http://oeasvg.com/hotdrawjs
 * @since     9th August 2002 -> 25th Sept 2005
 * @package   websemantics/browserjs/html
 */

Html.Vertical = function( /* Box */ child) {
    
    var argv = Html.Vertical.arguments;
    var argc = Html.Vertical.length;
    
    /* String  */
    this.className = "Html.Vertical";

    /* Vector */
    this.children = null;

    this.initVertical = function( /* Box */ child) {
        this.initCSSBox();
        this.children = new Vector;
        this.addChild(child);
        this.setCSSBox(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0); // Padding*4, Border*4 and Margin*4 [l,r,t,b]
    }
    //*************
    // Returns an Enumeration for accessing the contained children
    //*************
    /* Enumeration */
    this.getChildren = function() {
        return new Enumerator(this.children);
    }

    this.setAttributes = function( /* Attributes */ attrs, /* Attributes */ parentAttrs) {
        this.setAttributesPara(attrs, parentAttrs);
    }

    this.setAttributesPara = function( /* Attributes */ attrs, /* Attributes */ parentAttrs) {
        this.setAttributesBox(attrs, parentAttrs);
        if (attrs != undefined && attrs != null && attrs.text_align != undefined) this.text_align = attrs.text_align;
        else this.text_align = "left";
    }

    this.addChild = function( /* Box */ child) {
        if (child == null) return false;
        this.children.addElement(child);
    }

    this.paint = function( /* Graphics */ g, /* Graphics */ bgg, /* TextElement */ parent) {
        this.paintVertical(g, bgg, parent);
    }
    //*************
    // paint a Box and its subScriptclass.
    // g: main Graphics, bgg: background Graphics
    //*************
    this.paintVertical = function( /* Graphics */ g, /* Graphics */ bgg, /* TextElement */ parent) {
        this.paintBox(g, bgg, parent);
        /* Enumerator */
        var c = this.getChildren();
        while (c.hasMoreElements()) {
            var child = c.nextElement();
            child.paint(g, bgg, parent);
        }
    }

    this.recalc = function() {
        this.recalcVertical();
    }

    this.recalcVertical = function() {
        var dw = 0;
        var h = 0;
        var inW = this.getInnerWidth();
        /* Enumerator */
        var c = this.getChildren();
        while (c.hasMoreElements()) {
            var child = c.nextElement();
            if (child != null) {
                child.setWidth(inW);
                child.recalc();
            }
            h += child.getHeight();
        }
        this.setInnerHeight(h);
        this.setBaseline(h);
        this.recalcCSSBox();
    }

    this.moveContentTo = function( /* float */ x, /* float */ y) {
        this.moveContentToVertical(x, y);
    }

    this.moveContentToVertical = function( /* float */ x, /* float */ y) {
        this.moveContentToBox(x, y);
        x += this.getDx();
        y += this.getDy();
        var dy = 0;
        /* Enumerator */
        var c = this.getChildren();
        while (c.hasMoreElements()) {
            var child = c.nextElement();
            if (child != null) {
                child.moveTo(x, y + dy);
                dy += child.getHeight();
            }
        }
    }

    this.toString = function() {
        return this.toStringBox();
    }

    if (argv.length > 0) 
      this.initVertical(child);
}
Html.Vertical.prototype = new CSSBox();