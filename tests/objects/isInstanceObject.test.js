import isInstanceObject from '../../src/helpers/objects/isInstanceObject'

describe('isInstanceObject', () => {
  test('standard object has no inherited properties', () => {
    const someObject = { one: 'first', two: 'second' }
    expect(isInstanceObject(someObject)).toBe(false)
  })

  test('created object from another object will have inherited properties', () => {
    const someObject = { one: 'first', two: 'second' }
    const newObject = Object.create(someObject)
    expect(isInstanceObject(newObject)).toBe(true)
  })

  test('declared class is an instance object', () => {
    class SampleClass {
      construct () {
        this.one = 'first'
        this.two = 'second'
      }
    }

    expect(isInstanceObject(SampleClass)).toBe(true)
  })

  test('instatiated object is an instance object', () => {
    class SampleClass {
      construct () {
        this.one = 'first'
        this.two = 'second'
      }
    }

    const newObject = new SampleClass()
    expect(isInstanceObject(newObject)).toBe(true)
  })

  test('arrays are not instance objects', () => {
    const someArray = ['first', 'second']
    expect(isInstanceObject(someArray)).toBe(false)
  })
})
