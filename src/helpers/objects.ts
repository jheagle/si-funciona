/**
 * Simplify working with object by providing array-like parsing. Also, provides cloning and merging along with accessors that always have a return value for optimal nesting.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module objectHelpers
 * @memberOf module:siFunciona
 */

import 'core-js/stable'
import cloneObject from './objects/cloneObject'
import dotGet from './objects/dotGet'
import dotNotate from './objects/dotNotate'
import dotSet from './objects/dotSet'
import dotUnset from './objects/dotUnset'
import emptyObject from './objects/emptyObject'
import filterObject from './objects/filterObject'
import isCloneable from './objects/isCloneable'
import isInstanceObject from './objects/isInstanceObject'
import isObject from './objects/isObject'
import mapObject from './objects/mapObject'
import mergeObjects from './objects/mergeObjects'
import mergeObjectsBase from './objects/mergeObjectsBase'
import mergeObjectsMutable from './objects/mergeObjectsMutable'
import objectKeys from './objects/objectKeys'
import objectValues from './objects/objectValues'
import reduceObject from './objects/reduceObject'
import setAndReturnValue from './objects/setAndReturnValue'
import setValue from './objects/setValue'

export default {
  cloneObject,
  dotGet,
  dotNotate,
  dotSet,
  dotUnset,
  emptyObject,
  filterObject,
  isCloneable,
  isInstanceObject,
  isObject,
  mapObject,
  mergeObjects,
  mergeObjectsBase,
  mergeObjectsMutable,
  objectKeys,
  objectValues,
  reduceObject,
  setAndReturnValue,
  setValue
}
