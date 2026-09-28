# Sí, funciona

General usage utility functions - a broad collection of small, dependency-light helpers for everyday tasks: working
with arrays and objects, comparing and cloning values, functional helpers like `curry` and `pipe`, string case
conversion, and a couple of small task-sequencing primitives (`queueTimeout`, `BasicQueue`).

## The modules

Each module of the documentation is a folder of `src/helpers/`:

* `arrays`: build, merge, compare and de-duplicate arrays, and a lightweight `BasicQueue`.
* `descriptors`: describe an object's structure (not its values) and compare/clone by that structure.
* `functions`: `curry`, `pipe`, `delay`, a sequential task queue (`queueTimeout`/`queueManager`), and other
  function-level helpers.
* `numbers`: comparisons, ratios and random numbers.
* `objects`: clone, merge, compare and navigate objects by dot-notated path.
* `strings`: case conversion (`camelCase`, `kabobCase`, `snakeCase`, `titleCase`, ...) and path/string helpers.

## Example

```js
const { curry, cloneObject, dotGet, camelCase } = require('si-funciona')

const add = curry((a, b) => a + b)
add(1)(2) // 3

const original = { a: { b: 1 } }
const copy = cloneObject(original)
copy.a.b = 2 // original.a.b is still 1

dotGet(copy, 'a.b') // 2
camelCase('some-kabob-case') // 'someKabobCase'
```
