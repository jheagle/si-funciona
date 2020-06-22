/**
 * Log out an object in a nicely formatted way.
 * @param {Object} object
 */
export const logObject = object => {
  console.log(require('util').inspect(object, false, null, true))
}
