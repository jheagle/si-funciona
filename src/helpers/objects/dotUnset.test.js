import dotUnset from './dotUnset'

describe('dotUnset', () => {
  test('will remove a property from an object', () => {
    const obj = {
      a: {
        b: {
          c: 'd'
        }
      }
    }
    expect(dotUnset(obj, 'a.b.c')).toEqual({
      a: {
        b: {}
      }
    })
  })
})
