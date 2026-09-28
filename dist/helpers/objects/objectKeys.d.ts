type keyableItem = Array<any> | {
    [k: number | string]: any;
};
/**
 * Get an array of keys from any object or array. Will return empty array when invalid or there are no keys.
 * Optional flag will include the inherited keys from prototype chain when set.
 * @param object
 * @param includeInherited
 */
declare const objectKeys: (object: keyableItem, includeInherited?: boolean) => Array<any>;
export default objectKeys;
//# sourceMappingURL=objectKeys.d.ts.map