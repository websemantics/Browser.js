/**
 * Browser.js : TextData
 *
 * TextData class is used to generate 'text', 'tspan' and 'a' elements in SVG. (2002)
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2002-2016 Web Semantics, Inc. (http://websemantics.io)
 * @license   http://www.opensource.org/licenses/mit-license.php
 * @link      http://oeasvg.com/browserjs
 * @since     9th August 2002 / 27th August 2005 / 3rd May 2015
 * @package   websemantics/browserjs/common
 */

// NEVER CHANGE THIS (The baseline calculation is based on this assumption).
var fontUnit   = "pt";

TextData.prototype = new Box();

function TextData( /* String */ data, /* Attributes */ attrs) {
    var argv = TextData.arguments;
    var argc = TextData.length;
    /* String  */
    this.className = "TextData";

    /* String  */
    this.data = null;
    /* Font    */
    this.font = null;
    /* float   */
    this.space = 0; // The width of char 'space' in the current font 
    /* int */
    this.left = 0; // Extra left padding for the text
    /* int */
    this.right = 0; // Extra right padding for the text
    this.fontfamily = "Times New Roman";
    this.fontstyle  = "normal";
    this.fontsize   = 14;
    
    if (argv.length > 0) 
    	this.initTextData(data, attrs);
}
//===========
// Methods:
//===========
//***************
// initTextData
//***************
TextData.prototype.initTextData = function( /* String */ data, /* Attributes */ attrs) {
    this.initBox(0, 0, 0, 0);
    var InvisibleTimes = 8290;
    if (data != undefined && data != null && data.charCodeAt(0) != InvisibleTimes) {
        this.data = data;
    }
    this.setAttributes(attrs);
}
//***************
// getWidth
//***************
TextData.prototype.getWidth = function() {
    return this.w + this.left + this.right;
}
//*************
// createSVGContent
//*************
TextData.prototype.createSVGContent = function( /* Graphics */ g, /* Graphics */ bgg, /* SVGTextElement */ parent) {
    this.createSVGContentTextData(g, bgg, parent);
}
//*************
// Private: 
// createSVGContentTextData: Used to create the background color
//*************
TextData.prototype.createSVGContentTextData = function( /* Graphics */ g, /* Graphics */ bgg, /* SVGTextElement */ parent) {
    
    if (this.data != null) {
        this.createSVGContentBox(g, bgg);
        var svgNodeType = (parent != undefined && parent != null) ? "tspan" : "text";

        this.font = new Font(this.fontfamily, this.fontstyle, this.fontsize + fontUnit);

        g.setFont(this.font);
        g.setColor(this.fColor);
        
        this.Node = g.drawText(this.x + this.left, this.y + this.top + this.getBaseline(), this.data, svgNodeType, parent);
        this.Node.removeAttribute("transform");
    }
}
//*************
// scale: 
//*************
TextData.prototype.scale = function( /* float */ scale) {
    if (this.font != null) {
        var newFontSize = this.font.getSizeValue() * scale;
        this.font.setSize(newFontSize + fontUnit);
        this.Node.setFont(this.font);
    } else {
        this.fontsize *= scale;
    }
}
//*************
// moveContentTo: 
//*************
TextData.prototype.moveContentTo = function( /* float */ x, /* float */ y) {
    if (this.Node != null) {
        this.Node.setAttribute('x', x + this.left);
        this.Node.setAttribute('y', y + this.getBaseline());
    }
}
//*************
// recalc: Used when the TextData is relying on computationals based on text,...
//*************
TextData.prototype.recalc = function() {
    this.recalcTextData();
}
//*************
// recalcTextData: 
//*************
TextData.prototype.recalcTextData = function() {
    if (this.data == null || this.getNode() == null) return false;
    this.space = (new FontMetrics(this.font)).getStringWidth("-");
    this.getNode().setFont(this.font);
    this.setBaseline(this.getNode().getBaseline());
    this.setWidth(this.getNode().getStringWidth());
    this.setHeight(this.getNode().getStringHeight());
    this.recalcBox();
}
//*************
// toString: 
//*************
TextData.prototype.toString = function() {
    return this.toStringBox() + "\n [data:" + this.data + ", font:" + this.font + "]";
}