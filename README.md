```
    ________                                          ________        
    ___  __ )_______________      __________________________(_)_______
    __  __  |_  ___/  __ \_ | /| / /_  ___/  _ \_  ___/____  /__  ___/
    _  /_/ /_  /   / /_/ /_ |/ |/ /_(__  )/  __/  /__ ____  / _(__  ) 
    /_____/ /_/    \____/____/|__/ /____/ \___//_/_(_)___  /  /____/  
                                                      /___/           
```
> Updated : August 7, 2016

Browser.js is an implementation of MathML, HTML and SVG Layout Manager and CSS Processor (i.e. Browser) in Javascript. This work was done in 2003 as part of an MSc degree in Web Technology, more details can be found in the original paper which can be found [here](https://github.com/websemantics/Browser.js/raw/master/docs/EGUK2003.pdf)


 * Part of a project that aims to render XHTML + MathML + SVG Profile,
 * W3C Working Draft [SVG is used as the Host Language]

![Box](https://raw.githubusercontent.com/websemantics/Browser.js/master/img/browser.png)

The sample demo above can be seen live [here](http://oeasvg.com/bower_components/Browserjs/demos/script/index.html). 


## SVG, MathML and XHTML Presentation models

XHTML, MathML and SVG use three different presentation models. But in order to display them together a common model should be defined. The MathML Layout Schemata Model has been chosen as the Layout Model for this mixed document (XHTML, MathML and SVG). Our view is that the CSS presentation model is not mature enough to handle such document unless we use CSS only to handle the SVG and XHTML components and leave MathML Figure 4 shows some common features between CSS Box model and MathML Layout Schemata Model which the design of this work benefits from.

![Box](https://raw.githubusercontent.com/websemantics/Browser.js/master/img/box.png)

SVG on the other hand uses a less restricted model. But since SVG elements are to be mixed with XHTML and MathML elements then some restrictions have to be applied on them.


## Oea.svg

This appliation has been built using [Oea.svg Framework](http://oeasvg.com), an SVG GUI and Graphics Library built after Java AWT. Oea Framework provides three Javascript libraries, 1- Java.js, 2- Draw2D.svg and 3- Swing.svg to build SVG GUI applications.


## Install

- Clone this repo

```
git clone https://github.com/websemantics/Browser.js
```

- Install Bower dependencies

```
cd Browser.js

bower install
```
- View demos at `demo` folder

## New Release

To generate a new release of Browser.js follow these steps,

- Install Node.js modules

```
sudo npm install
```

- Run `grunt`

```
grunt
```

This generates up-to-date library files for Browser.js in the `dist` folder


## Change Log
All notable changes to this project will be documented in this file as per [Keep a CHANGELOG](http://keepachangelog.com). This project adheres to [Semantic Versioning](http://semver.org/).

### [0.1.1] - 2016-03-24
#### Fixed
- Updated

## Related Projects

* [Oea.svg Framework](https://github.com/websemantics/Oea.svg), SVG GUI and Graphics Library following after Java Swing

