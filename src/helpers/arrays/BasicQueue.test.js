import BasicQueue from './BasicQueue'

describe('BasicQueue', () => {
  test('created queue can enqueue and dequeue', () => {
    const sampleQueue = new BasicQueue()
    expect(sampleQueue.size()).toBe(0)
    sampleQueue.enqueue(1)
    sampleQueue.enqueue(2)
    sampleQueue.enqueue(3)
    expect(sampleQueue.size()).toBe(3)
    expect(sampleQueue.dequeue()).toBe(1)
    expect(sampleQueue.dequeue()).toBe(2)
    expect(sampleQueue.dequeue()).toBe(3)
    expect(sampleQueue.size()).toBe(0)
  })
})
