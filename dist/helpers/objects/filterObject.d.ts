type filterableItem = Array<any> | {
    [k: number | string]: any;
};
type filterCallback = (currentProperty: any, currentIndex: keyof filterableItem, object: filterableItem) => boolean;
/**
 * This function is intended to replicate behaviour of the Array.filter() function but for Objects.
 * If an array is passed in instead then it will perform standard filter(). It is recommended to
 * always use the standard filter() function when it is known that the object is actually an array.
 * @param obj - The Object (or Array) to be filtered
 * @param fn - The function to be processed for each filtered property
 * @param thisArg - Optional. Value to use as this when executing callback.
 */
declare const filterObject: (obj: filterableItem, fn: filterCallback, thisArg?: filterableItem) => filterableItem;
export default filterObject;
//# sourceMappingURL=filterObject.d.ts.map