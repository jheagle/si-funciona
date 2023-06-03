'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
const strBeforeLast = (str, search) => {
  const index = str.lastIndexOf(search)
  return index === -1 ? '' : str.substring(0, index)
}
var _default = strBeforeLast
exports.default = _default
