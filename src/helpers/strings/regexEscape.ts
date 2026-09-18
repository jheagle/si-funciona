/**
 * Take a string and escape the regex characters.
 * @memberOf module:stringHelpers
 * @param {string} str - The string to escape, so it can be used literally inside a `RegExp`.
 * @returns {string}
 */
export const regexEscape = (str: string): string => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export default regexEscape
