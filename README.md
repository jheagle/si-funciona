# Functional Helpers

## General usage utility functions

## Modules

<dl>
<dt><a href="#module_functionalHelpers">functionalHelpers</a></dt>
<dd><p>All of the functionalHelpers system functions for stringing together functions and simplifying logic.</p>
</dd>
<dt><a href="#module_arrayHelpers">arrayHelpers</a></dt>
<dd><p>Some simple utility functions for generating arrays or performing work on arrays.</p>
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
<dt><a href="#module_descriptorSamples">descriptorSamples</a></dt>
<dd><p>Simplify working with object by providing array-like parsing. Also, provides cloning and merging along with accessors that always have a return value for optimal nesting.</p>
</dd>
<dt><a href="#module_objectDescriptors">objectDescriptors</a></dt>
<dd><p>Create a format to standarize every object into a specific template.</p>
</dd>
</dl>

<a name="module_functionalHelpers"></a>

## functionalHelpers
All of the functionalHelpers system functions for stringing together functions and simplifying logic.

**Version**: 1.0.0  
**Author**: Joshua Heagle <joshuaheagle@gmail.com>  

* [functionalHelpers](#module_functionalHelpers)
    * [~root](#module_functionalHelpers..root)
    * [~previousFunctionalHelpers](#module_functionalHelpers..previousFunctionalHelpers) : <code>module</code> \| <code>\*</code>
    * [~noConflict()](#module_functionalHelpers..noConflict) ⇒ [<code>functionalHelpers</code>](#module_functionalHelpers..functionalHelpers)
    * [~functionalHelpers](#module_functionalHelpers..functionalHelpers) : [<code>functionalHelpers</code>](#module_functionalHelpers) \| [<code>arrayHelpers</code>](#module_arrayHelpers) \| [<code>functionHelpers</code>](#module_functionHelpers) \| [<code>numberHelpers</code>](#module_numberHelpers) \| [<code>objectHelpers</code>](#module_objectHelpers)

<a name="module_functionalHelpers..root"></a>

### functionalHelpers~root
Store a reference to this scope which will be Window if rendered via browser

**Kind**: inner constant of [<code>functionalHelpers</code>](#module_functionalHelpers)  
<a name="module_functionalHelpers..previousFunctionalHelpers"></a>

### functionalHelpers~previousFunctionalHelpers : <code>module</code> \| <code>\*</code>
Store reference to any pre-existing module of the same name

**Kind**: inner constant of [<code>functionalHelpers</code>](#module_functionalHelpers)  
<a name="module_functionalHelpers..noConflict"></a>

### functionalHelpers~noConflict() ⇒ [<code>functionalHelpers</code>](#module_functionalHelpers..functionalHelpers)
Return a reference to this library while preserving the original same-named library

**Kind**: inner method of [<code>functionalHelpers</code>](#module_functionalHelpers)  
<a name="module_functionalHelpers..functionalHelpers"></a>

### functionalHelpers~functionalHelpers : [<code>functionalHelpers</code>](#module_functionalHelpers) \| [<code>arrayHelpers</code>](#module_arrayHelpers) \| [<code>functionHelpers</code>](#module_functionHelpers) \| [<code>numberHelpers</code>](#module_numberHelpers) \| [<code>objectHelpers</code>](#module_objectHelpers)
All methods exported from this module are encapsulated within functionalHelpers.

**Kind**: inner typedef of [<code>functionalHelpers</code>](#module_functionalHelpers)  
<a name="module_arrayHelpers"></a>

## arrayHelpers
Some simple utility functions for generating arrays or performing work on arrays.

**Version**: 1.0.0  
**Author**: Joshua Heagle <joshuaheagle@gmail.com>  

* [arrayHelpers](#module_arrayHelpers)
    * _static_
        * [.buildArray(item, length, [arr])](#module_arrayHelpers.buildArray) ⇒ <code>Array.&lt;\*&gt;</code>
        * [.buildArrayOfReferences(item, length, [arr])](#module_arrayHelpers.buildArrayOfReferences) ⇒ <code>Array.&lt;\*&gt;</code>
        * [.mergeArrays(...arrays)](#module_arrayHelpers.mergeArrays) ⇒ <code>Array</code>
        * [.compareArrays(arr1, arr2)](#module_arrayHelpers.compareArrays) ⇒ <code>Object.&lt;string, number&gt;</code>
    * _inner_
        * [~buildArrayBase(useReference, item, length, [arr])](#module_arrayHelpers..buildArrayBase) ⇒ <code>Array.&lt;\*&gt;</code>
        * [~uniqueArray(array)](#module_arrayHelpers..uniqueArray) ⇒ <code>Array</code>

<a name="module_arrayHelpers.buildArray"></a>

### arrayHelpers.buildArray(item, length, [arr]) ⇒ <code>Array.&lt;\*&gt;</code>
Leverage buildArrayBase to generate an array filled with a copy of the provided item.
The length defines how long the array should be.

**Kind**: static method of [<code>arrayHelpers</code>](#module_arrayHelpers)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| item | <code>\*</code> |  | The item to be used for each array element |
| length | <code>number</code> |  | The desired length of the array |
| [arr] | <code>Array</code> | <code>[]</code> | The in-progress array of elements to be built and returned, will be used internally |

<a name="module_arrayHelpers.buildArrayOfReferences"></a>

### arrayHelpers.buildArrayOfReferences(item, length, [arr]) ⇒ <code>Array.&lt;\*&gt;</code>
Leverage buildArrayBase to generate an array filled with references to the provided item.
The length defines how long the array should be.

**Kind**: static method of [<code>arrayHelpers</code>](#module_arrayHelpers)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| item | <code>\*</code> |  | The item to be used for each array element |
| length | <code>number</code> |  | The desired length of the array |
| [arr] | <code>Array</code> | <code>[]</code> | The in-progress array of elements to be built and returned, will be used internally |

<a name="module_arrayHelpers.mergeArrays"></a>

### arrayHelpers.mergeArrays(...arrays) ⇒ <code>Array</code>
Take multiple arrays and then filter all these into one unique array.

**Kind**: static method of [<code>arrayHelpers</code>](#module_arrayHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| ...arrays | <code>Array</code> | Provide mulitple arrays to create one unique array |

<a name="module_arrayHelpers.compareArrays"></a>

### arrayHelpers.compareArrays(arr1, arr2) ⇒ <code>Object.&lt;string, number&gt;</code>
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
| arr1 | <code>Array</code> | The first array to compare |
| arr2 | <code>Array</code> | The second array to compare |

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
    result: [0, 0]
  },
  {
    value: 'firstMismatch1',
    result: [1, -1]
  },
  {
    value: 'match2',
    result: [0, 0]
  },
  {
    value: 'firstMismatch2',
    result: [1, -1]
  },
  {
    value: 'badMatch1',
    result: [0, 0]
  },
  {
    value: 'secondMismatch1',
    result: [-1, 1]
  }
]
```
<a name="module_arrayHelpers..buildArrayBase"></a>

### arrayHelpers~buildArrayBase(useReference, item, length, [arr]) ⇒ <code>Array.&lt;\*&gt;</code>
Generate an array filled with a copy of the provided item or references to the provided item.
The length defines how long the array should be.

**Kind**: inner method of [<code>arrayHelpers</code>](#module_arrayHelpers)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| useReference | <code>boolean</code> |  | Choose to multiply by clone or reference, true is by reference |
| item | <code>\*</code> |  | The item to be used for each array element |
| length | <code>number</code> |  | The desired length of the array |
| [arr] | <code>Array</code> | <code>[]</code> | The in-progress array of elements to be built and returned, will be used internally |

<a name="module_arrayHelpers..uniqueArray"></a>

### arrayHelpers~uniqueArray(array) ⇒ <code>Array</code>
Remove duplicate values from an array.

**Kind**: inner method of [<code>arrayHelpers</code>](#module_arrayHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> | The array to make unique |

<a name="module_functionHelpers"></a>

## functionHelpers
Manage how functions are called with these utilities.

**Version**: 1.0.0  
**Author**: Joshua Heagle <joshuaheagle@gmail.com>  

* [functionHelpers](#module_functionHelpers)
    * _static_
        * [.curry(fn)](#module_functionHelpers.curry) ⇒ <code>function</code> \| <code>\*</code>
        * [.pipe(...fns)](#module_functionHelpers.pipe) ⇒ <code>\*</code>
        * [.callWithParams(fn, params, [minimum])](#module_functionHelpers.callWithParams) ⇒ <code>\*</code>
        * [.delay(time)](#module_functionHelpers.delay) ⇒ <code>delayHandler</code>
        * [.queueManager([queue])](#module_functionHelpers.queueManager) ⇒ [<code>queueManagerHandle</code>](#module_functionHelpers..queueManagerHandle)
        * [.queueTimeout([queue])](#module_functionHelpers.queueTimeout) ⇒ [<code>queueTimeoutHandle</code>](#module_functionHelpers..queueTimeoutHandle)
    * _inner_
        * [~delayHandler](#module_functionHelpers..delayHandler) : <code>Object</code>
        * [~queueManagerHandle](#module_functionHelpers..queueManagerHandle) ⇒ <code>Promise</code>
        * [~queueTimeoutHandle](#module_functionHelpers..queueTimeoutHandle) ⇒ <code>Promise</code>

<a name="module_functionHelpers.curry"></a>

### functionHelpers.curry(fn) ⇒ <code>function</code> \| <code>\*</code>
Return a curried version of the passed function.
The returned function expects the same number of arguments minus the ones provided.
fn is the name of the function being curried.

**Kind**: static method of [<code>functionHelpers</code>](#module_functionHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | Receives a function to be curried |

<a name="module_functionHelpers.pipe"></a>

### functionHelpers.pipe(...fns) ⇒ <code>\*</code>
Take one or more function with a single parameter and return value.
Pass a paramter and the value will be transformed by each function then returned.

**Kind**: static method of [<code>functionHelpers</code>](#module_functionHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| ...fns | <code>function</code> | Takes a series of functions having the same parameter |

<a name="module_functionHelpers.callWithParams"></a>

### functionHelpers.callWithParams(fn, params, [minimum]) ⇒ <code>\*</code>
Given a function, call with the correct number of paramters from an array of possible parameters.

**Kind**: static method of [<code>functionHelpers</code>](#module_functionHelpers)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| fn | <code>function</code> |  | The function to be called |
| params | <code>Array</code> |  | Array of possible function parameters |
| [minimum] | <code>number</code> | <code>2</code> | Minimumn number of parameters to use in the function |

<a name="module_functionHelpers.delay"></a>

### functionHelpers.delay(time) ⇒ <code>delayHandler</code>
Provide a timeout which returns a promise.

**Kind**: static method of [<code>functionHelpers</code>](#module_functionHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| time | <code>number</code> | Delay in milliseconds |

<a name="module_functionHelpers.queueManager"></a>

### functionHelpers.queueManager([queue]) ⇒ [<code>queueManagerHandle</code>](#module_functionHelpers..queueManagerHandle)
Manage functions to run sequentially.

**Kind**: static method of [<code>functionHelpers</code>](#module_functionHelpers)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [queue] | <code>Iterable</code> | <code>[]</code> | The iterable that can be used to store queued functions |

<a name="module_functionHelpers.queueTimeout"></a>

### functionHelpers.queueTimeout([queue]) ⇒ [<code>queueTimeoutHandle</code>](#module_functionHelpers..queueTimeoutHandle)
Manage functions to run sequentially with delays.

**Kind**: static method of [<code>functionHelpers</code>](#module_functionHelpers)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [queue] | <code>Iterable</code> | <code>[]</code> | The iterable that can be used to store queued functions |

<a name="module_functionHelpers..delayHandler"></a>

### functionHelpers~delayHandler : <code>Object</code>
Provide a way to cancel a request or attach a resolve event.

**Kind**: inner typedef of [<code>functionHelpers</code>](#module_functionHelpers)  
**Properties**

| Name | Type |
| --- | --- |
| resolver | <code>Promise</code> | 
| cancel | <code>function</code> | 

<a name="module_functionHelpers..queueManagerHandle"></a>

### functionHelpers~queueManagerHandle ⇒ <code>Promise</code>
Each time queue handle is called the passed function is added to the queue to be called when ready.

**Kind**: inner typedef of [<code>functionHelpers</code>](#module_functionHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | A function to enqueue |
| ...args | <code>\*</code> | Arguments to be passed to the function once it is ready |

<a name="module_functionHelpers..queueTimeoutHandle"></a>

### functionHelpers~queueTimeoutHandle ⇒ <code>Promise</code>
Run Timeout functions one after the otherin queue.

**Kind**: inner typedef of [<code>functionHelpers</code>](#module_functionHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | A callback function to be performed at some time in the future. |
| time | <code>number</code> | The time in milliseconds to delay. |
| ...args | <code>\*</code> | Arguments to be passed to the callback once it is implemented. |

<a name="module_numberHelpers"></a>

## numberHelpers
Some number comparators and random number generators.

**Version**: 1.0.0  
**Author**: Joshua Heagle <joshuaheagle@gmail.com>  

* [numberHelpers](#module_numberHelpers)
    * [.getAbsoluteMax(num1, num2)](#module_numberHelpers.getAbsoluteMax) ⇒ <code>number</code>
    * [.getAbsoluteMin(num1, num2)](#module_numberHelpers.getAbsoluteMin) ⇒ <code>number</code>
    * [.randomNumber(range, [offset], [interval])](#module_numberHelpers.randomNumber) ⇒ <code>number</code>
    * [.randomInteger(range, [offset], [interval])](#module_numberHelpers.randomInteger) ⇒ <code>number</code>
    * [.compare(val1, val2)](#module_numberHelpers.compare) ⇒ <code>number</code>

<a name="module_numberHelpers.getAbsoluteMax"></a>

### numberHelpers.getAbsoluteMax(num1, num2) ⇒ <code>number</code>
Helper for returning the absolute max value

**Kind**: static method of [<code>numberHelpers</code>](#module_numberHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| num1 | <code>number</code> | A number to compare |
| num2 | <code>number</code> | Another number to be compared against |

<a name="module_numberHelpers.getAbsoluteMin"></a>

### numberHelpers.getAbsoluteMin(num1, num2) ⇒ <code>number</code>
Helper for returning the absolute min value

**Kind**: static method of [<code>numberHelpers</code>](#module_numberHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| num1 | <code>number</code> | A number to compare |
| num2 | <code>number</code> | Another number to be compared against |

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

<a name="module_objectHelpers"></a>

## objectHelpers
Simplify working with object by providing array-like parsing. Also, provides cloning and merging along with accessors that always have a return value for optimal nesting.

**Version**: 1.0.0  
**Author**: Joshua Heagle <joshuaheagle@gmail.com>  

* [objectHelpers](#module_objectHelpers)
    * _static_
        * [.objectKeys](#module_objectHelpers.objectKeys) ⇒ <code>Array.&lt;(string\|number)&gt;</code>
        * [.objectValues](#module_objectHelpers.objectValues) ⇒ <code>Array</code>
        * [.isInstanceObject](#module_objectHelpers.isInstanceObject)
        * [.setValue(key, value, item)](#module_objectHelpers.setValue) ⇒ <code>Object</code> \| <code>Array</code>
        * [.setAndReturnValue(item, key, value)](#module_objectHelpers.setAndReturnValue) ⇒ <code>\*</code>
        * [.mapObject(obj, fn, [thisArg])](#module_objectHelpers.mapObject) ⇒ <code>Object</code> \| <code>Array</code>
        * [.mapProperty(property, mapFunction, obj)](#module_objectHelpers.mapProperty) ⇒ <code>object</code>
        * [.filterObject(obj, fn, [thisArg])](#module_objectHelpers.filterObject) ⇒ <code>Object</code> \| <code>Array</code>
        * [.reduceObject(obj, fn, [initialValue])](#module_objectHelpers.reduceObject) ⇒ <code>Object</code> \| <code>Array</code>
        * [.emptyObject(item)](#module_objectHelpers.emptyObject) ⇒ <code>boolean</code>
        * [.cloneObject(object, [options])](#module_objectHelpers.cloneObject) ⇒ <code>Object</code>
        * [.mergeObjects(...args)](#module_objectHelpers.mergeObjects) ⇒ <code>Object</code>
        * [.mergeObjectsMutable(...args)](#module_objectHelpers.mergeObjectsMutable) ⇒ <code>Object</code>
    * _inner_
        * [~mergeObjectsBase(isMutable, fn, obj1, obj2)](#module_objectHelpers..mergeObjectsBase) ⇒ <code>Object</code>
        * [~mapCallback](#module_objectHelpers..mapCallback) ⇒ <code>\*</code>
        * [~filterCallback](#module_objectHelpers..filterCallback) ⇒ <code>boolean</code>
        * [~reduceCallback](#module_objectHelpers..reduceCallback) ⇒ <code>\*</code>

<a name="module_objectHelpers.objectKeys"></a>

### objectHelpers.objectKeys ⇒ <code>Array.&lt;(string\|number)&gt;</code>
Get an array of keys from any object or array. Will return empty array when invalid or there are no keys.
Optional flag will include the inherited keys from prototype chain when set.

**Kind**: static constant of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type | Default |
| --- | --- | --- |
| object | <code>Object</code> \| <code>Array</code> |  | 
| [includeInherited] | <code>boolean</code> | <code>false</code> | 

<a name="module_objectHelpers.objectValues"></a>

### objectHelpers.objectValues ⇒ <code>Array</code>
Get an array of values from any object or array. Will return empty array when invalid or there are no values.
Optional flag will include the inherited values from prototype chain when set.

**Kind**: static constant of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type | Default |
| --- | --- | --- |
| object | <code>Object</code> \| <code>Array</code> |  | 
| [includeInherited] | <code>boolean</code> | <code>false</code> | 

<a name="module_objectHelpers.isInstanceObject"></a>

### objectHelpers.isInstanceObject
Check if the current object has inherited properties.

**Kind**: static constant of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type |
| --- | --- |
| object | <code>Object</code> \| <code>Array</code> | 

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

<a name="module_objectHelpers.setAndReturnValue"></a>

### objectHelpers.setAndReturnValue(item, key, value) ⇒ <code>\*</code>
Set a value on an item, then return the value

**Kind**: static method of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>Object</code> \| <code>Array</code> | An object or array to be updated |
| key | <code>string</code> \| <code>number</code> | The key on the item which will have its value set |
| value | <code>\*</code> | Any value to be applied to the key |

<a name="module_objectHelpers.mapObject"></a>

### objectHelpers.mapObject(obj, fn, [thisArg]) ⇒ <code>Object</code> \| <code>Array</code>
This function is intended to replicate behaviour of the Array.map() function but for Objects.
If an array is passed in instead then it will perform standard map(). It is recommended to
always use the standard map() function when it is known that the object is actually an array.

**Kind**: static method of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> \| <code>Array</code> | The Object (or Array) to be mapped |
| fn | [<code>mapCallback</code>](#module_objectHelpers..mapCallback) \| <code>function</code> | The function to be processed for each mapped property |
| [thisArg] | <code>Object</code> \| <code>Array</code> | Optional. Value to use as this when executing callback. |

<a name="module_objectHelpers.mapProperty"></a>

### objectHelpers.mapProperty(property, mapFunction, obj) ⇒ <code>object</code>
Perform map on an array property of an object, then return the object

**Kind**: static method of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| property | <code>string</code> | The string key for the array property to be mapped |
| mapFunction | [<code>mapCallback</code>](#module_objectHelpers..mapCallback) \| <code>function</code> | A function suitable to be passed to map |
| obj | <code>Object</code> \| <code>Array</code> | An object having an array property |

<a name="module_objectHelpers.filterObject"></a>

### objectHelpers.filterObject(obj, fn, [thisArg]) ⇒ <code>Object</code> \| <code>Array</code>
This function is intended to replicate behaviour of the Array.filter() function but for Objects.
If an array is passed in instead then it will perform standard filter(). It is recommended to
always use the standard filter() function when it is known that the object is actually an array.

**Kind**: static method of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> \| <code>Array</code> | The Object (or Array) to be filtered |
| fn | [<code>filterCallback</code>](#module_objectHelpers..filterCallback) \| <code>function</code> | The function to be processed for each filtered property |
| [thisArg] | <code>Object</code> \| <code>Array</code> | Optional. Value to use as this when executing callback. |

<a name="module_objectHelpers.reduceObject"></a>

### objectHelpers.reduceObject(obj, fn, [initialValue]) ⇒ <code>Object</code> \| <code>Array</code>
This function is intended to replicate behaviour of the Array.reduce() function but for Objects.
If an array is passed in instead then it will perform standard reduce(). It is recommended to
always use the standard reduce() function when it is known that the object is actually an array.

**Kind**: static method of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> \| <code>Array</code> | The Object (or Array) to be filtered |
| fn | [<code>reduceCallback</code>](#module_objectHelpers..reduceCallback) \| <code>function</code> | The function to be processed for each filtered property |
| [initialValue] | <code>Object</code> \| <code>Array</code> | Optional. Value to use as the first argument to the first call of the callback. If no initial value is supplied, the first element in the array will be used. Calling reduce on an empty array without an initial value is an error. |

<a name="module_objectHelpers.emptyObject"></a>

### objectHelpers.emptyObject(item) ⇒ <code>boolean</code>
Helper function for testing if the item is an Object or Array that does not have any properties

**Kind**: static method of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>Object</code> \| <code>Array</code> | Object or Array to test |

<a name="module_objectHelpers.cloneObject"></a>

### objectHelpers.cloneObject(object, [options]) ⇒ <code>Object</code>
Clone objects for manipulation without data corruption, returns a copy of the provided object.

**Kind**: static method of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| object | <code>Object</code> |  | The original object that is being cloned |
| [options] | <code>Object</code> | <code>{}</code> |  |
| options.descriptorMap | [<code>descriptorMap</code>](#module_descriptorSamples..descriptorMap) |  | The map of the object |
| [options.mapLimit] | <code>number</code> | <code>1000</code> |  |
| [options.depthLimit] | <code>depthLimit</code> | <code>-1</code> |  |

<a name="module_objectHelpers.mergeObjects"></a>

### objectHelpers.mergeObjects(...args) ⇒ <code>Object</code>
Perform a deep merge of objects. This will combine all objects and sub-objects,
objects having the same attributes will overwrite starting from the end of the argument
list and bubbling up to return a merged version of the first object.
WARNING: This is a recursive function.

**Kind**: static method of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>Object</code> | Provide a list of objects which will be merged starting from the end up into the first object |

<a name="module_objectHelpers.mergeObjectsMutable"></a>

### objectHelpers.mergeObjectsMutable(...args) ⇒ <code>Object</code>
Perform a deep merge of objects. This will combine all objects and sub-objects,
objects having the same attributes will overwrite starting from the end of the argument
list and bubbling up to return the overwritten first object.
WARNING: This is a recursive function.
WARNING: This will mutate the first object passed in as input

**Kind**: static method of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>Object</code> | Provide a list of objects which will be merged starting from the end up into the first object |

<a name="module_objectHelpers..mergeObjectsBase"></a>

### objectHelpers~mergeObjectsBase(isMutable, fn, obj1, obj2) ⇒ <code>Object</code>
Merge two objects and provide clone or original on the provided function.
The passed function should accept a minimum of two objects to be merged.
If the desire is to mutate the input objects, then the function name should
have the word 'mutable' in the name (case-insensitive).

**Kind**: inner method of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| isMutable | <code>boolean</code> | An optional flag which indicates whether we will clone objects or directly |
| fn | [<code>mergeObjects</code>](#module_objectHelpers.mergeObjects) \| [<code>mergeObjectsMutable</code>](#module_objectHelpers.mergeObjectsMutable) \| <code>function</code> | Pass one of the mergeObjects functions to be used |
| obj1 | <code>Object</code> | The receiving object; this is the object which will have it's properties overridden |
| obj2 | <code>Object</code> | The contributing object; this is the object which will contribute new properties and override existing ones modify them |

<a name="module_objectHelpers..mapCallback"></a>

### objectHelpers~mapCallback ⇒ <code>\*</code>
Function that produces a property of the new Object, taking three arguments

**Kind**: inner typedef of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| currentProperty | <code>\*</code> | The current property being processed in the object. |
| [currentIndex] | <code>string</code> | The property name of the current property being processed in the object. |
| [object] | <code>Object</code> \| <code>Array</code> | The object map was called upon. |

<a name="module_objectHelpers..filterCallback"></a>

### objectHelpers~filterCallback ⇒ <code>boolean</code>
Function is a predicate, to test each property value of the object. Return true to keep the element, false
otherwise, taking three arguments

**Kind**: inner typedef of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| currentProperty | <code>\*</code> | The current property being processed in the object. |
| [currentIndex] | <code>string</code> | The property name of the current property being processed in the object. |
| [object] | <code>Object</code> \| <code>Array</code> | The object filter was called upon. |

<a name="module_objectHelpers..reduceCallback"></a>

### objectHelpers~reduceCallback ⇒ <code>\*</code>
Function to execute on each property in the object, taking four arguments

**Kind**: inner typedef of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [accumulator] | <code>\*</code> | <code>{}</code> | The accumulator accumulates the callback's return values; it is the accumulated value previously returned in the last invocation of the callback, or initialValue, if supplied (see below). |
| [currentProperty] | <code>\*</code> | <code>{}</code> | The current property being processed in the object. |
| [currentIndex] | <code>string</code> | <code>0</code> | The index of the current element being processed in the array. Starts at index 0, if an initialValue is provided, and at index 1 otherwise. |
| [object] | <code>Object</code> \| <code>Array</code> | <code>{}</code> | The object reduce was called upon. |

<a name="module_descriptorSamples"></a>

## descriptorSamples
Simplify working with object by providing array-like parsing. Also, provides cloning and merging along with accessors that always have a return value for optimal nesting.

**Version**: 1.0.0  
**Author**: Joshua Heagle <joshuaheagle@gmail.com>  

* [descriptorSamples](#module_descriptorSamples)
    * _static_
        * [.descriptorDetailSample](#module_descriptorSamples.descriptorDetailSample) : <code>descriptorDetail</code>
        * [.descriptorSample](#module_descriptorSamples.descriptorSample) : <code>descriptor</code>
        * [.descriptorMapSample](#module_descriptorSamples.descriptorMapSample) : <code>descriptorMap</code>
        * [.mappedDescriptorMap](#module_descriptorSamples.mappedDescriptorMap) : <code>descriptorMap</code>
    * _inner_
        * [~descriptorDetail](#module_descriptorSamples..descriptorDetail) : <code>Object</code>
        * [~descriptor](#module_descriptorSamples..descriptor) : <code>Object</code>
        * [~descriptorMap](#module_descriptorSamples..descriptorMap) : <code>Array.&lt;descriptor&gt;</code>

<a name="module_descriptorSamples.descriptorDetailSample"></a>

### descriptorSamples.descriptorDetailSample : <code>descriptorDetail</code>
**Kind**: static constant of [<code>descriptorSamples</code>](#module_descriptorSamples)  
<a name="module_descriptorSamples.descriptorSample"></a>

### descriptorSamples.descriptorSample : <code>descriptor</code>
**Kind**: static constant of [<code>descriptorSamples</code>](#module_descriptorSamples)  
<a name="module_descriptorSamples.descriptorMapSample"></a>

### descriptorSamples.descriptorMapSample : <code>descriptorMap</code>
**Kind**: static constant of [<code>descriptorSamples</code>](#module_descriptorSamples)  
<a name="module_descriptorSamples.mappedDescriptorMap"></a>

### descriptorSamples.mappedDescriptorMap : <code>descriptorMap</code>
**Kind**: static constant of [<code>descriptorSamples</code>](#module_descriptorSamples)  
<a name="module_descriptorSamples..descriptorDetail"></a>

### descriptorSamples~descriptorDetail : <code>Object</code>
**Kind**: inner typedef of [<code>descriptorSamples</code>](#module_descriptorSamples)  
**Properties**

| Name | Type |
| --- | --- |
| index | <code>number</code> | 
| key | <code>string</code> \| <code>number</code> | 
| type | <code>Array.&lt;string&gt;</code> | 
| value | <code>Array</code> | 
| nullable | <code>boolean</code> | 
| optional | <code>boolean</code> | 
| circular | <code>boolean</code> | 
| isReference | <code>boolean</code> | 
| isInstance | <code>boolean</code> | 
| arrayReference | <code>null</code> \| <code>number</code> | 
| objectReference | <code>null</code> \| <code>number</code> | 

<a name="module_descriptorSamples..descriptor"></a>

### descriptorSamples~descriptor : <code>Object</code>
**Kind**: inner typedef of [<code>descriptorSamples</code>](#module_descriptorSamples)  
**Properties**

| Name | Type |
| --- | --- |
| index | <code>number</code> | 
| details | <code>Array.&lt;descriptorDetail&gt;</code> | 
| length | <code>number</code> | 
| keys | <code>Array.&lt;(string\|number)&gt;</code> | 
| references | <code>Array.&lt;number&gt;</code> | 
| isArray | <code>boolean</code> | 
| complete | <code>boolean</code> | 

<a name="module_descriptorSamples..descriptorMap"></a>

### descriptorSamples~descriptorMap : <code>Array.&lt;descriptor&gt;</code>
**Kind**: inner typedef of [<code>descriptorSamples</code>](#module_descriptorSamples)  
<a name="module_objectDescriptors"></a>

## objectDescriptors
Create a format to standarize every object into a specific template.

**Version**: 1.0.0  
**Author**: Joshua Heagle <joshuaheagle@gmail.com>  

* [objectDescriptors](#module_objectDescriptors)
    * _static_
        * [.assignNewReferences](#module_objectDescriptors.assignNewReferences) ⇒ <code>assignReferences</code>
        * [.describeObjectDetail(value, [key], [index])](#module_objectDescriptors.describeObjectDetail) ⇒ [<code>descriptorDetail</code>](#module_descriptorSamples..descriptorDetail)
        * [.assignDescriptor(originalMap, ...descriptors)](#module_objectDescriptors.assignDescriptor) ⇒ [<code>descriptor</code>](#module_descriptorSamples..descriptor)
        * [.describeObject(object)](#module_objectDescriptors.describeObject) ⇒ [<code>descriptor</code>](#module_descriptorSamples..descriptor)
        * [.compareDescriptor(descriptor1, descriptor2)](#module_objectDescriptors.compareDescriptor) ⇒ <code>boolean</code>
        * [.describeObjectMap(object, [options])](#module_objectDescriptors.describeObjectMap) ⇒ [<code>descriptorMap</code>](#module_descriptorSamples..descriptorMap)
        * [.mapOriginalObject([newReferenceMap], [options])](#module_objectDescriptors.mapOriginalObject) ⇒ <code>mapOriginal</code>
    * _inner_
        * [~isReferenceObject(value)](#module_objectDescriptors..isReferenceObject) ⇒ <code>boolean</code>
        * [~cloneDescriptorDetail(originalDetail)](#module_objectDescriptors..cloneDescriptorDetail) ⇒ [<code>descriptorDetail</code>](#module_descriptorSamples..descriptorDetail)
        * [~cloneDescriptor(originalMap)](#module_objectDescriptors..cloneDescriptor) ⇒ [<code>descriptor</code>](#module_descriptorSamples..descriptor)
        * [~assignDescriptorDetail(originalDetail, ...details)](#module_objectDescriptors..assignDescriptorDetail) ⇒ [<code>descriptorDetail</code>](#module_descriptorSamples..descriptorDetail)
        * [~nextReference(descriptor, currentReference)](#module_objectDescriptors..nextReference) ⇒ <code>number</code> \| <code>undefined</code>
        * [~checkDescriptorComplete(descriptor)](#module_objectDescriptors..checkDescriptorComplete) ⇒ [<code>descriptor</code>](#module_descriptorSamples..descriptor)
        * [~checkClearValues(descriptor, [keepValues])](#module_objectDescriptors..checkClearValues) ⇒ [<code>descriptor</code>](#module_descriptorSamples..descriptor)
        * [~createReferenceIdentifier([object], [index])](#module_objectDescriptors..createReferenceIdentifier) ⇒ <code>referenceIdentifier</code>
        * [~referenceIdentifier](#module_objectDescriptors..referenceIdentifier) : <code>Object.&lt;string, (number\|Object\|Array)&gt;</code>

<a name="module_objectDescriptors.assignNewReferences"></a>

### objectDescriptors.assignNewReferences ⇒ <code>assignReferences</code>
Take an array for reference identifiers and return a callback to build the final reference

**Kind**: static constant of [<code>objectDescriptors</code>](#module_objectDescriptors)  

| Param | Type |
| --- | --- |
| newReferenceMap | <code>Array.&lt;referenceIdentifier&gt;</code> | 

<a name="module_objectDescriptors.describeObjectDetail"></a>

### objectDescriptors.describeObjectDetail(value, [key], [index]) ⇒ [<code>descriptorDetail</code>](#module_descriptorSamples..descriptorDetail)
Trace an object's attribute and provide details about it.

**Kind**: static method of [<code>objectDescriptors</code>](#module_objectDescriptors)  

| Param | Type | Default |
| --- | --- | --- |
| value | <code>\*</code> |  | 
| [key] | <code>string</code> \| <code>number</code> | <code>0</code> | 
| [index] | <code>number</code> | <code>0</code> | 

<a name="module_objectDescriptors.assignDescriptor"></a>

### objectDescriptors.assignDescriptor(originalMap, ...descriptors) ⇒ [<code>descriptor</code>](#module_descriptorSamples..descriptor)
Apply one or more descriptors to an existing descriptor so that they represent a merged version of the descriptors.

**Kind**: static method of [<code>objectDescriptors</code>](#module_objectDescriptors)  

| Param | Type |
| --- | --- |
| originalMap | [<code>descriptor</code>](#module_descriptorSamples..descriptor) | 
| ...descriptors | [<code>descriptor</code>](#module_descriptorSamples..descriptor) | 

<a name="module_objectDescriptors.describeObject"></a>

### objectDescriptors.describeObject(object) ⇒ [<code>descriptor</code>](#module_descriptorSamples..descriptor)
Trace an object and return the descriptor which defines the object's structure and attributes.

**Kind**: static method of [<code>objectDescriptors</code>](#module_objectDescriptors)  

| Param | Type |
| --- | --- |
| object | <code>Object</code> | 

<a name="module_objectDescriptors.compareDescriptor"></a>

### objectDescriptors.compareDescriptor(descriptor1, descriptor2) ⇒ <code>boolean</code>
Check if two descriptors are the same or similar in that they have similar keys and the associated types are the same.

**Kind**: static method of [<code>objectDescriptors</code>](#module_objectDescriptors)  

| Param | Type |
| --- | --- |
| descriptor1 | [<code>descriptor</code>](#module_descriptorSamples..descriptor) | 
| descriptor2 | [<code>descriptor</code>](#module_descriptorSamples..descriptor) | 

<a name="module_objectDescriptors.describeObjectMap"></a>

### objectDescriptors.describeObjectMap(object, [options]) ⇒ [<code>descriptorMap</code>](#module_descriptorSamples..descriptorMap)
Trace out the entire object including nested objects.

**Kind**: static method of [<code>objectDescriptors</code>](#module_objectDescriptors)  

| Param | Type | Default |
| --- | --- | --- |
| object | <code>Object</code> \| <code>Array</code> |  | 
| [options] | <code>Object</code> | <code>{}</code> | 
| [options.mapLimit] | <code>number</code> | <code>1000</code> | 
| [options.depthLimit] | <code>number</code> | <code>-1</code> | 
| [options.keepValues] | <code>boolean</code> | <code>false</code> | 

<a name="module_objectDescriptors.mapOriginalObject"></a>

### objectDescriptors.mapOriginalObject([newReferenceMap], [options]) ⇒ <code>mapOriginal</code>
Prepare to map over an object and return the callback that will be used for each reference.

**Kind**: static method of [<code>objectDescriptors</code>](#module_objectDescriptors)  

| Param | Type | Default |
| --- | --- | --- |
| [newReferenceMap] | <code>Array.&lt;referenceIdentifier&gt;</code> | <code>[]</code> | 
| [options] | <code>Object</code> | <code>{}</code> | 
| [options.mapLimit] | <code>number</code> | <code>1000</code> | 
| [options.depthLimit] | <code>depthLimit</code> | <code>-1</code> | 

<a name="module_objectDescriptors..isReferenceObject"></a>

### objectDescriptors~isReferenceObject(value) ⇒ <code>boolean</code>
Determine if the value is a reference instance

**Kind**: inner method of [<code>objectDescriptors</code>](#module_objectDescriptors)  

| Param | Type |
| --- | --- |
| value | <code>Array</code> \| <code>Object</code> \| <code>\*</code> | 

<a name="module_objectDescriptors..cloneDescriptorDetail"></a>

### objectDescriptors~cloneDescriptorDetail(originalDetail) ⇒ [<code>descriptorDetail</code>](#module_descriptorSamples..descriptorDetail)
Get a new copy of an existing Descriptor Detail

**Kind**: inner method of [<code>objectDescriptors</code>](#module_objectDescriptors)  

| Param | Type |
| --- | --- |
| originalDetail | [<code>descriptorDetail</code>](#module_descriptorSamples..descriptorDetail) | 

<a name="module_objectDescriptors..cloneDescriptor"></a>

### objectDescriptors~cloneDescriptor(originalMap) ⇒ [<code>descriptor</code>](#module_descriptorSamples..descriptor)
Make a copy of an object descriptor so that the original will not be mutated.

**Kind**: inner method of [<code>objectDescriptors</code>](#module_objectDescriptors)  

| Param | Type |
| --- | --- |
| originalMap | [<code>descriptor</code>](#module_descriptorSamples..descriptor) | 

<a name="module_objectDescriptors..assignDescriptorDetail"></a>

### objectDescriptors~assignDescriptorDetail(originalDetail, ...details) ⇒ [<code>descriptorDetail</code>](#module_descriptorSamples..descriptorDetail)
Assign properties from other details onto an existing detail.

**Kind**: inner method of [<code>objectDescriptors</code>](#module_objectDescriptors)  

| Param | Type |
| --- | --- |
| originalDetail | [<code>descriptorDetail</code>](#module_descriptorSamples..descriptorDetail) | 
| ...details | [<code>descriptorDetail</code>](#module_descriptorSamples..descriptorDetail) | 

<a name="module_objectDescriptors..nextReference"></a>

### objectDescriptors~nextReference(descriptor, currentReference) ⇒ <code>number</code> \| <code>undefined</code>
Find the index of the next descriptorDetail to build a resource for.

**Kind**: inner method of [<code>objectDescriptors</code>](#module_objectDescriptors)  

| Param | Type |
| --- | --- |
| descriptor | [<code>descriptor</code>](#module_descriptorSamples..descriptor) | 
| currentReference | <code>number</code> | 

<a name="module_objectDescriptors..checkDescriptorComplete"></a>

### objectDescriptors~checkDescriptorComplete(descriptor) ⇒ [<code>descriptor</code>](#module_descriptorSamples..descriptor)
Check if the descriptors references have all been built and set complete to true if they have.

**Kind**: inner method of [<code>objectDescriptors</code>](#module_objectDescriptors)  

| Param | Type |
| --- | --- |
| descriptor | [<code>descriptor</code>](#module_descriptorSamples..descriptor) | 

<a name="module_objectDescriptors..checkClearValues"></a>

### objectDescriptors~checkClearValues(descriptor, [keepValues]) ⇒ [<code>descriptor</code>](#module_descriptorSamples..descriptor)
Check if we should clear the values on this descriptor

**Kind**: inner method of [<code>objectDescriptors</code>](#module_objectDescriptors)  

| Param | Type | Default |
| --- | --- | --- |
| descriptor | [<code>descriptor</code>](#module_descriptorSamples..descriptor) |  | 
| [keepValues] | <code>boolean</code> | <code>false</code> | 

<a name="module_objectDescriptors..createReferenceIdentifier"></a>

### objectDescriptors~createReferenceIdentifier([object], [index]) ⇒ <code>referenceIdentifier</code>
Create a referenceIdentifier for building the object clone.

**Kind**: inner method of [<code>objectDescriptors</code>](#module_objectDescriptors)  

| Param | Type | Default |
| --- | --- | --- |
| [object] | <code>Array</code> \| <code>Object</code> | <code></code> | 
| [index] | <code>number</code> | <code>0</code> | 

<a name="module_objectDescriptors..referenceIdentifier"></a>

### objectDescriptors~referenceIdentifier : <code>Object.&lt;string, (number\|Object\|Array)&gt;</code>
**Kind**: inner typedef of [<code>objectDescriptors</code>](#module_objectDescriptors)  
**Properties**

| Name | Type |
| --- | --- |
| index | <code>number</code> | 
| object | <code>Array</code> \| <code>Object</code> | 
| descriptor | [<code>descriptor</code>](#module_descriptorSamples..descriptor) | 
| references | <code>Array.&lt;(string\|number)&gt;</code> | 
| circular | <code>Array.&lt;(string\|number)&gt;</code> | 

