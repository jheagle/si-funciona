'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
const strBefore = (str, search) => {
  const index = str.indexOf(search)
  return index === -1 ? '' : str.slice(0, index)
}
var _default = strBefore
exports.default = _default
