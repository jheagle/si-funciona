import * as browser from './browser'
import siFunciona from './main'

describe('browser entry', () => {
  test('holds every function once, by name, without a default', () => {
    expect(Object.keys(browser)).not.toContain('default')
    expect(Object.keys(browser).sort()).toEqual(Object.keys(siFunciona).sort())
  })
})
