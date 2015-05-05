/**
 * Browser.js : Para
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2002-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @link      http://oeasvg.com/hotdrawjs
 * @since     9th August 2002 -> 28th August 2005
 * @package   websemantics/browserjs/html
 */

Html.Para = function( /* Box */ child, /* Attributes */ attrs) {
    var argv = Html.Para.arguments;
    var argc = Html.Para.length;
    /* String  */
    this.className = "Html.Para";

    /* Vector */
    this.children = null;
    /* Vector  */
    this.lines = null; // A collection of row objects

    this.initPara = function( /* Box */ child, /* Attributes */ attrs) {
        this.initCSSBox();
        this.children = new Vector;
        this.lines = new Vector;
        this.addChild(child, attrs);
        this.setAttributes(attrs);
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

    /* Enumeration */
    this.getChildren = function() {
        // Summary:
        // Returns an Enumeration for accessing the contained children
        return new Enumerator(this.children);
    }

    /* Enumeration */
    this.getLines = function() {
        // Summary:
        // Returns an Enumeration for accessing the contained lines
        return new Enumerator(this.lines);
    }

    this.setAttributes = function( /* Attributes */ attrs, /* Attributes */ parentAttrs) {
        this.setAttributesPara(attrs, parentAttrs);
    }

    this.setAttributesPara = function( /* Attributes */ attrs, /* Attributes */ parentAttrs) {
        
        this.setAttributesBox(attrs, parentAttrs);
        
        if (attrs != undefined && attrs != null && attrs.text_align != undefined) 
            this.text_align = attrs.text_align;
        else 
            this.text_align = "left";
    }

    this.addChild = function( /* Box */ child, /* Attributes */ attrs) {
        if (child == null) return false;
        if (child.className == "TextData" || child.className == "Html.Em" || child.className == "Html.A") {
            child.data = child.data.replace(/\n/gi, ""); // Remove any newline chars
            var array = child.data.split(" "); // Split the string to words 
            var i = 0;
            while (i < array.length) {
                if (array[i].length != 0) {
                    var temp = new TextData(array[i] + " ", attrs);
                    temp.setColor(child.fColor);
                    this.children.addElement(temp);
                }
                i++;
            }
        } else this.children.addElement(child);
    }

    this.paint = function( /* Graphics */ g, /* Graphics */ bgg, /* TextElement */ parent) {
        this.paintPara(g, bgg, parent);
    }

    this.paintPara = function( /* Graphics */ g, /* Graphics */ bgg, /* TextElement */ parent) {
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
        this.recalcPara();
    }

    this.recalcPara = function() {
        var dw = 0;
        var h = 0;
        var inW = this.getInnerWidth();
        var line = new MathML.Row();
        // Start by emptying all the lines
        this.lines.clear();
        /* Enumerator */
        var c = this.getChildren();
        while (c.hasMoreElements()) {
            var child = c.nextElement();
            if (child != null) {
                child.recalc();
                if ((child.getWidth() + dw) >= inW) {
                    dw = 0;
                    h += line.getHeight();
                    this.lines.addElement(line);
                    line = new MathML.Row();
                }
                dw += child.getWidth();
                line.addChild(child);
            }
        }
        // Add the last line,...
        this.lines.addElement(line);
        h += line.getHeight();
        this.setInnerHeight(h);
        this.setBaseline(h);
        this.recalcCSSBox();
    }

    this.moveContentTo = function( /* float */ x, /* float */ y) {
        this.moveContentToPara(x, y);
    }

    this.moveContentToPara = function( /* float */ x, /* float */ y) {
        this.moveContentToBox(x, y);
        x += this.getDx();
        y += this.getDy();
        var inW = this.getInnerWidth();
        var dy = 0;
        /* Enumerator */
        var c = this.getLines();
        while (c.hasMoreElements()) {
            var child = c.nextElement();
            if (child != null) {
                switch (this.text_align) {
                    case "left":
                        child.moveTo(x, y + dy);
                        break;
                    case "right":
                        child.moveTo(x + (w - child.getWidth()), y + dy);
                        break;
                    case "center":
                        child.moveTo(x + (w - child.getWidth()) / 2, y + dy);
                        break;
                        //case "justify":child.drawJustify(x,y+dy,w,g,firstText111Node); break;
                }
                dy += child.getHeight();
            }
        }
    }

    this.toString = function() {
        return this.toStringBox();
    }

    if (argv.length > 0)
        this.initPara(child, attrs);
}

Html.Para.prototype = new CSSBox();