/**
 * Manage how strings are manipulated with these utilities.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module stringHelpers
 * @memberOf module:functionalHelpers
 */

import 'core-js/stable'
import camelCase from './strings/camelCase.js'
import kabobCase from './strings/kabobCase.js'
import snakeCase from './strings/snakeCase.js'
import strAfter from './strings/strAfter.js'
import strAfterLast from './strings/strAfterLast.js'
import strBefore from './strings/strBefore.js'
import strBeforeLast from './strings/strBeforeLast.js'
import titleCase from './strings/titleCase.js'
import ucFirst from './strings/ucFirst.js'
import words from './strings/words.js'

export default {
  camelCase,
  kabobCase,
  snakeCase,
  strAfter,
  strAfterLast,
  strBefore,
  strBeforeLast,
  titleCase,
  ucFirst,
  words
}