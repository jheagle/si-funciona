/**
 * @jest-environment jsdom
 */

import mergeObjects from './mergeObjects'
import { circularObject } from 'js-build-tools/dist/testHelpers'

test('combine objects with circular references', () => {
  const anotherCircular = { name: 'root', parent: {}, body: {}, head: {}, children: [] }
  anotherCircular.children = [
    { name: 'body', parent: {}, children: [] },
    { name: 'head', parent: {}, children: [] }
  ]
  anotherCircular.body = anotherCircular.children[0]
  anotherCircular.head = anotherCircular.children[1]
  anotherCircular.body.parent = anotherCircular
  anotherCircular.head.parent = anotherCircular
  anotherCircular.body.children = [
    { name: 'body child one', parent: {}, children: [] }
  ]
  anotherCircular.body.children[0].parent = anotherCircular.body
  anotherCircular.head.children = []
  const newItem = mergeObjects(anotherCircular, circularObject)
  expect(newItem).toEqual(circularObject)
})

test('combining dom items', () => {
  const children = [
    {
      tagName: 'head',
      attributes: {},
      element: document.head,
      children: []
    },
    {
      tagName: 'body',
      attributes: {},
      element: document.body,
      children: []
    }
  ]
  const template = {
    tagName: 'div',
    attributes: {
      style: {}
    },
    element: document,
    eventListeners: {},
    parentItem: {},
    children: []
  }
  const newAttributes = {
    body: children[1],
    children: children,
    head: children[0],
    tagName: 'html'
  }
  const result = mergeObjects(template, newAttributes)
  const expectedResult = {
    tagName: 'html',
    attributes: { style: {} },
    element: document,
    eventListeners: {},
    parentItem: {},
    children: [],
    body: {
      tagName: 'body',
      attributes: {},
      element: document.body,
      children: []
    },
    head: {
      tagName: 'head',
      attributes: {},
      element: document.head,
      children: []
    }
  }
  expectedResult.children[0] = expectedResult.head
  expectedResult.children[1] = expectedResult.body
  expect(result).toEqual(expectedResult)
})

test('maintains first object when second matching object is empty', () => {
  const children = [
    {
      attributes: {},
      children: [],
      element: document.head,
      eventListeners: {},
      parentItem: {},
      tagName: 'head'
    },
    {
      attributes: {},
      children: [],
      element: document.body,
      eventListeners: {},
      parentItem: {},
      tagName: 'body'
    }
  ]
  const rootItem = {
    attributes: {},
    body: children[1],
    children: children,
    element: document,
    eventListeners: [],
    head: children[0],
    parentItem: {},
    tagName: 'html'
  }

  rootItem.body.parentItem = rootItem
  rootItem.head.parentItem = rootItem
  rootItem.children[0].parentItem = rootItem
  rootItem.children[1].parentItem = rootItem

  const baseItem = {
    attributes: { style: {} },
    children: [],
    element: {},
    eventListeners: {},
    parentItem: {},
    tagName: 'div'
  }

  const result = mergeObjects(baseItem, rootItem)
  expect(result.attributes).toEqual({ style: {} })
})

test('domItem test can merge even with different property order', () => {
  const baseItem = {
    tagName: 'div',
    attributes: {
      style: {}
    },
    element: {},
    eventListeners: {},
    parentItem: {},
    children: []
  }

  const children = [
    {
      tagName: 'head',
      attributes: {
        style: {}
      },
      element: document.head,
      eventListeners: {},
      parentItem: {},
      children: []
    },
    {
      tagName: 'body',
      attributes: {
        style: {}
      },
      element: document.body,
      eventListeners: {},
      parentItem: {},
      children: []
    }
  ]
  const domItem =
    {
      tagName: 'html',
      attributes: {
        style: {}
      },
      element: document,
      eventListeners: {},
      parentItem: {},
      children: children
    }
  domItem.children[0].parentItem = domItem
  domItem.children[1].parentItem = domItem
  domItem.head = domItem.children[0]
  domItem.body = domItem.children[1]

  const result = mergeObjects(baseItem, domItem)
  const expectedResult = baseItem
  expectedResult.tagName = 'html'
  expectedResult.element = document
  expectedResult.eventListeners = {}
  expectedResult.children = children
  expectedResult.children[0].parentItem = expectedResult
  expectedResult.children[1].parentItem = expectedResult
  expectedResult.body = children[1]
  expectedResult.head = children[0]
  expect(result).toEqual(expectedResult)
})
