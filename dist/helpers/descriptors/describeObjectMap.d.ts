import 'core-js/stable';
import { describeableObject } from './describeObject';
import { descriptorMap } from './samples/descriptorMap';
type describeObjectMapOptions = {
    mapLimit?: number;
    depthLimit?: number;
    keepValues?: boolean;
};
/**
 * Trace out the entire object including nested objects, producing a flat descriptorMap - see the
 * {@link module:objectDescriptors} module description for what a descriptor represents and why it's flat. This is
 * the main entry point into this module: start here to describe a real object/array before comparing, merging, or
 * inspecting its structure with the other functions in this module.
 * @example
 * describeObjectMap({ name: 'example', tags: ['a', 'b'] })
 * // [
 * //   { index: 0, details: [...], length: 2, keys: ['name', 'tags'], references: [1], isArray: false, complete: true },
 * //   { index: 1, details: [...], length: 2, keys: [0], references: [], isArray: true, complete: true }
 * // ]
 * // descriptorMap[0] describes the top-level object; its 'tags' property is a reference (references: [1]) to
 * // descriptorMap[1], which separately describes that nested array. descriptorMap[1]'s own `length` (2) reflects
 * // the array's actual length, but `keys` has only one entry (0) since both elements share the same type
 * // ('string') and are described together by a single, representative descriptorDetail.
 * @memberOf module:objectDescriptors
 * @param {Object|Array} object - The real object or array to describe.
 * @param {Object} [options={}]
 * @param {number} [options.mapLimit=1000000000] - Stop describing further nested references once the map reaches
 * this many descriptors - a safety limit for extremely large or deeply-referenced structures.
 * @param {number} [options.depthLimit=-1] - How many levels of nested objects/arrays to describe; `-1` means no
 * limit, `0` describes only the top level, etc.
 * @param {boolean} [options.keepValues=false] - By default, each detail's actual values are cleared once its
 * descriptor is complete (to save memory) - set true to keep them.
 * @returns {module:objectDescriptors~descriptorMap}
 */
declare const describeObjectMap: (object: describeableObject, { mapLimit, depthLimit, keepValues }?: describeObjectMapOptions) => descriptorMap;
export default describeObjectMap;
//# sourceMappingURL=describeObjectMap.d.ts.map