import { descriptorDetail } from './descriptorDetail';
/**
 * @typedef {Object} module:objectDescriptors~descriptor
 * @memberOf module:objectDescriptors
 * @property {number} index
 * @property {Array.<module:objectDescriptors~descriptorDetail>} details
 * @property {number} length
 * @property {Array.<string|number>} keys
 * @property {Array.<number>} references
 * @property {boolean} isArray
 * @property {boolean} complete
 */
export type descriptor = {
    index: number;
    details: Array<descriptorDetail>;
    length: number;
    keys: Array<number | string>;
    references: Array<number>;
    isArray: boolean;
    complete: boolean;
};
/**
 * @type {module:objectDescriptors~descriptor}
 * @memberOf module:objectDescriptors
 */
declare const descriptorSample: descriptor;
export default descriptorSample;
