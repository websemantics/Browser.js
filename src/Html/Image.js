/**
 * Browser.js : Image
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2002-2016 Web Semantics, Inc. (http://websemantics.io)
 * @license   http://www.opensource.org/licenses/mit-license.php
 * @link      http://oeasvg.com/browserjs
 * @since     9th August 2002 -> 28th August 2005
 * @package   websemantics/browserjs/html
 */

Html.Image = function( /* String */ src, /* float */ w, /* float */ h) {
    var argv = Html.Image.arguments;
    var argc = Html.Image.length;
    /* String  */
    this.className = "Html.Image";

    /* String  */
    this.src = null;

    //***************
    // initImage
    // 
    // Forms:
    // ======
    // (1) Image(/* String */ src,/* float */ w,/* float */ h)
    // (2) Image(Attributes */ attrs)
    //***************
    this.initImage = function( /* String or Attributes*/ src, /* float */ w, /* float */ h) {
        this.initBox(0, 0, 0, 0);
        if (src instanceof Attributes) {
            var attrs = src;
            this.setAttributes(attrs);
            return;
        }
        this.setWidth(parseFloat(w) || 32);
        this.setHeight(parseFloat(h) || 32);
        this.src = src;
    } 

    this.setAttributes = function( /* Attributes */ attrs, /* Attributes */ parentAttrs) {
        this.setAttributesImage(attrs, parentAttrs);
    }
    //***************
    // setAttributesImage [ NOT NEEDED -> DELETE]
    //***************
    this.setAttributesImage = function( /* Attributes */ attrs, /* Attributes */ parentAttrs) {
        this.setAttributesBox(attrs, parentAttrs);
        if (attrs != undefined && attrs != null) {
            this.initImage(attrs.src, attrs.width, attrs.height);
            if (attrs.alt != undefined) this.alt = attrs.alt;
        }
    }

    this.createSVGContent = function( /* Graphics */ g, /* Graphics */ bgg, /* SVGTextElement */ parent) {
        this.createSVGContentImage(g, bgg, parent);
    }

    this.createSVGContentImage = function( /* Graphics */ g, /* Graphics */ bgg, /* SVGTextElement */ parent) {
        this.createSVGContentBox(g, bgg, parent);
        this.Node = g.drawImage(this.x, this.y, this.getWidth(), this.getHeight(), this.src);
    }

    this.recalc = function() {
        this.recalcImage();
    }

    this.recalcImage = function() {
        this.setBaseline(this.getHeight());
        this.recalcBox();
    }

    this.moveContentTo = function( /* float */ x, /* float */ y) {
        this.moveContentToImage(x, y);
    }

    this.moveContentToImage = function( /* float */ x, /* float */ y) {
        if (this.Node != null) this.Node.translate(x, y);
    }

    this.toString = function() {
        return this.toStringBox();
    }

    if (argv.length > 0) 
    	this.initImage(src, w, h);
}

Html.Image.prototype = new Box();