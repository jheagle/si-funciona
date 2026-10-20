/**
 * The browser bundle entry: the siFunciona global holds every function once, by name.
 */

// `export *` re-exports every named export but never the default one, so the global does not hold every function a
// second time under `default` (browserify's standalone wrapper exposes module.exports as the global as it is).
export * from './main'
