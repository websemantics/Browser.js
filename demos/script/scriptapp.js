/**
 * Browser.js : ScriptApp
 *
 * The Demo ScriptApp
 * 
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @link      http://oeasvg.com/hotdrawjs
 * @since     3rd May 2015
 * @package   websemantics/browserjs/demos/script
 */

ScriptApp.prototype = new Window();

function ScriptApp(x, y) {
    var argv = ScriptApp.arguments;
    var argc = ScriptApp.length;
    /* String */
    this.name = "ScriptApp";
    /* String */
    this.className = "ScriptApp";
    
    /* int */
    this.cw = 450;
    /* int */
    this.ch = 300;

    this.title = "Browser.js : Script";
    this.icon = "../../img/smallicons/www.svg";

    if (argv.length > 0) 
        this.initpp(x, y);
}
//*************
// initpp 
//*************
ScriptApp.prototype.initpp = function(x, y) {
    this.initWindow(x, y, this.cw, this.ch);
    this.setLayout(new FlowLayout(LEFT));
    this.canvas = this.add(new Canvas(0,0,this.w - 20, this.h - 70));
    this.add(new Label(0, 0, 0, 0, null, "Resize the window and click 'layout'."));
    this.add(new Button(0, 0, 0, 0, "layout", "Layout")).addActionListener(this);
}

//*************
// createSVGContent 
//*************
Window.prototype.createSVGContent = function() {
        this.createSVGContentWindow();

        var bg=this.g;
            
        var fg=this.canvas.g;
        this.firstText = fg.drawText(0, 0, "");

        // ***********************[ MARKUP GOES HERE ]****************************
        
        this.para =new Html.Para(new TextData("Borwser.js bring the power of rendering HTML and MathML elements into JavaScript and SVG. It allows for creating sophisticated equations like the famous quadratic formula:"));
        
        this.para.setWidth(this.canvas.w);
        this.para.setHeight(this.canvas.h);

        var row=new MathML.Row(new MathML.Mn("X"));
        row.addChild(new MathML.Mn("="));
                 
        var sqrtRow=new MathML.Row(new MathML.Sup(new MathML.Mn("b"),new MathML.Mn("2")));

        sqrtRow.addChild(new MathML.Mn("-4ac"));
        var numRow=new MathML.Row(new MathML.Mn("-b+"));
        numRow.addChild(new MathML.Sqrt(sqrtRow));
        var frq=row.addChild(new MathML.Frac(numRow,new MathML.Mn("2a")));
            
        this.para.addChild(new MathML(row));
        this.para.addChild(new TextData(". Creating HTML Paragraphs, with inline images, "));
        this.para.addChild(new Html.Image("../../img/smallicons/rocket.svg",32,32));
        this.para.addChild(new TextData("and much more. Makes life a whole lot easier, doesn't it!"));
        
        // ***********************[ END OF MARKUP ]****************************

        this.para.draw(0,0,fg,bg, this.firstText);
        this.para.recalc();
    }
//*************
// paint 
//*************
ScriptApp.prototype.paint = function( /* Graphics */ g) {
    this.paintApp(g);
}
//*************
// paintApp 
//*************
ScriptApp.prototype.paintApp = function( /* Graphics */ g) {
    this.paintComponent(g);
}
//*************
// recalc 
//*************
ScriptApp.prototype.recalc = function() {
    this.recalcApp();
}
//*************
// recalcApp 
//*************
ScriptApp.prototype.recalcApp = function() {
    this.recalcWindow();
    
    this.canvas.recalc();
    this.para.recalc();
}
//*************
// recalcApp 
//*************

ScriptApp.prototype.onResize = function() {
    this.onResizeWindow();
    
    if(this.canvas)
        this.canvas.setSize(this.w - 20, this.h - 70);
    
    if(this.para)
        this.para.setSize(this.canvas.w , this.canvas.h);
}
//*************
// actionPerformed 
//*************
ScriptApp.prototype.actionPerformed = function( /* ActionEvent */ e) {
    this.actionPerformedApp(e);
}
//*************
// actionPerformedApp 
//*************
ScriptApp.prototype.actionPerformedApp = function( /* ActionEvent */ e) {
    this.actionPerformedWindow(e);
    var src = e.source;
    var comm = e.getActionCommand();
    if (comm == "buttonClicked") {
        if (src.name == "layout") {
            
            this.inProgress(true);
            this.recalc();
            this.inProgress(false);

        }
    }
}