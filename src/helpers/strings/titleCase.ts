import 'core-js/stable'
import ucFirst from './ucFirst'
import words from './words'

/**
 * Given a string in kebab-case, snake_case, camelCase or 'Sentence case', convert to 'Title Case'.
 * @memberOf module:stringHelpers
 * @param {string} str
 * @returns {string}
 */
const titleCase = (str: string): string => words(str).reduce(
  (title: string, part: string): string => title ? title.concat(' ' + ucFirst(part)) : ucFirst(part),
  ''
)

export default titleCase
