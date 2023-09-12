/**
 * @typedef {Object} module:objectDescriptors~descriptorDetail
 * @memberOf module:objectDescriptors
 * @property {number} index
 * @property {string|number} key
 * @property {Array.<string>} type
 * @property {Array} value
 * @property {boolean} nullable
 * @property {boolean} optional
 * @property {boolean} circular
 * @property {boolean} isReference
 * @property {boolean} isInstance
 * @property {null|number} arrayReference
 * @property {null|number} objectReference
 */
export type descriptorDetail = {
    index: number;
    key: number | string;
    type: Array<string>;
    value: Array<any>;
    nullable: boolean;
    optional: boolean;
    circular: boolean;
    isReference: boolean;
    isInstance: boolean;
    arrayReference: number | null;
    objectReference: number | null;
};
/**
 * @type {module:objectDescriptors~descriptorDetail}
 * @memberOf module:objectDescriptors
 */
declare const descriptorDetailSample: descriptorDetail;
export default descriptorDetailSample;
