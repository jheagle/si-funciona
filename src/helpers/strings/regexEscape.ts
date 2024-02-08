/**
 * Take a string and escape the regex characters.
 * @memberOf module:stringHelpers
 * @param {string} str
 * @returns {string}
 */
export const regexEscape = (str: string): string => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export default regexEscape
