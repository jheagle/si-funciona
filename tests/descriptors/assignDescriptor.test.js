import assignDescriptor from '../../src/helpers/descriptors/assignDescriptor'
import describeObject from '../../src/helpers/descriptors/describeObject'
import descriptorSample from '../../src/helpers/descriptors/samples/descriptor'

describe('assignDescriptor', () => {
  test('assigns new value on same detail', () => {
    expect(assignDescriptor(descriptorSample, describeObject({ keyName: 'someString' })))
      .toMatchObject({
        details: [
          {
            key: 'keyName',
            type: ['string'],
            value: ['', 'someString']
          }
        ],
        length: 1,
        keys: ['keyName'],
        references: [],
        isArray: false,
        complete: true
      })
  })

  test('assigns empty array detail to filled array detail', () => {
    const childOne = { name: 'child one' }
    const childTwo = { name: 'child two' }
    const children = describeObject([childOne, childTwo])
    const noChildren = describeObject([])
    expect(assignDescriptor(children, noChildren))
      .toMatchObject({
        details: [
          {
            key: 0,
            type: ['object'],
            value: [childOne, childTwo]
          }
        ],
        length: 2,
        keys: [0],
        references: [0],
        isArray: true,
        complete: true
      })
  })
})
