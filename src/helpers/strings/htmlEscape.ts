/**
 * Escape the characters that HTML gives a meaning to (`&`, `<`, `>`, `"` and `'`), so text from somewhere you don't
 * control (a user's name, say) shows as itself when put into `innerHTML` or an attribute value, instead of becoming
 * markup or script.
 * @param str - The text to escape.
 */
export const htmlEscape = (str: string): string => str.replace(/[&<>"']/g, character => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  '\'': '&#39;'
})[character] as string)

export default htmlEscape
