import 'core-js/stable'

/**
 * Retrieve the string part before the last search match.
 * @memberOf module:stringHelpers
 * @param {string} str - The string to search within.
 * @param {string} search - The substring to search for.
 * @returns {string} The portion of `str` before the last occurrence of `search`, or `''` if not found.
 */
const strBeforeLast = (str: string, search: string): string => {
  const index = str.lastIndexOf(search)
  return index === -1 ? '' : str.substring(0, index)
}

export default strBeforeLast
