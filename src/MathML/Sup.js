/**
 * Browser.js : Sup
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2002-2016 Web Semantics, Inc. (http://websemantics.io)
 * @license   http://www.opensource.org/licenses/mit-license.php
 * @link      http://oeasvg.com/browserjs
 * @since     9th August 2002 -> 27th Sept 2005
 * @package   websemantics/browserjs/mathml
 */

MathML.Sup = function( /* Box */ base, /* Box */ supScript) {
    var argv = MathML.Sup.arguments;
    var argc = MathML.Sup.length;
    /* String  */
    this.className = "MathML.Sup";

    /* Box  */
    this.base = null;
    /* Box  */
    this.supScript = null;
    
    this.initSup = function( /* Box */ base, /* Box */ supScript) {
        this.initBox(0, 0, 0, 0);
        this.base = base;
        this.supScript = supScript;
        this.supScript.scale(scaleSup);
    }

    this.setColor = function( /* Color */ c) {
        this.setColorBox(c);
        this.base.setColor(c);
        this.supScript.setColor(c);
    }

    this.paint = function( /* Graphics */ g, /* Graphics */ bgg, /* SVGTextElement */ parent) {
        this.paintSup(g, bgg, parent);
    }

    //*************
    // paint a Box and its supScriptclass.
    // g: main Graphics, bgg: background Graphics
    //*************
    this.paintSup = function( /* Graphics */ g, /* Graphics */ bgg, /* SVGTextElement */ parent) {
        this.paintBox(g, bgg, parent);
        this.base.paint(g, bgg, parent);
        this.supScript.paint(g, bgg, parent);
    }

    this.recalc = function() {
        this.recalcSup();
    }

    this.recalcSup = function() {
        this.base.recalc();
        this.supScript.recalc();
        this.setWidth(this.base.getWidth() + this.supScript.getWidth());
        this.setHeight(Math.max(this.base.getHeight(), this.base.getHeight() * (1 - supLoc) + this.supScript.getHeight()));
        this.setBaseline(this.base.getBaseline());
        this.recalcBox();
    }

    this.moveContentTo = function( /* float */ x, /* float */ y) {
        this.moveContentToSup(x, y);
    }

    this.moveContentToSup = function( /* float */ x, /* float */ y) {
        this.moveContentToBox(x, y);
        var scriptY = y - this.supScript.getHeight() + this.base.getHeight() * supLoc;
        var baseY = y;
        if (scriptY < y) {
            this.setBaseline(this.base.getBaseline() + (y - scriptY));
            baseY += (y - scriptY);
            scriptY += (y - scriptY);
        }
        this.base.moveTo(x, baseY);
        this.supScript.moveTo(x + this.base.getWidth(), scriptY);
    }

    this.scale = function( /* float */ scale) {
        this.base.scale(scale);
        this.supScript.scale(scale);
        this.recalc();
    }

    this.toString = function() {
        return this.toStringBox() + "\n" + this.base + "\n" + this.supScript;
    }

    if (argv.length > 0) 
    	this.initSup(base, supScript);
}

MathML.Sup.prototype = new Box();