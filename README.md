# functional-helpers
General usage utility functions.

## Modules

<dl>
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
</dl>

<a name="module_arrayHelpers"></a>

## arrayHelpers
Some simple utility functions for generating arrays or performing work on arrays.

**Version**: 1.0.0  
**Author**: Joshua Heagle <joshuaheagle@gmail.com>  

* [arrayHelpers](#module_arrayHelpers)
    * _static_
        * [.buildArray](#module_arrayHelpers.buildArray) ⇒ <code>Array.&lt;\*&gt;</code>
        * [.buildArrayOfReferences](#module_arrayHelpers.buildArrayOfReferences) ⇒ <code>Array.&lt;\*&gt;</code>
        * [.mergeArrays](#module_arrayHelpers.mergeArrays) ⇒ <code>Array</code>
        * [.compareArrays](#module_arrayHelpers.compareArrays) ⇒ <code>Object.&lt;string, number&gt;</code>
    * _inner_
        * [~buildArrayBase(useReference, item, length, [arr])](#module_arrayHelpers..buildArrayBase) ⇒ <code>Array.&lt;\*&gt;</code>
        * [~uniqueArray(array)](#module_arrayHelpers..uniqueArray) ⇒ <code>Array</code>

<a name="module_arrayHelpers.buildArray"></a>

### arrayHelpers.buildArray ⇒ <code>Array.&lt;\*&gt;</code>
Leverage buildArrayBase to generate an array filled with a copy of the provided item.
The length defines how long the array should be.

**Kind**: static constant of [<code>arrayHelpers</code>](#module_arrayHelpers)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| item | <code>\*</code> |  | The item to be used for each array element |
| length | <code>number</code> |  | The desired length of the array |
| [arr] | <code>Array</code> | <code>[]</code> | The in-progress array of elements to be built and returned, will be used internally |

<a name="module_arrayHelpers.buildArrayOfReferences"></a>

### arrayHelpers.buildArrayOfReferences ⇒ <code>Array.&lt;\*&gt;</code>
Leverage buildArrayBase to generate an array filled with references to the provided item.
The length defines how long the array should be.

**Kind**: static constant of [<code>arrayHelpers</code>](#module_arrayHelpers)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| item | <code>\*</code> |  | The item to be used for each array element |
| length | <code>number</code> |  | The desired length of the array |
| [arr] | <code>Array</code> | <code>[]</code> | The in-progress array of elements to be built and returned, will be used internally |

<a name="module_arrayHelpers.mergeArrays"></a>

### arrayHelpers.mergeArrays ⇒ <code>Array</code>
Take multiple arrays and then filter all these into one unique array.

**Kind**: static constant of [<code>arrayHelpers</code>](#module_arrayHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| ...arrays | <code>Array</code> | Provide mulitple arrays to create one unique array |

<a name="module_arrayHelpers.compareArrays"></a>

### arrayHelpers.compareArrays ⇒ <code>Object.&lt;string, number&gt;</code>
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

**Kind**: static constant of [<code>arrayHelpers</code>](#module_arrayHelpers)  

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
WARNING: This is a recursive function.

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
        * [.curry](#module_functionHelpers.curry) ⇒ <code>function</code> \| <code>\*</code>
        * [.pipe](#module_functionHelpers.pipe) ⇒ <code>\*</code>
        * [.callWithParams](#module_functionHelpers.callWithParams) ⇒ <code>\*</code>
        * [.delay](#module_functionHelpers.delay) ⇒ <code>delayHandler</code>
        * [.queueManager](#module_functionHelpers.queueManager) ⇒ <code>functionHelpers~queueManagerHandle</code>
        * [.queueTimeout](#module_functionHelpers.queueTimeout) ⇒ <code>functionHelpers~queueTimeoutHandle</code>
    * _inner_
        * [~queueManagerHandle(fn, ...args)](#module_functionHelpers..queueManagerHandle) ⇒ <code>Promise</code>
        * [~queueTimeoutHandle(fn, time, ...args)](#module_functionHelpers..queueTimeoutHandle) ⇒ <code>Promise</code>
        * [~delayHandler](#module_functionHelpers..delayHandler) : <code>Object</code>

<a name="module_functionHelpers.curry"></a>

### functionHelpers.curry ⇒ <code>function</code> \| <code>\*</code>
Return a curried version of the passed function.
The returned function expects the same number of arguments minus the ones provided.
fn is the name of the function being curried.

**Kind**: static constant of [<code>functionHelpers</code>](#module_functionHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | Receives a function to be curried |

<a name="module_functionHelpers.pipe"></a>

### functionHelpers.pipe ⇒ <code>\*</code>
Take one or more function with a single parameter and return value.
Pass a paramter and the value will be transformed by each function then returned.

**Kind**: static constant of [<code>functionHelpers</code>](#module_functionHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| ...fns | <code>function</code> | Takes a series of functions having the same parameter |

<a name="module_functionHelpers.callWithParams"></a>

### functionHelpers.callWithParams ⇒ <code>\*</code>
Given a function, call with the correct number of paramters from an array of possible parameters.

**Kind**: static constant of [<code>functionHelpers</code>](#module_functionHelpers)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| fn | <code>function</code> |  | The function to be called |
| params | <code>Array</code> |  | Array of possible function parameters |
| [minimum] | <code>number</code> | <code>2</code> | Minimumn number of parameters to use in the function |

<a name="module_functionHelpers.delay"></a>

### functionHelpers.delay ⇒ <code>delayHandler</code>
Provide a timeout which returns a promise.

**Kind**: static constant of [<code>functionHelpers</code>](#module_functionHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| time | <code>number</code> | Delay in milliseconds |

<a name="module_functionHelpers.queueManager"></a>

### functionHelpers.queueManager ⇒ <code>functionHelpers~queueManagerHandle</code>
Manage functions to run sequentially.

**Kind**: static constant of [<code>functionHelpers</code>](#module_functionHelpers)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [queue] | <code>Iterable</code> | <code>[]</code> | The iterable that can be used to store queued functions |

<a name="module_functionHelpers.queueTimeout"></a>

### functionHelpers.queueTimeout ⇒ <code>functionHelpers~queueTimeoutHandle</code>
Manage functions to run sequentially with delays.

**Kind**: static constant of [<code>functionHelpers</code>](#module_functionHelpers)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [queue] | <code>Iterable</code> | <code>[]</code> | The iterable that can be used to store queued functions |

<a name="module_functionHelpers..queueManagerHandle"></a>

### functionHelpers~queueManagerHandle(fn, ...args) ⇒ <code>Promise</code>
Each time queue handle is called the passed function is added to the queue to be called when ready.

**Kind**: inner method of [<code>functionHelpers</code>](#module_functionHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | A function to enqueue |
| ...args | <code>any</code> | Arguments to be passed to the function once it is ready |

<a name="module_functionHelpers..queueTimeoutHandle"></a>

### functionHelpers~queueTimeoutHandle(fn, time, ...args) ⇒ <code>Promise</code>
Run Timeout functions one after the otherin queue.

**Kind**: inner method of [<code>functionHelpers</code>](#module_functionHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | A callback function to be performed at some time in the future. |
| time | <code>number</code> | The time in milliseconds to delay. |
| ...args | <code>\*</code> | Arguments to be passed to the callback once it is implemented. |

<a name="module_functionHelpers..delayHandler"></a>

### functionHelpers~delayHandler : <code>Object</code>
Provide a way to cancel a request or attach a resolve event.

**Kind**: inner typedef of [<code>functionHelpers</code>](#module_functionHelpers)  
**Properties**

| Name | Type |
| --- | --- |
| resolver | <code>Promise</code> | 
| cancel | <code>function</code> | 

<a name="module_numberHelpers"></a>

## numberHelpers
Some number comparators and random number generators.

**Version**: 1.0.0  
**Author**: Joshua Heagle <joshuaheagle@gmail.com>  

* [numberHelpers](#module_numberHelpers)
    * [.getAbsoluteMax](#module_numberHelpers.getAbsoluteMax) ⇒ <code>number</code>
    * [.getAbsoluteMin](#module_numberHelpers.getAbsoluteMin) ⇒ <code>number</code>
    * [.randomNumber](#module_numberHelpers.randomNumber) ⇒ <code>number</code>
    * [.randomInteger](#module_numberHelpers.randomInteger) ⇒ <code>number</code>
    * [.compare](#module_numberHelpers.compare) ⇒ <code>number</code>

<a name="module_numberHelpers.getAbsoluteMax"></a>

### numberHelpers.getAbsoluteMax ⇒ <code>number</code>
Helper for returning the absolute max value

**Kind**: static constant of [<code>numberHelpers</code>](#module_numberHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| num1 | <code>number</code> | A number to compare |
| num2 | <code>number</code> | Another number to be compared against |

<a name="module_numberHelpers.getAbsoluteMin"></a>

### numberHelpers.getAbsoluteMin ⇒ <code>number</code>
Helper for returning the absolute min value

**Kind**: static constant of [<code>numberHelpers</code>](#module_numberHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| num1 | <code>number</code> | A number to compare |
| num2 | <code>number</code> | Another number to be compared against |

<a name="module_numberHelpers.randomNumber"></a>

### numberHelpers.randomNumber ⇒ <code>number</code>
Create a single random number within provided range. And with optional offset,
The distance between the result numbers can be adjusted with interval.

**Kind**: static constant of [<code>numberHelpers</code>](#module_numberHelpers)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| range | <code>number</code> |  | Choose the breadth of the random number (0-100 would be 100 for range) |
| [offset] | <code>number</code> | <code>0</code> | Choose the starting number (1-10 would be 1 for offset, 9 for range) |
| [interval] | <code>number</code> | <code>1</code> | Choose the distance between numbers (~5, ~10, ~15 would be 5 for interval, 1 for offset, 2 for range) |

<a name="module_numberHelpers.randomInteger"></a>

### numberHelpers.randomInteger ⇒ <code>number</code>
Create a single random integer within provide range. And with optional offset,
The distance between the result numbers can be adjusted with interval.

**Kind**: static constant of [<code>numberHelpers</code>](#module_numberHelpers)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| range | <code>number</code> |  | Choose the breadth of the random number (0-100 would be 100 for range) |
| [offset] | <code>number</code> | <code>0</code> | Choose the starting number (1-10 would be 1 for offset, 9 for range) |
| [interval] | <code>number</code> | <code>1</code> | Choose the distance between numbers (5, 10, 15 would be 5 for interval, 1 for offset, 2 for range) |

<a name="module_numberHelpers.compare"></a>

### numberHelpers.compare ⇒ <code>number</code>
Compare two numbers and return:
-1 to indicate val1 is less than val2
0 to indicate both values are the equal
1 to indicate val1 is greater than val2

**Kind**: static constant of [<code>numberHelpers</code>](#module_numberHelpers)  

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
        * [.setValue](#module_objectHelpers.setValue) ⇒ <code>Object</code> \| <code>Array</code>
        * [.setAndReturnValue](#module_objectHelpers.setAndReturnValue) ⇒ <code>\*</code>
        * [.mapObject](#module_objectHelpers.mapObject) ⇒ <code>Object</code> \| <code>Array</code>
        * [.mapProperty](#module_objectHelpers.mapProperty) ⇒ <code>object</code>
        * [.filterObject](#module_objectHelpers.filterObject) ⇒ <code>Object</code> \| <code>Array</code>
        * [.reduceObject](#module_objectHelpers.reduceObject) ⇒ <code>Object</code> \| <code>Array</code>
        * [.notEmptyObjectOrArray](#module_objectHelpers.notEmptyObjectOrArray) ⇒ <code>boolean</code>
        * [.traceObjectDetail](#module_objectHelpers.traceObjectDetail) ⇒ <code>objectMapDetail</code>
        * [.assignTraceObject](#module_objectHelpers.assignTraceObject) ⇒ <code>objectMap</code>
        * [.traceObject](#module_objectHelpers.traceObject) ⇒ <code>objectMap</code>
        * [.compareTrace](#module_objectHelpers.compareTrace) ⇒ <code>boolean</code>
        * [.traceObjectMap](#module_objectHelpers.traceObjectMap) ⇒ <code>objectTraceMap</code>
        * [.cloneObject](#module_objectHelpers.cloneObject) ⇒ <code>Object</code>
        * [.mergeObjects](#module_objectHelpers.mergeObjects) ⇒ <code>Object</code>
        * [.mergeObjectsMutable](#module_objectHelpers.mergeObjectsMutable) ⇒ <code>Object</code>
    * _inner_
        * [~traceObjectKeys(trace)](#module_objectHelpers..traceObjectKeys) ⇒ <code>Array.&lt;string&gt;</code>
        * [~traceObjectReferences(trace)](#module_objectHelpers..traceObjectReferences) ⇒ <code>Array.&lt;number&gt;</code>
        * [~traceObjectIsArray(trace)](#module_objectHelpers..traceObjectIsArray) ⇒ <code>boolean</code>
        * [~cloneTraceObject(originalMap)](#module_objectHelpers..cloneTraceObject) ⇒ <code>objectMap</code>
        * [~mergeObjectsBase(isMutable, fn, obj1, obj2)](#module_objectHelpers..mergeObjectsBase) ⇒ <code>Object</code>
        * [~mapCallback](#module_objectHelpers..mapCallback) ⇒ <code>\*</code>
        * [~filterCallback](#module_objectHelpers..filterCallback) ⇒ <code>boolean</code>
        * [~reduceCallback](#module_objectHelpers..reduceCallback) ⇒ <code>\*</code>

<a name="module_objectHelpers.setValue"></a>

### objectHelpers.setValue ⇒ <code>Object</code> \| <code>Array</code>
Set a value on an item, then return the item

**Kind**: static constant of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> \| <code>number</code> | The key on the item which will have its value set |
| value | <code>\*</code> | Any value to be applied to the key |
| item | <code>Object</code> \| <code>Array</code> | An object or array to be updated |

<a name="module_objectHelpers.setAndReturnValue"></a>

### objectHelpers.setAndReturnValue ⇒ <code>\*</code>
Set a value on an item, then return the value

**Kind**: static constant of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>Object</code> \| <code>Array</code> | An object or array to be updated |
| key | <code>string</code> \| <code>number</code> | The key on the item which will have its value set |
| value | <code>\*</code> | Any value to be applied to the key |

<a name="module_objectHelpers.mapObject"></a>

### objectHelpers.mapObject ⇒ <code>Object</code> \| <code>Array</code>
This function is intended to replicate behaviour of the Array.map() function but for Objects.
If an array is passed in instead then it will perform standard map(). It is recommended to
always use the standard map() function when it is known that the object is actually an array.

**Kind**: static constant of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> \| <code>Array</code> | The Object (or Array) to be mapped |
| fn | <code>mapCallback</code> \| <code>function</code> | The function to be processed for each mapped property |
| [thisArg] | <code>Object</code> \| <code>Array</code> | Optional. Value to use as this when executing callback. |

<a name="module_objectHelpers.mapProperty"></a>

### objectHelpers.mapProperty ⇒ <code>object</code>
Perform map on an array property of an object, then return the object

**Kind**: static constant of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| property | <code>string</code> | The string key for the array property to be mapped |
| mapFunction | <code>mapCallback</code> \| <code>function</code> | A function suitable to be passed to map |
| obj | <code>Object</code> \| <code>Array</code> | An object having an array property |

<a name="module_objectHelpers.filterObject"></a>

### objectHelpers.filterObject ⇒ <code>Object</code> \| <code>Array</code>
This function is intended to replicate behaviour of the Array.filter() function but for Objects.
If an array is passed in instead then it will perform standard filter(). It is recommended to
always use the standard filter() function when it is known that the object is actually an array.

**Kind**: static constant of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> \| <code>Array</code> | The Object (or Array) to be filtered |
| fn | <code>filterCallback</code> \| <code>function</code> | The function to be processed for each filtered property |
| [thisArg] | <code>Object</code> \| <code>Array</code> | Optional. Value to use as this when executing callback. |

<a name="module_objectHelpers.reduceObject"></a>

### objectHelpers.reduceObject ⇒ <code>Object</code> \| <code>Array</code>
This function is intended to replicate behaviour of the Array.reduce() function but for Objects.
If an array is passed in instead then it will perform standard reduce(). It is recommended to
always use the standard reduce() function when it is known that the object is actually an array.

**Kind**: static constant of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> \| <code>Array</code> | The Object (or Array) to be filtered |
| fn | <code>reduceCallback</code> \| <code>function</code> | The function to be processed for each filtered property |
| [initialValue] | <code>Object</code> \| <code>Array</code> | Optional. Value to use as the first argument to the first call of the callback. If no initial value is supplied, the first element in the array will be used. Calling reduce on an empty array without an initial value is an error. |

<a name="module_objectHelpers.notEmptyObjectOrArray"></a>

### objectHelpers.notEmptyObjectOrArray ⇒ <code>boolean</code>
Helper function for testing if the item is an Object or Array that contains properties or elements

**Kind**: static constant of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>Object</code> \| <code>Array</code> | Object or Array to test |

<a name="module_objectHelpers.traceObjectDetail"></a>

### objectHelpers.traceObjectDetail ⇒ <code>objectMapDetail</code>
Trace an object's attribute and provide details about it.

**Kind**: static constant of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type | Default |
| --- | --- | --- |
| value | <code>\*</code> |  | 
| [key] | <code>string</code> \| <code>number</code> | <code>0</code> | 
| [index] | <code>number</code> | <code>0</code> | 

<a name="module_objectHelpers.assignTraceObject"></a>

### objectHelpers.assignTraceObject ⇒ <code>objectMap</code>
Apply one or more objectMaps to an existing objectMap so that they represent a merged version of the objectMaps.

**Kind**: static constant of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type |
| --- | --- |
| originalMap | <code>objectMap</code> | 
| ...objectMaps | <code>objectMap</code> | 

<a name="module_objectHelpers.traceObject"></a>

### objectHelpers.traceObject ⇒ <code>objectMap</code>
Trace an object and return the trace which defines the object's structure and attributes.

**Kind**: static constant of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type |
| --- | --- |
| object | <code>Object</code> | 

<a name="module_objectHelpers.compareTrace"></a>

### objectHelpers.compareTrace ⇒ <code>boolean</code>
Check if two traces are the same or similar in that they have similar keys and the associated types are the same.

**Kind**: static constant of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type |
| --- | --- |
| trace1 | <code>objectMap</code> | 
| trace2 | <code>objectMap</code> | 

<a name="module_objectHelpers.traceObjectMap"></a>

### objectHelpers.traceObjectMap ⇒ <code>objectTraceMap</code>
Trace out the entire object including nested objects.

**Kind**: static constant of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type | Default |
| --- | --- | --- |
| object | <code>Object</code> \| <code>Array</code> |  | 
| [mapLimit] | <code>number</code> | <code>1000</code> | 
| [depthLimit] | <code>number</code> | <code>-1</code> | 

<a name="module_objectHelpers.cloneObject"></a>

### objectHelpers.cloneObject ⇒ <code>Object</code>
Clone objects for manipulation without data corruption, returns a copy of the provided object.

**Kind**: static constant of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>Object</code> | The original object that is being cloned |

<a name="module_objectHelpers.mergeObjects"></a>

### objectHelpers.mergeObjects ⇒ <code>Object</code>
Perform a deep merge of objects. This will combine all objects and sub-objects,
objects having the same attributes will overwrite starting from the end of the argument
list and bubbling up to return a merged version of the first object.
WARNING: This is a recursive function.

**Kind**: static constant of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>Object</code> | Provide a list of objects which will be merged starting from the end up into the first object |

<a name="module_objectHelpers.mergeObjectsMutable"></a>

### objectHelpers.mergeObjectsMutable ⇒ <code>Object</code>
Perform a deep merge of objects. This will combine all objects and sub-objects,
objects having the same attributes will overwrite starting from the end of the argument
list and bubbling up to return the overwritten first object.
WARNING: This is a recursive function.
WARNING: This will mutate the first object passed in as input

**Kind**: static constant of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>Object</code> | Provide a list of objects which will be merged starting from the end up into the first object |

<a name="module_objectHelpers..traceObjectKeys"></a>

### objectHelpers~traceObjectKeys(trace) ⇒ <code>Array.&lt;string&gt;</code>
Build an array of all keys from the details of this trace.

**Kind**: inner method of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type |
| --- | --- |
| trace | <code>objectMap</code> | 

<a name="module_objectHelpers..traceObjectReferences"></a>

### objectHelpers~traceObjectReferences(trace) ⇒ <code>Array.&lt;number&gt;</code>
Create an array of the indexes in the details that contain references.

**Kind**: inner method of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type |
| --- | --- |
| trace | <code>objectMap</code> | 

<a name="module_objectHelpers..traceObjectIsArray"></a>

### objectHelpers~traceObjectIsArray(trace) ⇒ <code>boolean</code>
Check based on the detail keys if this trace represents an array.

**Kind**: inner method of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type |
| --- | --- |
| trace | <code>objectMap</code> | 

<a name="module_objectHelpers..cloneTraceObject"></a>

### objectHelpers~cloneTraceObject(originalMap) ⇒ <code>objectMap</code>
Make a copy of an object trace so that the original will not be mutated.

**Kind**: inner method of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type |
| --- | --- |
| originalMap | <code>objectMap</code> | 

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
| fn | <code>mergeObjects</code> \| <code>mergeObjectsMutable</code> \| <code>function</code> | Pass one of the mergeObjects functions to be used |
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

