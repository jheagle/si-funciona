import 'core-js/stable';
import { descriptorDetail } from './samples/descriptorDetail';
/**
 * Get a new copy of an existing Descriptor Detail
 * @function
 * @memberOf module:objectDescriptors
 * @param {module:objectDescriptors~descriptorDetail} originalDetail
 * @returns {module:objectDescriptors~descriptorDetail}
 */
declare const cloneDescriptorDetail: (originalDetail: descriptorDetail) => descriptorDetail;
export default cloneDescriptorDetail;
