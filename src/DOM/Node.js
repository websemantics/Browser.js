/**
 * Browser.js : DOMNode, DOM [based on Java org.w3c.dom package]
 *
 * The DOM implementation in JavaScript
 *
 * The Node class is the superclass for the entire Document Object Model.
 * It represent a single node in the tree.
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2002-2016 Web Semantics, Inc. (http://websemantics.io)
 * @license   http://www.opensource.org/licenses/mit-license.php
 * @link      http://oeasvg.com/browserjs
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