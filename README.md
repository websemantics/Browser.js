# Browser.js

Browser.js is an implementation of MathML, HTML and SVG Layout Manager and CSS Processor (i.e. Browser) in JavaScript.


 * Part of a project that aims to render XHTML + MathML + SVG Profile,
 * W3C Working Draft [SVG is used as the Host Language]

![Box](https://raw.githubusercontent.com/websemantics/Browser.js/master/img/browser.png)

## SVG, MathML and XHTML Presentation models

XHTML, MathML and SVG use three different presentation models. But in order to display them together a common model should be defined. The MathML Layout Schemata Model has been chosen as the Layout Model for this mixed document (XHTML, MathML and SVG). Our view is that the CSS presentation model is not mature enough to handle such document unless we use CSS only to handle the SVG and XHTML components and leave MathML Figure 4 shows some common features between CSS Box model and MathML Layout Schemata Model which the design of this work benefits from.

![Box](https://raw.githubusercontent.com/websemantics/Browser.js/master/img/box.png)

SVG on the other hand uses a less restricted model. But since SVG elements are to be mixed with XHTML and MathML elements then some restrictions have to be applied on them.

Download the original paper published in 2003 with more details [here](https://github.com/websemantics/Browser.js/raw/master/docs/EGUK2003.pdf)

## Install

Clone this repo and then run bower install. Check out the demo folder.
