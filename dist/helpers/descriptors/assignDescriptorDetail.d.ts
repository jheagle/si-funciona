import 'core-js/stable';
import { descriptorDetail } from './samples/descriptorDetail';
/**
 * Assign properties from other details onto an existing detail.
 * @memberOf module:objectDescriptors
 * @param {module:objectDescriptors~descriptorDetail} originalDetail
 * @param  {...module:objectDescriptors~descriptorDetail} details
 * @returns {module:objectDescriptors~descriptorDetail}
 */
declare const assignDescriptorDetail: (originalDetail: descriptorDetail, ...details: Array<descriptorDetail>) => descriptorDetail;
export default assignDescriptorDetail;
