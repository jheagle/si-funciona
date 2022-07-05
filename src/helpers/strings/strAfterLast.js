import 'core-js/stable'

const strAfterLast = (str, search) => {
  const index = str.lastIndexOf(search)
  return index === -1 ? '' : str.substring(index + search.length)
}

export default strAfterLast
