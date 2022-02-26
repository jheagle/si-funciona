import 'core-js/stable'
import ucFirst from './ucFirst.js'
import words from './words.js'

/**
 * Given a string in kebab-case, snake_case, camelCase or 'Sentence case', convert to 'Title Case'.
 * @function
 * @memberOf module:stringHelpers
 * @param {string} str
 * @returns {string}
 */
const titleCase = str => words(str).reduce(
  (title, part) => title ? title.concat(' ' + ucFirst(part)) : ucFirst(part),
  ''
)

export default titleCase
