import 'core-js/stable'
import mergeObjectsBase from './mergeObjectsBase'

/**
 * Uses mergeObjectsBase deep merge objects and arrays, merge by value.
 * @memberOf module:objectHelpers
 * @see {@link module:objectHelpers~mergeObjectsCallback}
 * @param {...Object} objects - Provide a list of objects which will be merged starting from the end up into the first
 * @returns {*}
 */
const mergeObjects = mergeObjectsBase({ useClone: true })

export default mergeObjects
