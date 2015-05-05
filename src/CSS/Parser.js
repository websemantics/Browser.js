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

