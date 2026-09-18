/**
 * Format the given path so that it does not have trailing slashes and also correctly appends a path.
 * @memberOf module:stringHelpers
 * @param {string} root - The base path to start from.
 * @param {string} [append=''] - A path to append to `root` - may itself use `./` or `../` segments.
 * @returns {string}
 */
export declare const makeFilepath: (root: string, append?: string) => string;
export default makeFilepath;
//# sourceMappingURL=makeFilepath.d.ts.map