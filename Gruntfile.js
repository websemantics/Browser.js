module.exports = function(grunt) {

    var pkg = grunt.file.readJSON("package.json");

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: pkg,
        banner: grunt.file.read("./src/docblock.js")
            .replace(/@VERSION/, pkg.version)
            .replace(/@DATE/, grunt.template.today("yyyy-mm-dd")) + "\n",
        // Task configuration.
        uglify: {
            options: {
                banner: "<%= banner %>",
                report: "min"
            },
            dist: {
                src: "<%= concat.target.dest %>",
                dest: "dist/browser-min.js"
            }
        },
        concat: {
            options: {
                banner: "<%= banner %>"
            },
            target: {
                dest: "dist/browser.js",
                src: [  
                    "./src/DOM/Node.js",
                    "./src/DOM/CharacterData.js",
                    "./src/Common/Attributes.js",
                    "./src/Common/Box.js"    ,
                    "./src/Html/CSSBox.js"   ,
                    "./src/Common/TextData.js",
                    "./src/MathML/MathML.js" ,
                    "./src/MathML/Tokens.js" ,
                    "./src/MathML/Under.js"  ,
                    "./src/MathML/Over.js"   ,
                    "./src/MathML/Sub.js"    ,
                    "./src/MathML/Sup.js"    ,
                    "./src/MathML/SupSub.js" ,
                    "./src/MathML/Frac.js"   ,
                    "./src/MathML/Sqrt.js"   ,
                    "./src/MathML/Row.js"    ,
                    "./src/MathML/Fenced.js" ,
                    "./src/Html/Html.js"     ,
                    "./src/Html/CSSBox.js"   ,
                    "./src/Html/Para.js"     ,
                    "./src/Html/Vertical.js" ,
                    "./src/Html/Image.js"    ,
                    "./src/CSS/Css.js"       ,
                    "./src/CSS/Parser.js"    ,
                    "./src/CSS/GroupStyle.js",    
                    "./src/CSS/Properties.js",    
                    "./src/CSS/SelectorDefinition.js",
                    "./src/Common/Browser.js",
                    "./src/Common/Document.js",
                ]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-exec");

    grunt.registerTask("default", ["concat", "uglify"]);
};