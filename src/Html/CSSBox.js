/**
 * Browser.js : CSSBox
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2002-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @link      http://oeasvg.com/hotdrawjs
 * @since     9th August 2002
 * @package   websemantics/browserjs/html
 */

CSSBox.prototype = new Box();

function CSSBox() {
    var argv = CSSBox.arguments;
    var argc = CSSBox.length;
    /* String  */
    this.className = "CSSBox";

    /* Color */
    this.bgColor = null;
    /* Color */
    this.border_color_top    = "rgb(64,64,64)";
    /* Color */
    this.border_color_bottom = "rgb(128,128,128)";
    /* Color */
    this.border_color_left   = "rgb(212,208,200)";
    /* Color */
    this.border_color_right  = "rgb(230,230,230)";
    /* float */
    this.padding_left = 0;
    /* float */
    this.padding_right = 0;
    /* float */
    this.padding_top = 0;
    /* float */
    this.padding_bottom = 0;
    /* float */
    this.border_left_width = 0;
    /* float */
    this.border_right_width = 0;
    /* float */
    this.border_top_width = 0;
    /* float */
    this.border_bottom_width = 0;
    /* float */
    this.margin_left = 0;
    /* float */
    this.margin_right = 0;
    /* float */
    this.margin_top = 0;
    /* float */
    this.margin_bottom = 0;
    /* String*/
    this.border_style = "none";
    
    // Graphics contains the background content (i.e. border, background color ,etc)
    /* Graphics */
    this.bgg = null;
    /* Shape */
    this.backgroundRect = null;
    /* Shape */
    this.borderTopPolygon = null;
    /* Shape */
    this.borderRightPolygon = null;
    /* Shape */
    this.borderBottomPolygon = null;
    /* Shape */
    this.borderLeftPolygon = null;
    
    if (argv.length >= 0) 
        this.initCSSBox();
}

CSSBox.prototype.initCSSBox = function() {
    this.initNode(0, 0, 0, 0, 0, 1); // rotate = 0 ; scale = 1;
    this.setCSSBox(5, 5, 5, 5, 3, 3, 3, 3, 2, 2, 2, 2); // Padding*4, Border*4 and Margin*4 [l,r,t,b]
}

CSSBox.prototype.setCSSBox = function( /* float */ pl, pr, pt, pb, bl, br, bt, bb, ml, mr, mt, mb) {
    this.padding_left = pl;
    this.padding_right = pr;
    this.padding_top = pt;
    this.padding_bottom = pb;
    this.border_left_width = bl;
    this.border_right_width = br;
    this.border_top_width = bt;
    this.border_bottom_width = bb;
    this.margin_left = ml;
    this.margin_right = mr;
    this.margin_top = mt;
    this.margin_bottom = mb;
}

CSSBox.prototype.setBorderColor = function( /* Color */ t, r, b, l) {
    this.border_color_top = t;
    this.border_color_right = r;
    this.border_color_bottom = b;
    this.border_color_left = l;
}

CSSBox.prototype.getInnerWidth = function() {
    return (this.w - (this.margin_right + this.border_right_width + this.padding_right) - (this.margin_left + this.border_left_width + this.padding_left));
}

CSSBox.prototype.getInnerHeight = function() {
    return (this.h - (this.margin_top + this.border_top_width + this.padding_top) - (this.margin_bottom + this.border_bottom_width + this.padding_bottom));
}

CSSBox.prototype.setInnerHeight = function( /* float */ h) {
    this.h = h + (this.margin_top + this.border_top_width + this.padding_top) + (this.margin_bottom + this.border_bottom_width + this.padding_bottom);
}

CSSBox.prototype.setInnerWidth = function( /* float */ w) {
    this.w = w + (this.margin_right + this.border_right_width + this.padding_right) + (this.margin_left + this.border_left_width + this.padding_left);
}

CSSBox.prototype.getDx = function() {
    return (this.margin_right + this.border_right_width + this.padding_right);
}

CSSBox.prototype.getDy = function() {
    return (this.margin_top + this.border_top_width + this.padding_top);
}

//***************
// getBColor: Get the border color ,...
//
// This function is used to help get the available
// colors if one is not available
//***************
CSSBox.prototype.getBColor = function(s) {
    if (s != null) return s;
    if (this.border_color_top != null) return this.border_color_top;
    if (this.border_color_right != null) return this.border_color_right;
    if (this.border_color_bottom != null) return this.border_color_bottom;
    if (this.border_color_left != null) return this.border_color_left;
    return this.fColor;
}

CSSBox.prototype.createSVGContent = function( /* Graphics */ g, /* Graphics */ bgg, /* SVGTextElement */ parent) {
    this.createSVGContentCSSBox(g, bgg, parent);
}

//*************
// createSVGContentCSSBox: Used to create the CSS Box,..
//*************
CSSBox.prototype.createSVGContentCSSBox = function( /* Graphics */ g, /* Graphics */ bgg, /* SVGTextElement */ parent) {
    this.bgg = new Graphics(0, 0, 0, 0);
    bgg.addGraphics(this.bgg);
    bgg = this.bgg;
    this.bgNode = bgg;
    // Draw the background color (it will include the padding area)
    if (this.bgColor != null) {
        this.backgroundRect = bgg.drawRect(0, 0, 0, 0);
        this.setBackgroundColor(this.bgColor);
    }
    if (this.border_style == "solid") {
        this.borderTopPolygon = bgg.drawPolygon(0, 0);
        this.borderRightPolygon = bgg.drawPolygon(0, 0);
        this.borderBottomPolygon = bgg.drawPolygon(0, 0);
        this.borderLeftPolygon = bgg.drawPolygon(0, 0);
    }
}

//*************
// recalc: Used when the CSSBox is relying on computationals based on text,...
//*************
CSSBox.prototype.recalc = function() {
    this.recalcCSSBox();
}

//*************
// recalcBox: Resize and reposition the background node
//*************
CSSBox.prototype.recalcCSSBox = function() {
    // overall width and height
    var wo = this.getWidth();
    var ho = this.getHeight();
    var tx = this.getDx();
    var ty = this.getDy();
    var w = this.getInnerWidth();
    var h = this.getInnerHeight();
    var x = 0;
    var y = 0;
    var padding_left = this.padding_left;
    var padding_right = this.padding_right;
    var padding_top = this.padding_top;
    var padding_bottom = this.padding_bottom;
    var border_left_width = this.border_left_width;
    var border_right_width = this.border_right_width;
    var border_top_width = this.border_top_width;
    var border_bottom_width = this.border_bottom_width;
    var margin_left = this.margin_left;
    var margin_right = this.margin_right;
    var margin_top = this.margin_top;
    var margin_bottom = this.margin_bottom;
    // Update the background shape
    if (this.backgroundRect != null) {
        this.backgroundRect.setSize(this.getInnerWidth() + padding_left + padding_right, this.getInnerHeight() + padding_top + padding_bottom);
        this.backgroundRect.translate(x + tx - padding_left, y + ty - padding_top);
        this.backgroundRect.setColor(this.bgColor);
    }
    // Top left povars (1,2)
    var tlx1 = x + margin_left;
    var tlx2 = tlx1 + border_left_width;
    var tly1 = y + margin_top;
    var tly2 = tly1 + border_top_width;
    // Top right povars (1,2)
    var trx1 = x + wo - margin_right;
    var trx2 = trx1 - border_right_width;
    var try1 = y + margin_top;
    var try2 = try1 + border_top_width;
    // Bottom left povars (1,2)
    var blx1 = x + margin_left;
    var blx2 = tlx1 + border_left_width;
    var bly1 = y + ho - margin_bottom;
    var bly2 = bly1 - border_bottom_width;
    // Bottom right povars (1,2)
    var brx1 = x + wo - margin_right;
    var brx2 = trx1 - border_right_width;
    var bry1 = y + ho - margin_bottom;
    var bry2 = bly1 - border_bottom_width;
    var poly_top_x = [tlx1, tlx2, trx2, trx1];
    var poly_top_y = [tly1, tly2, try2, try1];
    var poly_right_x = [trx1, trx2, brx2, brx1];
    var poly_right_y = [try1, try2, bry2, bry1];
    var poly_bottom_x = [brx1, brx2, blx2, blx1];
    var poly_bottom_y = [bry1, bry2, bly2, bly1];
    var poly_left_x = [blx1, blx2, tlx2, tlx1];
    var poly_left_y = [bly1, bly2, tly2, tly1];
    if (this.borderTopPolygon != null) {
        this.borderTopPolygon.setXYPoints(poly_top_x, poly_top_y);
        this.borderTopPolygon.setColor(this.getBColor(this.border_color_top));
    }
    if (this.borderRightPolygon != null) {
        this.borderRightPolygon.setXYPoints(poly_right_x, poly_right_y);
        this.borderRightPolygon.setColor(this.getBColor(this.border_color_right));
    }
    if (this.borderBottomPolygon != null) {
        this.borderBottomPolygon.setXYPoints(poly_bottom_x, poly_bottom_y);
        this.borderBottomPolygon.setColor(this.getBColor(this.border_color_bottom));
    }
    if (this.borderLeftPolygon != null) {
        this.borderLeftPolygon.setXYPoints(poly_left_x, poly_left_y);
        this.borderLeftPolygon.setColor(this.getBColor(this.border_color_left));
    }
    this.recalcBox();
}