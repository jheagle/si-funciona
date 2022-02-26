import 'core-js/stable'
import words from './words.js'

/**
 * Given a string in snake_case, camelCase or 'Sentence case', convert to kabob-case.
 * @function
 * @memberOf module:stringHelpers
 * @param {string} str
 * @returns {string}
 */
const kabobCase = str => words(str).reduce(
  (kabob, part) => kabob ? kabob.concat('-' + part.toLowerCase()) : part.toLowerCase(),
  ''
)

export default kabobCase
