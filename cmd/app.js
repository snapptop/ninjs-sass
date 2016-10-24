'use strict'

const _ = require('ninjs-lodash')
const sass = require('../')

const KEY = 'app'
const TEMP = _.path.resolve(__dirname, '..', 'temp')
const SRC = _.path.join(TEMP, KEY, 'css', 'styles.scss')
const DEST = _.path.join(TEMP, KEY, 'public', 'css', 'styles.css')

module.exports = {}

// App
sass.renderApp({
  "enabled": true,
  "file": SRC,
  "dest": DEST
  //"data": "",
  //"includePaths": []  
}, _.logcb)