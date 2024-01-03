import isObject from './isObject'

describe('isObject', () => {
  test('should return true if the value is an object', () => {
    expect(isObject({})).toBe(true)
    expect(isObject({ a: 1 })).toBe(true)
    expect(isObject(Object.create(null))).toBe(true)
  })
  test('should return false if the value is not an object', () => {
    expect(isObject(null)).toBe(false)
    expect(isObject(undefined)).toBe(false)
    expect(isObject(true)).toBe(false)
    expect(isObject(false)).toBe(false)
    expect(isObject(0)).toBe(false)
    expect(isObject(1)).toBe(false)
    expect(isObject('')).toBe(false)
    expect(isObject('string')).toBe(false)
    // eslint-disable-next-line symbol-description
    expect(isObject(Symbol())).toBe(false)
    expect(isObject(() => {})).toBe(false)
    expect(isObject(/regex/)).toBe(true)
    expect(isObject([])).toBe(true)
    expect(isObject(new Date())).toBe(true)
  })
})
