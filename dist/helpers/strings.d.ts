/**
 * Manage how strings are manipulated with these utilities.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module stringHelpers
 * @memberOf module:siFunciona
 */
import 'core-js/stable';
import camelCase from './strings/camelCase';
import kabobCase from './strings/kabobCase';
import makeFilepath from './strings/makeFilepath';
import makeRelativePath from './strings/makeRelativePath';
import regexEscape from './strings/regexEscape';
import snakeCase from './strings/snakeCase';
import strAfter from './strings/strAfter';
import strAfterLast from './strings/strAfterLast';
import strBefore from './strings/strBefore';
import strBeforeLast from './strings/strBeforeLast';
import titleCase from './strings/titleCase';
import ucFirst from './strings/ucFirst';
import words from './strings/words';
export { camelCase, kabobCase, makeFilepath, makeRelativePath, regexEscape, snakeCase, strAfter, strAfterLast, strBefore, strBeforeLast, titleCase, ucFirst, words };
declare const _default: {
    camelCase: (str: string) => string;
    kabobCase: (str: string) => string;
    makeFilepath: (root: string, append?: string) => string;
    makeRelativePath: (fromFile: string, toFile: string) => string;
    regexEscape: (str: string) => string;
    snakeCase: (str: string) => string;
    strAfter: (str: string, search: string) => string;
    strAfterLast: (str: string, search: string) => string;
    strBefore: (str: string, search: string) => string;
    strBeforeLast: (str: string, search: string) => string;
    titleCase: (str: string) => string;
    ucFirst: (str: string) => string;
    words: (str: string) => Array<string>;
};
export default _default;
//# sourceMappingURL=strings.d.ts.map