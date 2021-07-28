import 'core-js/stable'
import 'regenerator-runtime/runtime'
import cloneObject from '../objects/cloneObject'

/**
 * Output the a value with label to the console and return the value to not interrupt the code.
 * @function
 * @memberOf module:functionHelpers
 * @param {string} label - Pass an identifying label of the value being output.
 * @param useClone - Determines if the logged data should be a clone of the original to preserve state.
 * @returns {function(*=)}
 */
const trace = (label, useClone = true) => value => {
  // noinspection JSForgottenDebugStatementInspection
  console.info(`${label}: `, useClone ? cloneObject(value) : value)
  return value
}

export default trace
