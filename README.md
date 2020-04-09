# functional-helpers
General usage utility functions.

<a name="module_functionalHelpers"></a>

## functionalHelpers : <code>Object</code>
All methods exported from this module are encapsulated within functionalHelpers.

**Author**: Joshua Heagle <joshuaheagle@gmail.com>  

* [functionalHelpers](#module_functionalHelpers) : <code>Object</code>
    * [~noConflict()](#module_functionalHelpers..noConflict) ⇒ <code>functionalHelpers</code>
    * [~curry(fn)](#module_functionalHelpers..curry) ⇒ <code>function</code>
    * [~pipe(...fns)](#module_functionalHelpers..pipe) ⇒ <code>function</code>
    * [~callWithParams(fn, params, [minimum])](#module_functionalHelpers..callWithParams) ⇒ <code>\*</code>
    * [~setValue(key, value, item)](#module_functionalHelpers..setValue) ⇒ <code>Object</code> \| <code>Array</code>
    * [~setAndReturnValue(item, key, value)](#module_functionalHelpers..setAndReturnValue) ⇒ <code>\*</code>
    * [~mapObject(obj, fn, [thisArg])](#module_functionalHelpers..mapObject) ⇒ <code>Object</code> \| <code>Array</code>
    * [~mapArrayProperty(property, mapFunction, obj)](#module_functionalHelpers..mapArrayProperty) ⇒ <code>object</code>
    * [~filterObject(obj, fn, [thisArg])](#module_functionalHelpers..filterObject) ⇒ <code>Object</code> \| <code>Array</code>
    * [~reduceObject(obj, fn, [initialValue])](#module_functionalHelpers..reduceObject) ⇒ <code>Object</code> \| <code>Array</code>
    * [~notEmptyObjectOrArray(item)](#module_functionalHelpers..notEmptyObjectOrArray) ⇒ <code>boolean</code>
    * [~cloneObject(object)](#module_functionalHelpers..cloneObject) ⇒ <code>Object</code>
    * [~mergeObjects(...args)](#module_functionalHelpers..mergeObjects) ⇒ <code>Object</code>
    * [~mergeObjectsMutable(...args)](#module_functionalHelpers..mergeObjectsMutable) ⇒ <code>Object</code>
    * [~buildArray(item, length, [arr])](#module_functionalHelpers..buildArray) ⇒ <code>Array.&lt;\*&gt;</code>
    * [~buildArrayOfReferences(item, length, [arr])](#module_functionalHelpers..buildArrayOfReferences) ⇒ <code>Array.&lt;\*&gt;</code>
    * [~inArray(arr, prop)](#module_functionalHelpers..inArray) ⇒ <code>boolean</code>
    * [~getAbsoluteMax(num1, num2)](#module_functionalHelpers..getAbsoluteMax) ⇒ <code>number</code>
    * [~getAbsoluteMin(num1, num2)](#module_functionalHelpers..getAbsoluteMin) ⇒ <code>number</code>
    * [~randomNumber(range, [offset], [interval])](#module_functionalHelpers..randomNumber) ⇒ <code>number</code>
    * [~randomInteger(range, [offset], [interval])](#module_functionalHelpers..randomInteger) ⇒ <code>number</code>
    * [~compare(val1, val2)](#module_functionalHelpers..compare) ⇒ <code>number</code>
    * [~compareArrays(arr1, arr2)](#module_functionalHelpers..compareArrays) ⇒ <code>Object.&lt;string, number&gt;</code>
    * [~trace(label)](#module_functionalHelpers..trace) ⇒ <code>function</code>
    * [~queueTimeout(fn, time, ...args)](#module_functionalHelpers..queueTimeout) ⇒ <code>Object</code>
    * [~mapCallback](#module_functionalHelpers..mapCallback) ⇒ <code>\*</code>
    * [~filterCallback](#module_functionalHelpers..filterCallback) ⇒ <code>boolean</code>
    * [~reduceCallback](#module_functionalHelpers..reduceCallback) ⇒ <code>\*</code>

<a name="module_functionalHelpers..noConflict"></a>

### functionalHelpers~noConflict() ⇒ <code>functionalHelpers</code>
Return a reference to this library while preserving the original same-named library

**Kind**: inner method of [<code>functionalHelpers</code>](#module_functionalHelpers)  
<a name="module_functionalHelpers..curry"></a>

### functionalHelpers~curry(fn) ⇒ <code>function</code>
Return a curried version of the passed function.
The returned function expects the same number of arguments minus the ones provided.
fn is the name of the function being curried.

**Kind**: inner method of [<code>functionalHelpers</code>](#module_functionalHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | Receives a function to be curried |

<a name="module_functionalHelpers..pipe"></a>

### functionalHelpers~pipe(...fns) ⇒ <code>function</code>
Take one or more function with a single parameter and return value.
Pass a paramter and the value will be transformed by each function then returned.

**Kind**: inner method of [<code>functionalHelpers</code>](#module_functionalHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| ...fns | <code>function</code> | Takes a series of functions having the same parameter |

<a name="module_functionalHelpers..callWithParams"></a>

### functionalHelpers~callWithParams(fn, params, [minimum]) ⇒ <code>\*</code>
Given a function, call with the correct number of paramters from an array of possible parameters.

**Kind**: inner method of [<code>functionalHelpers</code>](#module_functionalHelpers)  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 
| params | <code>Array</code> | 
| [minimum] | <code>number</code> | 

<a name="module_functionalHelpers..setValue"></a>

### functionalHelpers~setValue(key, value, item) ⇒ <code>Object</code> \| <code>Array</code>
Set a value on an item, then return the item

**Kind**: inner method of [<code>functionalHelpers</code>](#module_functionalHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> \| <code>number</code> | The key on the item which will have its value set |
| value | <code>\*</code> | Any value to be applied to the key |
| item | <code>Object</code> \| <code>Array</code> | An object or array to be updated |

<a name="module_functionalHelpers..setAndReturnValue"></a>

### functionalHelpers~setAndReturnValue(item, key, value) ⇒ <code>\*</code>
Set a value on an item, then return the value

**Kind**: inner method of [<code>functionalHelpers</code>](#module_functionalHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>Object</code> \| <code>Array</code> | An object or array to be updated |
| key | <code>string</code> \| <code>number</code> | The key on the item which will have its value set |
| value | <code>\*</code> | Any value to be applied to the key |

<a name="module_functionalHelpers..mapObject"></a>

### functionalHelpers~mapObject(obj, fn, [thisArg]) ⇒ <code>Object</code> \| <code>Array</code>
This function is intended to replicate behaviour of the Array.map() function but for Objects.
If an array is passed in instead then it will perform standard map(). It is recommended to
always use the standard map() function when it is known that the object is actually an array.

**Kind**: inner method of [<code>functionalHelpers</code>](#module_functionalHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> \| <code>Array</code> | The Object (or Array) to be mapped |
| fn | [<code>mapCallback</code>](#module_functionalHelpers..mapCallback) \| <code>function</code> | The function to be processed for each mapped property |
| [thisArg] | <code>Object</code> \| <code>Array</code> | Optional. Value to use as this when executing callback. |

<a name="module_functionalHelpers..mapArrayProperty"></a>

### functionalHelpers~mapArrayProperty(property, mapFunction, obj) ⇒ <code>object</code>
Perform map on an array property of an object, then return the object

**Kind**: inner method of [<code>functionalHelpers</code>](#module_functionalHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| property | <code>string</code> | The string key for the array property to be mapped |
| mapFunction | [<code>mapCallback</code>](#module_functionalHelpers..mapCallback) \| <code>function</code> | A function suitable to be passed to map |
| obj | <code>Object</code> \| <code>Array</code> | An object having an array property |

<a name="module_functionalHelpers..filterObject"></a>

### functionalHelpers~filterObject(obj, fn, [thisArg]) ⇒ <code>Object</code> \| <code>Array</code>
This function is intended to replicate behaviour of the Array.filter() function but for Objects.
If an array is passed in instead then it will perform standard filter(). It is recommended to
always use the standard filter() function when it is known that the object is actually an array.

**Kind**: inner method of [<code>functionalHelpers</code>](#module_functionalHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> \| <code>Array</code> | The Object (or Array) to be filtered |
| fn | [<code>filterCallback</code>](#module_functionalHelpers..filterCallback) \| <code>function</code> | The function to be processed for each filtered property |
| [thisArg] | <code>Object</code> \| <code>Array</code> | Optional. Value to use as this when executing callback. |

<a name="module_functionalHelpers..reduceObject"></a>

### functionalHelpers~reduceObject(obj, fn, [initialValue]) ⇒ <code>Object</code> \| <code>Array</code>
This function is intended to replicate behaviour of the Array.reduce() function but for Objects.
If an array is passed in instead then it will perform standard reduce(). It is recommended to
always use the standard reduce() function when it is known that the object is actually an array.

**Kind**: inner method of [<code>functionalHelpers</code>](#module_functionalHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> \| <code>Array</code> | The Object (or Array) to be filtered |
| fn | [<code>reduceCallback</code>](#module_functionalHelpers..reduceCallback) \| <code>function</code> | The function to be processed for each filtered property |
| [initialValue] | <code>Object</code> \| <code>Array</code> | Optional. Value to use as the first argument to the first call of the callback. If no initial value is supplied, the first element in the array will be used. Calling reduce on an empty array without an initial value is an error. |

<a name="module_functionalHelpers..notEmptyObjectOrArray"></a>

### functionalHelpers~notEmptyObjectOrArray(item) ⇒ <code>boolean</code>
Helper function for testing if the item is an Object or Array that contains properties or elements

**Kind**: inner method of [<code>functionalHelpers</code>](#module_functionalHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>Object</code> \| <code>Array</code> | Object or Array to test |

<a name="module_functionalHelpers..cloneObject"></a>

### functionalHelpers~cloneObject(object) ⇒ <code>Object</code>
Clone objects for manipulation without data corruption, returns a copy of the provided object.

**Kind**: inner method of [<code>functionalHelpers</code>](#module_functionalHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>Object</code> | The original object that is being cloned |

<a name="module_functionalHelpers..mergeObjects"></a>

### functionalHelpers~mergeObjects(...args) ⇒ <code>Object</code>
Perform a deep merge of objects. This will combine all objects and sub-objects,
objects having the same attributes will overwrite starting from the end of the argument
list and bubbling up to return a merged version of the first object.
WARNING: This is a recursive function.

**Kind**: inner method of [<code>functionalHelpers</code>](#module_functionalHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>Object</code> | Provide a list of objects which will be merged starting from the end up into the first object |

<a name="module_functionalHelpers..mergeObjectsMutable"></a>

### functionalHelpers~mergeObjectsMutable(...args) ⇒ <code>Object</code>
Perform a deep merge of objects. This will combine all objects and sub-objects,
objects having the same attributes will overwrite starting from the end of the argument
list and bubbling up to return the overwritten first object.
WARNING: This is a recursive function.
WARNING: This will mutate the first object passed in as input

**Kind**: inner method of [<code>functionalHelpers</code>](#module_functionalHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>Object</code> | Provide a list of objects which will be merged starting from the end up into the first object |

<a name="module_functionalHelpers..buildArray"></a>

### functionalHelpers~buildArray(item, length, [arr]) ⇒ <code>Array.&lt;\*&gt;</code>
Leverage buildArrayBase to generate an array filled with a copy of the provided item.
The length defines how long the array should be.

**Kind**: inner method of [<code>functionalHelpers</code>](#module_functionalHelpers)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| item | <code>\*</code> |  | The item to be used for each array element |
| length | <code>number</code> |  | The desired length of the array |
| [arr] | <code>Array</code> | <code>[]</code> | The in-progress array of elements to be built and returned, will be used internally |

<a name="module_functionalHelpers..buildArrayOfReferences"></a>

### functionalHelpers~buildArrayOfReferences(item, length, [arr]) ⇒ <code>Array.&lt;\*&gt;</code>
Leverage buildArrayBase to generate an array filled with references to the provided item.
The length defines how long the array should be.

**Kind**: inner method of [<code>functionalHelpers</code>](#module_functionalHelpers)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| item | <code>\*</code> |  | The item to be used for each array element |
| length | <code>number</code> |  | The desired length of the array |
| [arr] | <code>Array</code> | <code>[]</code> | The in-progress array of elements to be built and returned, will be used internally |

<a name="module_functionalHelpers..inArray"></a>

### functionalHelpers~inArray(arr, prop) ⇒ <code>boolean</code>
A simple function to check if an item is in an array

**Kind**: inner method of [<code>functionalHelpers</code>](#module_functionalHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | Haystack which may contain the specified property |
| prop | <code>\*</code> | Needle to be found within the haystack |

<a name="module_functionalHelpers..getAbsoluteMax"></a>

### functionalHelpers~getAbsoluteMax(num1, num2) ⇒ <code>number</code>
Helper for returning the absolute max value

**Kind**: inner method of [<code>functionalHelpers</code>](#module_functionalHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| num1 | <code>number</code> | A number to compare |
| num2 | <code>number</code> | Another number to be compared against |

<a name="module_functionalHelpers..getAbsoluteMin"></a>

### functionalHelpers~getAbsoluteMin(num1, num2) ⇒ <code>number</code>
Helper for returning the absolute min value

**Kind**: inner method of [<code>functionalHelpers</code>](#module_functionalHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| num1 | <code>number</code> | A number to compare |
| num2 | <code>number</code> | Another number to be compared against |

<a name="module_functionalHelpers..randomNumber"></a>

### functionalHelpers~randomNumber(range, [offset], [interval]) ⇒ <code>number</code>
Create a single random number within provided range. And with optional offset,
The distance between the result numbers can be adjusted with interval.

**Kind**: inner method of [<code>functionalHelpers</code>](#module_functionalHelpers)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| range | <code>number</code> |  | Choose the breadth of the random number (0-100 would be 100 for range) |
| [offset] | <code>number</code> | <code>0</code> | Choose the starting number (1-10 would be 1 for offset, 9 for range) |
| [interval] | <code>number</code> | <code>1</code> | Choose the distance between numbers (~5, ~10, ~15 would be 5 for interval, 1 for offset, 2 for range) |

<a name="module_functionalHelpers..randomInteger"></a>

### functionalHelpers~randomInteger(range, [offset], [interval]) ⇒ <code>number</code>
Create a single random integer within provide range. And with optional offset,
The distance between the result numbers can be adjusted with interval.

**Kind**: inner method of [<code>functionalHelpers</code>](#module_functionalHelpers)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| range | <code>number</code> |  | Choose the breadth of the random number (0-100 would be 100 for range) |
| [offset] | <code>number</code> | <code>0</code> | Choose the starting number (1-10 would be 1 for offset, 9 for range) |
| [interval] | <code>number</code> | <code>1</code> | Choose the distance between numbers (5, 10, 15 would be 5 for interval, 1 for offset, 2 for range) |

<a name="module_functionalHelpers..compare"></a>

### functionalHelpers~compare(val1, val2) ⇒ <code>number</code>
Compare two numbers and return:
-1 to indicate val1 is less than val2
0 to indicate both values are the equal
1 to indicate val1 is greater than val2

**Kind**: inner method of [<code>functionalHelpers</code>](#module_functionalHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| val1 | <code>number</code> | The first number to compare |
| val2 | <code>number</code> | The second number to compare |

<a name="module_functionalHelpers..compareArrays"></a>

### functionalHelpers~compareArrays(arr1, arr2) ⇒ <code>Object.&lt;string, number&gt;</code>
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

**Kind**: inner method of [<code>functionalHelpers</code>](#module_functionalHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| arr1 | <code>Array</code> | The first array to compare |
| arr2 | <code>Array</code> | The second array to compare |

**Example**  
```js
// example of input and resulting output
functionalHelpers.compareArrays(
  ['match1', 'firstMismatch1', 'match2', 'firstMismatch2', 'badMatch1'],
  ['match1', 'match2', 'secondMismatch1', 'badMatch1', 'badMatch1']
)
// unique array
['secondMismatch1', 'match1', 'firstMismatch1', 'match2', 'firstMismatch2', 'badMatch1']
// result object
{secondMismatch1: -1, match1: 0, firstMismatch1: 1, match2: 0, firstMismatch2: 1, badMatch1: -1}
```
<a name="module_functionalHelpers..trace"></a>

### functionalHelpers~trace(label) ⇒ <code>function</code>
This was adapted from a blog post on Composing Software written by Eric Elliott. Trace provides a way to traces
steps through code via the console, while maintaining the functional-style return value.
Returns a function which can then receive a value to output, the value will then be returned.

**Kind**: inner method of [<code>functionalHelpers</code>](#module_functionalHelpers)  
**Author**: Eric Elliott  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>string</code> | Pass an identifying label of the value being output. |

<a name="module_functionalHelpers..queueTimeout"></a>

### functionalHelpers~queueTimeout(fn, time, ...args) ⇒ <code>Object</code>
Run Timeout functions one after the other in queue. This function needs some work to comply with the standards
applied to the rest of this file where this is not a Pure function, and it does not reliably return a result. This
implementation should likely be used with Promise instead.
WARNING: This is a recursive function.

**Kind**: inner method of [<code>functionalHelpers</code>](#module_functionalHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> \| <code>object</code> \| <code>boolean</code> | A callback function to be performed at some time in the future. |
| time | <code>number</code> | The time in milliseconds to delay. |
| ...args | <code>\*</code> | Arguments to be passed to the callback once it is implemented. |

<a name="module_functionalHelpers..mapCallback"></a>

### functionalHelpers~mapCallback ⇒ <code>\*</code>
Function that produces a property of the new Object, taking three arguments

**Kind**: inner typedef of [<code>functionalHelpers</code>](#module_functionalHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| currentProperty | <code>\*</code> | The current property being processed in the object. |
| [currentIndex] | <code>string</code> | The property name of the current property being processed in the object. |
| [object] | <code>Object</code> \| <code>Array</code> | The object map was called upon. |

<a name="module_functionalHelpers..filterCallback"></a>

### functionalHelpers~filterCallback ⇒ <code>boolean</code>
Function is a predicate, to test each property value of the object. Return true to keep the element, false
otherwise, taking three arguments

**Kind**: inner typedef of [<code>functionalHelpers</code>](#module_functionalHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| currentProperty | <code>\*</code> | The current property being processed in the object. |
| [currentIndex] | <code>string</code> | The property name of the current property being processed in the object. |
| [object] | <code>Object</code> \| <code>Array</code> | The object filter was called upon. |

<a name="module_functionalHelpers..reduceCallback"></a>

### functionalHelpers~reduceCallback ⇒ <code>\*</code>
Function to execute on each property in the object, taking four arguments

**Kind**: inner typedef of [<code>functionalHelpers</code>](#module_functionalHelpers)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [accumulator] | <code>\*</code> | <code>{}</code> | The accumulator accumulates the callback's return values; it is the accumulated value previously returned in the last invocation of the callback, or initialValue, if supplied (see below). |
| [currentProperty] | <code>\*</code> | <code>{}</code> | The current property being processed in the object. |
| [currentIndex] | <code>string</code> | <code>0</code> | The index of the current element being processed in the array. Starts at index 0, if an initialValue is provided, and at index 1 otherwise. |
| [object] | <code>Object</code> \| <code>Array</code> | <code>{}</code> | The object reduce was called upon. |

