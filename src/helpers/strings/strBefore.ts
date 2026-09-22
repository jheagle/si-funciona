
/**
 * Retrieve the string part before the search match.
 * @memberOf module:stringHelpers
 * @param {string} str - The string to search within.
 * @param {string} search - The substring to search for.
 * @returns {string} The portion of `str` before the first occurrence of `search`, or `''` if not found.
 */
const strBefore = (str: string, search: string): string => {
  const index = str.indexOf(search)
  return index === -1 ? '' : str.slice(0, index)
}

export default strBefore
