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
    dotGet: (arrayObject: import("./objects/dotNotate").dotNotateableItem, dotNotation: import("./objects/dotNotate").dotNotationString, defaultValue?: string | null) => any;
    dotNotate: (arrayObject: object, retainObjects?: Array<import("./objects/dotNotate").dotNotationString>) => {
        [k: string]: any;
    };
    dotSet: (arrayObject: import("./objects/dotNotate").dotNotateableItem, dotNotation: import("./objects/dotNotate").dotNotationString, value?: any) => import("./objects/dotNotate").dotNotateableItem;
    dotUnset: (arrayObject: import("./objects/dotNotate").dotNotateableItem, dotNotation: import("./objects/dotNotate").dotNotationString) => import("./objects/dotNotate").dotNotateableItem;
    emptyObject: (item: Array<any> | Object) => boolean;
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
    isCloneable: (value: Array<any> | Object | any) => boolean;
    isInstanceObject: (object: Array<any> | Object) => boolean;
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
    mergeObjects: (...objects: Array<Object>) => any[] | {
        [k: string]: any;
        [k: number]: any;
    };
    mergeObjectsBase: ({ mapLimit, depthLimit, relevancyRange, map, useClone, }?: {
        mapLimit?: number;
        depthLimit?: number;
        relevancyRange?: number;
        map?: import("./functions/relevancyFilter").relevanceMap;
        useClone?: boolean;
    }) => (...objects: Array<Object>) => any[] | {
        [k: string]: any;
        [k: number]: any;
    };
    mergeObjectsMutable: (...objects: Array<Object>) => any[] | {
        [k: string]: any;
        [k: number]: any;
    };
    objectKeys: (object: any[] | {
        [k: string]: any;
        [k: number]: any;
    }, includeInherited?: boolean) => Array<any>;
    objectValues: (object: any[] | {
        [k: string]: any;
        [k: number]: any;
    }, includeInherited?: boolean) => Array<any>;
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
    setValue: (key: number | string, value: any, item: any[] | {
        [k: string]: any;
        [k: number]: any;
    }) => any[] | {
        [k: string]: any;
        [k: number]: any;
    };
};
export default _default;
