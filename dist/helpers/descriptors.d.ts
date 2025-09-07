/**
 * Create a format to standardize every object into a specific template.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module objectDescriptors
 * @memberOf module:siFunciona
 */
import 'core-js/stable';
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
