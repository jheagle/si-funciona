import isCloneable from '../../src/helpers/objects/isCloneable'

describe('isCloneable', () => {
  test('a string is not a reference, no need to clone', () => {
    const someString = 'some string'
    expect(isCloneable(someString)).toBe(false)
  })

  test('a number is not a reference, no need to clone', () => {
    const someNumber = 1234
    expect(isCloneable(someNumber)).toBe(false)
  })

  test('standard object can be cloned', () => {
    const someObject = { one: 'first', two: 'second' }
    expect(isCloneable(someObject)).toBe(true)
  })

  test('created object cannot be cloned', () => {
    const someObject = { one: 'first', two: 'second' }
    const newObject = Object.create(someObject)
    expect(isCloneable(newObject)).toBe(false)
  })

  test('declared class cannot be cloned', () => {
    class SampleClass {
      construct () {
        this.one = 'first'
        this.two = 'second'
      }
    }

    expect(isCloneable(SampleClass)).toBe(false)
  })

  test('instantiated object cannot be cloned', () => {
    class SampleClass {
      construct () {
        this.one = 'first'
        this.two = 'second'
      }
    }

    const newObject = new SampleClass()
    expect(isCloneable(newObject)).toBe(false)
  })

  test('arrays are cloneable', () => {
    const someArray = ['first', 'second']
    expect(isCloneable(someArray)).toBe(true)
  })
})
