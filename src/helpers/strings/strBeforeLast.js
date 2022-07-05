import 'core-js/stable'

const strBeforeLast = (str, search) => {
  const index = str.lastIndexOf(search)
  return index === -1 ? '' : str.substring(0, index)
}

export default strBeforeLast
