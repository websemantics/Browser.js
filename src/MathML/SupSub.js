/**
 * Browser.js : SupSub
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2002-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @link      http://oeasvg.com/hotdrawjs
 * @since     9th August 2002 -> 27th Sept 2005
 * @package   websemantics/browserjs/mathml
 */

MathML.SupSub = function( /* Box */ base, /* Box */ supScript, /* Box */ subScript) {
    var argv = MathML.SupSub.arguments;
    var argc = MathML.SupSub.length;
    /* String  */
    this.className = "MathML.SupSub";

    /* Box  */
    this.base = null;
    /* Box  */
    this.supScript = null;
    /* Box  */
    this.subScript = null;

    this.initSupSub = function( /* Box */ base, /* Box */ supScript, /* Box */ subScript) {
        this.initBox(0, 0, 0, 0);
        this.base = base;
        this.supScript = supScript;
        this.subScript = subScript;
        this.supScript.scale(scaleSup);
        this.subScript.scale(scaleSub);
    }

    this.setColor = function( /* Color */ c) {
        this.setColorBox(c);
        this.base.setColor(c);
        this.supScript.setColor(c);
        this.subScript.setColor(c);
    }

    this.paint = function( /* Graphics */ g, /* Graphics */ bgg, /* SVGTextElement */ parent) {
        this.paintSupSub(g, bgg, parent);
    }

    //*************
    // paint a Box and its supScriptclass.
    // g: main Graphics, bgg: background Graphics
    //*************
    this.paintSupSub = function( /* Graphics */ g, /* Graphics */ bgg, /* SVGTextElement */ parent) {
        this.paintBox(g, bgg, parent);
        this.base.paint(g, bgg, parent);
        this.supScript.paint(g, bgg, parent);
        this.subScript.paint(g, bgg, parent);
    }

    this.recalc = function() {
        this.recalcSupSub();
    }

    this.recalcSupSub = function() {
        this.base.recalc();
        this.supScript.recalc();
        this.subScript.recalc();
        this.supScript.recalc();
        // Make calculations for the sup script
        var supW = this.base.getWidth() + this.supScript.getWidth();
        var supH = Math.max(this.base.getHeight(), this.base.getHeight() * (1 - supLoc) + this.supScript.getHeight());
        var supBL = this.base.getBaseline();
        var scriptY = this.y - this.supScript.getHeight() + this.base.getHeight() * supLoc;
        if (scriptY < this.y) {
            var dy = (this.y - scriptY);
            supBL = this.base.getBaseline() + dy;
            scriptY += dy;
        }
        // Make calculations for the sub script
        var subW = this.base.getWidth() + this.subScript.getWidth();
        // Make calculations for the SupSub
        this.setWidth(Math.max(supW, subW));
        // Sum the height below the baseline of sub and above baseline of sup
        this.setHeight(Math.max(supH, supH - (this.base.getHeight() * (1 - subLoc)) + this.subScript.getHeight()));
        this.setBaseline(supBL);
        this.recalcBox();
    }

    this.moveContentTo = function( /* float */ x, /* float */ y) {
        this.moveContentToSupSub(x, y);
    }

    this.moveContentToSupSub = function( /* float */ x, /* float */ y) {
        this.moveContentToBox(x, y);
        var scriptY = this.y - this.supScript.getHeight() + this.base.getHeight() * supLoc;
        var baseY = this.y;
        if (scriptY < this.y) {
            var dy = (this.y - scriptY);
            baseY += dy;
            scriptY += dy;
        }
        this.base.moveTo(x, baseY);
        this.supScript.moveTo(x + this.base.getWidth(), scriptY);
        this.subScript.moveTo(x + this.base.getWidth(), baseY + this.base.getHeight() * subLoc);
    }

    this.scale = function( /* float */ scale) {
        this.base.scale(scale);
        this.supScript.scale(scale);
        this.subScript.scale(scale);
        this.recalc();
    }

    this.toString = function() {
        return this.toStringBox() + "\n" + this.base + "\n" + this.supScript + "\n" + this.subScript;
    }

    if (argv.length > 0) 
    	this.initSupSub(base, supScript, subScript);
}

MathML.SupSub.prototype = new Box();