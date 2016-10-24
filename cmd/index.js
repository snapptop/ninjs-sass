'use strict'
const _ = require('ninjs-lodash')

_.script({ 
  cwd: __dirname, 
  keys: ['cmd']
},
(err, result) => {  
  if(err) return console.log(_.clmsg({ 
    messages:[
      'npm run cmd --cmd=app', 
      'npm run cmd app', 
      err]
  }))

  //console.log(_.isObject(result) ? _.pretty(result) : result)
})

// Prevents the program from stopping instantly
// process.stdin.resume();