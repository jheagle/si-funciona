
/**
 * Retrieve the string part after the search match.
 * @param str - The string to search within.
 * @param search - The substring to search for.
 * @returns The portion of `str` after the first occurrence of `search`, or `''` if not found.
 */
const strAfter = (str: string, search: string): string => {
  const index = str.indexOf(search)
  return index === -1 ? '' : str.substring(index + search.length)
}

export default strAfter
