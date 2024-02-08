import 'core-js/stable';
import 'regenerator-runtime/runtime';
type outputAndReturn = (value: any) => any;
/**
 * Output the value with label to the console and return the value to not interrupt the code.
 * @memberOf module:functionHelpers
 * @param {string} label - Pass an identifying label of the value being output.
 * @param useClone - Determines if the logged data should be a clone of the original to preserve state.
 * @returns {function(*=)}
 */
declare const trace: (label: string, useClone?: boolean) => outputAndReturn;
export default trace;
