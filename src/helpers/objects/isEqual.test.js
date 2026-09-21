import isEqual from './isEqual'

describe('isEqual', () => {
  test('primitives are equal when they are the same value', () => {
    expect(isEqual(1, 1)).toBe(true)
    expect(isEqual('a', 'a')).toBe(true)
    expect(isEqual(null, null)).toBe(true)
    expect(isEqual(undefined, undefined)).toBe(true)
    expect(isEqual(NaN, NaN)).toBe(true)
    expect(isEqual(0, -0)).toBe(true)
    expect(isEqual(1, '1')).toBe(false)
    expect(isEqual(1, 2)).toBe(false)
    expect(isEqual(null, undefined)).toBe(false)
    expect(isEqual(0, false)).toBe(false)
    expect(isEqual({}, null)).toBe(false)
    expect(isEqual(null, {})).toBe(false)
    expect(isEqual({ a: 1 }, 1)).toBe(false)
  })

  test('separately made objects with the same contents are equal', () => {
    expect(isEqual({ a: 1, b: { c: [1, 2, { d: 'x' }] } }, { a: 1, b: { c: [1, 2, { d: 'x' }] } })).toBe(true)
  })

  test('a difference anywhere makes them not equal', () => {
    expect(isEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 3 } })).toBe(false)
    expect(isEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false)
    expect(isEqual({ a: 1, b: 2 }, { a: 1 })).toBe(false)
    expect(isEqual({ a: 1 }, { b: 1 })).toBe(false)
    expect(isEqual({ a: undefined }, { b: undefined })).toBe(false)
  })

  test('the order of the properties does not matter, the order of an array does', () => {
    expect(isEqual({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(true)
    expect(isEqual([1, 2, 3], [1, 2, 3])).toBe(true)
    expect(isEqual([1, 2, 3], [3, 2, 1])).toBe(false)
    expect(isEqual([1, 2], [1, 2, 3])).toBe(false)
    expect(isEqual([], [])).toBe(true)
  })

  test('an array is not equal to an object with the same keys', () => {
    expect(isEqual([1], { 0: 1 })).toBe(false)
    expect(isEqual([], {})).toBe(false)
  })

  test('objects of different kinds are not equal', () => {
    class One { constructor () { this.value = 1 } }
    class Two { constructor () { this.value = 1 } }
    expect(isEqual(new One(), new One())).toBe(true)
    expect(isEqual(new One(), new Two())).toBe(false)
    expect(isEqual(new One(), { value: 1 })).toBe(false)
  })

  test('functions are only equal to themselves', () => {
    const fn = () => 1
    expect(isEqual(fn, fn)).toBe(true)
    expect(isEqual(() => 1, () => 1)).toBe(false)
    expect(isEqual({ fn }, { fn })).toBe(true)
  })

  test('dates and regular expressions are compared by what they hold', () => {
    expect(isEqual(new Date(2020, 1, 1), new Date(2020, 1, 1))).toBe(true)
    expect(isEqual(new Date(2020, 1, 1), new Date(2021, 1, 1))).toBe(false)
    expect(isEqual(/a+/g, /a+/g)).toBe(true)
    expect(isEqual(/a+/g, /a+/i)).toBe(false)
    expect(isEqual(/a+/g, /b+/g)).toBe(false)
  })

  test('maps and sets are compared by what they hold', () => {
    expect(isEqual(new Map([['a', { x: 1 }]]), new Map([['a', { x: 1 }]]))).toBe(true)
    expect(isEqual(new Map([['a', 1]]), new Map([['a', 2]]))).toBe(false)
    expect(isEqual(new Map([['a', 1]]), new Map([['b', 1]]))).toBe(false)
    expect(isEqual(new Set([1, { a: 1 }]), new Set([{ a: 1 }, 1]))).toBe(true)
    expect(isEqual(new Set([1, 2]), new Set([1, 3]))).toBe(false)
    expect(isEqual(new Set([1]), new Set([1, 2]))).toBe(false)
  })

  test('circular references do not run forever', () => {
    const first = { name: 'a' }
    first.self = first
    const second = { name: 'a' }
    second.self = second
    expect(isEqual(first, second)).toBe(true)
    const third = { name: 'b' }
    third.self = third
    expect(isEqual(first, third)).toBe(false)
  })

  test('the same reference is equal, and neither value is changed', () => {
    const value = { a: [1, { b: 2 }] }
    const copy = JSON.parse(JSON.stringify(value))
    expect(isEqual(value, value)).toBe(true)
    expect(isEqual(value, copy)).toBe(true)
    expect(value).toEqual(copy)
  })
})
