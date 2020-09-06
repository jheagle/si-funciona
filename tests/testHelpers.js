/**
 * Log out an object in a nicely formatted way.
 * @param {Object} object
 */
export const logObject = object => {
  console.log(require('util').inspect(object, false, null, true))
}

/**
 * Sample object with deep references.
 * @type {Object.<string, string|number|Object>}
 */
export const deepReferenceObject = {
  object1: {
    name: 'someName',
    object2: {
      age: 12,
      array1: [
        'someString',
        'anotherString'
      ]
    },
    array2: [
      89,
      32
    ]
  },
  title: 'Some Title',
  item: 45
}

/**
 * Sample LinkedList for testing circular references.
 * @type {Object.<string, string|Object>}
 */
export const linkedList = { name: 'one', prev: null, next: null }
linkedList.next = { name: 'two', prev: linkedList, next: null }
linkedList.next.next = { name: 'three', prev: linkedList.next, next: null }

/**
 * Sample of object containing multiple references.
 * @type {Object.<string, string|number|Object>}
 */
export const multiReferenceObject = {
  object1: {
    name: 'someName'
  },
  object2: {
    age: 12
  },
  array1: [
    'someString',
    'anotherString'
  ],
  array2: [
    89,
    32
  ],
  title: 'Some Title',
  item: 45
}

/**
 * Sample NodeTree for testing circular references and arrays.
 * @type {Object.<string, string|Object|Array>}
 */
export const nodeTree = { name: 'one', parent: null, children: [] }
nodeTree.children[0] = { name: 'child one', parent: nodeTree, children: [] }
nodeTree.children[1] = { name: 'child two', parent: nodeTree, children: [] }
nodeTree.children[0].children[0] = { name: 'grandchild one', parent: nodeTree.children[0], children: [] }
