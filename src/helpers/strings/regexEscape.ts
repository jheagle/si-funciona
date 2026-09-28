/**
 * Take a string and escape the regex characters.
 * @param str - The string to escape, so it can be used literally inside a `RegExp`.
 */
export const regexEscape = (str: string): string => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export default regexEscape
