/**
 * Some number comparators and random number generators.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module numberHelpers
 * @memberOf module:siFunciona
 */

import 'core-js/stable'
import absoluteMax from './numbers/absoluteMax'
import absoluteMin from './numbers/absoluteMin'
import compare from './numbers/compare'
import greatestCommonDivisor from './numbers/greatestCommonDivisor'
import leastCommonMultiple from './numbers/leastCommonMultiple'
import lowestCommonDenominator from './numbers/lowestCommonDenominator'
import randomInteger from './numbers/randomInteger'
import randomNumber from './numbers/randomNumber'
import simplestRatio from './numbers/simplestRatio'

export default {
  absoluteMax,
  absoluteMin,
  compare,
  greatestCommonDivisor,
  leastCommonMultiple,
  lowestCommonDenominator,
  randomInteger,
  randomNumber,
  simplestRatio
}
