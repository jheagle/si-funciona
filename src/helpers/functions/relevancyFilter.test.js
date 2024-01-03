import relevancyFilter from './relevancyFilter'

describe('relevancyFilter', () => {
  test('map length less than mapLimit returns without filtering', () => {
    const testMap = []
    for (let i = 0; i < 5; ++i) {
      testMap.push({ relevance: i })
    }
    const mapLimit = 5
    // filtering only occurs when the length of the map is GREATER THAN the set limit.
    const filteredMap = relevancyFilter(testMap, { mapLimit })
    expect(filteredMap.length).toEqual(mapLimit)
    expect(filteredMap).toBe(testMap)
  })

  test('relevancy limits the map length to the given number', () => {
    const testMap = []
    const max = 10
    for (let i = 0; i < max; ++i) {
      testMap.push({ data: i, relevance: i })
    }
    const filteredMap = relevancyFilter(testMap, { mapLimit: 0, relevancyRange: 1 })
    // The highest one is the last one added
    expect(filteredMap.length).toEqual(1)
    // Relevance is set to the map length
    expect(filteredMap[0]).toEqual({
      // the last item (having the highest relevance) is the saved item
      data: 9,
      relevance: 1
    })
  })

  test('the element with highest relevance is preserved', () => {
    const testMap = []
    const max = 10
    for (let i = 0; i < max; ++i) {
      testMap.push({ data: i, relevance: i })
    }
    testMap[5].relevance = 200
    // Only a relevance higher than the map length will be considered
    const filteredMap = relevancyFilter(testMap, { mapLimit: 0, relevancyRange: 0 })
    expect(filteredMap.length).toEqual(1)
    // Original relevance of 200 is reset to map length
    expect(filteredMap[0]).toEqual({
      // the last item (having the highest relevance) is the saved item
      data: 5,
      relevance: 1
    })
  })

  test('relevancy greater than or equal to the map length keeps all items', () => {
    const testMap = []
    const max = 10
    for (let i = 0; i < max; ++i) {
      testMap.push({ data: i, relevance: i })
    }
    // All relevances are within the limits of the given range
    const filteredMap = relevancyFilter(testMap, { mapLimit: 0, relevancyRange: max })
    expect(filteredMap.length).toEqual(max)
    // All values remain unchanged
    expect(filteredMap[0]).toEqual({
      // the last item (having the highest relevance) is the saved item
      data: 0,
      relevance: 0
    })
  })

  let incrementsLater = 0
  test('test results of changing map over time', () => {
    const mapLimit = 100
    const relevancyRange = 10
    let testMap = []
    const max = 200
    for (let i = 0; i < max; ++i) {
      testMap.push({ data: i, relevance: testMap.length })
      testMap = relevancyFilter(testMap, { mapLimit, relevancyRange })
      if (i === 99) {
        const currentLength = testMap.length
        // nothing has changed since the length is still less than mapLimit
        expect(currentLength).toBe(100)
        // elevate relevance of several entries
        testMap[25].relevance = currentLength + 1
        testMap[50].relevance = currentLength + 1
        testMap[75].relevance = currentLength + 1
      }
      if (i === 100) {
        const currentLength = testMap.length
        // Some filtering would have happened, we keep relevance greater than 90 (length 100, minus 10 range)
        const lastTen = 10 // Number of recent items added with relevance over 90
        const elevatedThree = 3 // The elevated relevance for 25, 50, 75
        const totalExpected = lastTen + elevatedThree
        expect(currentLength).toBe(totalExpected)
        for (let testI = 0; testI < totalExpected; ++testI) {
          // All relevances have been limited to equal map length
          expect(testMap[testI].relevance).toBe(currentLength)
          if (testI < 3) {
            // Handle the three elevated ones (25, 50, 75)
            expect(testMap[testI].data).toBe(25 + testI * 25)
            continue
          }
          // The rest are >90: 91, 92, 93, 94, 95, 96, 97, 98, 99, 100
          expect(testMap[testI].data).toBe(88 + testI)
        }
      }
      if (i === 187) {
        const currentLength = testMap.length
        // nothing has changed since the length is still less than mapLimit
        expect(currentLength).toBe(100)
      }
      if (i === 188) {
        const currentLength = testMap.length
        // Map has been limited to top 10
        expect(currentLength).toBe(10)
        expect(testMap[currentLength - 1]).toEqual({
          data: 188,
          relevance: 10,
        })
        ++incrementsLater
      }
      if (i > 188) {
        const currentLength = testMap.length
        // Map continues to get additions upon the last 10 filtered
        expect(currentLength).toBe(10 + incrementsLater)
        expect(testMap[currentLength - 1]).toEqual({
          data: 188 + incrementsLater,
          relevance: currentLength - 1,
        })
        ++incrementsLater
      }
    }
  })
})