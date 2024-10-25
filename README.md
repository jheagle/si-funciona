# [Sí, funciona](https://www.npmjs.com/package/si-funciona)

## Funciones de utilidad para uso general. [General usage utility functions.]

## Modules

<dl>
<dt><a href="#module_arrayHelpers">arrayHelpers</a></dt>
<dd><p>Some simple utility functions for generating arrays or performing work on arrays.</p>
</dd>
<dt><a href="#module_objectDescriptors">objectDescriptors</a></dt>
<dd><p>Create a format to standardize every object into a specific template.</p>
</dd>
<dt><a href="#module_functionHelpers">functionHelpers</a></dt>
<dd><p>Manage how functions are called with these utilities.</p>
</dd>
<dt><a href="#module_numberHelpers">numberHelpers</a></dt>
<dd><p>Some number comparators and random number generators.</p>
</dd>
<dt><a href="#module_objectHelpers">objectHelpers</a></dt>
<dd><p>Simplify working with object by providing array-like parsing. Also, provides cloning and merging along with accessors that always have a return value for optimal nesting.</p>
</dd>
<dt><a href="#module_stringHelpers">stringHelpers</a></dt>
<dd><p>Manage how strings are manipulated with these utilities.</p>
</dd>
<dt><a href="#module_siFunciona">siFunciona</a></dt>
<dd><p>All the siFunciona system functions for stringing together functions and simplifying logic.</p>
</dd>
</dl>

<a name="module_arrayHelpers"></a>

## arrayHelpers
Some simple utility functions for generating arrays or performing work on arrays.

**Version**: 1.0.0  
**Author**: Joshua Heagle <joshuaheagle@gmail.com>  

* [arrayHelpers](#module_arrayHelpers)
    * [.BasicQueue](#module_arrayHelpers.BasicQueue)
        * [.dequeue()](#module_arrayHelpers.BasicQueue+dequeue) ⇒ <code>queuedItem</code> \| <code>\*</code>
        * [.empty()](#module_arrayHelpers.BasicQueue+empty) ⇒ <code>boolean</code>
        * [.enqueue(data)](#module_arrayHelpers.BasicQueue+enqueue) ⇒ <code>BasicQueue</code>
        * [.peek()](#module_arrayHelpers.BasicQueue+peek) ⇒ <code>queuedItem</code> \| <code>\*</code>
        * [.size()](#module_arrayHelpers.BasicQueue+size) ⇒ <code>number</code>
    * [.addUniqueToArray(item, array)](#module_arrayHelpers.addUniqueToArray) ⇒ <code>Array</code>
    * [.buildArray(item, length)](#module_arrayHelpers.buildArray) ⇒ <code>Array.&lt;\*&gt;</code>
    * [.buildArrayOfReferences(item, length)](#module_arrayHelpers.buildArrayOfReferences) ⇒ <code>Array.&lt;\*&gt;</code>
    * [.compareArrays(...arrays)](#module_arrayHelpers.compareArrays) ⇒ <code>Array.&lt;module:arrayHelpers~compareArrayResult&gt;</code>
    * [.mergeArrays(...arrays)](#module_arrayHelpers.mergeArrays) ⇒ <code>Array</code>
    * [.uniqueArray(array)](#module_arrayHelpers.uniqueArray) ⇒ <code>Array</code>

<a name="module_arrayHelpers.BasicQueue"></a>

### arrayHelpers.BasicQueue
Class BasicQueue is a functional example of a queue to be used with queueManager.

**Kind**: static class of [<code>arrayHelpers</code>](#module_arrayHelpers)  

* [.BasicQueue](#module_arrayHelpers.BasicQueue)
    * [.dequeue()](#module_arrayHelpers.BasicQueue+dequeue) ⇒ <code>queuedItem</code> \| <code>\*</code>
    * [.empty()](#module_arrayHelpers.BasicQueue+empty) ⇒ <code>boolean</code>
    * [.enqueue(data)](#module_arrayHelpers.BasicQueue+enqueue) ⇒ <code>BasicQueue</code>
    * [.peek()](#module_arrayHelpers.BasicQueue+peek) ⇒ <code>queuedItem</code> \| <code>\*</code>
    * [.size()](#module_arrayHelpers.BasicQueue+size) ⇒ <code>number</code>

<a name="module_arrayHelpers.BasicQueue+dequeue"></a>

#### basicQueue.dequeue() ⇒ <code>queuedItem</code> \| <code>\*</code>
Remove and return the next item in the queue

**Kind**: instance method of [<code>BasicQueue</code>](#module_arrayHelpers.BasicQueue)  
<a name="module_arrayHelpers.BasicQueue+empty"></a>

#### basicQueue.empty() ⇒ <code>boolean</code>
Check if the queue is empty

**Kind**: instance method of [<code>BasicQueue</code>](#module_arrayHelpers.BasicQueue)  
<a name="module_arrayHelpers.BasicQueue+enqueue"></a>

#### basicQueue.enqueue(data) ⇒ <code>BasicQueue</code>
Add an item to the end of the queue

**Kind**: instance method of [<code>BasicQueue</code>](#module_arrayHelpers.BasicQueue)  

| Param | Type |
| --- | --- |
| data | <code>queuedItem</code> \| <code>\*</code> | 

<a name="module_arrayHelpers.BasicQueue+peek"></a>

#### basicQueue.peek() ⇒ <code>queuedItem</code> \| <code>\*</code>
Retrieve the next item from the queue

**Kind**: instance method of [<code>BasicQueue</code>](#module_arrayHelpers.BasicQueue)  
<a name="module_arrayHelpers.BasicQueue+size"></a>

#### basicQueue.size() ⇒ <code>number</code>
Get the quantity of items in the queue

**Kind**: instance method of [<code>BasicQueue</code>](#module_arrayHelpers.BasicQueue)  
<a name="module_arrayHelpers.addUniqueToArray"></a>

### arrayHelpers.addUniqueToArray(item, array) ⇒ <code>Array</code>
Having an array and a potential new array element, check if the element is in the array, if not append to array.

**Kind**: static method of [<code>arrayHelpers</code>](#module_arrayHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>\*</code> | An potential array element, possibly a DomItem |
| array | <code>Array</code> | An array where an element may be appended. |

<a name="module_arrayHelpers.buildArray"></a>

### arrayHelpers.buildArray(item, length) ⇒ <code>Array.&lt;\*&gt;</code>
Leverage buildArrayBase to generate an array filled with a copy of the provided item.
The length defines how long the array should be.

**Kind**: static method of [<code>arrayHelpers</code>](#module_arrayHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>\*</code> | The item to be used for each array element |
| length | <code>number</code> | The desired length of the array |

<a name="module_arrayHelpers.buildArrayOfReferences"></a>

### arrayHelpers.buildArrayOfReferences(item, length) ⇒ <code>Array.&lt;\*&gt;</code>
Leverage buildArrayBase to generate an array filled with references to the provided item.
The length defines how long the array should be.

**Kind**: static method of [<code>arrayHelpers</code>](#module_arrayHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>\*</code> | The item to be used for each array element |
| length | <code>number</code> | The desired length of the array |

<a name="module_arrayHelpers.compareArrays"></a>

### arrayHelpers.compareArrays(...arrays) ⇒ <code>Array.&lt;module:arrayHelpers~compareArrayResult&gt;</code>
Compare two Arrays and return the Object where the value for each property is as follows:
-1 to indicate val1 is less than val2
0 to indicate both values are the equal
1 to indicate val1 is greater than val2
The returned Object uses the element values as the property names
This functions works by first creating a concatenated array of all unique values. Then for each unique values,
convert to a string and use it as a new property name. Array filter each array checking if it has the unique value.
Use the lengths of these filtered arrays to compare. So if the first array has the value and the second one doesn't
the first length will be one or more and the second will be zero, if the both have the value then both will be one
or more.

**Kind**: static method of [<code>arrayHelpers</code>](#module_arrayHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| ...arrays | <code>Array</code> | The arrays to compare |

**Example**  
```js
// example of input and resulting output
compareArrays(
  ['match1', 'firstMismatch1', 'match2', 'firstMismatch2', 'badMatch1'],
  ['match1', 'match2', 'secondMismatch1', 'badMatch1', 'badMatch1']
)
// unique array
['match1', 'firstMismatch1', 'match2', 'firstMismatch2', 'badMatch1', 'secondMismatch1']
// result object
[
  {
    value: 'match1',
    keys: [[0], [0]],
    result: [0, 0]
  },
  {
    value: 'firstMismatch1',
    keys: [[1], []],
    result: [1, -1]
  },
  {
    value: 'match2',
    keys: [[2], [1]],
    result: [0, 0]
  },
  {
    value: 'firstMismatch2',
    keys: [[3], []],
    result: [1, -1]
  },
  {
    value: 'badMatch1',
    keys: [[4], [3, 4]],
    result: [0, 0]
  },
  {
    value: 'secondMismatch1',
    keys: [[], [2]],
    result: [-1, 1]
  }
]
```
<a name="module_arrayHelpers.mergeArrays"></a>

### arrayHelpers.mergeArrays(...arrays) ⇒ <code>Array</code>
Take multiple arrays and then filter all these into one unique array.

**Kind**: static method of [<code>arrayHelpers</code>](#module_arrayHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| ...arrays | <code>Array</code> | Provide multiple arrays to create one unique array |

<a name="module_arrayHelpers.uniqueArray"></a>

### arrayHelpers.uniqueArray(array) ⇒ <code>Array</code>
Remove duplicate values from an array. uniqueArray

**Kind**: static method of [<code>arrayHelpers</code>](#module_arrayHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> | The array to make unique |

<a name="module_objectDescriptors"></a>

## objectDescriptors
Create a format to standardize every object into a specific template.

**Version**: 1.0.0  
**Author**: Joshua Heagle <joshuaheagle@gmail.com>  

* [objectDescriptors](#module_objectDescriptors)
    * [.descriptorSample](#module_objectDescriptors.descriptorSample) : <code>module:objectDescriptors~descriptor</code>
    * [.descriptorDetailSample](#module_objectDescriptors.descriptorDetailSample) : <code>module:objectDescriptors~descriptorDetail</code>
    * [.descriptorMapSample](#module_objectDescriptors.descriptorMapSample) : <code>module:objectDescriptors~descriptorMap</code>
    * [.mappedDescriptorMap](#module_objectDescriptors.mappedDescriptorMap) : <code>module:objectDescriptors~descriptorMap</code>
    * [.assignDescriptor(originalMap, ...descriptors)](#module_objectDescriptors.assignDescriptor) ⇒ <code>module:objectDescriptors~descriptor</code>
    * [.assignDescriptorDetail(originalDetail, ...details)](#module_objectDescriptors.assignDescriptorDetail) ⇒ <code>module:objectDescriptors~descriptorDetail</code>
    * [.checkClearValues(descriptor, [keepValues])](#module_objectDescriptors.checkClearValues) ⇒ <code>module:objectDescriptors~descriptor</code>
    * [.checkDescriptorComplete(descriptor)](#module_objectDescriptors.checkDescriptorComplete) ⇒ <code>module:objectDescriptors~descriptor</code>
    * [.cloneDescriptor(originalMap)](#module_objectDescriptors.cloneDescriptor) ⇒ <code>module:objectDescriptors~descriptor</code>
    * [.cloneDescriptorDetail(originalDetail)](#module_objectDescriptors.cloneDescriptorDetail) ⇒ <code>module:objectDescriptors~descriptorDetail</code>
    * [.compareDescriptor(descriptor1, descriptor2)](#module_objectDescriptors.compareDescriptor) ⇒ <code>boolean</code>
    * [.describeObject(object)](#module_objectDescriptors.describeObject) ⇒ <code>module:objectDescriptors~descriptor</code>
    * [.describeObjectDetail(value, [key], [index])](#module_objectDescriptors.describeObjectDetail) ⇒ <code>module:objectDescriptors~descriptorDetail</code>
    * [.describeObjectMap(object, [options])](#module_objectDescriptors.describeObjectMap) ⇒ <code>module:objectDescriptors~descriptorMap</code>
    * [.nextReference(descriptor, currentReference)](#module_objectDescriptors.nextReference) ⇒ <code>number</code> \| <code>undefined</code>
    * [.sameDescriptor(descriptor1, descriptor2)](#module_objectDescriptors.sameDescriptor) ⇒ <code>boolean</code>

<a name="module_objectDescriptors.descriptorSample"></a>

### objectDescriptors.descriptorSample : <code>module:objectDescriptors~descriptor</code>
**Kind**: static constant of [<code>objectDescriptors</code>](#module_objectDescriptors)  
<a name="module_objectDescriptors.descriptorDetailSample"></a>

### objectDescriptors.descriptorDetailSample : <code>module:objectDescriptors~descriptorDetail</code>
**Kind**: static constant of [<code>objectDescriptors</code>](#module_objectDescriptors)  
<a name="module_objectDescriptors.descriptorMapSample"></a>

### objectDescriptors.descriptorMapSample : <code>module:objectDescriptors~descriptorMap</code>
**Kind**: static constant of [<code>objectDescriptors</code>](#module_objectDescriptors)  
<a name="module_objectDescriptors.mappedDescriptorMap"></a>

### objectDescriptors.mappedDescriptorMap : <code>module:objectDescriptors~descriptorMap</code>
**Kind**: static constant of [<code>objectDescriptors</code>](#module_objectDescriptors)  
<a name="module_objectDescriptors.assignDescriptor"></a>

### objectDescriptors.assignDescriptor(originalMap, ...descriptors) ⇒ <code>module:objectDescriptors~descriptor</code>
Apply one or more descriptors to an existing descriptor so that they represent a merged version of the descriptors.

**Kind**: static method of [<code>objectDescriptors</code>](#module_objectDescriptors)  

| Param | Type |
| --- | --- |
| originalMap | <code>module:objectDescriptors~descriptor</code> | 
| ...descriptors | <code>module:objectDescriptors~descriptor</code> | 

<a name="module_objectDescriptors.assignDescriptorDetail"></a>

### objectDescriptors.assignDescriptorDetail(originalDetail, ...details) ⇒ <code>module:objectDescriptors~descriptorDetail</code>
Assign properties from other details onto an existing detail.

**Kind**: static method of [<code>objectDescriptors</code>](#module_objectDescriptors)  

| Param | Type |
| --- | --- |
| originalDetail | <code>module:objectDescriptors~descriptorDetail</code> | 
| ...details | <code>module:objectDescriptors~descriptorDetail</code> | 

<a name="module_objectDescriptors.checkClearValues"></a>

### objectDescriptors.checkClearValues(descriptor, [keepValues]) ⇒ <code>module:objectDescriptors~descriptor</code>
Check if we should clear the values on this descriptor

**Kind**: static method of [<code>objectDescriptors</code>](#module_objectDescriptors)  

| Param | Type | Default |
| --- | --- | --- |
| descriptor | <code>module:objectDescriptors~descriptor</code> |  | 
| [keepValues] | <code>boolean</code> | <code>false</code> | 

<a name="module_objectDescriptors.checkDescriptorComplete"></a>

### objectDescriptors.checkDescriptorComplete(descriptor) ⇒ <code>module:objectDescriptors~descriptor</code>
Check if the descriptors references have all been built and set complete to true if they have.

**Kind**: static method of [<code>objectDescriptors</code>](#module_objectDescriptors)  

| Param | Type |
| --- | --- |
| descriptor | <code>module:objectDescriptors~descriptor</code> | 

<a name="module_objectDescriptors.cloneDescriptor"></a>

### objectDescriptors.cloneDescriptor(originalMap) ⇒ <code>module:objectDescriptors~descriptor</code>
Make a copy of an object descriptor so that the original will not be mutated.

**Kind**: static method of [<code>objectDescriptors</code>](#module_objectDescriptors)  

| Param | Type |
| --- | --- |
| originalMap | <code>module:objectDescriptors~descriptor</code> | 

<a name="module_objectDescriptors.cloneDescriptorDetail"></a>

### objectDescriptors.cloneDescriptorDetail(originalDetail) ⇒ <code>module:objectDescriptors~descriptorDetail</code>
Get a new copy of an existing Descriptor Detail

**Kind**: static method of [<code>objectDescriptors</code>](#module_objectDescriptors)  

| Param | Type |
| --- | --- |
| originalDetail | <code>module:objectDescriptors~descriptorDetail</code> | 

<a name="module_objectDescriptors.compareDescriptor"></a>

### objectDescriptors.compareDescriptor(descriptor1, descriptor2) ⇒ <code>boolean</code>
Check if two descriptors are the same or similar in that they have similar keys and the associated types are the same.

**Kind**: static method of [<code>objectDescriptors</code>](#module_objectDescriptors)  

| Param | Type |
| --- | --- |
| descriptor1 | <code>module:objectDescriptors~descriptor</code> | 
| descriptor2 | <code>module:objectDescriptors~descriptor</code> | 

<a name="module_objectDescriptors.describeObject"></a>

### objectDescriptors.describeObject(object) ⇒ <code>module:objectDescriptors~descriptor</code>
Trace an object and return the descriptor which defines the object's structure and attributes.

**Kind**: static method of [<code>objectDescriptors</code>](#module_objectDescriptors)  

| Param | Type |
| --- | --- |
| object | <code>Object</code> | 

<a name="module_objectDescriptors.describeObjectDetail"></a>

### objectDescriptors.describeObjectDetail(value, [key], [index]) ⇒ <code>module:objectDescriptors~descriptorDetail</code>
Trace an object's attribute and provide details about it.

**Kind**: static method of [<code>objectDescriptors</code>](#module_objectDescriptors)  

| Param | Type | Default |
| --- | --- | --- |
| value | <code>\*</code> |  | 
| [key] | <code>string</code> \| <code>number</code> | <code>0</code> | 
| [index] | <code>number</code> | <code>0</code> | 

<a name="module_objectDescriptors.describeObjectMap"></a>

### objectDescriptors.describeObjectMap(object, [options]) ⇒ <code>module:objectDescriptors~descriptorMap</code>
Trace out the entire object including nested objects.

**Kind**: static method of [<code>objectDescriptors</code>](#module_objectDescriptors)  

| Param | Type | Default |
| --- | --- | --- |
| object | <code>Object</code> \| <code>Array</code> |  | 
| [options] | <code>Object</code> | <code>{}</code> | 
| [options.mapLimit] | <code>number</code> | <code>1000000000</code> | 
| [options.depthLimit] | <code>number</code> | <code>-1</code> | 
| [options.keepValues] | <code>boolean</code> | <code>false</code> | 

<a name="module_objectDescriptors.nextReference"></a>

### objectDescriptors.nextReference(descriptor, currentReference) ⇒ <code>number</code> \| <code>undefined</code>
Find the index of the next module:objectDescriptors.descriptorDetail to build a resource for.

**Kind**: static method of [<code>objectDescriptors</code>](#module_objectDescriptors)  

| Param | Type |
| --- | --- |
| descriptor | <code>module:objectDescriptors~descriptor</code> | 
| currentReference | <code>number</code> | 

<a name="module_objectDescriptors.sameDescriptor"></a>

### objectDescriptors.sameDescriptor(descriptor1, descriptor2) ⇒ <code>boolean</code>
Check if the two descriptors are the same.

**Kind**: static method of [<code>objectDescriptors</code>](#module_objectDescriptors)  

| Param | Type |
| --- | --- |
| descriptor1 | <code>module:objectDescriptors~descriptor</code> | 
| descriptor2 | <code>module:objectDescriptors~descriptor</code> | 

<a name="module_functionHelpers"></a>

## functionHelpers
Manage how functions are called with these utilities.

**Version**: 1.0.0  
**Author**: Joshua Heagle <joshuaheagle@gmail.com>  

* [functionHelpers](#module_functionHelpers)
    * [.callWithParams(fn, params, [minimum])](#module_functionHelpers.callWithParams) ⇒ <code>\*</code>
    * [.curry(fn)](#module_functionHelpers.curry) ⇒ <code>function</code> \| <code>\*</code>
    * [.delay(time)](#module_functionHelpers.delay) ⇒ <code>module:functionHelpers~delayHandler</code>
    * [.makeBasicQueue(initialQueue)](#module_functionHelpers.makeBasicQueue) ⇒ <code>IsQueue</code>
    * [.onBodyLoad(callback, [reset])](#module_functionHelpers.onBodyLoad) ⇒ <code>Array.&lt;function()&gt;</code>
    * [.pipe(...fns)](#module_functionHelpers.pipe) ⇒ <code>\*</code>
    * [.preloadParams(fn, params, [unassignedParam])](#module_functionHelpers.preloadParams) ⇒ <code>module:functionHelpers~callWithMissing</code>
    * [.queueManager([queue])](#module_functionHelpers.queueManager) ⇒ <code>module:functionHelpers~queueManagerHandle</code>
        * [~makeQueuedRunnable(resolve, reject, fn, ...args)](#module_functionHelpers.queueManager..makeQueuedRunnable) ⇒ <code>queuedRunnable</code>
        * [~postRun(result)](#module_functionHelpers.queueManager..postRun) ⇒ <code>\*</code>
        * [~runNextItem()](#module_functionHelpers.queueManager..runNextItem) ⇒ <code>IteratorYieldResult</code> \| <code>null</code>
        * [~pushAnother(fn, ...args)](#module_functionHelpers.queueManager..pushAnother) ⇒
    * [.queueTimeout([queueManagerHandle])](#module_functionHelpers.queueTimeout) ⇒ <code>module:functionHelpers~queueTimeoutHandle</code>
    * [.relevancyFilter(map, [options])](#module_functionHelpers.relevancyFilter) ⇒ <code>relevanceMap</code>
    * [.trace(label, useClone)](#module_functionHelpers.trace) ⇒ <code>function</code>

<a name="module_functionHelpers.callWithParams"></a>

### functionHelpers.callWithParams(fn, params, [minimum]) ⇒ <code>\*</code>
Given a function, call with the correct number of parameters from an array of possible parameters.

**Kind**: static method of [<code>functionHelpers</code>](#module_functionHelpers)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| fn | <code>function</code> |  | The function to be called |
| params | <code>Array</code> |  | Array of possible function parameters |
| [minimum] | <code>number</code> | <code>2</code> | Minimum number of parameters to use in the function |

<a name="module_functionHelpers.curry"></a>

### functionHelpers.curry(fn) ⇒ <code>function</code> \| <code>\*</code>
Return a curried version of the passed function.
The returned function expects the same number of arguments minus the ones provided.
fn is the name of the function being curried.

**Kind**: static method of [<code>functionHelpers</code>](#module_functionHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | Receives a function to be curried |

<a name="module_functionHelpers.delay"></a>

### functionHelpers.delay(time) ⇒ <code>module:functionHelpers~delayHandler</code>
Provide a timeout which returns a promise.

**Kind**: static method of [<code>functionHelpers</code>](#module_functionHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| time | <code>number</code> | Delay in milliseconds |

<a name="module_functionHelpers.makeBasicQueue"></a>

### functionHelpers.makeBasicQueue(initialQueue) ⇒ <code>IsQueue</code>
Create an instance of a basic queue.

**Kind**: static method of [<code>functionHelpers</code>](#module_functionHelpers)  

| Param | Type |
| --- | --- |
| initialQueue | <code>Array</code> | 

<a name="module_functionHelpers.onBodyLoad"></a>

### functionHelpers.onBodyLoad(callback, [reset]) ⇒ <code>Array.&lt;function()&gt;</code>
Prepare functions to be called once the body is available.

**Kind**: static method of [<code>functionHelpers</code>](#module_functionHelpers)  

| Param | Type | Default |
| --- | --- | --- |
| callback | <code>function</code> |  | 
| [reset] | <code>boolean</code> | <code>false</code> | 

<a name="module_functionHelpers.pipe"></a>

### functionHelpers.pipe(...fns) ⇒ <code>\*</code>
Take one or more function with a single parameter and return value.
Pass a parameter and the value will be transformed by each function then returned.

**Kind**: static method of [<code>functionHelpers</code>](#module_functionHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| ...fns | <code>function</code> | Takes a series of functions having the same parameter |

<a name="module_functionHelpers.preloadParams"></a>

### functionHelpers.preloadParams(fn, params, [unassignedParam]) ⇒ <code>module:functionHelpers~callWithMissing</code>
Provide an array of parameters to be used with a function, allow the function to be called later
with the missing parameter.

**Kind**: static method of [<code>functionHelpers</code>](#module_functionHelpers)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| fn | <code>function</code> |  | The function to be called |
| params | <code>Array</code> |  | The parameters to preload |
| [unassignedParam] | <code>number</code> | <code>0</code> | Position of missing parameter (zero indexed) |

<a name="module_functionHelpers.queueManager"></a>

### functionHelpers.queueManager([queue]) ⇒ <code>module:functionHelpers~queueManagerHandle</code>
Manage functions to run sequentially.

**Kind**: static method of [<code>functionHelpers</code>](#module_functionHelpers)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [queue] | <code>IsQueue</code> | <code>[]</code> | The iterable that can be used to store queued functions |


* [.queueManager([queue])](#module_functionHelpers.queueManager) ⇒ <code>module:functionHelpers~queueManagerHandle</code>
    * [~makeQueuedRunnable(resolve, reject, fn, ...args)](#module_functionHelpers.queueManager..makeQueuedRunnable) ⇒ <code>queuedRunnable</code>
    * [~postRun(result)](#module_functionHelpers.queueManager..postRun) ⇒ <code>\*</code>
    * [~runNextItem()](#module_functionHelpers.queueManager..runNextItem) ⇒ <code>IteratorYieldResult</code> \| <code>null</code>
    * [~pushAnother(fn, ...args)](#module_functionHelpers.queueManager..pushAnother) ⇒

<a name="module_functionHelpers.queueManager..makeQueuedRunnable"></a>

#### queueManager~makeQueuedRunnable(resolve, reject, fn, ...args) ⇒ <code>queuedRunnable</code>
Convert a function to a queueable object.

**Kind**: inner method of [<code>queueManager</code>](#module_functionHelpers.queueManager)  

| Param | Type |
| --- | --- |
| resolve | <code>Promise.resolve</code> | 
| reject | <code>Promise.reject</code> | 
| fn | <code>function</code> | 
| ...args | <code>\*</code> | 

<a name="module_functionHelpers.queueManager..postRun"></a>

#### queueManager~postRun(result) ⇒ <code>\*</code>
After an item is run, THEN run this function to reset isRunning

**Kind**: inner method of [<code>queueManager</code>](#module_functionHelpers.queueManager)  

| Param | Type |
| --- | --- |
| result | <code>\*</code> | 

<a name="module_functionHelpers.queueManager..runNextItem"></a>

#### queueManager~runNextItem() ⇒ <code>IteratorYieldResult</code> \| <code>null</code>
When ready, runs the next queued runnable generator.

**Kind**: inner method of [<code>queueManager</code>](#module_functionHelpers.queueManager)  
<a name="module_functionHelpers.queueManager..pushAnother"></a>

#### queueManager~pushAnother(fn, ...args) ⇒
Add a function into the queue to be run when ready.

**Kind**: inner method of [<code>queueManager</code>](#module_functionHelpers.queueManager)  
**Returns**: Promise  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | The function to run when ready |
| ...args | <code>\*</code> | Optional arguments to apply when the function is ready to be run |

<a name="module_functionHelpers.queueTimeout"></a>

### functionHelpers.queueTimeout([queueManagerHandle]) ⇒ <code>module:functionHelpers~queueTimeoutHandle</code>
Manage functions to run sequentially with delays.

**Kind**: static method of [<code>functionHelpers</code>](#module_functionHelpers)  

| Param | Type | Default |
| --- | --- | --- |
| [queueManagerHandle] | <code>module:functionHelpers~queueManagerHandle</code> | <code></code> | 

<a name="module_functionHelpers.relevancyFilter"></a>

### functionHelpers.relevancyFilter(map, [options]) ⇒ <code>relevanceMap</code>
Remove elements out of relevance range and update the max relevance.

**Kind**: static method of [<code>functionHelpers</code>](#module_functionHelpers)  

| Param | Type | Default |
| --- | --- | --- |
| map | <code>relevanceMap</code> |  | 
| [options] | <code>Object</code> | <code>{}</code> | 
| [options.mapLimit] | <code>int</code> | <code>1000</code> | 
| [options.relevancyRange] | <code>int</code> | <code>100</code> | 

<a name="module_functionHelpers.trace"></a>

### functionHelpers.trace(label, useClone) ⇒ <code>function</code>
Output the value with label to the console and return the value to not interrupt the code.

**Kind**: static method of [<code>functionHelpers</code>](#module_functionHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>string</code> | Pass an identifying label of the value being output. |
| useClone |  | Determines if the logged data should be a clone of the original to preserve state. |

<a name="module_numberHelpers"></a>

## numberHelpers
Some number comparators and random number generators.

**Version**: 1.0.0  
**Author**: Joshua Heagle <joshuaheagle@gmail.com>  

* [numberHelpers](#module_numberHelpers)
    * [.absoluteMax(num1, num2)](#module_numberHelpers.absoluteMax) ⇒ <code>number</code>
    * [.absoluteMin(num1, num2)](#module_numberHelpers.absoluteMin) ⇒ <code>number</code>
    * [.compare(val1, val2)](#module_numberHelpers.compare) ⇒ <code>number</code>
    * [.randomInteger(range, [offset], [interval])](#module_numberHelpers.randomInteger) ⇒ <code>number</code>
    * [.randomNumber(range, [offset], [interval])](#module_numberHelpers.randomNumber) ⇒ <code>number</code>

<a name="module_numberHelpers.absoluteMax"></a>

### numberHelpers.absoluteMax(num1, num2) ⇒ <code>number</code>
Helper for returning the absolute max value

**Kind**: static method of [<code>numberHelpers</code>](#module_numberHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| num1 | <code>number</code> | A number to compare |
| num2 | <code>number</code> | Another number to be compared against |

<a name="module_numberHelpers.absoluteMin"></a>

### numberHelpers.absoluteMin(num1, num2) ⇒ <code>number</code>
Helper for returning the absolute min value

**Kind**: static method of [<code>numberHelpers</code>](#module_numberHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| num1 | <code>number</code> | A number to compare |
| num2 | <code>number</code> | Another number to be compared against |

<a name="module_numberHelpers.compare"></a>

### numberHelpers.compare(val1, val2) ⇒ <code>number</code>
Compare two numbers and return:
-1 to indicate val1 is less than val2
0 to indicate both values are the equal
1 to indicate val1 is greater than val2

**Kind**: static method of [<code>numberHelpers</code>](#module_numberHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| val1 | <code>number</code> | The first number to compare |
| val2 | <code>number</code> | The second number to compare |

<a name="module_numberHelpers.randomInteger"></a>

### numberHelpers.randomInteger(range, [offset], [interval]) ⇒ <code>number</code>
Create a single random integer within provide range. And with optional offset,
The distance between the result numbers can be adjusted with interval.

**Kind**: static method of [<code>numberHelpers</code>](#module_numberHelpers)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| range | <code>number</code> |  | Choose the breadth of the random number (0-100 would be 100 for range) |
| [offset] | <code>number</code> | <code>0</code> | Choose the starting number (1-10 would be 1 for offset, 9 for range) |
| [interval] | <code>number</code> | <code>1</code> | Choose the distance between numbers (5, 10, 15 would be 5 for interval, 1 for offset, 2 for range) |

<a name="module_numberHelpers.randomNumber"></a>

### numberHelpers.randomNumber(range, [offset], [interval]) ⇒ <code>number</code>
Create a single random number within provided range. And with optional offset,
The distance between the result numbers can be adjusted with interval.

**Kind**: static method of [<code>numberHelpers</code>](#module_numberHelpers)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| range | <code>number</code> |  | Choose the breadth of the random number (0-100 would be 100 for range) |
| [offset] | <code>number</code> | <code>0</code> | Choose the starting number (1-10 would be 1 for offset, 9 for range) |
| [interval] | <code>number</code> | <code>1</code> | Choose the distance between numbers (~5, ~10, ~15 would be 5 for interval, 1 for offset, 2 for range) |

<a name="module_objectHelpers"></a>

## objectHelpers
Simplify working with object by providing array-like parsing. Also, provides cloning and merging along with accessors that always have a return value for optimal nesting.

**Version**: 1.0.0  
**Author**: Joshua Heagle <joshuaheagle@gmail.com>  

* [objectHelpers](#module_objectHelpers)
    * _static_
        * [.mergeObjects](#module_objectHelpers.mergeObjects) ⇒ <code>\*</code>
        * [.mergeObjectsMutable](#module_objectHelpers.mergeObjectsMutable) ⇒ <code>\*</code>
        * [.cloneObject(object, [options])](#module_objectHelpers.cloneObject) ⇒ <code>Object</code>
        * [.dotGet(arrayObject, dotNotation, [defaultValue])](#module_objectHelpers.dotGet) ⇒ <code>\*</code>
        * [.dotNotate(arrayObject, [retainObjects])](#module_objectHelpers.dotNotate) ⇒ <code>DotNotatedObject</code>
        * [.dotSet(arrayObject, dotNotation, value)](#module_objectHelpers.dotSet) ⇒ <code>Object</code>
        * [.dotUnset(arrayObject, dotNotation)](#module_objectHelpers.dotUnset) ⇒ <code>Object</code>
        * [.emptyObject(item)](#module_objectHelpers.emptyObject) ⇒ <code>boolean</code>
        * [.filterObject(obj, fn, [thisArg])](#module_objectHelpers.filterObject) ⇒ <code>Object</code> \| <code>Array</code>
        * [.isCloneable(value)](#module_objectHelpers.isCloneable) ⇒ <code>boolean</code>
        * [.isInstanceObject(object)](#module_objectHelpers.isInstanceObject) ⇒ <code>boolean</code>
        * [.isObject(object)](#module_objectHelpers.isObject) ⇒ <code>boolean</code>
        * [.mapObject(obj, fn, [thisArg])](#module_objectHelpers.mapObject) ⇒ <code>Object</code> \| <code>Array</code>
        * [.mergeObjectsBase([options])](#module_objectHelpers.mergeObjectsBase) ⇒ <code>module:objectHelpers~mergeObjectsCallback</code> \| <code>mergeObjectsCallback</code>
        * [.objectKeys(object, [includeInherited])](#module_objectHelpers.objectKeys) ⇒ <code>Array.&lt;(string\|number)&gt;</code>
        * [.objectValues(object, [includeInherited])](#module_objectHelpers.objectValues) ⇒ <code>Array</code>
        * [.reduceObject(obj, fn, [initialValue])](#module_objectHelpers.reduceObject) ⇒ <code>\*</code>
        * [.setAndReturnValue(item, key, value)](#module_objectHelpers.setAndReturnValue) ⇒ <code>\*</code>
        * [.setValue(key, value, item)](#module_objectHelpers.setValue) ⇒ <code>Object</code> \| <code>Array</code>
    * _inner_
        * [~handleRetainObjects([retainObjects])](#module_objectHelpers..handleRetainObjects) ⇒ <code>function</code>
        * [~performDotNotate(arrayObject, didRetain, [prepend], [results])](#module_objectHelpers..performDotNotate) ⇒ <code>DotNotatedObject</code>

<a name="module_objectHelpers.mergeObjects"></a>

### objectHelpers.mergeObjects ⇒ <code>\*</code>
Uses mergeObjectsBase deep merge objects and arrays, merge by value.

**Kind**: static constant of [<code>objectHelpers</code>](#module_objectHelpers)  
**See**: [module:objectHelpers~mergeObjectsCallback](module:objectHelpers~mergeObjectsCallback)  

| Param | Type | Description |
| --- | --- | --- |
| ...objects | <code>Object</code> | Provide a list of objects which will be merged starting from the end up into the first |

<a name="module_objectHelpers.mergeObjectsMutable"></a>

### objectHelpers.mergeObjectsMutable ⇒ <code>\*</code>
Uses mergeObjectsBase deep merge objects and arrays, merge by reference.

**Kind**: static constant of [<code>objectHelpers</code>](#module_objectHelpers)  
**See**: [module:objectHelpers~mergeObjectsCallback](module:objectHelpers~mergeObjectsCallback)  

| Param | Type | Description |
| --- | --- | --- |
| ...objects | <code>Object</code> | Provide a list of objects which will be merged starting from the end up into the first |

<a name="module_objectHelpers.cloneObject"></a>

### objectHelpers.cloneObject(object, [options]) ⇒ <code>Object</code>
Clone objects for manipulation without data corruption, returns a copy of the provided object.
NOTE: Use the mapLimit and relevancyRange to resolve "too much recursion" when the object is large and is known to
have circular references. A high mapLimit may lead to heavy memory usage and slow performance.

**Kind**: static method of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| object | <code>Object</code> |  | The original object that is being cloned |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.mapLimit] | <code>number</code> | <code>100</code> | Size of temporary reference array used in memory before assessing relevancy. |
| [options.depthLimit] | <code>number</code> | <code>-1</code> | Control how many nested levels deep will be used, -1 = no limit, >-1 = nth level limited. |
| [options.relevancyRange] | <code>number</code> | <code>1000</code> | Total reference map length subtract this range, any relevancy less than that amount at time of evaluation will be removed. |

<a name="module_objectHelpers.dotGet"></a>

### objectHelpers.dotGet(arrayObject, dotNotation, [defaultValue]) ⇒ <code>\*</code>
Get a nested property value from an object.

**Kind**: static method of [<code>objectHelpers</code>](#module_objectHelpers)  
**Returns**: <code>\*</code> - The value of the property  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| arrayObject | <code>Object</code> |  | The array or object to get the property from |
| dotNotation | <code>string</code> |  | The path to the property |
| [defaultValue] | <code>string</code> \| <code>null</code> | <code>null</code> | The default value to return if the property is not found |

<a name="module_objectHelpers.dotNotate"></a>

### objectHelpers.dotNotate(arrayObject, [retainObjects]) ⇒ <code>DotNotatedObject</code>
Convert an array or object to a single dimensional associative array with dot notation.

**Kind**: static method of [<code>objectHelpers</code>](#module_objectHelpers)  
**Returns**: <code>DotNotatedObject</code> - The dot-notated object  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| arrayObject | <code>Object</code> |  | The array or object to dot-notate |
| [retainObjects] | <code>Array.&lt;DotNotationString&gt;</code> | <code>[]</code> | An array of keys to retain as objects |

<a name="module_objectHelpers.dotSet"></a>

### objectHelpers.dotSet(arrayObject, dotNotation, value) ⇒ <code>Object</code>
Set a nested property value an object.

**Kind**: static method of [<code>objectHelpers</code>](#module_objectHelpers)  
**Returns**: <code>Object</code> - The modified object  

| Param | Type | Description |
| --- | --- | --- |
| arrayObject | <code>Object</code> | The array or object to set the property on |
| dotNotation | <code>string</code> | The path for the property |
| value | <code>\*</code> | The default value to return if the property is not found |

<a name="module_objectHelpers.dotUnset"></a>

### objectHelpers.dotUnset(arrayObject, dotNotation) ⇒ <code>Object</code>
Unset a nested property value an object.

**Kind**: static method of [<code>objectHelpers</code>](#module_objectHelpers)  
**Returns**: <code>Object</code> - The modified object  

| Param | Type | Description |
| --- | --- | --- |
| arrayObject | <code>Object</code> | The array or object to set the property on |
| dotNotation | <code>string</code> | The path for the property |

<a name="module_objectHelpers.emptyObject"></a>

### objectHelpers.emptyObject(item) ⇒ <code>boolean</code>
Helper function for testing if the item is an Object or Array that does not have any properties

**Kind**: static method of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>Object</code> \| <code>Array</code> | Object or Array to test |

<a name="module_objectHelpers.filterObject"></a>

### objectHelpers.filterObject(obj, fn, [thisArg]) ⇒ <code>Object</code> \| <code>Array</code>
This function is intended to replicate behaviour of the Array.filter() function but for Objects.
If an array is passed in instead then it will perform standard filter(). It is recommended to
always use the standard filter() function when it is known that the object is actually an array.

**Kind**: static method of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> \| <code>Array</code> | The Object (or Array) to be filtered |
| fn | <code>module:objectHelpers~filterCallback</code> \| <code>function</code> | The function to be processed for each filtered property |
| [thisArg] | <code>Object</code> \| <code>Array</code> | Optional. Value to use as this when executing callback. |

<a name="module_objectHelpers.isCloneable"></a>

### objectHelpers.isCloneable(value) ⇒ <code>boolean</code>
Determine if the value is a reference instance

**Kind**: static method of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type |
| --- | --- |
| value | <code>Array</code> \| <code>Object</code> \| <code>\*</code> | 

<a name="module_objectHelpers.isInstanceObject"></a>

### objectHelpers.isInstanceObject(object) ⇒ <code>boolean</code>
Check if the current object has inherited properties.

**Kind**: static method of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type |
| --- | --- |
| object | <code>Object</code> \| <code>Array</code> | 

<a name="module_objectHelpers.isObject"></a>

### objectHelpers.isObject(object) ⇒ <code>boolean</code>
Check if the provided thing is an object / array.

**Kind**: static method of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type |
| --- | --- |
| object | <code>\*</code> | 

<a name="module_objectHelpers.mapObject"></a>

### objectHelpers.mapObject(obj, fn, [thisArg]) ⇒ <code>Object</code> \| <code>Array</code>
This function is intended to replicate behaviour of the Array.map() function but for Objects.
If an array is passed in instead then it will perform standard map(). It is recommended to
always use the standard map() function when it is known that the object is actually an array.

**Kind**: static method of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> \| <code>Array</code> | The Object (or Array) to be mapped |
| fn | <code>module:objectHelpers~mapCallback</code> \| <code>function</code> | The function to be processed for each mapped property |
| [thisArg] | <code>Object</code> \| <code>Array</code> | Optional. Value to use as this when executing callback. |

<a name="module_objectHelpers.mergeObjectsBase"></a>

### objectHelpers.mergeObjectsBase([options]) ⇒ <code>module:objectHelpers~mergeObjectsCallback</code> \| <code>mergeObjectsCallback</code>
Perform a deep merge of objects. This will return a function that will combine all objects and sub-objects.
Objects having the same attributes will overwrite from last object to first.
NOTE: Use the mapLimit and relevancyRange to resolve "too much recursion" when the object is large and is known to
have circular references. A high mapLimit may lead to heavy memory usage and slow performance.

**Kind**: static method of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.mapLimit] | <code>number</code> | <code>100</code> | Size of temporary reference array used in memory before assessing relevancy. |
| [options.depthLimit] | <code>number</code> | <code>-1</code> | Control how many nested levels deep will be used, -1 = no limit, >-1 = nth level limited. |
| [options.relevancyRange] | <code>number</code> | <code>1000</code> | Total reference map length subtract this range, any relevancy less than that amount at time of evaluation will be removed. |
| [options.map] | <code>Iterable</code> \| <code>array</code> | <code>[]</code> | A predetermined list of references gathered (to be passed to itself during recursion). |
| [options.useClone] | <code>boolean</code> | <code>false</code> |  |

<a name="module_objectHelpers.objectKeys"></a>

### objectHelpers.objectKeys(object, [includeInherited]) ⇒ <code>Array.&lt;(string\|number)&gt;</code>
Get an array of keys from any object or array. Will return empty array when invalid or there are no keys.
Optional flag will include the inherited keys from prototype chain when set.

**Kind**: static method of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type | Default |
| --- | --- | --- |
| object | <code>Object</code> \| <code>Array</code> |  | 
| [includeInherited] | <code>boolean</code> | <code>false</code> | 

<a name="module_objectHelpers.objectValues"></a>

### objectHelpers.objectValues(object, [includeInherited]) ⇒ <code>Array</code>
Get an array of values from any object or array. Will return empty array when invalid or there are no values.
Optional flag will include the inherited values from prototype chain when set.

**Kind**: static method of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type | Default |
| --- | --- | --- |
| object | <code>Object</code> \| <code>Array</code> |  | 
| [includeInherited] | <code>boolean</code> | <code>false</code> | 

<a name="module_objectHelpers.reduceObject"></a>

### objectHelpers.reduceObject(obj, fn, [initialValue]) ⇒ <code>\*</code>
This function is intended to replicate behaviour of the Array.reduce() function but for Objects.
If an array is passed in instead then it will perform standard reduce(). It is recommended to
always use the standard reduce() function when it is known that the object is actually an array.

**Kind**: static method of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> \| <code>Array</code> | The Object (or Array) to be filtered |
| fn | <code>module:objectHelpers~reduceCallback</code> \| <code>function</code> \| <code>reduceCallback</code> | The function to be processed for each filtered property |
| [initialValue] | <code>Object</code> \| <code>Array</code> | Optional. Value to use as the first argument to the first call of the callback. If no initial value is supplied, the first element in the array will be used. Calling reduce on an empty array without an initial value is an error. |

<a name="module_objectHelpers.setAndReturnValue"></a>

### objectHelpers.setAndReturnValue(item, key, value) ⇒ <code>\*</code>
Set a value on an item, then return the value

**Kind**: static method of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>Object</code> \| <code>Array</code> | An object or array to be updated |
| key | <code>string</code> \| <code>number</code> | The key on the item which will have its value set |
| value | <code>\*</code> | Any value to be applied to the key |

<a name="module_objectHelpers.setValue"></a>

### objectHelpers.setValue(key, value, item) ⇒ <code>Object</code> \| <code>Array</code>
Set a value on an item, then return the item.
NOTE: Argument order designed for usage with pipe

**Kind**: static method of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> \| <code>number</code> | The key on the item which will have its value set |
| value | <code>\*</code> | Any value to be applied to the key |
| item | <code>Object</code> \| <code>Array</code> | An object or array to be updated |

<a name="module_objectHelpers..handleRetainObjects"></a>

### objectHelpers~handleRetainObjects([retainObjects]) ⇒ <code>function</code>
Convert an array of keys into a regex, return a function to test if incoming keys match.

**Kind**: inner method of [<code>objectHelpers</code>](#module_objectHelpers)  
**Returns**: <code>function</code> - The dot-notated array  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [retainObjects] | <code>Array.&lt;DotNotationString&gt;</code> | <code>[]</code> | An array of keys to retain as objects |

<a name="module_objectHelpers..performDotNotate"></a>

### objectHelpers~performDotNotate(arrayObject, didRetain, [prepend], [results]) ⇒ <code>DotNotatedObject</code>
The underlying logic function for converting arrays to dot-notation.

**Kind**: inner method of [<code>objectHelpers</code>](#module_objectHelpers)  
**Returns**: <code>DotNotatedObject</code> - The dot-notated object  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| arrayObject | <code>Object</code> |  | The array or object to dot-notate |
| didRetain | <code>function</code> |  | The test function to see if a key should be retained |
| [prepend] | <code>DotNotationString</code> | <code>&#x27;&#x27;</code> | The path for the property being processed |
| [results] | <code>DotNotatedObject</code> | <code>{}</code> | The final array to return |

<a name="module_stringHelpers"></a>

## stringHelpers
Manage how strings are manipulated with these utilities.

**Version**: 1.0.0  
**Author**: Joshua Heagle <joshuaheagle@gmail.com>  

* [stringHelpers](#module_stringHelpers)
    * [.camelCase(str)](#module_stringHelpers.camelCase) ⇒ <code>string</code>
    * [.kabobCase(str)](#module_stringHelpers.kabobCase) ⇒ <code>string</code>
    * [.makeFilepath(root, [append])](#module_stringHelpers.makeFilepath) ⇒ <code>string</code>
    * [.makeRelativePath(fromFile, toFile)](#module_stringHelpers.makeRelativePath) ⇒ <code>string</code>
    * [.regexEscape(str)](#module_stringHelpers.regexEscape) ⇒ <code>string</code>
    * [.snakeCase(str)](#module_stringHelpers.snakeCase) ⇒ <code>string</code>
    * [.strAfter(str, search)](#module_stringHelpers.strAfter) ⇒ <code>string</code>
    * [.strAfterLast(str, search)](#module_stringHelpers.strAfterLast) ⇒ <code>string</code>
    * [.strBefore(str, search)](#module_stringHelpers.strBefore) ⇒ <code>string</code>
    * [.strBeforeLast(str, search)](#module_stringHelpers.strBeforeLast) ⇒ <code>string</code>
    * [.titleCase(str)](#module_stringHelpers.titleCase) ⇒ <code>string</code>
    * [.ucFirst(str)](#module_stringHelpers.ucFirst) ⇒ <code>string</code>
    * [.words(str)](#module_stringHelpers.words) ⇒ <code>array</code>

<a name="module_stringHelpers.camelCase"></a>

### stringHelpers.camelCase(str) ⇒ <code>string</code>
Given a string in kebab-case, snake_case or 'Sentence case', convert to camelCase.

**Kind**: static method of [<code>stringHelpers</code>](#module_stringHelpers)  

| Param | Type |
| --- | --- |
| str | <code>string</code> | 

<a name="module_stringHelpers.kabobCase"></a>

### stringHelpers.kabobCase(str) ⇒ <code>string</code>
Given a string in snake_case, camelCase or 'Sentence case', convert to kabob-case.

**Kind**: static method of [<code>stringHelpers</code>](#module_stringHelpers)  

| Param | Type |
| --- | --- |
| str | <code>string</code> | 

<a name="module_stringHelpers.makeFilepath"></a>

### stringHelpers.makeFilepath(root, [append]) ⇒ <code>string</code>
Format the given path so that it does not have trailing slashes and also correctly appends a path.

**Kind**: static method of [<code>stringHelpers</code>](#module_stringHelpers)  

| Param | Type | Default |
| --- | --- | --- |
| root | <code>string</code> |  | 
| [append] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> | 

<a name="module_stringHelpers.makeRelativePath"></a>

### stringHelpers.makeRelativePath(fromFile, toFile) ⇒ <code>string</code>
Compare two file paths and simplify them to a relative path.

**Kind**: static method of [<code>stringHelpers</code>](#module_stringHelpers)  

| Param | Type |
| --- | --- |
| fromFile | <code>string</code> | 
| toFile | <code>string</code> | 

<a name="module_stringHelpers.regexEscape"></a>

### stringHelpers.regexEscape(str) ⇒ <code>string</code>
Take a string and escape the regex characters.

**Kind**: static method of [<code>stringHelpers</code>](#module_stringHelpers)  

| Param | Type |
| --- | --- |
| str | <code>string</code> | 

<a name="module_stringHelpers.snakeCase"></a>

### stringHelpers.snakeCase(str) ⇒ <code>string</code>
Given a string in kebab-case, camelCase or 'Sentence case', convert to snake_case.

**Kind**: static method of [<code>stringHelpers</code>](#module_stringHelpers)  

| Param | Type |
| --- | --- |
| str | <code>string</code> | 

<a name="module_stringHelpers.strAfter"></a>

### stringHelpers.strAfter(str, search) ⇒ <code>string</code>
Retrieve the string part after the search match.

**Kind**: static method of [<code>stringHelpers</code>](#module_stringHelpers)  

| Param | Type |
| --- | --- |
| str | <code>string</code> | 
| search | <code>string</code> | 

<a name="module_stringHelpers.strAfterLast"></a>

### stringHelpers.strAfterLast(str, search) ⇒ <code>string</code>
Retrieve the string part after the last search match.

**Kind**: static method of [<code>stringHelpers</code>](#module_stringHelpers)  

| Param | Type |
| --- | --- |
| str | <code>string</code> | 
| search | <code>string</code> | 

<a name="module_stringHelpers.strBefore"></a>

### stringHelpers.strBefore(str, search) ⇒ <code>string</code>
Retrieve the string part before the search match.

**Kind**: static method of [<code>stringHelpers</code>](#module_stringHelpers)  

| Param | Type |
| --- | --- |
| str | <code>string</code> | 
| search | <code>string</code> | 

<a name="module_stringHelpers.strBeforeLast"></a>

### stringHelpers.strBeforeLast(str, search) ⇒ <code>string</code>
Retrieve the string part after the last search match.

**Kind**: static method of [<code>stringHelpers</code>](#module_stringHelpers)  

| Param | Type |
| --- | --- |
| str | <code>string</code> | 
| search | <code>string</code> | 

<a name="module_stringHelpers.titleCase"></a>

### stringHelpers.titleCase(str) ⇒ <code>string</code>
Given a string in kebab-case, snake_case, camelCase or 'Sentence case', convert to 'Title Case'.

**Kind**: static method of [<code>stringHelpers</code>](#module_stringHelpers)  

| Param | Type |
| --- | --- |
| str | <code>string</code> | 

<a name="module_stringHelpers.ucFirst"></a>

### stringHelpers.ucFirst(str) ⇒ <code>string</code>
Given a string, make the first character uppercase and the rest lowercase.

**Kind**: static method of [<code>stringHelpers</code>](#module_stringHelpers)  

| Param | Type |
| --- | --- |
| str | <code>string</code> | 

<a name="module_stringHelpers.words"></a>

### stringHelpers.words(str) ⇒ <code>array</code>
Split a string into sets of numbers or letters.

**Kind**: static method of [<code>stringHelpers</code>](#module_stringHelpers)  

| Param | Type |
| --- | --- |
| str | <code>string</code> | 

<a name="module_siFunciona"></a>

## siFunciona
All the siFunciona system functions for stringing together functions and simplifying logic.

**Version**: 1.0.0  
**Author**: Joshua Heagle <joshuaheagle@gmail.com>  
