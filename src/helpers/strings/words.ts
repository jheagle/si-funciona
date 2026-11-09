/**
 * Split a string into sets of numbers or letters - the shared tokenizer behind camelCase/kabobCase/snakeCase/
 * titleCase, so each can rebuild the string in its own casing style. An acronym is its own word, also when the next
 * word follows it straight away: 'parseJSONResponse' is parse / JSON / Response, 'XMLHttpRequest' XML / Http / Request.
 * As in lodash and change-case, a plural acronym can't be told from an acronym followed by a word: 'MyAPIs' is
 * My / AP / Is.
 * @param str - The string to split.
 */
const words = (str: string): Array<string> => str.match(/\d+|[A-Z]+(?=[A-Z][a-z])|[A-Z]?[a-z]+|[A-Z]+/g)

export default words
