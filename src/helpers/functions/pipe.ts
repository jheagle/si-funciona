
/**
 * Take one or more function with a single parameter and return value.
 * Pass a parameter and the value will be transformed by each function then returned.
 * @param fns - Takes a series of functions having the same parameter
 */
const pipe = (...fns: Function[]): any => (x: any) => fns.reduce((y, f) => f(y), x)

export default pipe
