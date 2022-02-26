/**
 * Manage how strings are manipulated with these utilities.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module stringHelpers
 * @memberOf module:stringHelpers
 */

import 'core-js/stable'
import camelCase from './strings/camelCase.js'
import kabobCase from './strings/kabobCase.js'
import snakeCase from './strings/snakeCase.js'
import titleCase from './strings/titleCase.js'
import ucFirst from './strings/ucFirst.js'
import words from './strings/words.js'

export default {
  camelCase,
  kabobCase,
  snakeCase,
  titleCase,
  ucFirst,
  words
}