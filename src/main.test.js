import siFunciona, * as named from './main'

describe('main', () => {
  test('every function on the default export is also a named export', () => {
    const defaultNames = Object.keys(siFunciona)
    expect(defaultNames.length).toBeGreaterThan(60)
    defaultNames.forEach(name => {
      expect(named[name]).toBe(siFunciona[name])
    })
  })

  test('the named exports are the functions themselves', () => {
    expect(named.curry).toBeInstanceOf(Function)
    expect(named.pipe).toBeInstanceOf(Function)
    expect(named.cloneObject).toBeInstanceOf(Function)
    expect(named.BasicQueue).toBeInstanceOf(Function)
    expect(named.curry((a, b) => a + b)(1)(2)).toBe(3)
    expect(named.pipe(x => x + 1, x => x * 2)(1)).toBe(4)
  })

  test('the only named exports are the functions and the default', () => {
    const names = Object.keys(named).filter(name => name !== 'default' && name !== '__esModule').sort()
    expect(names).toEqual(Object.keys(siFunciona).sort())
  })
})
