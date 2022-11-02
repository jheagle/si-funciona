'use strict'

require('core-js/modules/es.object.define-property.js')
Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/es.array.last-index-of.js')
require('core-js/stable')
var strAfterLast = function strAfterLast (str, search) {
  var index = str.lastIndexOf(search)
  return index === -1 ? '' : str.substring(index + search.length)
}
var _default = strAfterLast
exports.default = _default
