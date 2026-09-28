import words from './words'

/**
 * Given a string in kebab-case, camelCase or 'Sentence case', convert to snake_case.
 * @param str - The string to convert.
 */
const snakeCase = (str: string): string => words(str).reduce(
  (snake: string, part: string): string => snake ? snake.concat('_' + part.toLowerCase()) : part.toLowerCase(),
  ''
)

export default snakeCase
