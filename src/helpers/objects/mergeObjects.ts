import mergeObjectsBase from './mergeObjectsBase'

/**
 * Uses mergeObjectsBase deep merge objects and arrays, merge by value.
 * @see {@link module:objectHelpers~mergeObjectsCallback}
 * @param objects - Provide a list of objects which will be merged starting from the end up into the first
 */
const mergeObjects = mergeObjectsBase({ useClone: true })

export default mergeObjects
