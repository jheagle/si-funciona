'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.makeFilepath = exports.default = void 0
const _strBeforeLast = _interopRequireDefault(require('./strBeforeLast'))
function _interopRequireDefault (e) { return e && e.__esModule ? e : { default: e } }
/**
 * Format the given path so that it does not have trailing slashes and also correctly appends a path.
 * @memberOf module:stringHelpers
 * @param {string} root - The base path to start from.
 * @param {string} [append=''] - A path to append to `root` - may itself use `./` or `../` segments.
 * @returns {string}
 */
const makeFilepath = (root, append = '') => {
  if (root.startsWith('./')) {
    root = root.slice(2)
  }
  if (root.startsWith('/')) {
    root = root.slice(1)
  }
  if (root.endsWith('/')) {
    root = root.slice(0, -1)
  }
  if (append.startsWith('/')) {
    append = append.slice(1)
  }
  if (append.startsWith('./')) {
    append = append.slice(2)
  }
  if (append.startsWith('../')) {
    if (!root) {
      return append.endsWith('/') ? append.slice(0, -1) : append
    }
    append = append.slice(3)
    root = (0, _strBeforeLast.default)(root, '/')
    return makeFilepath(root, append)
  }
  if (append.endsWith('/')) {
    append = append.slice(0, -1)
  }
  if (!root) {
    return append
  }
  return append ? `${root}/${append}` : root
}
exports.makeFilepath = makeFilepath
const _default = exports.default = makeFilepath
