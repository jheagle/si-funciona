import mergeObjectsBase from './mergeObjectsBase'

test('combines multiple objects into one new object', () => {
  const someItem = { name: 'something', anArray: [1, 2, 3] }
  const secondItem = { number: 10, nested: { value: 'aValue' } }
  const thirdItem = { number: 5, anArray: [2, 3, 4, 5, 6, 7] }
  const fourthItem = { name: 'different', key: 'someKey' }
  const newItem = mergeObjectsBase({ useClone: true })({}, someItem, secondItem, thirdItem, fourthItem)
  expect(newItem).not.toBe(someItem)
  expect(newItem.nested).not.toBe(secondItem.nested)
  expect(newItem).toEqual({
    name: 'different',
    number: 5,
    nested: { value: 'aValue' },
    anArray: [2, 3, 4, 5, 6, 7],
    key: 'someKey'
  })
})

describe('state is scoped to a single call', () => {
  test('a later call sees changes made to a source since an earlier call (nothing goes stale)', () => {
    const merge = mergeObjectsBase({ useClone: true })
    const nested = { x: 1 }
    const first = merge({}, { nested })
    nested.x = 2
    const second = merge({}, { nested })
    expect(first.nested.x).toBe(1)
    expect(second.nested.x).toBe(2)
  })

  test('the results of separate calls do not share objects', () => {
    const merge = mergeObjectsBase({ useClone: true })
    const nested = { x: 1 }
    const first = merge({}, { nested })
    const second = merge({}, { nested })
    expect(first.nested).not.toBe(second.nested)
    second.nested.x = 99
    expect(first.nested.x).toBe(1)
    expect(nested.x).toBe(1)
  })

  test('the by-reference merge also reads the source as it is now on every call', () => {
    const merge = mergeObjectsBase()
    const patch = { style: { color: 'red' } }
    const targetOne = merge({}, patch)
    patch.style = { color: 'blue' }
    const targetTwo = merge({}, patch)
    expect(targetOne.style.color).toBe('red')
    expect(targetTwo.style.color).toBe('blue')
  })

  test('many calls in a row keep giving correct, independent results', () => {
    const merge = mergeObjectsBase({ useClone: true })
    const results = []
    for (let i = 0; i < 2000; i++) {
      results.push(merge({ a: { b: i } }, { c: [{ d: i }] }))
    }
    expect(results.every((result, i) => result.a.b === i && result.c[0].d === i)).toBe(true)
    expect(new Set(results.map(result => result.a)).size).toBe(2000)
  })
})

describe('circular and shared references within one call', () => {
  const buildTree = () => {
    const root = { id: 'root', children: [], parent: null }
    const child = { id: 'child', children: [], parent: root }
    const grandchild = { id: 'grandchild', children: [], parent: child }
    root.children.push(child)
    child.children.push(grandchild)
    return root
  }

  test('a clone of a circular structure is circular in the same way, and separate from the original', () => {
    const root = buildTree()
    const copy = mergeObjectsBase({ useClone: true })(root)
    expect(copy).not.toBe(root)
    expect(copy.children[0]).not.toBe(root.children[0])
    expect(copy.children[0].parent).toBe(copy)
    expect(copy.children[0].children[0].parent).toBe(copy.children[0])
  })

  test('the by-reference merge into a target leaves circular sources intact', () => {
    const root = buildTree()
    const target = mergeObjectsBase()({}, { tree: root })
    expect(target.tree).toBe(root)
    expect(target.tree.children[0].parent).toBe(root)
  })

  test('an object referenced twice is merged once and stays shared in the clone', () => {
    const shared = { value: 1 }
    const copy = mergeObjectsBase({ useClone: true })({ first: shared, second: shared })
    expect(copy.first).not.toBe(shared)
    expect(copy.first).toBe(copy.second)
  })

  test('the deprecated mapLimit and relevancyRange options are accepted and change nothing', () => {
    const root = buildTree()
    const copy = mergeObjectsBase({ useClone: true, mapLimit: 1, relevancyRange: 1 })(root)
    expect(copy.children[0].children[0].parent).toBe(copy.children[0])
    expect(copy.children[0].parent).toBe(copy)
  })
})

describe('options', () => {
  test('depthLimit stops merging at that many nested levels', () => {
    const source = { level1: { level2: { level3: 'deep' } } }
    expect(mergeObjectsBase({ useClone: true, depthLimit: 2 })(source)).toEqual({ level1: { level2: {} } })
    expect(mergeObjectsBase({ useClone: true })(source)).toEqual(source)
  })

  test('map starts every call with those references already resolved, without being added to', () => {
    const known = { name: 'known' }
    const stand = { name: 'stand-in' }
    const seeded = [{ source: known, object: stand, relevance: 0 }]
    const merge = mergeObjectsBase({ useClone: true, map: seeded })
    expect(merge({ item: known }).item).toBe(stand)
    expect(merge({ item: known }).item).toBe(stand)
    expect(seeded).toHaveLength(1)
  })
})

describe('merging onto existing objects', () => {
  test('later objects overwrite earlier ones, arrays merge by index, and falsy arguments are skipped', () => {
    const merge = mergeObjectsBase({ useClone: true })
    expect(merge({ a: 1, list: [1, 2] }, null, { b: 2, list: [3] })).toEqual({ a: 1, b: 2, list: [3, 2] })
  })

  test('the by-reference merge changes the first object and keeps source sub-objects by reference', () => {
    const target = { keep: 1, nested: { a: 1 } }
    const patch = { nested: { b: 2 }, added: { c: 3 } }
    const result = mergeObjectsBase()(target, patch)
    expect(result).toBe(target)
    expect(target.nested).toEqual({ a: 1, b: 2 })
    expect(target.added).toBe(patch.added)
  })
})
