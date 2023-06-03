'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
const strAfterLast = (str, search) => {
  const index = str.lastIndexOf(search)
  return index === -1 ? '' : str.substring(index + search.length)
}
var _default = strAfterLast
exports.default = _default
