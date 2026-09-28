/**
 * Format the given path so that it does not have trailing slashes and also correctly appends a path.
 * @param root - The base path to start from.
 * @param append - A path to append to `root` - may itself use `./` or `../` segments.
 */
export declare const makeFilepath: (root: string, append?: string) => string;
export default makeFilepath;
//# sourceMappingURL=makeFilepath.d.ts.map