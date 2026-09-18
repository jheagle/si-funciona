import 'core-js/stable'

/**
 * Retrieve the string part after the search match.
 * @memberOf module:stringHelpers
 * @param {string} str - The string to search within.
 * @param {string} search - The substring to search for.
 * @returns {string} The portion of `str` after the first occurrence of `search`, or `''` if not found.
 */
const strAfter = (str: string, search: string): string => {
  const index = str.indexOf(search)
  return index === -1 ? '' : str.substring(index + search.length)
}

export default strAfter
