'use strict'
const _ = require('ninjs-lodash')

_.script({ 
  cwd: __dirname, 
  keys: ['test']
},
function(err, result) {  
  if(err) return console.log(_.clmsg({ 
    messages:[
      'npm run test --test=test_name', 
      'npm run test test_name',
      err]
  }))
})

// Prevents the program from stopping instantly
// process.stdin.resume();