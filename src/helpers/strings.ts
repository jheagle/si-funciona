/**
 * Manage how strings are manipulated with these utilities.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module stringHelpers
 * @memberOf module:siFunciona
 */

import 'core-js/stable'
import camelCase from './strings/camelCase'
import kabobCase from './strings/kabobCase'
import makeFilepath from './strings/makeFilepath'
import makeRelativePath from './strings/makeRelativePath'
import regexEscape from './strings/regexEscape'
import snakeCase from './strings/snakeCase'
import strAfter from './strings/strAfter'
import strAfterLast from './strings/strAfterLast'
import strBefore from './strings/strBefore'
import strBeforeLast from './strings/strBeforeLast'
import titleCase from './strings/titleCase'
import ucFirst from './strings/ucFirst'
import words from './strings/words'

export default {
  camelCase,
  kabobCase,
  makeFilepath,
  makeRelativePath,
  regexEscape,
  snakeCase,
  strAfter,
  strAfterLast,
  strBefore,
  strBeforeLast,
  titleCase,
  ucFirst,
  words
}
