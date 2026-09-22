import 'regenerator-runtime/runtime';
type outputAndReturn = (value: any) => any;
/**
 * Output the value with label to the console and return the value to not interrupt the code - useful for
 * inspecting a value mid-pipe/mid-chain without altering the result.
 * @memberOf module:functionHelpers
 * @param {string} label - Pass an identifying label of the value being output.
 * @param {boolean} [useClone=true] - Determines if the logged data should be a clone of the original to preserve
 * its state at the time of logging (rather than a live reference that may show later mutations).
 * @returns {function(*=)}
 */
declare const trace: (label: string, useClone?: boolean) => outputAndReturn;
export default trace;
//# sourceMappingURL=trace.d.ts.map