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
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2002-2016 Web Semantics, Inc. (http://websemantics.io)
 * @license   http://www.opensource.org/licenses/mit-license.php
 * @link      http://oeasvg.com/browserjs
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