/**
 * All the siFunciona system functions for stringing together functions and simplifying logic.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module siFunciona
 */

import arrayHelpers from './helpers/arrays'
import descriptors from './helpers/descriptors'
import functionHelpers from './helpers/functions'
import numberHelpers from './helpers/numbers'
import objectHelpers from './helpers/objects'
import stringHelpers from './helpers/strings'

// Every function is available by name (import { curry } from 'si-funciona', require('si-funciona').curry) ...
export * from './helpers/arrays'
export * from './helpers/descriptors'
export * from './helpers/functions'
export * from './helpers/numbers'
export * from './helpers/objects'
export * from './helpers/strings'

// ... and all together on the default export (import siFunciona from 'si-funciona', require('si-funciona').default)
const siFunciona = Object.assign(
  {},
  arrayHelpers,
  descriptors,
  functionHelpers,
  numberHelpers,
  objectHelpers,
  stringHelpers,
)

export default siFunciona

if (this) {
  // @ts-ignore
  this['siFunciona'] = siFunciona
} else if (typeof window !== 'undefined') {
  // @ts-ignore
  window['siFunciona'] = siFunciona
}