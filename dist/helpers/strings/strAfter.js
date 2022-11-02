'use strict'

require('core-js/modules/es.object.define-property.js')
Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/es.array.index-of.js')
require('core-js/stable')
var strAfter = function strAfter (str, search) {
  var index = str.indexOf(search)
  return index === -1 ? '' : str.substring(index + search.length)
}
var _default = strAfter
exports.default = _default
