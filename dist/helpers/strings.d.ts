/**
 * Manage how strings are manipulated with these utilities.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module stringHelpers
 * @memberOf module:siFunciona
 */
import 'core-js/stable';
declare const _default: {
    camelCase: (str: string) => string;
    kabobCase: (str: string) => string;
    snakeCase: (str: string) => string;
    strAfter: (str: string, search: string) => string;
    strAfterLast: (str: string, search: string) => string;
    strBefore: (str: string, search: string) => string;
    strBeforeLast: (str: string, search: string) => string;
    titleCase: (str: string) => string;
    ucFirst: (str: string) => string;
    words: (str: string) => string[];
};
export default _default;
