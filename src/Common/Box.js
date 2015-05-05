/**
 * Browser.js : Box
 *
 * Box class is at the heart of the Browser.js implementation . It represents 
 * the Box Model of the new layout model. It is also the super class of all 
 * classes in the software. This object was identified based on the requirement 
 * of the MathML rendering engine at first and then the requirement of the new 
 * layout model overall. The Box class has different attributes (properties) 
 * and methods (behaviors) to serve different purposes. However some of the 
 * object methods work more as templates where other classes override them to 
 * do more sophisticated work. A similar approach was followed to implement 
 * XHTML and SVG (2002)
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2002-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @link      http://oeasvg.com/hotdrawjs
 * @since     9th August 2002 / 27th August 2005 / 3rd May 2015
 * @package   websemantics/browserjs/common
 */

Box.prototype = new Node();

function Box( /* int */ x, /* int */ y, /* int */ w, /* int */ h) {
    var argv = Box.arguments;
    var argc = Box.length;
    /* String  */
    this.className = "Box";

    /* float   */
    this.baseline = 0;
    /* Color   */
    this.fColor = "black";
    /* Color   */
    this.bgColor = null;
    /* boolean */
    this.created = false;

    /* Node, Downcast of the foreground Shape object (mostly Text) to Node object  */
    this.Node = null;
    /* Node, Downcast of the background Shape object (Rectangle) to Node object */
    this.bgNode = null;
    
    if (argv.length > 0) 
        this.initBox(x, y, w, h);
}

Box.prototype.initBox = function(x, y, w, h) {
    this.initNode(x, y, w, h, 0, 1); // rotate = 0 ; scale = 1;
}

Box.prototype.setBaseline = function( /* float */ bl) {
    this.baseline = bl;
}

Box.prototype.getBaseline = function() {
    return this.baseline;
}

Box.prototype.setColor = function( /* Color */ c) {
    this.setColorBox(c);
}

Box.prototype.setColorBox = function( /* Color */ c) {
    this.fColor = c || 'black';

    if (this.Node != null && this.Node.setColor != undefined) 
        this.Node.setColor(this.fColor);
}

Box.prototype.setBackgroundColor = function( /* Color */ bgc) {
    
    this.bgColor = bgc || null;
    
    // Delete the background node if the color is set to null
    if (this.bgColor == null && this.bgNode != null) {
        this.bgNode.dispose();
        return;
    }

    // Set the color of the background node ('rect') if it has been created 
    if (this.bgNode != null) 
        this.bgNode.setColor(this.bgColor);
}

Box.prototype.draw = function( /*int */ x, y, /* Graphics */ g, /* Graphics */ bgg, /* SVGTextElement */ parent) {
    this.setCoord(x, y);
    this.paint(g, bgg, parent);
}

Box.prototype.paint = function( /* Graphics */ g, /* Graphics */ bgg, /* SVGTextElement */ parent) {
    this.paintBox(g, bgg, parent);
}

Box.prototype.paintBox = function( /* Graphics */ g, /* Graphics */ bgg, /* SVGTextElement */ parent) {
    // Summary:
    // Paint a Box,
    // g: main Graphics, bgg: background Graphics, parent: the top text element
    if (!this.created) {
        this.created = true;
        this.createSVGContent(g, bgg, parent);
    } else {
        // Always add the foreground/background nodes to the incoming Graphics, unless the parent is given.
        if (g != undefined && this.Node != null && (parent == undefined || parent == null)) g.addGraphics(this.Node);
        if (bgg != undefined && this.bgNode != null) bgg.addGraphics(this.bgNode);
    }
}

Box.prototype.createSVGContent = function( /* Graphics */ g, /* Graphics */ bgg, /* SVGTextElement */ parent) {
    this.createSVGContentBox(g, bgg, parent);
}

Box.prototype.createSVGContentBox = function( /* Graphics */ g, /* Graphics */ bgg, /* SVGTextElement */ parent) {
    if (this.bgColor == null) return;
    this.bgNode = bgg.drawRect(this.x, this.y, this.getWidth(), this.getHeight());
    this.setBackgroundColor(this.bgColor);
}

Box.prototype.scale = function( /* float */ scale) {/*  Override this for all subclasses */}

Box.prototype.recalc = function() {
    // Summary:
    // Used when the Box is relying on computationals based on text,...
    this.recalcBox();
}

Box.prototype.recalcBox = function() {
    // Summary:
    // Resize and reposition the background node
    if (this.bgNode != null) this.bgNode.setSize(this.getWidth(), this.getHeight());
    this.moveTo(this.x, this.y);
}

Box.prototype.moveTo = function( /* float */ x, /* float */ y) {
    this.setCoord(x, y);
    this.moveContentTo(x, y);
    this.moveBackgroundTo(x, y);
}

Box.prototype.moveContentTo = function( /* float */ x, /* float */ y) {
    this.moveContentToBox(x, y);
}

Box.prototype.moveContentToBox = function( /* float */ x, /* float */ y) {
    if (this.Node != null) this.Node.translate(x, y + this.getBaseline());
}

Box.prototype.moveBackgroundTo = function( /* float */ x, /* float */ y) {
    if (this.bgNode != null) this.bgNode.translate(x, y);
}

Box.prototype.setAttributes = function( /* Attributes */ attrs, /* Attributes */ parentAttrs) {
    this.setAttributesBox(attrs, parentAttrs);
}

Box.prototype.setAttributesBox = function( /* Attributes */ attrs, /* Attributes */ parentAttrs) {
    
    if (attrs == undefined) 
        return false;
    
    // Apply inheritance attributes [ try to catch own attributes, otherwise check the parent node]
    var inhAttributes = attrs.inhAttributes;
    
    for (i = 0; i < inhAttributes.length; i++) {
        var AttrName = inhAttributes[i].replace("-", "_");
        if (attrs[AttrName] != undefined) this[AttrName] = attrs[AttrName];
        else
        if (parentAttrs != undefined) this[AttrName] = parentAttrs[AttrName];
    }

    // Apply Other attributes
    var iAttr = attrs.defaultAttributes;
    for (i = 0; i < iAttr.length; i++) {
        var AttrName = iAttr[i].replace("-", "_");
        if (attrs[AttrName] != undefined) this[AttrName] = attrs[AttrName];
    }

    // Set Fore/Background colors.
    this.setColor(this.color);

    this.setBackgroundColor(attrs.background_color);
    return true;
}

Box.prototype.toString = function() {
    return this.toStringBox();
}

Box.prototype.toStringBox = function() {
    return this.className + ":\n [baseline:" + this.baseline + ", color:" + this.fColor + ", background:" + this.bgColor + "]" + "\n [x:" + this.x + ", y:" + this.y + ", width:" + this.w + ", height:" + this.h + "]";
}