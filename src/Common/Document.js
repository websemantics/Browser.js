/**
 * Browser.js : Browserjs.Document
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2002-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @link      http://oeasvg.com/browserjs
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