import 'core-js/stable'
import ucFirst from './ucFirst.js'
import words from './words.js'

/**
 * Given a string in kebab-case, snake_case or 'Sentence case', convert to camelCase.
 * @function
 * @memberOf module:stringHelpers
 * @param {string} str
 * @returns {string}
 */
const camelCase = str => words(str).reduce(
  (camel, part) => camel ? camel.concat(ucFirst(part)) : part.toLowerCase(),
  ''
)

export default camelCase
