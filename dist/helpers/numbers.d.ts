/**
 * Some number comparators and random number generators.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module numberHelpers
 * @memberOf module:siFunciona
 */
import 'core-js/stable';
declare const _default: {
    absoluteMax: (num1: number, num2: number) => number;
    absoluteMin: (num1: number, num2: number) => number;
    compare: (val1: number, val2: number) => number;
    greatestCommonDivisor: (num1: number, num2: number) => number;
    leastCommonMultiple: (num1: number, num2: number) => number;
    lowestCommonDenominator: (...numbers: number[]) => number;
    randomInteger: (range: number, offset?: number, interval?: number) => number;
    randomNumber: (range: number, offset?: number, interval?: number) => number;
    simplestRatio: (...numbers: number[]) => number[];
};
export default _default;
