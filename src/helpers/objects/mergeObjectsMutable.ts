import mergeObjectsBase from './mergeObjectsBase'

/**
 * Uses mergeObjectsBase deep merge objects and arrays, merge by reference.
 * @see {@link module:objectHelpers~mergeObjectsCallback}
 * @param objects - Provide a list of objects which will be merged starting from the end up into the first
 */
const mergeObjectsMutable = mergeObjectsBase()

export default mergeObjectsMutable
