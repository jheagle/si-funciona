import simplestRatio from './simplestRatio'

describe('simplestRatio', () => {
  test('will find the simplest form for: 24,36,60', () => {
    expect(simplestRatio(24, 36, 60)).toEqual([2, 3, 5])
  })
  test('will find the simplest form for: 2,4,6', () => {
    expect(simplestRatio(2,4,6)).toEqual([1,2,3])
  })
  test('will find the simplest form for: 3,3,3', () => {
    expect(simplestRatio(3,3,3)).toEqual([1,1,1])
  })
  test('will find the simplest form for: -3,-3,-3', () => {
    expect(simplestRatio(-3,-3,-3)).toEqual([-1,-1,-1])
  })
  test('will find the simplest form for: 25,-5,15', () => {
    expect(simplestRatio(25,-5,15)).toEqual([5,-1,3])
  })
  test('will find the simplest form for: 4,4,8', () => {
    expect(simplestRatio(4,4,8)).toEqual([1,1,2])
  })
  test('will find the simplest form for: 4,2,0', () => {
    expect(simplestRatio(4,2,0)).toEqual([2,1,0])
  })
  test('will find the simplest form for: 0,0,3', () => {
    expect(simplestRatio(0, 0, 3)).toEqual([0, 0, 1])
  })
})
