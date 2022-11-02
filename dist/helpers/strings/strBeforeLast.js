'use strict'

require('core-js/modules/es.object.define-property.js')
Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/es.array.last-index-of.js')
require('core-js/stable')
var strBeforeLast = function strBeforeLast (str, search) {
  var index = str.lastIndexOf(search)
  return index === -1 ? '' : str.substring(0, index)
}
var _default = strBeforeLast
exports.default = _default
