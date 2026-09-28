import ucFirst from './ucFirst'
import words from './words'

/**
 * Given a string in kebab-case, snake_case or 'Sentence case', convert to camelCase.
 * @param str - The string to convert.
 */
const camelCase = (str: string): string => words(str).reduce(
  (camel: string, part: string): string => camel ? camel.concat(ucFirst(part)) : part.toLowerCase(),
  ''
)

export default camelCase
