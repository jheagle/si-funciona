import 'core-js/stable'

const strBefore = (str, search) => {
  const index = str.indexOf(search)
  return index === -1 ? '' : str.slice(0, index)
}

export default strBefore
