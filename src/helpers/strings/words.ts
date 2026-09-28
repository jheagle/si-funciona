
/**
 * Split a string into sets of numbers or letters - the shared tokenizer behind camelCase/kabobCase/snakeCase/
 * titleCase, so each can rebuild the string in its own casing style.
 * @param str - The string to split.
 */
const words = (str: string): Array<string> => str.match(/\d+|[A-Z]?[a-z]+|[A-Za-z]+/g)

export default words
