/**
 * A "descriptor" is a flat, serializable snapshot of an object or array's shape: for each property, its type(s),
 * whether it's nullable, and - if the property's own value is itself an object/array - a reference to that nested
 * value's own descriptor elsewhere in the same list, rather than nesting descriptors inside descriptors. This flat,
 * reference-based structure is what lets these utilities walk deeply nested and even circular object graphs (an
 * object that contains itself, directly or indirectly) without infinite recursion, since a value that's already
 * been described is simply pointed to again instead of re-described.
 *
 * Start with {@link module:objectDescriptors.describeObjectMap}, which takes any real object or array and produces
 * this flat list of descriptors for you - the other functions here (comparing, merging, cloning descriptors) are
 * building blocks used internally, or useful once you already have descriptors to work with directly.
 *
 * The concrete use this module has earned its keep on: describing two objects and comparing the results tells
 * you whether they're the same shape and values even when they're different references entirely (see
 * {@link module:objectDescriptors.sameDescriptor}/{@link module:objectDescriptors.compareDescriptor}) - useful
 * anywhere you need to check that two objects genuinely match without caring whether they're literally the same
 * instance. A descriptor also doubles as a flat, structured summary of an object's shape, which can be handy for
 * discussion or assessment purposes (e.g. describing what an object looks like without dumping the whole thing).
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module objectDescriptors
 * @memberOf module:siFunciona
 */
import assignDescriptor from './descriptors/assignDescriptor';
import assignDescriptorDetail from './descriptors/assignDescriptorDetail';
import checkClearValues from './descriptors/checkClearValues';
import checkDescriptorComplete from './descriptors/checkDescriptorComplete';
import cloneDescriptor from './descriptors/cloneDescriptor';
import cloneDescriptorDetail from './descriptors/cloneDescriptorDetail';
import compareDescriptor from './descriptors/compareDescriptor';
import describeObject from './descriptors/describeObject';
import describeObjectMap from './descriptors/describeObjectMap';
import describeObjectDetail from './descriptors/describeObjectDetail';
import nextReference from './descriptors/nextReference';
import sameDescriptor from './descriptors/sameDescriptor';
export { assignDescriptor, assignDescriptorDetail, checkClearValues, checkDescriptorComplete, cloneDescriptor, cloneDescriptorDetail, compareDescriptor, describeObject, describeObjectMap, describeObjectDetail, nextReference, sameDescriptor };
declare const _default: {
    assignDescriptor: (originalMap: import("./descriptors/samples/descriptor").descriptor, ...descriptors: Array<import("./descriptors/samples/descriptor").descriptor>) => import("./descriptors/samples/descriptor").descriptor;
    assignDescriptorDetail: (originalDetail: import("./descriptors/samples/descriptorDetail").descriptorDetail, ...details: Array<import("./descriptors/samples/descriptorDetail").descriptorDetail>) => import("./descriptors/samples/descriptorDetail").descriptorDetail;
    checkClearValues: (descriptor: import("./descriptors/samples/descriptor").descriptor, keepValues?: boolean) => import("./descriptors/samples/descriptor").descriptor;
    checkDescriptorComplete: (descriptor: import("./descriptors/samples/descriptor").descriptor) => import("./descriptors/samples/descriptor").descriptor;
    cloneDescriptor: (originalMap: import("./descriptors/samples/descriptor").descriptor) => import("./descriptors/samples/descriptor").descriptor;
    cloneDescriptorDetail: (originalDetail: import("./descriptors/samples/descriptorDetail").descriptorDetail) => import("./descriptors/samples/descriptorDetail").descriptorDetail;
    compareDescriptor: (descriptor1: import("./descriptors/samples/descriptor").descriptor, descriptor2: import("./descriptors/samples/descriptor").descriptor) => boolean;
    describeObject: (object: import("./descriptors/describeObject").describeableObject) => import("./descriptors/samples/descriptor").descriptor;
    describeObjectMap: (object: import("./descriptors/describeObject").describeableObject, { mapLimit, depthLimit, keepValues }?: {
        mapLimit?: number;
        depthLimit?: number;
        keepValues?: boolean;
    }) => import("./descriptors/samples/descriptorMap").descriptorMap;
    describeObjectDetail: (value: any, key?: number | string, index?: number) => import("./descriptors/samples/descriptorDetail").descriptorDetail;
    nextReference: (descriptor: import("./descriptors/samples/descriptor").descriptor, currentReference: number) => number | undefined;
    sameDescriptor: (descriptor1: import("./descriptors/samples/descriptor").descriptor, descriptor2: import("./descriptors/samples/descriptor").descriptor) => boolean;
};
export default _default;
//# sourceMappingURL=descriptors.d.ts.map