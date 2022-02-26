import 'core-js/stable'
import words from './words.js'

/**
 * Given a string in kebab-case, camelCase or 'Sentence case', convert to snake_case.
 * @function
 * @memberOf module:stringHelpers
 * @param {string} str
 * @returns {string}
 */
const snakeCase = str => words(str).reduce(
  (snake, part) => snake ? snake.concat('_' + part.toLowerCase()) : part.toLowerCase(),
  ''
)

export default snakeCase
