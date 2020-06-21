export const describeObject = object => {
  console.log(require('util').inspect(object, false, null, true))
}
