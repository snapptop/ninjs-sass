'use strict'

module.exports = {
  "node-sass": {    
    "output_style_options": ["expanded", "compressed", "compact", "nested"],
    "file_suffix_map": { "expanded": "", "compressed": "min", "compact": "compact", "nested": "nested" },
    "options": {
      // custom defaults (internal only)
      "enabled": true, // sass build enabled  
      "xform": undefined,
      "file": "css/styles.scss", // styles.scss (sass) entry point
      "data": null, // extra css data
      "includePaths": [], // other folders to look in for .scss
      "dest": "public/css/styles.css", // styles.css destination
      // type of compression
      "outputStyle": "expanded",
      "sourceComments": false,
      // output source map
      "outFile": "public/css/styles.css",
      "omitSourceMapUrl": true,
      "sourceMap": undefined,
      "sourceMapContents": false,
      "sourceMapEmbed": false,
      "sourceMapRoot": undefined,
      // output spacing
      "linefeed": "lf",
      "indentedSyntax": false,
      "indentType": "space",
      "indentWidth": 2,
      "precision": 5
      // importer (function or [functions])
      // handle/redirect all found @imports
      //importer: undefined
    }
  },
  "autoprefixer": {
    "browsers": ["last 2 versions"]
  }
}