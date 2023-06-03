'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
const strAfter = (str, search) => {
  const index = str.indexOf(search)
  return index === -1 ? '' : str.substring(index + search.length)
}
var _default = strAfter
exports.default = _default
