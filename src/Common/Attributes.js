/**
 * Browser.js : Attributes
 *
 * Support attributes for XHTML, MathML and SVG!
 * 
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2002-2016 Web Semantics, Inc. (http://websemantics.io)
 * @license   http://www.opensource.org/licenses/mit-license.php
 * @link      http://oeasvg.com/browserjs
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