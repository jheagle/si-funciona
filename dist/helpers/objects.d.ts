/**
 * Simplify working with object by providing array-like parsing. Also, provides cloning and merging along with accessors that always have a return value for optimal nesting.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module objectHelpers
 * @memberOf module:siFunciona
 */
import 'core-js/stable';
declare const _default: {
    cloneObject: (object: object, { mapLimit, depthLimit, relevancyRange }?: {
        mapLimit?: number;
        depthLimit?: number;
        relevancyRange?: number;
    }) => object;
    dotGet: (arrayObject: import("./objects/dotNotate").dotNotateableItem, dotNotation: string, defaultValue?: string) => any;
    dotNotate: (arrayObject: object, retainObjects?: string[]) => {
        [k: string]: any;
    };
    dotSet: (arrayObject: import("./objects/dotNotate").dotNotateableItem, dotNotation: string, value?: any) => import("./objects/dotNotate").dotNotateableItem;
    dotUnset: (arrayObject: import("./objects/dotNotate").dotNotateableItem, dotNotation: string) => import("./objects/dotNotate").dotNotateableItem;
    emptyObject: (item: Object | any[]) => boolean;
    filterObject: (obj: any[] | {
        [k: string]: any;
        [k: number]: any;
    }, fn: (currentProperty: any, currentIndex: number | "length" | "toString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "includes" | "at" | "toLocaleString" | "join" | "every" | "some" | "forEach" | "map" | "filter" | "reduce" | "reduceRight" | "find" | "findIndex" | "entries" | "keys" | "values" | "flatMap" | "flat" | "pop" | "push" | "reverse" | "shift" | "sort" | "splice" | "unshift" | "fill" | "copyWithin", object: any[] | {
        [k: string]: any;
        [k: number]: any;
    }) => boolean, thisArg?: any[] | {
        [k: string]: any;
        [k: number]: any;
    }) => any[] | {
        [k: string]: any;
        [k: number]: any;
    };
    isCloneable: (value: any) => boolean;
    isInstanceObject: (object: Object | any[]) => boolean;
    isObject: (object: any) => boolean;
    mapObject: (obj: any[] | {
        [k: string]: any;
        [k: number]: any;
    }, fn: (currentProperty: any, currentIndex: number | "length" | "toString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "includes" | "at" | "toLocaleString" | "join" | "every" | "some" | "forEach" | "map" | "filter" | "reduce" | "reduceRight" | "find" | "findIndex" | "entries" | "keys" | "values" | "flatMap" | "flat" | "pop" | "push" | "reverse" | "shift" | "sort" | "splice" | "unshift" | "fill" | "copyWithin", object: any[] | {
        [k: string]: any;
        [k: number]: any;
    }) => any, thisArg?: any[] | {
        [k: string]: any;
        [k: number]: any;
    }) => any[] | {
        [k: string]: any;
        [k: number]: any;
    };
    mergeObjects: (...objects: Object[]) => any[] | {
        [k: string]: any;
        [k: number]: any;
    };
    mergeObjectsBase: ({ mapLimit, depthLimit, relevancyRange, map, useClone, }?: {
        mapLimit?: number;
        depthLimit?: number;
        relevancyRange?: number;
        map?: import("./functions/relevancyFilter").relevanceMap;
        useClone?: boolean;
    }) => (...objects: Object[]) => any[] | {
        [k: string]: any;
        [k: number]: any;
    };
    mergeObjectsMutable: (...objects: Object[]) => any[] | {
        [k: string]: any;
        [k: number]: any;
    };
    objectKeys: (object: any[] | {
        [k: string]: any;
        [k: number]: any;
    }, includeInherited?: boolean) => any[];
    objectValues: (object: any[] | {
        [k: string]: any;
        [k: number]: any;
    }, includeInherited?: boolean) => any[];
    reduceObject: (obj: any[] | {
        [k: string]: any;
        [k: number]: any;
    }, fn: (accumulator: any, currentProperty: any, currentIndex: number | "length" | "toString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "includes" | "at" | "toLocaleString" | "join" | "every" | "some" | "forEach" | "map" | "filter" | "reduce" | "reduceRight" | "find" | "findIndex" | "entries" | "keys" | "values" | "flatMap" | "flat" | "pop" | "push" | "reverse" | "shift" | "sort" | "splice" | "unshift" | "fill" | "copyWithin", object: any[] | {
        [k: string]: any;
        [k: number]: any;
    }) => any, initialValue?: any[] | {
        [k: string]: any;
        [k: number]: any;
    }) => any;
    setAndReturnValue: (item: any[] | {
        [k: string]: any;
        [k: number]: any;
    }, key: number | "length" | "toString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "includes" | "at" | "toLocaleString" | "join" | "every" | "some" | "forEach" | "map" | "filter" | "reduce" | "reduceRight" | "find" | "findIndex" | "entries" | "keys" | "values" | "flatMap" | "flat" | "pop" | "push" | "reverse" | "shift" | "sort" | "splice" | "unshift" | "fill" | "copyWithin", value: any) => any;
    setValue: (key: string | number, value: any, item: any[] | {
        [k: string]: any;
        [k: number]: any;
    }) => any[] | {
        [k: string]: any;
        [k: number]: any;
    };
};
export default _default;
