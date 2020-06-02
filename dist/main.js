;(function () {
  'use strict'

  require('core-js/modules/es.object.assign')

  Object.defineProperty(exports, '__esModule', {
    value: true
  })
  Object.defineProperty(exports, 'arrayHelpers', {
    enumerable: true,
    get: function get () {
      return _arrays.default
    }
  })
  Object.defineProperty(exports, 'functionHelpers', {
    enumerable: true,
    get: function get () {
      return _functions.default
    }
  })
  Object.defineProperty(exports, 'numberHelpers', {
    enumerable: true,
    get: function get () {
      return _numbers.default
    }
  })
  Object.defineProperty(exports, 'objectHelpers', {
    enumerable: true,
    get: function get () {
      return _objects.default
    }
  })
  exports.default = void 0

  require('core-js/stable')

  var _arrays = _interopRequireDefault(require('./helpers/arrays'))

  var _functions = _interopRequireDefault(require('./helpers/functions'))

  var _numbers = _interopRequireDefault(require('./helpers/numbers'))

  var _objects = _interopRequireDefault(require('./helpers/objects'))

  function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

  /**
 * @file All of the functionalHelpers system functions for stringing together functions and simplifying logic.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 */

  /**
   * Store a reference to this scope which will be Window if rendered via browser
   */
  var root = void 0 || {}
  /**
   * Store reference to any pre-existing module of the same name
   * @type {module|*}
   */

  var previousFunctionalHelpers = root.functionalHelpers || {}
  /**
   * All methods exported from this module are encapsulated within functionalHelpers.
   * @author Joshua Heagle <joshuaheagle@gmail.com>
   * @typedef {Object} functionalHelpers
   * @module functionalHelpers
   */

  var functionalHelpers = {}
  root.functionalHelpers = functionalHelpers
  /**
   * Return a reference to this library while preserving the original same-named library
   * @function noConflict
   * @returns {functionalHelpers}
   */

  functionalHelpers.noConflict = function () {
    root.functionalHelpers = previousFunctionalHelpers
    return functionalHelpers
  }

  Object.assign(functionalHelpers, _arrays.default, _functions.default, _numbers.default, _objects.default)
  var _default = functionalHelpers
  exports.default = _default
  this.functionalHelpers = functionalHelpers
}).call(this || window || {})
