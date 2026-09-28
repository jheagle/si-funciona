
/**
 * Given a string, make the first character uppercase and the rest lowercase.
 * @param str - The string to convert.
 */
const ucFirst = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()

export default ucFirst
