/**
 * @jest-environment jsdom
 */
import onBodyLoad from './onBodyLoad'

describe('onBodyLoad', () => {
  test('will use callback once the document body is ready', done => {
    expect.assertions(2)
    const someObject = {
      'head': null,
      'body': null,
      'string': 'hello'
    }
    onBodyLoad(
      () => {
        someObject.head = document.head
        someObject.body = document.body
        expect(someObject.head).not.toBeNull()
        expect(someObject.body).not.toBeNull()
        done()
      }
    )
    // Update the document child list to trigger callbacks
    const span = document.createElement('li')
    document.documentElement.appendChild(span)
  })

  test('can be called with different callbacks which will all be called', done => {
    expect.assertions(2)
    const someObject = {
      'head': null,
      'body': null,
      'string': 'hello'
    }
    onBodyLoad(
      () => someObject.head = document.head
    )
    onBodyLoad(
      () => someObject.body = document.body
    )
    onBodyLoad(
      () => {
        expect(someObject.head).not.toBeNull()
        expect(someObject.body).not.toBeNull()
        done()
      }
    )
    // Update the document child list to trigger callbacks
    const span = document.createElement('li')
    document.documentElement.appendChild(span)
  })
})
