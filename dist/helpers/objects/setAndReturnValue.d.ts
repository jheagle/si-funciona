type settableItem = Array<any> | {
    [k: number | string]: any;
};
/**
 * Set a value on an item, then return the value
 * @param item - An object or array to be updated
 * @param key - The key on the item which will have its value set
 * @param value - Any value to be applied to the key
 */
declare const setAndReturnValue: (item: settableItem, key: keyof settableItem, value: any) => any;
export default setAndReturnValue;
//# sourceMappingURL=setAndReturnValue.d.ts.map