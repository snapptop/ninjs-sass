'use strict'
const _ = require('ninjs-lodash')

module.exports = {
  SassBuildStats: SassBuildStats
}

class SassBuildStats {
    constructor({ entry='', includedFiles=[], start=0, end=0, duration=0 }) {
        this.entry = entry
        this.includedFiles = includedFiles
        this.start = start
        this.end = end
        this.duration = duration
    }
}

  // get name() {
  //   if(this._name) {
  //     return 'Mr. ' + this._name.toUpperCase();  
  //   } else {
  //     return undefined;
  //   }  
  // }

  // set name(newName) {
  //   if (newName == this._name) {
  //     console.log('I already have this name.');
  //   } else if (newName) {
  //     this._name = newName;
  //   } else {
  //     return false;
  //   }
  // }
