import ucFirst from './ucFirst'

describe('ucFirst', () => {
  test('takes a string and sets all the first character to uppercase, remaining are lowercase', () => {
    expect(ucFirst('bAcKGRounD')).toBe('Background')
  })
})