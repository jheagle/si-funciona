'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
/**
 * Split a string into sets of numbers or letters - the shared tokenizer behind camelCase/kabobCase/snakeCase/
 * titleCase, so each can rebuild the string in its own casing style.
 * @memberOf module:stringHelpers
 * @param {string} str - The string to split.
 * @returns {Array.<string>}
 */
const words = str => str.match(/\d+|[A-Z]?[a-z]+|[A-Za-z]+/g)
var _default = exports.default = words
