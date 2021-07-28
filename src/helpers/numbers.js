/**
 * Some number comparators and random number generators.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module numberHelpers
 * @memberOf module:functionalHelpers
 */

import 'core-js/stable'
import absoluteMax from './numbers/absoluteMax'
import absoluteMin from './numbers/absoluteMin'
import compare from './numbers/compare'
import randomInteger from './numbers/randomInteger'
import randomNumber from './numbers/randomNumber'

export default {
  absoluteMax,
  absoluteMin,
  compare,
  randomInteger,
  randomNumber
}
