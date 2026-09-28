
/**
 * Retrieve the string part before the last search match.
 * @param str - The string to search within.
 * @param search - The substring to search for.
 * @returns The portion of `str` before the last occurrence of `search`, or `''` if not found.
 */
const strBeforeLast = (str: string, search: string): string => {
  const index = str.lastIndexOf(search)
  return index === -1 ? '' : str.substring(0, index)
}

export default strBeforeLast
