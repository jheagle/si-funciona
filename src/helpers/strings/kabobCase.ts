import words from './words'

/**
 * Given a string in snake_case, camelCase or 'Sentence case', convert to kabob-case.
 * @param str - The string to convert.
 */
const kabobCase = (str: string): string => words(str).reduce(
  (kabob: string, part: string): string => kabob ? kabob.concat('-' + part.toLowerCase()) : part.toLowerCase(),
  ''
)

export default kabobCase
