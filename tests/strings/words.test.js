import words from '../../src/helpers/strings/words'

describe('words', () => {
  test('finds all grouped strings', () => {
    const results = words('The quick87 red_fox, 123 jumpedOver the lazy-brown DOG')
    expect(results.length).toBe(12)
    expect(results[0]).toBe('The')
    expect(results[1]).toBe('quick')
    expect(results[2]).toBe('87')
    expect(results[3]).toBe('red')
    expect(results[4]).toBe('fox')
    expect(results[5]).toBe('123')
    expect(results[6]).toBe('jumped')
    expect(results[7]).toBe('Over')
    expect(results[8]).toBe('the')
    expect(results[9]).toBe('lazy')
    expect(results[10]).toBe('brown')
    expect(results[11]).toBe('DOG')
  })
})