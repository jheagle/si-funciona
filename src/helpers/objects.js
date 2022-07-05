/**
 * Simplify working with object by providing array-like parsing. Also, provides cloning and merging along with accessors that always have a return value for optimal nesting.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module objectHelpers
 * @memberOf module:functionalHelpers
 */

import 'core-js/stable'
import cloneObject from './objects/cloneObject.js'
import dotGet from './objects/dotGet.js'
import dotNotate from './objects/dotNotate.js'
import dotSet from './objects/dotSet.js'
import emptyObject from './objects/emptyObject.js'
import filterObject from './objects/filterObject.js'
import isCloneable from './objects/isCloneable.js'
import isInstanceObject from './objects/isInstanceObject.js'
import isObject from './objects/isObject.js'
import mapObject from './objects/mapObject.js'
import mergeObjects from './objects/mergeObjects.js'
import mergeObjectsBase from './objects/mergeObjectsBase.js'
import mergeObjectsMutable from './objects/mergeObjectsMutable.js'
import objectKeys from './objects/objectKeys.js'
import objectValues from './objects/objectValues.js'
import reduceObject from './objects/reduceObject.js'
import setAndReturnValue from './objects/setAndReturnValue.js'
import setValue from './objects/setValue.js'

export default {
  cloneObject,
  dotGet,
  dotNotate,
  dotSet,
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
