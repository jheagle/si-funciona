'use strict'

require('core-js/modules/es.object.define-property.js')
Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/es.array.index-of.js')
require('core-js/modules/es.array.slice.js')
require('core-js/stable')
var strBefore = function strBefore (str, search) {
  var index = str.indexOf(search)
  return index === -1 ? '' : str.slice(0, index)
}
var _default = strBefore
exports.default = _default
