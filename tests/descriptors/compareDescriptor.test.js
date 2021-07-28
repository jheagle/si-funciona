import compareDescriptor from '../../src/helpers/descriptors/compareDescriptor'
import describeObject from '../../src/helpers/descriptors/describeObject'
import descriptorSample from '../../src/helpers/descriptors/samples/descriptor'

describe('compareDescriptor; object-descriptors', () => {
  test('will return true for two exact match descriptors of objects', () => {
    expect(compareDescriptor(
      descriptorSample,
      descriptorSample
    )).toBe(true)
  })

  test('will return true for descriptor where all keys exist in another descriptor of an object', () => {
    expect(compareDescriptor(
      descriptorSample,
      describeObject({ keyName: '', someNumber: 23 })
    )).toBe(true)
  })

  test('will return true when the smaller descriptor\'s keys exist in another descriptor of an object', () => {
    expect(compareDescriptor(
      describeObject({ keyName: '', someNumber: 23 }),
      descriptorSample
    )).toBe(true)
  })

  test('will return false for descriptor where the keys exist but have a different type of an object', () => {
    expect(compareDescriptor(
      descriptorSample,
      describeObject({ keyName: 23 })
    )).toBe(false)
  })

  test('will return false for descriptor where no keys match for an object', () => {
    expect(compareDescriptor(
      descriptorSample,
      describeObject({ someName: '' })
    )).toBe(false)
  })

  test('will return false for the smallest descriptor when not all keys match the other descriptor for an object', () => {
    expect(compareDescriptor(
      describeObject({ keyName: '', someNumber: 23 }),
      describeObject({ keyName: '', someNull: null })
    )).toBe(false)
  })
})

describe('compareDescriptor; array-descriptors', () => {
  test('will return true for two exact match descriptors of arrays', () => {
    expect(compareDescriptor(
      describeObject(['']),
      describeObject([''])
    )).toBe(true)
  })

  test('will return true for the same type and length', () => {
    expect(compareDescriptor(
      describeObject(['', 1, null]),
      describeObject([23, '', 6])
    )).toBe(true)
  })

  test('will return false if second descriptor has length of 0 and first does not match', () => {
    expect(compareDescriptor(
      describeObject(['', 1]),
      describeObject([])
    )).toBe(false)
  })

  test('will return false for array descriptor comparison with object descriptor', () => {
    expect(compareDescriptor(
      describeObject(['']),
      describeObject({ 0: '' })
    )).toBe(false)
  })
})
