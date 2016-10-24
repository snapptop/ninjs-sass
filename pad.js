'use strict'

const _ = require('ninjs-lodash')
const sass = require('.')

_.$(function(proc) {
	//console.log(_.$())
	console.log(_.pretty(_.omit(_.$(), 'hash_cache')))
})