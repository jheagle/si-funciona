import 'core-js/stable';
import { descriptorDetail } from './samples/descriptorDetail';
/**
 * Trace an object's attribute and provide details about it.
 * @memberOf module:objectDescriptors
 * @param {*} value
 * @param {string|number} [key=0]
 * @param {number} [index=0]
 * @returns {module:objectDescriptors~descriptorDetail}
 */
declare const describeObjectDetail: (value: any, key?: number | string, index?: number) => descriptorDetail;
export default describeObjectDetail;
