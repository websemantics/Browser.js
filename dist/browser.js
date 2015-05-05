// Browser.js 0.1.0
//
// Copyright (c) 2004 – 2015 Web Semantics,Inc. All rights reserved.
//
// http://www.opensource.org/licenses/mit-license.php
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// build: 2015-05-05

/**
 * Browser.js : DOMNode, DOM [based on Java org.w3c.dom package]
 *
 * The DOM implementation in JavaScript
 *
 * The Node class is the superclass for the entire Document Object Model.
 * It represent a single node in the tree.
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2002-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @link      http://oeasvg.com/hotdrawjs
 * @since     2nd Oct 2005
 * @package   websemantics/browserjs/dom
 */

// Node types
var ELEMENT_NODE = 1;
var ATTRIBUTE_NODE = 2;
var TEXT_NODE = 3;
var CDATA_SECTION_NODE = 4;
var ENTITY_REFERENCE_NODE = 5;
var ENTITY_NODE = 6;
var PROCESSING_INSTRUCTION_NODE = 7;
var COMMENT_NODE = 8;
var DOCUMENT_NODE = 9;
var DOCUMENT_TYPE_NODE = 10;
var DOCUMENT_FRAGMENT_NODE = 11;
var NOTATION_NODE = 12;

function DOMNode() {
    var argv = DOMNode.arguments;
    var argc = DOMNode.length;
    /* String  */
    this.className = "DOMNode";

    /* String       */
    this.nodeName = null;
    /* String       */
    this.nodeValue = null;
    /* NamedNodeMap */
    this.attributes = null;
    /* Vector       */
    this.children = null;
    /* String       */
    this.namespacePrefix = null;
    /* String       */
    this.namespaceURI = null;
    /* int          */
    this.nodeType = null;
    /* Document     */
    this.document = null;
    /* DOMNode      */
    this.parentNode = null;
    /* DOMNode      */
    this.previousNode = null;
    /* DOMNode      */
    this.nextNode = null;
    
    if (argv.length >= 0) 
      this.initDOMNode();
}

DOMNode.prototype.initDOMNode = function() {}

DOMNode.prototype.getNodeName = function() {
    if (this.namespacePrefix != null) return this.namespacePrefix + ":" + this.nodeName;
    return this.nodeName;
}

//***************
// Set the value of the node which depends on its type (nodeType)
//***************
DOMNode.prototype.setNodeValue = function( /* String */ value) {
    this.nodeValue = value;
}

//***************
// Get the value of the node
//***************
/* String */
DOMNode.prototype.getNodeValue = function() {
    return this.nodeValue;
}

//***************
// Get the type of the node (see above)
//***************
/* int */
DOMNode.prototype.getNodeType = function() {
    return this.nodeType;
}

//***************
// Get the parent of the node
//***************
/* DOMNode */
DOMNode.prototype.getParentNode = function() {
    return this.parentNode;
}

//***************
// A list of all children of the node
//***************
/* DOMNodeList */
DOMNode.prototype.getChildNodes = function() {
    return new DOMNodeList(this.children);
}

//***************
// Get the first child of the node or return null;
//***************
/* DOMNode */
DOMNode.prototype.getFirstChild = function() {
    if (this.children.isEmpty()) return null;
    return this.children.elementAt(0);
}

//***************
// Get the last child of the node or return null;
//***************
/* DOMNode */
DOMNode.prototype.getLastChild = function() {
    if (this.children.isEmpty()) return null;
    return this.children.elementAt(this.children.size() - 1);
}

//***************
// Get the node preceding this or null
//***************
/* DOMNode */
DOMNode.prototype.getPreviousSibling = function() {
    return this.previousNode;
}
//***************
// Get the node following this or null
//***************
/* DOMNode */
DOMNode.prototype.getNextSibling = function() {
    return this.nextNode;
}

//***************
// Get the node attributes
//***************
/* NamedNodeMap */
DOMNode.prototype.getAttributes = function() {
    return this.attributes;
}

//***************
// Get the node document
//***************
/* Document */
DOMNode.prototype.getOwnerDocument = function() {
    return this.document;
}

//***************
// Insert newChild before refChild. If refChild is null insert at the end.
// If newChild is already in the tree, remove the first one.
//***************
/* DOMNode */
DOMNode.prototype.insertBefore = function( /* DOMNode */ newChild, refChild) {
    if (newChild == null) return null;
    if (this.children == null) this.children = new Vector();
    this.children.removeElement(newChild);
    var i = this.children.indexOf(refChild);
    if (i == -1 || refChild == null) this.children.addElement(newChild);
    else this.children.insertElementAt(newChild, i - 1);
    return newChild;
}

//***************
// Replace oldChild with newChild and return oldChild.
// If newChild is already in the tree, remove the first one.
//***************
/* DOMNode */
DOMNode.prototype.replaceChild = function( /* DOMNode */ newChild, oldChild) {
    if (newChild == null || this.children == null) return null;
    this.children.removeElement(newChild);
    var i = this.children.indexOf(oldChild);
    if (i == -1 || oldChild == null) this.children.addElement(newChild);
    else {
        this.children.removeElement(oldChild);
        this.children.insertElementAt(newChild, i);
    }
    return oldChild;
}

//***************
// Remove the oldChild and return from the list of children.
//***************
/* DOMNode */
DOMNode.prototype.removeChild = function( /* DOMNode */ oldChild) {
    if (oldChild == null || this.children == null) return null;
    this.children.removeElement(oldChild);
    return oldChild;
}

//***************
// Add newChild to the end of the children list.
// If newChild is already in the tree, remove the first one.
//***************
/* DOMNode */
DOMNode.prototype.appendChild = function( /* DOMNode */ newChild) {
    if (newChild == null || this.children == null) return null;
    this.children.addElement(newChild);
    return newChild;
}

//***************
// Return true of it has children
//***************
/* boolean */
DOMNode.prototype.hasChildNodes = function() {
    if (this.children == null) return false;
    return !this.children.isEmpty();
}

//***************
// Returns a duplicate of this node
// The duplicate node has no parent
//***************
/* boolean */
DOMNode.prototype.cloneNode = function( /* boolean */ deep) {
    alert("DOMNode.prototype.cloneNode is NOT supported");
}

//***************
// normalize: Not Implemented
//***************
DOMNode.prototype.normalize = function() {
    alert("DOMNode.prototype.normalize is NOT supported");
}

//***************
// isSupported: Not Implemented
//***************
/* boolean */
DOMNode.prototype.isSupported = function( /* String */ feature, version) {
    alert("DOMNode.prototype.isSupported is NOT supported");
}

//***************
// Get the namespace URI of this node
//***************
/* String */
DOMNode.prototype.getNamespaceURI = function() {
    return this.namespaceURI;
}

//***************
// Get the namespace prefix of this node
//***************
/* String */
DOMNode.prototype.getPrefix = function() {
    return this.namespacePrefix;
}

//***************
// Set the namespace prefix of this node
//***************
DOMNode.prototype.setPrefix = function( /* String */ prefix) {
    this.namespacePrefix = prefix;
}

//***************
// Returns the local part of the qualified name of this node: Not sure it's the right implementation
//***************
/* String */
DOMNode.prototype.getLocalName = function() {
    return this.nodeName;
}

//***************
// Returns the local part of the qualified name of this node: Not sure it's the right implementation
//***************
/* boolean */
DOMNode.prototype.hasAttributes = function() {
    return !(this.attributes == null);
}
/**
 * Browser.js : CharacterData, DOM [based on Java org.w3c.dom package]
 *
 * The CharacterData interface extends Node with a set of attributes and methods
 * for accessing character data in the DOM. For clarity this set is defined here
 * rather than on each object that uses these attributes and methods.
 * 
 * No DOM objects correspond directly to CharacterData though Text and others do
 * inherit the interface from it. All offsets in this interface start from 0.
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2002-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @link      http://oeasvg.com/hotdrawjs
 * @since     2nd Oct 2005
 * @package   websemantics/browserjs/dom
 */

CharacterData.prototype = new DOMNode();

function CharacterData() {
    var argv = CharacterData.arguments;
    var argc = CharacterData.length;
    /* String  */
    this.className = "CharacterData";

    /* String */
    this.data = null;
    
    if (argv.length >= 0) 
    	this.initCharacterData();
}

CharacterData.prototype.initCharacterData = function() {}

//***************
// getData
// The character data of the node that implements this interface.
//***************
/* String */
CharacterData.prototype.getData = function() {
    return this.data;
}

//***************
// setData
// The character data of the node that implements this interface.
//***************
CharacterData.prototype.setData = function( /* String */ data) {
    this.data = data;
}

/* int */
CharacterData.prototype.getLength = function() {
    if (this.data == null) return 0;
    return this.data.length;
}

//***************
// substringData
// Extracts a range of data from the node.
//***************
/* String */
CharacterData.prototype.substringData = function( /* int */ offset, /* int */ count) {
    if (offset < 0 || offset > this.getLength() || count < 0) {
        alert("substringData:substringData[71]: Error");
        return;
    }
    if (this.data == null) return "";
    return this.data.substring(offset, offset + count);
}

//***************
// appendData
// Append the string to the end of the character data of the node.
//***************
CharacterData.prototype.appendData = function( /* String */ arg) {
    if (this.data == null) return;
    this.data += arg;
}

//***************
// insertData
// Insert a string at the specified 16-bit unit offset.
//***************
CharacterData.prototype.insertData = function( /* int */ offset, /* String */ arg) {
    if (this.data == null) return;
    this.data = this.data.substring(0, offset) + arg + this.data.substring(offset, this.data.length);
}

//***************
// deleteData
// Remove a range of 16-bit units from the node.
//***************
CharacterData.prototype.deleteData = function( /* int */ offset, /* int */ count) {
    if (this.data == null) return;
    this.data = this.data.substring(0, offset) + this.data.substring(offset + count, this.data.length);
}

//***************
// replaceData
// Replace the characters starting at the specified 16-bit unit offset with the specified string.
//***************
CharacterData.prototype.replaceData = function( /* int */ offset, /* int */ count, /* String */ arg) {
    if (this.data == null) return;
    this.data = this.data.substring(0, offset) + arg + this.data.substring(offset + count, this.data.length);
}

CharacterData.prototype.toString = function() {
    return this.data;
}
/**
 * Browser.js : Attributes
 *
 * Support attributes for XHTML, MathML and SVG!
 * 
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2002-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @link      http://oeasvg.com/hotdrawjs
 * @since     9th August 2002 / 27th August 2005 / 3rd May 2015
 * @package   websemantics/browserjs/common
 */

function Attributes( /* SVGCustomeElement */ node, /* boolean */ getDefaultAttributes, /* Attributes */ defaultAttributes) {
    var argv = Attributes.arguments;
    var argc = Attributes.length;
    /* String  */
    this.className = "Attributes";

    // A list of all attributes which are NOT to be inherited.
    this.listOfAttributes = [
        "border-style",
        "border-right-width",
        "border-left-width",
        "border-top-width",
        "border-bottom-width",
        "text-decoration",
        "href",
        "alt",
        "mathcolor",
        "mathbackground",
        "mathsize",
        "mathvariant",
        "background-color",
        "fontweight",
        "linethickness",
        "text-align",
        "width",
        "height",
        "src",
        "form",
        "fence",
        "separator",
        "accent",
        "lspace",
        "rspace",
        "stretchy",
        "symmetric",
        "maxsize",
        "minsize",
        "largeop",
        "movablelimits",
        "depth",
        "lquote",
        "rquote"];

    // A list of all attributes which CAN to be inherited for now.
    this.inhAttributes = ["fontfamily", "fontsize", "fontstyle", "color"];

    // Default values of all attributes
    this.defaultAttributes = null;

    if (argv.length > 0) 
      this.initAttributes(node, getDefaultAttributes, defaultAttributes);
}
//*************************************
// initAttributes
//*************************************
Attributes.prototype.initAttributes = function( /* SVGCustomeElement */ node, /* boolean */ getDefaultAttributes, /* Attributes */ defaultAttributes) {
    if (getDefaultAttributes == undefined) getDefaultAttributes = false;
    // All Default values needed for HTML and MathML
    // Don't use them if an alternative 'defaultAttributes' is given (normally for inherited attributes)
    if (defaultAttributes != undefined) 
      this.defaultAttributes = defaultAttributes;
    else 
      this.defaultAttributes = "\
                                  href:null;\
                                  text-decoration:none;\
                                  fontfamily:Arial Narrow;\
                                  fontsize:14;\
                                  color:black;\
                                  alt:insert text here;\
                                  fontstyle:normal;\
                                  background-color:none;\
                                  fontweight:normal;\
                                  linethickness:1;\
                                  text-align:left;\
                                  width:10;\
                                  mathvariant:normal;\
                                  mathsize:small;\
                                  mathbackground:none;\
                                  mathcolor:black;\
                                  height:10;\
                                  form:null;\
                                  fence:false;\
                                  separator:false;\
                                  accent:null;\
                                  lspace:0;\
                                  rspace:0;\
                                  stretchy:null;\
                                  symmetric:true;\
                                  maxsize:infinity;\
                                  minsize:0;\
                                  largeop:null;\
                                  movablelimits:null;\
                                  depth:0;\
                                  rquote:rq;\
                                  lquote:lq;\
                                  padding-bottom:0;\
                                  padding-left:0;\
                                  padding-right:0;\
                                  border-bottom-width:0;\
                                  border-top-width:0;\
                                  border-left-width:0;\
                                  border-right-width:0;\
                                  border-style:none;\
                                  font-weight:normal;\
                                  padding-top:0;";

    // For HTML element: read the style attributes from the given node
    this.resolveCSSStyle(node, getDefaultAttributes);

    // Override any CSS attributes by attribute properties, and read those of MathML as well
    this.obtainAttributes(node);
}
//*************************************
// Parse the style attribute
//*************************************
Attributes.prototype.resolveCSSStyle = function( /* SVGCustomeElement */ node, /* boolean */ getDefaultAttributes) {
    
    var style = node.getAttribute('style');

    if (style == null || style == "") return;

    var listOfAttributes = this.listOfAttributes;

    // Resolve The Style Attribute into name = value pairs object.
    var sList = style.split(";");

    var styleNVPairs = new Object();
    for (var i = 0; i < sList.length; i++) {
        var pair = sList[i].split(":");
        if (pair[0] != null && pair[0] != "") styleNVPairs[pair[0]] = pair[1];
    }

    // Do the same as above for the default style attributes list if param:getDefaultAttributes is true
    var defList = null;
    var defStyleNVPairs = null;
    if (getDefaultAttributes) {
        var defList = this.defaultAttributes.split(";");
        var defStyleNVPairs = new Object();
        for (var i = 0; i < defList.length; i++) {
            var pair = defList[i].split(":");
            if (pair[0] != null && pair[0] != "") defStyleNVPairs[pair[0]] = pair[1];
        }
    }

    // Go through all the supported attributes (saved in this.listOfAttributes)
    for (var i = 0; i < listOfAttributes.length; i++) {
        var attrName = listOfAttributes[i];
        var attrValue = styleNVPairs[attrName];
        if (attrValue == undefined && getDefaultAttributes) attrValue = defStyleNVPairs[attrName];
        this[attrName.replace("-", "_")] = attrValue; // example: padding-left => padding_left, this is so to make valid variable name
    }

    // Now, do the same for the inherited attributes.
    listOfAttributes = this.inhAttributes;
    for (var i = 0; i < listOfAttributes.length; i++) {
        var attrName = listOfAttributes[i];
        var attrValue = styleNVPairs[attrName];
        if (attrValue == undefined && getDefaultAttributes) attrValue = defStyleNVPairs[attrName];
        this[attrName.replace("-", "_")] = attrValue; // example: padding-left => padding_left, this is so to make valid variable name
    }
}
//***************
// obtain Attributes
//***************
Attributes.prototype.obtainAttributes = function( /* SVGCustomeElement */ node) {
    
    if (node == undefined || node == null) 
      return;
    
    var listOfAttributes = this.listOfAttributes;

    for (var i = 0; i < listOfAttributes.length; i++) {
        var attrName = listOfAttributes[i];
        var attrValue = node.getAttribute(attrName);
        if (attrValue && attrValue.length > 0) this[attrName.replace("-", "_")] = attrValue;
    }

    // Do the same for the inherited attributes.
    listOfAttributes = this.inhAttributes;
    for (var i = 0; i < listOfAttributes.length; i++) {
        var attrName = listOfAttributes[i];
        var attrValue = node.getAttribute(attrName);
        if (attrValue && attrValue.length > 0) this[attrName.replace("-", "_")] = attrValue;
    }
}
//***************
// get style attribute for inherited attributes only!
//***************
Attributes.prototype.getStyle = function(property) {
    var listOfAttributes = this.inhAttributes;
    var ret = "";
    for (i = 0; i < listOfAttributes.length; i++)
        if (this[listOfAttributes[i]] != undefined) ret += listOfAttributes[i] + ":" + this[listOfAttributes[i]] + ";";
    return ret;
}
//***************
// toString
//***************
Attributes.prototype.toString = function() {
    var listOfAttributes = this.inhAttributes;
    var ret = "";
    for (i = 0; i < listOfAttributes.length; i++) {
        var AttrName = listOfAttributes[i].replace("-", "_");
        if (this[AttrName]) ret += "  " + AttrName + ":" + this[AttrName];
    } // End i
    
    listOfAttributes = this.listOfAttributes;

    ret += "\n -------------------------- \n";

    for (i = 0; i < listOfAttributes.length; i++) {
        var AttrName = listOfAttributes[i].replace("-", "_");
        if (this[AttrName]) ret += "  " + AttrName + " : " + this[AttrName];
    } // End i
    return ret;
}
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
/**
 * Browser.js : TextData
 *
 * TextData class is used to generate 'text', 'tspan' and 'a' elements in SVG. (2002)
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2002-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @link      http://oeasvg.com/hotdrawjs
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
/**
 * Browser.js : MathML
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2002-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @link      http://oeasvg.com/hotdrawjs
 * @since     9th August 2002 -> 27th Sept 2005
 * @package   websemantics/browserjs/mathml
 */

var scaleSup = 0.4; // The scale applied to the script of the Sup schemata
var scaleSub = 0.4; // The scale applied to the script of the Sub schemata
var subLoc = 0.6; // The relative location of the script to the base (the top of the script is located 60% from the top of the base)
var supLoc = 0.3; // The relative location of the script to the base (the bottom of the script is located 40% from the top of the base)
var scaleFraction = 0.80;

MathML.prototype = new CSSBox();

function MathML( /* Box */ child) {
    var argv = MathML.arguments;
    var argc = MathML.length;
    /* String  */
    this.className = "MathML";

    /* Vector */
    this.child = null;

    this.initMathML = function( /* Box */ child) {
        this.initCSSBox();
        this.child = child;
        this.setCSSBox(5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0); // Padding*4, Border*4 and Margin*4 [l,r,t,b]
    }

    this.paint = function( /* Graphics */ g, /* Graphics */ bgg, /* TextElement */ parent) {
        this.paintMathML(g, bgg, parent);
    }

    //*************
    // paint a Box and its subScriptclass.
    // g: main Graphics, bgg: background Graphics
    //*************
    this.paintMathML = function( /* Graphics */ g, /* Graphics */ bgg, /* TextElement */ parent) {
        this.paintBox(g, bgg, parent);
        if (this.child != null) child.paint(g, bgg, parent);
    }

    this.recalc = function() {
        this.recalcMathML();
    }

    this.recalcMathML = function() {
        if (this.child == null) return false;
        this.child.recalc();
        this.setInnerWidth(this.child.getWidth());
        this.setInnerHeight(this.child.getHeight());
        this.setBaseline(this.child.getBaseline());
        this.recalcCSSBox();
    }

    this.moveContentTo = function( /* float */ x, /* float */ y) {
        this.moveContentToMathML(x, y);
    }

    this.moveContentToMathML = function( /* float */ x, /* float */ y) {
        this.moveContentToBox(x, y);
        x += this.getDx();
        y += this.getDy();
        if (this.child != null) {
            this.child.moveTo(x, y);
        }
    }

    if (argv.length > 0) 
    	this.initMathML(child);
}
/**
 * Browser.js : Tokens (Mo, Mi and Mn)
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2002-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @link      http://oeasvg.com/hotdrawjs
 * @since     9th August 2002 -> 27th Sept 2005
 * @package   websemantics/browserjs/mathml
 */

//	(1) Class: Mo 

MathML.Mo = function( /* String */ data, /* Attributes */ attrs) {
    var argv = MathML.Mo.arguments;
    var argc = MathML.Mo.length;
    /* String  */
    this.className = "MathMl.Mo";
    this.initTextData(data, attrs);
}
MathML.Mo.prototype = new TextData();

//	(2) Class: Mi 

MathML.Mi = function( /* String */ data, /* Attributes */ attrs) {
    var argv = MathML.Mi.arguments;
    var argc = MathML.Mi.length;
    /* String  */
    this.className = "MathMl.Mi";
    this.initTextData(data, attrs);
    // From W3C recomendation: FontStyle=italic if one character.
    if (data.length == 1) this.fontstyle = "italic";
}
MathML.Mi.prototype = new TextData();

//	(3) Class: Mn 

MathML.Mn = function( /* String */ data, /* Attributes */ attrs) {
    var argv = MathML.Mn.arguments;
    var argc = MathML.Mn.length;
    /* String  */
    this.className = "MathMl.Mn";
    this.initTextData(data, attrs);
}
MathML.Mn.prototype = new TextData();
/**
 * Browser.js : Under
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2002-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @link      http://oeasvg.com/hotdrawjs
 * @since     9th August 2002 -> 27th Sept 2005
 * @package   websemantics/browserjs/mathml
 */

MathML.Under = function( /* Box */ base, /* Box */ under) {
    var argv = MathML.Under.arguments;
    var argc = MathML.Under.length;
    /* String  */
    this.className = "MathML.Under";

    /* Box  */
    this.base = null;
    /* Box  */
    this.under = null;

    this.initUnder = function( /* Box */ base, /* Box */ under) {
        this.initBox(0, 0, 0, 0);
        this.base = base;
        this.under = under;
    }

    this.setColor = function( /* Color */ c) {
        this.setColorBox(c);
        this.base.setColor(c);
        this.under.setColor(c);
    }

    this.paint = function( /* Graphics */ g, /* Graphics */ bgg, /* TextElement */ parent) {
        this.paintUnder(g, bgg, parent);
    }

    //*************
    // paint a Box and its subclass.
    // g: main Graphics, bgg: background Graphics
    //*************
    this.paintUnder = function( /* Graphics */ g, /* Graphics */ bgg, /* TextElement */ parent) {
        this.paintBox(g, bgg, parent);
        this.base.paint(g, bgg, parent);
        this.under.paint(g, bgg, parent);
    }

    this.recalc = function() {
        this.recalcUnder();
    }

    this.recalcUnder = function() {
        this.base.recalc();
        this.under.recalc();
        this.setWidth(Math.max(this.base.getWidth(), this.under.getWidth()));
        this.setHeight(this.base.getHeight() + this.under.getHeight());
        this.setBaseline(this.base.getBaseline());
        this.base.moveTo(this.x + (this.getWidth() - this.base.getWidth()) / 2, this.y);
        this.under.moveTo(this.x + (this.getWidth() - this.under.getWidth()) / 2, this.y + this.base.getHeight());
        this.recalcBox();
    }

    this.scale = function( /* float */ scale) {
        this.base.scale(scale);
        this.under.scale(scale);
        this.recalc();
    }

    this.toString = function() {
        return this.toStringBox() + "\n" + this.base + "\n" + this.under;
    }

    if (argv.length > 0) 
    	this.initUnder(base, under);
}

MathML.Under.prototype = new Box();
/**
 * Browser.js : Over
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2002-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @link      http://oeasvg.com/hotdrawjs
 * @since     9th August 2002 -> 27th Sept 2005
 * @package   websemantics/browserjs/mathml
 */

MathML.Over = function( /* Box */ base, /* Box */ over) {
    var argv = MathML.Over.arguments;
    var argc = MathML.Over.length;
    /* String  */
    this.className = "MathML.Over";

    /* Box  */
    this.base = null;
    /* Box  */
    this.over = null;

    this.initOver = function( /* Box */ base, /* Box */ over) {
        this.initBox(0, 0, 0, 0);
        this.base = base;
        this.over = over;
    }

    this.setColor = function( /* Color */ c) {
        this.setColorBox(c);
        this.base.setColor(c);
        this.over.setColor(c);
    }

    this.paint = function( /* Graphics */ g, /* Graphics */ bgg, /* TextElement */ parent) {
        this.paintOver(g, bgg, parent);
    }

    //*************
    // paint a Box and its subclass.
    // g: main Graphics, bgg: background Graphics
    //*************
    this.paintOver = function( /* Graphics */ g, /* Graphics */ bgg, /* TextElement */ parent) {
        this.paintBox(g, bgg, parent);
        this.base.paint(g, bgg, parent);
        this.over.paint(g, bgg, parent);
    }

    this.recalc = function() {
        this.recalcOver();
    }

    this.recalcOver = function() {
        this.base.recalc();
        this.over.recalc();
        this.setWidth(Math.max(this.base.getWidth(), this.over.getWidth()));
        this.setHeight(this.base.getHeight() + this.over.getHeight());
        this.setBaseline(this.base.getBaseline() + this.over.getHeight());
        this.base.moveTo(this.x + (this.getWidth() - this.base.getWidth()) / 2, this.y + this.over.getHeight());
        this.over.moveTo(this.x + (this.getWidth() - this.over.getWidth()) / 2, this.y);
        this.recalcBox();
    }

    this.scale = function( /* float */ scale) {
        this.base.scale(scale);
        this.over.scale(scale);
        this.recalc();
    }

    this.toString = function() {
        return this.toStringBox() + "\n" + this.base + "\n" + this.over;
    }

    if (argv.length > 0) 
    	this.initOver(base, over);
}

MathML.Over.prototype = new Box();
/**
 * Browser.js : Sub
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2002-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @link      http://oeasvg.com/hotdrawjs
 * @since     9th August 2002 -> 27th Sept 2005
 * @package   websemantics/browserjs/mathml
 */

MathML.Sub = function( /* Box */ base, /* Box */ subScript) {
    var argv = MathML.Sub.arguments;
    var argc = MathML.Sub.length;
    /* String  */
    this.className = "MathML.Sub";

    /* Box  */
    this.base = null;
    /* Box  */
    this.subScript = null;

    this.initSub = function( /* Box */ base, /* Box */ subScript) {
        this.initBox(0, 0, 0, 0);
        this.base = base;
        this.subScript = subScript;
        this.subScript.scale(scaleSub);
    }

    this.setColor = function( /* Color */ c) {
        this.setColorBox(c);
        this.base.setColor(c);
        this.subScript.setColor(c);
    }

    this.paint = function( /* Graphics */ g, /* Graphics */ bgg, /* TextElement */ parent) {
        this.paintSub(g, bgg, parent);
    }

    //*************
    // paint a Box and its subScriptclass.
    // g: main Graphics, bgg: background Graphics
    //*************
    this.paintSub = function( /* Graphics */ g, /* Graphics */ bgg, /* TextElement */ parent) {
        this.paintBox(g, bgg, parent);
        this.base.paint(g, bgg, parent);
        this.subScript.paint(g, bgg, parent);
    }

    this.recalc = function() {
        this.recalcSub();
    }

    this.recalcSub = function() {
        this.base.recalc();
        this.subScript.recalc();
        this.setWidth(this.base.getWidth() + this.subScript.getWidth());
        this.setHeight(Math.max(this.base.getHeight(), this.base.getHeight() * subLoc + this.subScript.getHeight()));
        this.setBaseline(this.base.getBaseline());
        this.recalcBox();
    }

    this.moveContentTo = function( /* float */ x, /* float */ y) {
        this.moveContentToSub(x, y);
    }

    this.moveContentToSub = function( /* float */ x, /* float */ y) {
        this.moveContentToBox(x, y);
        this.base.moveTo(x, y);
        this.subScript.moveTo(x + this.base.getWidth(), y + this.base.getHeight() * subLoc);
    }

    this.scale = function( /* float */ scale) {
        this.base.scale(scale);
        this.subScript.scale(scale);
        this.recalc();
    }

    this.toString = function() {
        return this.toStringBox() + "\n" + this.base + "\n" + this.subScript;
    }

    if (argv.length > 0) 
    	this.initSub(base, subScript);
}

MathML.Sub.prototype = new Box();
/**
 * Browser.js : Sup
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2002-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @link      http://oeasvg.com/hotdrawjs
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
/**
 * Browser.js : Frac
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2002-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @link      http://oeasvg.com/hotdrawjs
 * @since     9th August 2002 -> 27th Sept 2005
 * @package   websemantics/browserjs/mathml
 */

MathML.Frac = function( /* Box */ numerator, /* Box */ denominator, /* Attributes */ attrs) {
    var argv = MathML.Frac.arguments;
    var argc = MathML.Frac.length;
    /* String  */
    this.className = "MathML.Frac";

    /* Box  */
    this.numerator = null;
    /* Box  */
    this.denominator = null;
    /* float  */
    this.iscale = 1 / (new FontMetrics()).pt2px; // Make the scale factor in pixles
    /* float  */
    this.linethickness = 1;

    this.initFrac = function( /* Box */ numerator, /* Box */ denominator, /* Attributes */ attrs) {
        this.initBox(0, 0, 0, 0);
        this.numerator = numerator;
        this.denominator = denominator;
        this.numerator.scale(scaleFraction);
        this.denominator.scale(scaleFraction);
        this.setAttributes(attrs);
    }

    this.setAttributes = function( /* Attributes */ attrs) {
        if (!this.setAttributesBox(attrs)) return;
        if (attrs.linethickness != undefined) this.linethickness = parseFloat(attrs.linethickness);
        else this.linethickness = 1;
    }

    this.setColor = function( /* Color */ c) {
        this.setColorBox(c);
        this.numerator.setColor(c);
        this.denominator.setColor(c);
    }

    this.createSVGContent = function( /* Graphics */ g, /* Graphics */ bgg, /* SVGTextElement */ parent) {
        this.createSVGContentFrac(g, bgg, parent);
    }

    //*************
    // Private: 
    // createSVGContentBox: Used to create the background color
    //*************
    this.createSVGContentFrac = function( /* Graphics */ g, /* Graphics */ bgg, /* SVGTextElement */ parent) {
        this.createSVGContentBox(g, bgg, parent);
        g.setColor(this.fColor);
        this.Node = g.drawRect(this.x, this.y + this.numerator.getHeight() + this.iscale, this.getWidth(), this.linethickness);
    }

    this.paint = function( /* Graphics */ g, /* Graphics */ bgg, /* SVGTextElement */ parent) {
        this.paintFrac(g, bgg, parent);
    }

    //*************
    // paint a Box and its supScriptclass.
    // g: main Graphics, bgg: background Graphics
    //*************
    this.paintFrac = function( /* Graphics */ g, /* Graphics */ bgg, /* SVGTextElement */ parent) {
        this.paintBox(g, bgg, parent);
        this.numerator.paint(g, bgg, parent);
        this.denominator.paint(g, bgg, parent);
    }

    this.recalc = function() {
        this.recalcFrac();
    }

    this.recalcFrac = function() {
        this.numerator.recalc();
        this.denominator.recalc();
        this.setWidth(Math.max(this.numerator.getWidth(), this.denominator.getWidth()));
        this.setHeight(this.numerator.getHeight() + this.denominator.getHeight() + (2 * this.iscale) + this.linethickness);
        this.setBaseline(this.numerator.getHeight() + (1 * this.iscale) + this.linethickness / 2 + this.denominator.getHeight() * 0.40);
        this.recalcBox();
    }

    this.moveContentTo = function( /* float */ x, /* float */ y) {
        this.moveContentToFrac(x, y);
    }

    this.moveContentToFrac = function( /* float */ x, /* float */ y) {
        this.moveContentToBox(x, y);
        this.numerator.moveTo(x + (this.getWidth() - this.numerator.getWidth()) / 2, y);
        this.denominator.moveTo(x + (this.getWidth() - this.denominator.getWidth()) / 2, y + this.numerator.getHeight() + (2 * this.iscale) + this.linethickness);
        if (this.Node != null) {
            this.setColor(this.fColor);
            this.Node.setSize(this.getWidth(), this.linethickness);
            this.Node.translate(x, y + this.numerator.getHeight() + this.iscale);
        }
    }

    this.scale = function( /* float */ scale) {
        this.numerator.scale(scale);
        this.denominator.scale(scale);
        this.iscale *= (scale / (new FontMetrics()).pt2px); // Make the scale factor in pixels
        this.linethickness *= scale;
        this.recalc();
    }

    this.toString = function() {
        return this.toStringBox() + "\n" + this.base + "\n" + this.supScript;
    }

    if (argv.length > 0) 
    	this.initFrac(numerator, denominator, attrs);
}

MathML.Frac.prototype = new Box();
/**
 * Browser.js : Sqrt
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2002-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @link      http://oeasvg.com/hotdrawjs
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
/**
 * Browser.js : Row
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2002-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @link      http://oeasvg.com/hotdrawjs
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
/**
 * Browser.js : Fenced
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2002-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @link      http://oeasvg.com/hotdrawjs
 * @since     9th August 2002 -> 27th Sept 2005
 * @package   websemantics/browserjs/mathml
 */

MathML.Fenced = function( /* Box */ row, /* String */ left, /* String */ right, /* Attributes */ attrs) {
    var argv = MathML.Fenced.arguments;
    var argc = MathML.Fenced.length;
    /* String  */
    this.className = "MathML.Fenced";

    /* Box  */
    this.row = null;
    /* Box  */
    this.sLeft = null;
    /* Box  */
    this.sRight = null;

    this.initFenced = function( /* Box */ row, /* String */ left, /* String */ right, /* Attributes */ attrs) {
        this.initBox(0, 0, 0, 0);
        this.sLeft = new TextData(left, attrs);
        this.sRight = new TextData(right, attrs);
        this.row = new MathML.Row(this.sLeft);
        this.row.addChild(row);
        this.row.addChild(this.sRight);
    }

    this.setColor = function( /* Color */ c) {
        this.setColorBox(c);
        this.row.setColor(c);
    }

    this.paint = function( /* Graphics */ g, /* Graphics */ bgg, /* TextElement */ parent) {
        this.paintFenced(g, bgg, parent);
    }

    //*************
    // paint a Box and its subScriptclass.
    // g: main Graphics, bgg: background Graphics
    //*************
    this.paintFenced = function( /* Graphics */ g, /* Graphics */ bgg, /* TextElement */ parent) {
        this.paintBox(g, bgg, parent);
        this.row.paint(g, bgg, parent);
    }

    this.recalc = function() {
        this.recalcFenced();
    }

    this.recalcFenced = function() {
        this.row.recalc();
        this.sLeft.scale(this.row.getHeight() / this.sLeft.getHeight());
        this.sRight.scale(this.row.getHeight() / this.sRight.getHeight());
        this.row.recalc();
        this.setWidth(this.row.getWidth());
        this.setHeight(this.row.getHeight());
        this.setBaseline(this.row.getBaseline());
        this.recalcBox();
    }

    this.moveContentTo = function( /* float */ x, /* float */ y) {
        this.moveContentToFenced(x, y);
    }

    this.moveContentToFenced = function( /* float */ x, /* float */ y) {
        this.moveContentToBox(x, y);
        this.row.moveTo(x, y);
    }

    this.scale = function( /* float */ scale) {
        this.row.scale(scale);
        this.sLeft.scale(this.row.getHeight() / this.sLeft.getHeight());
        this.sRight.scale(this.row.getHeight() / this.sRight.getHeight());
        this.row.recalc;
        this.recalc();
    }

    this.toString = function() {
        return this.toStringBox();
    }

    if (argv.length > 0) 
    	this.initFenced(row, left, right, attrs);
}

MathML.Fenced.prototype = new Box();
/**
 * Browser.js : Html / Em / A 
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2002-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @link      http://oeasvg.com/hotdrawjs
 * @since     9th August 2002 -> 28th August 2005
 * @package   websemantics/browserjs/html
 */

function Html() {;
}

Html.Em = function( /* String */ data, /* Attributes */ attrs) {
    var argv = Html.Em.arguments;
    var argc = Html.Em.length;
    /* String  */
    this.className = "Html.Em";
    this.initTextData(data, attrs);
}

Html.Em.prototype = new TextData();

Html.A = function( /* String */ data, /* Attributes */ attrs) {
    var argv = Html.A.arguments;
    var argc = Html.A.length;
    /* String  */
    this.className = "Html.A";
    this.initTextData(data, attrs);
}
Html.A.prototype = new TextData();

function cloneObject(what) {
    for (var i in what) {
        if (typeof what[i] == 'object') {
            this[i] = new cloneObject(what[i]);
        } else this[i] = what[i];
    }
}
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
/**
 * Browser.js : Image
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2002-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @link      http://oeasvg.com/hotdrawjs
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
/**
 * Browser.js : Css
 *
 * Code is mainly extracted from CSS_parse.js, source: internet, author: unknown.
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2002-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @link      http://oeasvg.com/hotdrawjs
 * @since     2nd Oct 2005
 * @package   websemantics/browserjs/css
 */

function Css(){;}
//############################################################
//
// package: CSS [code is mainly extracted from CSS_parse.js, source: internet, author: unknown]
//
// Class: Css.Parser 
//
// Date : 2 - 10 - 2005
//
// Rewitten by 
//
//    Musbah Sagar : mus_sh@hotmail.com
// 
//##################################################

Css.Parser = function(/* DOM */ root){

var argv = Css.Parser.arguments;
var argc = Css.Parser.length;

/* String  */  this.className="Css.Parser";

//===========
// Properties:
//===========

/* Array  */     this.groupStyle=null; // Array of GroupStyle
/* String */     this.DELIM1 = "##DELIM1##";
/* String */     this.DELIM2 = "##DELIM2##";

//===========
// Methods:
//===========
//
//***************
// initParser
//***************
this.initParser = function(/* DOM */ root) {
	this.groupStyle = new Array();
  this.parseData(this.getEmbeddedStyle(root));
}
//*************
// parseData: 
//*************
this.parseData = function(/* String */ style){

  if (style == undefined ) style = "";
	style = this.trim(this.removeComments(style));
	
	var blocks = style.split("}");
	
	blocks.pop();

	var declarationBlock;
	
	for (var i=0; i<blocks.length; i++){
		declarationBlock = blocks[i].split("{");
		var selectorsGroup = declarationBlock[0]; // Ex: p,em,strong
		var declarationsGroup = declarationBlock[1]; // Ex: color : red; font-size:12pt;
		this.groupStyle.push(new Css.GroupStyle(selectorsGroup, declarationsGroup));
	}
	
}
//*************
// combine: 
//*************
this.combine = function(/* Object */ iTarget,/* Object */ iSource){
	for(var i in iSource) iTarget[i] = iSource[i];
}
//*************
// trim: 
//*************
this.trim = function(/* String */ str){
	return str.replace(/^\s*|\s*$/g,"");
}
//*************
// whiteSpaceToSpaces: 
//*************
this.whiteSpaceToSpaces = function(/* String */ str){
	return str.replace(/\s+/g," ");
}
//*************
// removeComments: 
//*************
this.removeComments = function(/* String */ str){
  str = str.replace(/<!--/g,"");
	str = str.replace(/-->/g,"");
	return str.replace(/\/\*(\r|\n|.)*\*\//g,"");
}
//*************
// arrayContains: 
//*************
this.arrayContains = function(/* Array */ a,/* Object */ value){
	for (var i=0; i < a.length; i++)
		if (a[i] == value) 
		 return true;
	return false;
}
//*************
// arrayContainsEach: 
//*************
this.arrayContainsEach = function(/* Array */ haystack,/* Array */ needles){
	var iMatch = false;
	for (var n=0; n<needles.length; n++){
		iMatch = false;
		for (var h=0; h<haystack.length; h++)
			if (haystack[h] == needles[n]) 
			  iMatch = true;
		if (!iMatch) return false;
	}
return true;
}
//*************
// getEmbeddedStyle: 
//*************
this.getEmbeddedStyle = function(/* DOM */ root){

  var styles = root.getElementsByTagName("style");

	/* String */ var style = "";
	
	if (styles.length)
		for (var i=0; i<styles.length; i++) 
		  style += styles.item(0).firstChild.data;

	return (style == "") ? "" : style;
}
//*************
// getInlineStyle: 
//*************
this.getInlineStyle = function(/* Element */ element){

  if(element == undefined || element == null) return "";
	
  var style = element.getAttribute("style");
	if(style == undefined) return "";
	 else return style;
}
//*************
// previousSibling: NOT CHECKED
//*************
this.previousSibling = function(/* Element */ element){
	var parent = element.parentNode;
	
	if (parent == undefined || !parent.hasChildNodes()) return false;
	
	var sib = false;
	var i, len = par.childNodes.length;
	for (i=0; i<len; i++){
		if (par.childNodes[i] == element) return sib;
		sib = par.childNodes[i];
	}
	return false;
}
//*************
// getElementAttributeList: NOT CHECKED
//*************
this.getElementAttributeList = function(/* Element */ element, /* Attribute */ element){
var attrib_list = new Array();
	var attrib = elem.getAttribute(attrib);
	if (!attrib) return attrib_list;
	attrib = CSSParser.whiteSpaceToSpaces(attrib);
	attrib_list = attrib.split(" ");
	return attrib_list;
}
//*************
// getElementProperties: NOT CHECKED
//*************
this.getElementProperties = function(/* Element */ element, pseudo){
var i, len = this.groupStyle.length;
	var properties = new CSSProperties(elem.getAttribute("style"));
	var match_props;
	for (i=0; i<len; i++){
		match_props = this.groupStyle[i].match(elem, pseudo);
		if (match_props){
			CSSParser.combine(properties.values, match_props.values);
		}
	}
	return properties.values;
}
//*************
// toString: 
//*************
this.toString = function(){
 return this.className;
}
// Entry Point !
if(argv.length>0)this.initParser(root);
}


/**
 * Browser.js : GroupStyle
 *
 * Code is mainly extracted from CSS_parse.js, source: internet, author: unknown.
 *
 * p,em,strong { color : red;
 *               font-size:12pt;
 *  		         text-align:center;
 *		         }
 *
 * VAR selectorsGroup = p,em,strong
 * VAR declarationsGroup = color : red; font-size:12pt; text-align:center;
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2002-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @link      http://oeasvg.com/hotdrawjs
 * @since     2nd Oct 2005
 * @package   websemantics/browserjs/css
 */

Css.GroupStyle = function( /* String */ selectorsGroup, /* String */ declarationsGroup) {
    var argv = Css.GroupStyle.arguments;
    var argc = Css.GroupStyle.length;
    /* String  */
    this.className = "Css.GroupStyle";

    /* Array  */
    this.selectors = null; // Contains instances of Css.SelectorDefinition

    this.initGroupStyle = function( /* String */ selectorsGroup, /* String */ declarationsGroup) {
        this.parseData(selectorsGroup, declarationsGroup);
    }

    this.parseData = function( /* String */ selectorsGroup, /* String */ declarationsGroup) {
        // Split selectorsGroup (p,em#head,h1) into single selectors,..
        this.selectors = selectorsGroup.split(",");
        var len = this.selectors.length;
        for (var i = 0; i < len; i++) {
            var selector = this.selectors[i];
            this.selectors[i] = new Css.SelectorDefinition(selector, declarationsGroup);
        }
    }

    this.match = function( /* Element */ element, /* Object */ pseudo) {
        var len = this.selectors.length;
        for (var i = 0; i < len; i++)
            if (this.selectors[i].match(eleme, pseudo)) return this.selectors[i].properties;
        return false;
    }

    this.toString = function() {
        return this.className + "[ Selectors" + this.selectors + " ]";
    }

    if (argv.length > 0) 
    	this.initGroupStyle(selectorsGroup, declarationsGroup);
}
/**
 * Browser.js : Properties
 *
 * Code is mainly extracted from CSS_parse.js, source: internet, author: unknown.
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2002-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @link      http://oeasvg.com/hotdrawjs
 * @since     2nd Oct 2005
 * @package   websemantics/browserjs/css
 */

Css.Properties = function( /* String */ properties) {
    var argv = Css.Properties.arguments;
    var argc = Css.Properties.length;
    /* String  */
    this.className = "Css.Properties";

    /* Hashtable  */
    this.values = null;

    this.initProperties = function( /* String */ properties) {
        this.values = new Hashtable();
        this.parseData(properties);
    }

    this.parseData = function( /* String */ properties) {
        if (properties == undefined) return;
        var propertyBlock = properties.split(";");
        for (var i = 0; i < properties.length; i++) {
            var property = this.trim(propertyBlock[i]);
            if (this.hasContent(property)) {
                var valueBlock = property.split(":");
                var name = this.trim(valueBlock[0].toLowerCase());
                var value = this.trim(valueBlock[1].toLowerCase());
                if (this.hasContent(name) && this.hasContent(value)) this.values.put(name, value);
            }
        }
    }

    this.hasContent = function( /* String */ str) {
        return (str != undefined && str != null && str != "");
    }

    this.trim = function( /* String */ str) {
        if (str == undefined) return "";
        return str.replace(/^\s*|\s*$/g, "");
    }

    this.toString = function() {
        return this.className + " [ " + this.values.toString() + " ]";
    }

    if (argv.length > 0) 
    	this.initProperties(properties);
}
/**
 * Browser.js : SelectorDefinition && CSSSelectorDefinition
 *
 * Code is mainly extracted from CSS_parse.js, source: internet, author: unknown.
 *
 * i.e. selector = p or h1 ,etc
 * i.e. properties = color:yellow, font-size:40pt, etc
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2002-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @link      http://oeasvg.com/hotdrawjs
 * @since     2nd Oct 2005
 * @package   websemantics/browserjs/css
 */

Css.SelectorDefinition = function( /* String */ selector, /* String */ properties) {

    var argv = Css.SelectorDefinition.arguments;
    var argc = Css.SelectorDefinition.length;
    /* String  */
    this.className = "Css.SelectorDefinition";

    /* String         */
    this.data = null;
    /* Array          */
    this.singleSelectors = null;
    /* Css.Properties */
    this.properties = null;

    this.initSelectorDefinition = function( /* String */ selector, /* String */ properties) {
        this.data = "";
        this.singleSelectors = new Array();
        this.properties = new Css.Properties(properties);
        if (properties != undefined) this.parseData(selector);
    }

    this.parseData = function( /* String */ selector) {
        return;
        selector_str = CSSParser.trim(selector_str);
        selector_str = CSSParser.whiteSpaceToSpaces(selector_str);
        selector_str = selector_str.replace(/\s*\+\s*/g, "+");
        selector_str = selector_str.replace(/\s*>\s*/g, ">");
        this.data = selector_str;
        selector_str = selector_str.replace(/ /g, CSSParser.DELIM1 + " " + CSSParser.DELIM1);
        selector_str = selector_str.replace(/\+/g, CSSParser.DELIM1 + "+" + CSSParser.DELIM1);
        selector_str = selector_str.replace(/>/g, CSSParser.DELIM1 + ">" + CSSParser.DELIM1);
        var sels = selector_str.split(CSSParser.DELIM1);
        var i, len = sels.length;
        var sel_comb = null;
        for (i = 0; i < len; i += 2) {
            if (i) sel_comb = sels[i - 1];
            this.singleSelectors.push(new CSSSingleSelector(sels[i], sel_comb));
        }
    }

    this.toString = function() {
        return this.className;
    }

    if (argv.length > 0) 
    	this.initSelectorDefinition(selector, properties);
}

function CSSSelectorDefinition() {
    this.me = "";
}

CSSSelectorDefinition.prototype.match = function(element, pseudo) {
    // go backwards, starting from right of selector definition
    var index = this.singleSelectors.length - 1;
    var compare_elem = element;
    var selector = this.singleSelectors[index];
    if (!selector.match(compare_elem, pseudo)) return false;
    while (compare_elem && index >= 0) {
        switch (selector.combinator) {
            case " ":
                index--;
                selector = this.singleSelectors[index];
                do {
                    compare_elem = compare_elem.parentNode;
                } while (compare_elem && !selector.match(compare_elem, pseudo));
                if (!compare_elem) return false;
                break;
            case ">":
                index--;
                selector = this.singleSelectors[index];
                compare_elem = compare_elem.parentNode;
                if (!selector.match(compare_elem, pseudo)) return false;
                break;
            case "+":
                index--;
                selector = this.singleSelectors[index];
                compare_elem = CSSParser.previousSibling(compare_elem);
                if (!selector.match(compare_elem, pseudo)) return false;
                break;
            default:
                // assume first selector in definition chain, therefore comparison complete
                if (!index) return this.properties;
                else return false;
        }
        if (pseudo) pseudo = null; // only used when compare_elem == element
    }
    return false;
}
/**
 * Browserjs.js : Browserjs
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2002-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @link      http://oeasvg.com/hotdrawjs
 * @since     9th August 2002 -> 27th Sept 2005 -> 4th May 2015
 * @package   websemantics/browserjs/mathml
 */

Browserjs.prototype = new Node();

function Browserjs() {
    var argv = Browserjs.arguments;
    var argc = Browserjs.length;
    var xhtmlNS = "http://www.w3.org/1999/xhtml";

    /* String  */
    this.className = "Browserjs";

    /* Vector   */
    this.documents = new Vector();

    this.parse = function() {
        // Summary:
        // Parse the document for XHTML/MathML and SVG fragments
        
        /* NodeList */
        nl = svgDocument.getElementsByTagNameNS(xhtmlNS, "html");
        
        for (var i = 0; i < nl.length; i++) {
            
            var root = nl.item(i);
            // Add the default CSS style on the html element.
            var attr = new Attributes(root, true);
            root.setAttribute('style', attr.getStyle());

            this.documents.addElement(new Browserjs.Document(root, this));
            // var CSSParser = new Css.Parser(root);
            // var style = root.getElementsByTagName("style").item(0);
            // //alert(style.parentNode+" == "+style.firstChild.data);
            // //alert(style.parentNode.hasChildNodes());
            // var CSSParser = new Css.Parser(root);

        }

        this.paint();
        this.recalc();
    }

    this.draw = function( /* Graphics */ g) {
        this.paint(g);
    }

    this.paint = function( /* Graphics */ g) {
        // Summary:
        // Paint all documents
        var e = new Enumerator(this.documents);
        
        while (e.hasMoreElements()) 
            e.nextElement().paint(g);
    }

    this.recalc = function() {
        // Summary:
        // Recalc all documents found embbeded inside the SVG document.
        var e = new Enumerator(this.documents);
        while (e.hasMoreElements()) e.nextElement().recalc();
    }

}

/**
 * Browser.js : Browserjs.Document
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2002-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @link      http://oeasvg.com/hotdrawjs
 * @since     9th August 2002 -> 27th Sept 2005 -> 4th May 2015
 * @package   websemantics/browserjs/mathml
 */

Browserjs.Document = function ( /* SVGCustomeElement */ root, /* Browserjs */ browser) {
    var argv = Browserjs.Document.arguments;
    var argc = Browserjs.Document.length;
    /* String  */
    this.className = "Browserjs.Document";

    /* SVGCustomeElement */
    this.root = null;

    /* String, mode:  Clip, Resize, Stretch, Scroll, Window */
    this.iClass = null; 

    /* Browserjs */
    this.browser = null;

    /* boolean  */
    this.created = false;
    
    /* Graphics */
    this.bgGraphics = null;
    
    /* Graphics */
    this.fgGraphics = null;
    
    /* Shape    */
    this.firstText = null;
    
    /* Box    */
    this.bodyBox = null; // The rendered 'body' as Box object
        
    this.initDocument = function( /* SVGCustomeElement */ root, /* Browserjs */ browser) {
        this.root = root;
        this.browser = browser;
        this.obtainContainerSettings(this.root);
    }

    this.obtainContainerSettings = function( /* SVGCustomeElement */ container) {
        // Summary:
        // obtainContainerSettings
        // Get the size and location of the container, also the settings for the laying-out mode
        
        // Get the SVG paren node (i.e. rect)
        while (container &&  ( 
          container.nodeName == "xhtml:html" || 
          container.nodeName == "foreignObject" || 
          container.nodeName == "switch"))
          container = container.parentNode;

        // If a rectangle element can't be found, set a default location and size
        var rect = container.nodeName == "rect"

        var x = (rect) ? parseFloat(container.getAttribute("x")) : 0;
        var y = (rect) ? parseFloat(container.getAttribute("y")) : 0;
        var w = (rect) ? parseFloat(container.getAttribute("width")) : 250;
        var h = (rect) ? parseFloat(container.getAttribute("height")) : 250;

        this.initNode(x, y, w, h, 0, 1);

        // This makes magic happen!
        this.iClass = container.getAttribute("class");

        var strokeWidth = container.getAttribute("stroke-width") || 0;
        var sw = parseFloat(strokeWidth) / 2;

        this.setCoord(x + sw, y + sw);
        this.setSize(w - (2 * sw) + 1, h - (2 * sw) + 1);
    }

    this.draw = function( /* Graphics */ g) {
        this.paint(g);
    }

    this.paint = function( /* Graphics */ g) {
      // Summary:
      // Paint the document, ..
    
        if (!this.created) {
            this.created = true;
            this.createSVGContent(g);
            this.bodyBox = this.parse();
            this.bodyBox.setSize(this.getWidth(), this.getHeight());
            this.bodyBox.draw(0, 0, this.fgGraphics, this.bgGraphics, this.firstText);
        }
        if (g != undefined && this.getNode() != null) 
            g.addGraphics(this.getNode());
    }

    this.createSVGContent = function( /* Graphics */ g) {
        // Summary:
        // Create the main Graphics context and the background and foreground ones,...
        
        var g = new Graphics(this.x, this.y, this.w, this.h);
        
        this.bgGraphics = new Graphics(0, 0, this.w, this.h);

        this.fgGraphics = new Graphics(0, 0, this.w, this.h);
        this.firstText = this.fgGraphics.drawText(0, 0, "");

        g.addGraphics(this.bgGraphics);
        g.addGraphics(this.fgGraphics);

        this.Node = g.getNode();
    }

    this.recalc = function() {
        if (this.bodyBox != null) 
          this.bodyBox.recalc();
    }

    /* Box */
    this.parse = function( /* SVGCustomeElement */ node) {
        // Summary:
        // This function is running recursively to construct boxes collection.
      
        node = node || this.root.getElementsByTagName("body").item(0);

        var box = null;

        var nodeList = node.childNodes;

        // Tree leaf,... 
        if (nodeList.length == 0) 
          return this.boxesFactory(node, 0, box);
        else {
            // Save all the children in an array for later!
            box = new Array();
            for (var i = 0, j = 0; i < nodeList.length; i++) {
                var tbox = this.parse(nodeList.item(i));
                if (tbox != null) 
                  box[j++] = tbox; // Ignore white spaces
            }
        } // End else 
        return this.boxesFactory(node, box.length, box);
    }

    this.boxesFactory = function( /* SVGCustomeElement */ node, /* int */ len, /* Box */ boxArray) {
        // Summary
        // Makes the right class, .. 
        // TODO: Improve ..
        var attrs = (node.nodeName != "#text") ? new Attributes(node) : null;
        
        if (len == 0) {
            switch (node.nodeName) {
                case "img":
                    return new Html.Image(attrs);
                    break;
                case "mo":
                    return new MathML.Mo(node.firstChild.data, attrs);
                    break;
                case "mi":
                    return new MathML.Mi(node.firstChild.data, attrs);
                    break;
                case "mn":
                    return new MathML.Mn(node.firstChild.data, attrs);
                    break;
                case "#text":
                    switch (node.parentNode.nodeName) {
                        case "p":
                            return new TextData(node.data, attrs);
                            break;
                    }
                    break;
            }
        }

        if (node.nodeName == "p") {
            var box = new Html.Para(boxArray[0], attrs);
            for (var i = 1; i < len; i++) 
              box.addChild(boxArray[i]);
            return box;
        }

        if (node.nodeName=="xhtml:html"||
            node.nodeName=="body"      ||   
            node.nodeName=="table"     ||   
            node.nodeName=="head"        
            ){
            var box = new Html.Vertical(boxArray[0]);
            
            for (var i = 1; i < len; i++) 
              box.addChild(boxArray[i]);

            return box;
        }

        if(node.nodeName=="mrow"||
           node.nodeName=="msqrt"||
           node.nodeName=="math:math"||
           node.nodeName=="mfenced"){
            
            var box=new MathML.Row();
            
            for(var i=0; i< len; i++)
              box.addChild(boxArray[i]);
            
            if(node.nodeName=="msqrt")
              return new MathML.Sqrt(box);
            
            // if(node.nodeName=="mfenced")
            //   return new MathML.Fenced(box,"[","]", attrs);

            return box;
          }

        // if(node.nodeName == "mi" ||
        //    node.nodeName == "mo" ||
        //    node.nodeName == "mn" ||
        //    node.nodeName == "em" ||
        //    node.nodeName == "a" ){
        //      //Second parameter in 'setAttributes' is for parent inheritance
        //      boxArray[0].setAttributes(attrs,new Attributes(node.parentNode));
        //      return boxArray[0];
        //    }
           
           switch(node.nodeName){
              case "msup"   :
                 return new MathML.Sup(boxArray[0],boxArray[1],attrs);
                 break;
              case "msub"   :
                 return new MathML.Sub(boxArray[0],boxArray[1],attrs);
                 break;
              case "msubsup"   :
                 return new MathML.Subsup(boxArray[0],boxArray[1],boxArray[2],attrs);
                 break;
              case "mover"   :
                 return new MathML.Over(boxArray[0],boxArray[1],attrs);
                 break;
              case "munder"   :
                 return new MathML.Under(boxArray[0],boxArray[1],attrs);
                 break;
              case "munderover"   :
                 return new MathML.UnderOver(boxArray[0],boxArray[1],boxArray[2],attrs);
                 break;
              case "mfrac"   :
                 return new MathML.Frac(boxArray[0],boxArray[1],attrs);
                 break;
          } 

        // if(node.nodeName=="tr"||
        //    node.nodeName=="thead"){
        //     var box=new TRow();
        //     for(var i=0;i<n;i++) box.addChild(boxArray[i]);
        //     return box;
        //   }

            
        // if(node.nodeName=="ul"||node.nodeName=="ol"){
        //     var box=new htmlList();
        //     for(var i=0;i<n;i++) box.addChild(boxArray[i]);
        //     if(node.nodeName=="ol")box.listType='1';
        //     return box;
        //   }
         
        if(node.nodeName=="p" ||
           node.nodeName=="li"||
           node.nodeName=="h1"||
           node.nodeName=="h2"||
           node.nodeName=="h3"||
           node.nodeName=="td"||
           node.nodeName=="th"  ){
            var box=new TextData(boxArray[0],attrs);
            for(var i=1;i<n;i++)
              box.addChild(boxArray[i],attrs);
            return box;
          }

    }

    this.toString = function() {
        return this.className + "[x:" + this.x + ",y:" + this.y + ",w:" + this.w + ",h:" + this.h + "]";
    }

    if (argv.length > 0) 
      this.initDocument(root, browser);
}

Browserjs.Document.prototype = new Node();