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
</dl>

<a name="module_functionalHelpers"></a>

## functionalHelpers
All of the functionalHelpers system functions for stringing together functions and simplifying logic.

**Version**: 1.0.0  
**Author**: Joshua Heagle <joshuaheagle@gmail.com>  

* [functionalHelpers](#module_functionalHelpers)
    * [~root](#module_functionalHelpers..root)
    * [~previousFunctionalHelpers](#module_functionalHelpers..previousFunctionalHelpers) : <code>module</code> \| <code>\*</code>
    * [~noConflict()](#module_functionalHelpers..noConflict) ⇒ <code>functionalHelpers</code>
    * [~functionalHelpers](#module_functionalHelpers..functionalHelpers) : [<code>functionalHelpers</code>](#module_functionalHelpers) \| [<code>arrayHelpers</code>](#module_arrayHelpers) \| [<code>objectDescriptors</code>](#module_objectDescriptors) \| [<code>functionHelpers</code>](#module_functionHelpers) \| [<code>numberHelpers</code>](#module_numberHelpers) \| [<code>objectHelpers</code>](#module_objectHelpers)

<a name="module_functionalHelpers..root"></a>

### functionalHelpers~root
Store a reference to this scope which will be Window if rendered via browser

**Kind**: inner constant of [<code>functionalHelpers</code>](#module_functionalHelpers)  
<a name="module_functionalHelpers..previousFunctionalHelpers"></a>

### functionalHelpers~previousFunctionalHelpers : <code>module</code> \| <code>\*</code>
Store reference to any pre-existing module of the same name

**Kind**: inner constant of [<code>functionalHelpers</code>](#module_functionalHelpers)  
<a name="module_functionalHelpers..noConflict"></a>

### functionalHelpers~noConflict() ⇒ <code>functionalHelpers</code>
Return a reference to this library while preserving the original same-named library

**Kind**: inner method of [<code>functionalHelpers</code>](#module_functionalHelpers)  
<a name="module_functionalHelpers..functionalHelpers"></a>

### functionalHelpers~functionalHelpers : [<code>functionalHelpers</code>](#module_functionalHelpers) \| [<code>arrayHelpers</code>](#module_arrayHelpers) \| [<code>objectDescriptors</code>](#module_objectDescriptors) \| [<code>functionHelpers</code>](#module_functionHelpers) \| [<code>numberHelpers</code>](#module_numberHelpers) \| [<code>objectHelpers</code>](#module_objectHelpers)
All methods exported from this module are encapsulated within functionalHelpers.

**Kind**: inner typedef of [<code>functionalHelpers</code>](#module_functionalHelpers)  
<a name="module_arrayHelpers"></a>

## arrayHelpers
Some simple utility functions for generating arrays or performing work on arrays.

**Version**: 1.0.0  
**Author**: Joshua Heagle <joshuaheagle@gmail.com>  

* [arrayHelpers](#module_arrayHelpers)
    * _static_
        * [.addUniqueToArray(item, array)](#module_arrayHelpers.addUniqueToArray) ⇒ <code>Array</code> \| <code>Buffer</code> \| <code>\*</code> \| <code>string</code>
        * [.buildArray(item, length)](#module_arrayHelpers.buildArray) ⇒ <code>Array.&lt;\*&gt;</code>
        * [.buildArrayOfReferences(item, length)](#module_arrayHelpers.buildArrayOfReferences) ⇒ <code>Array.&lt;\*&gt;</code>
        * [.compareArrays(...arrays)](#module_arrayHelpers.compareArrays) ⇒ [<code>Array.&lt;compareArrayResult&gt;</code>](#module_arrayHelpers..compareArrayResult)
        * [.mergeArrays(...arrays)](#module_arrayHelpers.mergeArrays) ⇒ <code>Array</code>
        * [.uniqueArray(array)](#module_arrayHelpers.uniqueArray) ⇒ <code>Array</code>
    * _inner_
        * [~compareArrayResult](#module_arrayHelpers..compareArrayResult) : <code>Object.&lt;string, (string\|Array.&lt;number&gt;)&gt;</code>

<a name="module_arrayHelpers.addUniqueToArray"></a>

### arrayHelpers.addUniqueToArray(item, array) ⇒ <code>Array</code> \| <code>Buffer</code> \| <code>\*</code> \| <code>string</code>
Having an array and a potential new array element, check if the element is in the array, if not append to array.

**Kind**: static method of [<code>arrayHelpers</code>](#module_arrayHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>\*</code> | An potential array element, possibly a DomItem |
| array | <code>Array</code> | An array where an element may be appended. |

<a name="module_arrayHelpers.buildArray"></a>

### arrayHelpers.buildArray(item, length) ⇒ <code>Array.&lt;\*&gt;</code>
Leverage buildArrayBase to generate an array filled with a copy of the provided item.The length defines how long the array should be.

**Kind**: static method of [<code>arrayHelpers</code>](#module_arrayHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>\*</code> | The item to be used for each array element |
| length | <code>number</code> | The desired length of the array |

<a name="module_arrayHelpers.buildArrayOfReferences"></a>

### arrayHelpers.buildArrayOfReferences(item, length) ⇒ <code>Array.&lt;\*&gt;</code>
Leverage buildArrayBase to generate an array filled with references to the provided item.The length defines how long the array should be.

**Kind**: static method of [<code>arrayHelpers</code>](#module_arrayHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>\*</code> | The item to be used for each array element |
| length | <code>number</code> | The desired length of the array |

<a name="module_arrayHelpers.compareArrays"></a>

### arrayHelpers.compareArrays(...arrays) ⇒ [<code>Array.&lt;compareArrayResult&gt;</code>](#module_arrayHelpers..compareArrayResult)
Compare two Arrays and return the Object where the value for each property is as follows:-1 to indicate val1 is less than val20 to indicate both values are the equal1 to indicate val1 is greater than val2The returned Object uses the element values as the property namesThis functions works by first creating a concatenated array of all unique values. Then for each unique values,convert to a string and use it as a new property name. Array filter each array checking if it has the unique value.Use the lengths of these filtered arrays to compare. So if the first array has the value and the second one doesn'tthe first length will be one or more and the second will be zero, if the both have the value then both will be oneor more.

**Kind**: static method of [<code>arrayHelpers</code>](#module_arrayHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| ...arrays | <code>Array</code> | The arrays to compare |

**Example**  
```js
// example of input and resulting outputcompareArrays(  ['match1', 'firstMismatch1', 'match2', 'firstMismatch2', 'badMatch1'],  ['match1', 'match2', 'secondMismatch1', 'badMatch1', 'badMatch1'])// unique array['match1', 'firstMismatch1', 'match2', 'firstMismatch2', 'badMatch1', 'secondMismatch1']// result object[  {    value: 'match1',    keys: [[0], [0]],    result: [0, 0]  },  {    value: 'firstMismatch1',    keys: [[1], []],    result: [1, -1]  },  {    value: 'match2',    keys: [[2], [1]],    result: [0, 0]  },  {    value: 'firstMismatch2',    keys: [[3], []],    result: [1, -1]  },  {    value: 'badMatch1',    keys: [[4], [3, 4]],    result: [0, 0]  },  {    value: 'secondMismatch1',    keys: [[], [2]],    result: [-1, 1]  }]
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
Remove duplicate values from an array.

**Kind**: static method of [<code>arrayHelpers</code>](#module_arrayHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> | The array to make unique |

<a name="module_arrayHelpers..compareArrayResult"></a>

### arrayHelpers~compareArrayResult : <code>Object.&lt;string, (string\|Array.&lt;number&gt;)&gt;</code>
Store the comparison result for an element that may exist in either of compared arrays.- value stores the element value from the arrays being compared- results has the comparison results where first index (0) is result for first compared array  and the second index (1) will be the result for the second compared array

**Kind**: inner typedef of [<code>arrayHelpers</code>](#module_arrayHelpers)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | The element value being compared |
| keys | <code>Array.&lt;Array.&lt;(string\|number)&gt;&gt;</code> | Keys in arrays associated with this value |
| result | <code>Array.&lt;number&gt;</code> | The results in the order of the compared arrays |

**Example**  
```js
// example of input and resulting outputconst arr1 = ['match1', 'firstMismatch1', 'match2', 'firstMismatch2', 'badMatch1']const arr2 = ['match1', 'match2', 'secondMismatch1', 'badMatch1', 'badMatch1']// Taking the first element in both, then the value: 'match1' exists in both arrays// compareArrayResult will be { value: 'match1', result: [0, 0] }// First index of 0 indicates this value in the first array exists in the second array// Second index of 0 indicates this value in the second array exists in the first array// Taking the second element in the first array, then the value: 'firstMismatch1' exists in only the first array// compareArrayResult will be { value: 'firstMismatch1', result: [1, -1] }// First index of 1 indicates this value in the first array might need to be added to the second array// Second index of -1 indicates this value only exists in the first array// Taking the third element in the second array, then the value: 'secondMismatch1' exists in only the second array// compareArrayResult will be { value: 'secondMismatch1', result: [-1, 1] }// First index of -1 indicates this value only exists in the second array// Second index of 1 indicates this value in the second array might need to be added to the first array
```
<a name="module_objectDescriptors"></a>

## objectDescriptors
Create a format to standardize every object into a specific template.

**Version**: 1.0.0  
**Author**: Joshua Heagle <joshuaheagle@gmail.com>  

* [objectDescriptors](#module_objectDescriptors)
    * _static_
        * [.descriptorSample](#module_objectDescriptors.descriptorSample) : [<code>descriptor</code>](#module_objectDescriptors..descriptor)
        * [.descriptorDetailSample](#module_objectDescriptors.descriptorDetailSample) : [<code>descriptorDetail</code>](#module_objectDescriptors..descriptorDetail)
        * [.descriptorMapSample](#module_objectDescriptors.descriptorMapSample) : [<code>descriptorMap</code>](#module_objectDescriptors..descriptorMap)
        * [.mappedDescriptorMap](#module_objectDescriptors.mappedDescriptorMap) : [<code>descriptorMap</code>](#module_objectDescriptors..descriptorMap)
        * [.assignDescriptor(originalMap, ...descriptors)](#module_objectDescriptors.assignDescriptor) ⇒ [<code>descriptor</code>](#module_objectDescriptors..descriptor)
        * [.assignDescriptorDetail(originalDetail, ...details)](#module_objectDescriptors.assignDescriptorDetail) ⇒ [<code>descriptorDetail</code>](#module_objectDescriptors..descriptorDetail)
        * [.checkClearValues(descriptor, [keepValues])](#module_objectDescriptors.checkClearValues) ⇒ [<code>descriptor</code>](#module_objectDescriptors..descriptor)
        * [.checkDescriptorComplete(descriptor)](#module_objectDescriptors.checkDescriptorComplete) ⇒ [<code>descriptor</code>](#module_objectDescriptors..descriptor)
        * [.cloneDescriptor(originalMap)](#module_objectDescriptors.cloneDescriptor) ⇒ [<code>descriptor</code>](#module_objectDescriptors..descriptor)
        * [.cloneDescriptorDetail(originalDetail)](#module_objectDescriptors.cloneDescriptorDetail) ⇒ [<code>descriptorDetail</code>](#module_objectDescriptors..descriptorDetail)
        * [.compareDescriptor(descriptor1, descriptor2)](#module_objectDescriptors.compareDescriptor) ⇒ <code>boolean</code>
        * [.describeObject(object)](#module_objectDescriptors.describeObject) ⇒ [<code>descriptor</code>](#module_objectDescriptors..descriptor)
        * [.describeObjectDetail(value, [key], [index])](#module_objectDescriptors.describeObjectDetail) ⇒ [<code>descriptorDetail</code>](#module_objectDescriptors..descriptorDetail)
        * [.describeObjectMap(object, [options])](#module_objectDescriptors.describeObjectMap) ⇒ [<code>descriptorMap</code>](#module_objectDescriptors..descriptorMap)
        * [.nextReference(descriptor, currentReference)](#module_objectDescriptors.nextReference) ⇒ <code>number</code> \| <code>undefined</code>
        * [.sameDescriptor(descriptor1, descriptor2)](#module_objectDescriptors.sameDescriptor) ⇒ <code>boolean</code>
    * _inner_
        * [~descriptor](#module_objectDescriptors..descriptor) : <code>Object</code>
        * [~descriptorDetail](#module_objectDescriptors..descriptorDetail) : <code>Object</code>
        * [~descriptorMap](#module_objectDescriptors..descriptorMap) : [<code>Array.&lt;descriptor&gt;</code>](#module_objectDescriptors..descriptor)

<a name="module_objectDescriptors.descriptorSample"></a>

### objectDescriptors.descriptorSample : [<code>descriptor</code>](#module_objectDescriptors..descriptor)
**Kind**: static constant of [<code>objectDescriptors</code>](#module_objectDescriptors)  
<a name="module_objectDescriptors.descriptorDetailSample"></a>

### objectDescriptors.descriptorDetailSample : [<code>descriptorDetail</code>](#module_objectDescriptors..descriptorDetail)
**Kind**: static constant of [<code>objectDescriptors</code>](#module_objectDescriptors)  
<a name="module_objectDescriptors.descriptorMapSample"></a>

### objectDescriptors.descriptorMapSample : [<code>descriptorMap</code>](#module_objectDescriptors..descriptorMap)
**Kind**: static constant of [<code>objectDescriptors</code>](#module_objectDescriptors)  
<a name="module_objectDescriptors.mappedDescriptorMap"></a>

### objectDescriptors.mappedDescriptorMap : [<code>descriptorMap</code>](#module_objectDescriptors..descriptorMap)
**Kind**: static constant of [<code>objectDescriptors</code>](#module_objectDescriptors)  
<a name="module_objectDescriptors.assignDescriptor"></a>

### objectDescriptors.assignDescriptor(originalMap, ...descriptors) ⇒ [<code>descriptor</code>](#module_objectDescriptors..descriptor)
Apply one or more descriptors to an existing descriptor so that they represent a merged version of the descriptors.

**Kind**: static method of [<code>objectDescriptors</code>](#module_objectDescriptors)  

| Param | Type |
| --- | --- |
| originalMap | [<code>descriptor</code>](#module_objectDescriptors..descriptor) | 
| ...descriptors | [<code>descriptor</code>](#module_objectDescriptors..descriptor) | 

<a name="module_objectDescriptors.assignDescriptorDetail"></a>

### objectDescriptors.assignDescriptorDetail(originalDetail, ...details) ⇒ [<code>descriptorDetail</code>](#module_objectDescriptors..descriptorDetail)
Assign properties from other details onto an existing detail.

**Kind**: static method of [<code>objectDescriptors</code>](#module_objectDescriptors)  

| Param | Type |
| --- | --- |
| originalDetail | [<code>descriptorDetail</code>](#module_objectDescriptors..descriptorDetail) | 
| ...details | [<code>descriptorDetail</code>](#module_objectDescriptors..descriptorDetail) | 

<a name="module_objectDescriptors.checkClearValues"></a>

### objectDescriptors.checkClearValues(descriptor, [keepValues]) ⇒ [<code>descriptor</code>](#module_objectDescriptors..descriptor)
Check if we should clear the values on this descriptor

**Kind**: static method of [<code>objectDescriptors</code>](#module_objectDescriptors)  

| Param | Type | Default |
| --- | --- | --- |
| descriptor | [<code>descriptor</code>](#module_objectDescriptors..descriptor) |  | 
| [keepValues] | <code>boolean</code> | <code>false</code> | 

<a name="module_objectDescriptors.checkDescriptorComplete"></a>

### objectDescriptors.checkDescriptorComplete(descriptor) ⇒ [<code>descriptor</code>](#module_objectDescriptors..descriptor)
Check if the descriptors references have all been built and set complete to true if they have.

**Kind**: static method of [<code>objectDescriptors</code>](#module_objectDescriptors)  

| Param | Type |
| --- | --- |
| descriptor | [<code>descriptor</code>](#module_objectDescriptors..descriptor) | 

<a name="module_objectDescriptors.cloneDescriptor"></a>

### objectDescriptors.cloneDescriptor(originalMap) ⇒ [<code>descriptor</code>](#module_objectDescriptors..descriptor)
Make a copy of an object descriptor so that the original will not be mutated.

**Kind**: static method of [<code>objectDescriptors</code>](#module_objectDescriptors)  

| Param | Type |
| --- | --- |
| originalMap | [<code>descriptor</code>](#module_objectDescriptors..descriptor) | 

<a name="module_objectDescriptors.cloneDescriptorDetail"></a>

### objectDescriptors.cloneDescriptorDetail(originalDetail) ⇒ [<code>descriptorDetail</code>](#module_objectDescriptors..descriptorDetail)
Get a new copy of an existing Descriptor Detail

**Kind**: static method of [<code>objectDescriptors</code>](#module_objectDescriptors)  

| Param | Type |
| --- | --- |
| originalDetail | [<code>descriptorDetail</code>](#module_objectDescriptors..descriptorDetail) | 

<a name="module_objectDescriptors.compareDescriptor"></a>

### objectDescriptors.compareDescriptor(descriptor1, descriptor2) ⇒ <code>boolean</code>
Check if two descriptors are the same or similar in that they have similar keys and the associated types are the same.

**Kind**: static method of [<code>objectDescriptors</code>](#module_objectDescriptors)  

| Param | Type |
| --- | --- |
| descriptor1 | [<code>descriptor</code>](#module_objectDescriptors..descriptor) | 
| descriptor2 | [<code>descriptor</code>](#module_objectDescriptors..descriptor) | 

<a name="module_objectDescriptors.describeObject"></a>

### objectDescriptors.describeObject(object) ⇒ [<code>descriptor</code>](#module_objectDescriptors..descriptor)
Trace an object and return the descriptor which defines the object's structure and attributes.

**Kind**: static method of [<code>objectDescriptors</code>](#module_objectDescriptors)  

| Param | Type |
| --- | --- |
| object | <code>Object</code> | 

<a name="module_objectDescriptors.describeObjectDetail"></a>

### objectDescriptors.describeObjectDetail(value, [key], [index]) ⇒ [<code>descriptorDetail</code>](#module_objectDescriptors..descriptorDetail)
Trace an object's attribute and provide details about it.

**Kind**: static method of [<code>objectDescriptors</code>](#module_objectDescriptors)  

| Param | Type | Default |
| --- | --- | --- |
| value | <code>\*</code> |  | 
| [key] | <code>string</code> \| <code>number</code> | <code>0</code> | 
| [index] | <code>number</code> | <code>0</code> | 

<a name="module_objectDescriptors.describeObjectMap"></a>

### objectDescriptors.describeObjectMap(object, [options]) ⇒ [<code>descriptorMap</code>](#module_objectDescriptors..descriptorMap)
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
| descriptor | [<code>descriptor</code>](#module_objectDescriptors..descriptor) | 
| currentReference | <code>number</code> | 

<a name="module_objectDescriptors.sameDescriptor"></a>

### objectDescriptors.sameDescriptor(descriptor1, descriptor2) ⇒ <code>boolean</code>
Check if the two descriptors are the same.

**Kind**: static method of [<code>objectDescriptors</code>](#module_objectDescriptors)  

| Param | Type |
| --- | --- |
| descriptor1 | [<code>descriptor</code>](#module_objectDescriptors..descriptor) | 
| descriptor2 | [<code>descriptor</code>](#module_objectDescriptors..descriptor) | 

<a name="module_objectDescriptors..descriptor"></a>

### objectDescriptors~descriptor : <code>Object</code>
**Kind**: inner typedef of [<code>objectDescriptors</code>](#module_objectDescriptors)  
**Properties**

| Name | Type |
| --- | --- |
| index | <code>number</code> | 
| details | [<code>Array.&lt;descriptorDetail&gt;</code>](#module_objectDescriptors..descriptorDetail) | 
| length | <code>number</code> | 
| keys | <code>Array.&lt;(string\|number)&gt;</code> | 
| references | <code>Array.&lt;number&gt;</code> | 
| isArray | <code>boolean</code> | 
| complete | <code>boolean</code> | 

<a name="module_objectDescriptors..descriptorDetail"></a>

### objectDescriptors~descriptorDetail : <code>Object</code>
**Kind**: inner typedef of [<code>objectDescriptors</code>](#module_objectDescriptors)  
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

<a name="module_objectDescriptors..descriptorMap"></a>

### objectDescriptors~descriptorMap : [<code>Array.&lt;descriptor&gt;</code>](#module_objectDescriptors..descriptor)
**Kind**: inner typedef of [<code>objectDescriptors</code>](#module_objectDescriptors)  
<a name="module_functionHelpers"></a>

## functionHelpers
Manage how functions are called with these utilities.

**Version**: 1.0.0  
**Author**: Joshua Heagle <joshuaheagle@gmail.com>  

* [functionHelpers](#module_functionHelpers)
    * _static_
        * [.callWithParams(fn, params, [minimum])](#module_functionHelpers.callWithParams) ⇒ <code>\*</code>
        * [.curry(fn)](#module_functionHelpers.curry) ⇒ <code>function</code> \| <code>\*</code>
        * [.delay(time)](#module_functionHelpers.delay) ⇒ [<code>delayHandler</code>](#module_functionHelpers..delayHandler)
        * [.onBodyLoad(callback, [reset])](#module_functionHelpers.onBodyLoad) ⇒ <code>Array.&lt;function()&gt;</code>
        * [.pipe(...fns)](#module_functionHelpers.pipe) ⇒ <code>\*</code>
        * [.preloadParams(fn, params, [unassignedParam])](#module_functionHelpers.preloadParams) ⇒ [<code>callWithMissing</code>](#module_functionHelpers..callWithMissing)
        * [.queueManager([queue])](#module_functionHelpers.queueManager) ⇒ [<code>queueManagerHandle</code>](#module_functionHelpers..queueManagerHandle)
        * [.queueTimeout([queueManagerHandle])](#module_functionHelpers.queueTimeout) ⇒ [<code>queueTimeoutHandle</code>](#module_functionHelpers..queueTimeoutHandle)
        * [.trace(label, useClone)](#module_functionHelpers.trace) ⇒ <code>function</code>
    * _inner_
        * [~delayHandler](#module_functionHelpers..delayHandler) : <code>Object</code>
        * [~callWithMissing](#module_functionHelpers..callWithMissing) ⇒ <code>\*</code>
        * [~queueManagerHandle](#module_functionHelpers..queueManagerHandle) ⇒ <code>Promise</code>
        * [~queueTimeoutHandle](#module_functionHelpers..queueTimeoutHandle) ⇒ <code>Promise</code>

<a name="module_functionHelpers.callWithParams"></a>

### functionHelpers.callWithParams(fn, params, [minimum]) ⇒ <code>\*</code>
Given a function, call with the correct number of paramters from an array of possible parameters.

**Kind**: static method of [<code>functionHelpers</code>](#module_functionHelpers)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| fn | <code>function</code> |  | The function to be called |
| params | <code>Array</code> |  | Array of possible function parameters |
| [minimum] | <code>number</code> | <code>2</code> | Minimumn number of parameters to use in the function |

<a name="module_functionHelpers.curry"></a>

### functionHelpers.curry(fn) ⇒ <code>function</code> \| <code>\*</code>
Return a curried version of the passed function.The returned function expects the same number of arguments minus the ones provided.fn is the name of the function being curried.

**Kind**: static method of [<code>functionHelpers</code>](#module_functionHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | Receives a function to be curried |

<a name="module_functionHelpers.delay"></a>

### functionHelpers.delay(time) ⇒ [<code>delayHandler</code>](#module_functionHelpers..delayHandler)
Provide a timeout which returns a promise.

**Kind**: static method of [<code>functionHelpers</code>](#module_functionHelpers)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| time | <code>number</code> | <code>0</code> | Delay in milliseconds |

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
Take one or more function with a single parameter and return value.Pass a parameter and the value will be transformed by each function then returned.

**Kind**: static method of [<code>functionHelpers</code>](#module_functionHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| ...fns | <code>function</code> | Takes a series of functions having the same parameter |

<a name="module_functionHelpers.preloadParams"></a>

### functionHelpers.preloadParams(fn, params, [unassignedParam]) ⇒ [<code>callWithMissing</code>](#module_functionHelpers..callWithMissing)
Provide an array of parameters to be used with a function, allow the function to be called laterwith the missing parameter.

**Kind**: static method of [<code>functionHelpers</code>](#module_functionHelpers)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| fn | <code>function</code> |  | The function to be called |
| params | <code>Array</code> |  | The parameters to preload |
| [unassignedParam] | <code>number</code> | <code>0</code> | Position of missing parameter (zero indexed) |

<a name="module_functionHelpers.queueManager"></a>

### functionHelpers.queueManager([queue]) ⇒ [<code>queueManagerHandle</code>](#module_functionHelpers..queueManagerHandle)
Manage functions to run sequentially.

**Kind**: static method of [<code>functionHelpers</code>](#module_functionHelpers)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [queue] | <code>Iterable</code> \| <code>array</code> | <code>[]</code> | The iterable that can be used to store queued functions |

<a name="module_functionHelpers.queueTimeout"></a>

### functionHelpers.queueTimeout([queueManagerHandle]) ⇒ [<code>queueTimeoutHandle</code>](#module_functionHelpers..queueTimeoutHandle)
Manage functions to run sequentially with delays.

**Kind**: static method of [<code>functionHelpers</code>](#module_functionHelpers)  

| Param | Type | Default |
| --- | --- | --- |
| [queueManagerHandle] | [<code>queueManagerHandle</code>](#module_functionHelpers..queueManagerHandle) | <code></code> | 

<a name="module_functionHelpers.trace"></a>

### functionHelpers.trace(label, useClone) ⇒ <code>function</code>
Output the a value with label to the console and return the value to not interrupt the code.

**Kind**: static method of [<code>functionHelpers</code>](#module_functionHelpers)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| label | <code>string</code> |  | Pass an identifying label of the value being output. |
| useClone |  | <code>true</code> | Determines if the logged data should be a clone of the original to preserve state. |

<a name="module_functionHelpers..delayHandler"></a>

### functionHelpers~delayHandler : <code>Object</code>
Provide a way to cancel a request or attach a resolve event.

**Kind**: inner typedef of [<code>functionHelpers</code>](#module_functionHelpers)  
**Properties**

| Name | Type |
| --- | --- |
| resolver | <code>Promise</code> | 
| cancel | <code>function</code> | 

<a name="module_functionHelpers..callWithMissing"></a>

### functionHelpers~callWithMissing ⇒ <code>\*</code>
The return function which takes the missing parameter in order to call the preloaded function.

**Kind**: inner typedef of [<code>functionHelpers</code>](#module_functionHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| missing | <code>\*</code> | The missing parameter to be applied |

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
Compare two numbers and return:-1 to indicate val1 is less than val20 to indicate both values are the equal1 to indicate val1 is greater than val2

**Kind**: static method of [<code>numberHelpers</code>](#module_numberHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| val1 | <code>number</code> | The first number to compare |
| val2 | <code>number</code> | The second number to compare |

<a name="module_numberHelpers.randomInteger"></a>

### numberHelpers.randomInteger(range, [offset], [interval]) ⇒ <code>number</code>
Create a single random integer within provide range. And with optional offset,The distance between the result numbers can be adjusted with interval.

**Kind**: static method of [<code>numberHelpers</code>](#module_numberHelpers)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| range | <code>number</code> |  | Choose the breadth of the random number (0-100 would be 100 for range) |
| [offset] | <code>number</code> | <code>0</code> | Choose the starting number (1-10 would be 1 for offset, 9 for range) |
| [interval] | <code>number</code> | <code>1</code> | Choose the distance between numbers (5, 10, 15 would be 5 for interval, 1 for offset, 2 for range) |

<a name="module_numberHelpers.randomNumber"></a>

### numberHelpers.randomNumber(range, [offset], [interval]) ⇒ <code>number</code>
Create a single random number within provided range. And with optional offset,The distance between the result numbers can be adjusted with interval.

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
        * [.cloneObject(object, [options])](#module_objectHelpers.cloneObject) ⇒ <code>Object</code>
        * [.emptyObject(item)](#module_objectHelpers.emptyObject) ⇒ <code>boolean</code>
        * [.filterObject(obj, fn, [thisArg])](#module_objectHelpers.filterObject) ⇒ <code>Object</code> \| <code>Array</code>
        * [.isCloneable(value)](#module_objectHelpers.isCloneable) ⇒ <code>boolean</code>
        * [.isInstanceObject(object)](#module_objectHelpers.isInstanceObject) ⇒ <code>boolean</code>
        * [.isObject(object)](#module_objectHelpers.isObject) ⇒ <code>boolean</code>
        * [.mapObject(obj, fn, [thisArg])](#module_objectHelpers.mapObject) ⇒ <code>Object</code> \| <code>Array</code>
        * [.mergeObjects(...objects)](#module_objectHelpers.mergeObjects) ⇒ <code>\*</code>
        * [.mergeObjectsBase([options])](#module_objectHelpers.mergeObjectsBase) ⇒ [<code>mergeObjectsCallback</code>](#module_objectHelpers..mergeObjectsCallback)
            * [~updateMap(map)](#module_objectHelpers.mergeObjectsBase..updateMap) ⇒ <code>array</code>
        * [.mergeObjectsMutable(...objects)](#module_objectHelpers.mergeObjectsMutable) ⇒ <code>\*</code>
        * [.objectKeys(object, [includeInherited])](#module_objectHelpers.objectKeys) ⇒ <code>Array.&lt;(string\|number)&gt;</code>
        * [.objectValues(object, [includeInherited])](#module_objectHelpers.objectValues) ⇒ <code>Array</code>
        * [.reduceObject(obj, fn, [initialValue])](#module_objectHelpers.reduceObject) ⇒ <code>Object</code> \| <code>Array</code>
        * [.setAndReturnValue(item, key, value)](#module_objectHelpers.setAndReturnValue) ⇒ <code>\*</code>
        * [.setValue(key, value, item)](#module_objectHelpers.setValue) ⇒ <code>Object</code> \| <code>Array</code>
    * _inner_
        * [~filterCallback](#module_objectHelpers..filterCallback) ⇒ <code>boolean</code>
        * [~mapCallback](#module_objectHelpers..mapCallback) ⇒ <code>\*</code>
        * [~mergeObjectsCallback](#module_objectHelpers..mergeObjectsCallback) ⇒ <code>\*</code>
        * [~reduceCallback](#module_objectHelpers..reduceCallback) ⇒ <code>\*</code>

<a name="module_objectHelpers.cloneObject"></a>

### objectHelpers.cloneObject(object, [options]) ⇒ <code>Object</code>
Clone objects for manipulation without data corruption, returns a copy of the provided object.

**Kind**: static method of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| object | <code>Object</code> |  | The original object that is being cloned |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.mapLimit] | <code>number</code> | <code>1000</code> |  |
| [options.depthLimit] | <code>number</code> | <code>-1</code> |  |
| [options.relevancyRange] | <code>number</code> | <code>100</code> |  |
| [options.map] | <code>Iterable</code> | <code>[]</code> |  |

<a name="module_objectHelpers.emptyObject"></a>

### objectHelpers.emptyObject(item) ⇒ <code>boolean</code>
Helper function for testing if the item is an Object or Array that does not have any properties

**Kind**: static method of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>Object</code> \| <code>Array</code> | Object or Array to test |

<a name="module_objectHelpers.filterObject"></a>

### objectHelpers.filterObject(obj, fn, [thisArg]) ⇒ <code>Object</code> \| <code>Array</code>
This function is intended to replicate behaviour of the Array.filter() function but for Objects.If an array is passed in instead then it will perform standard filter(). It is recommended toalways use the standard filter() function when it is known that the object is actually an array.

**Kind**: static method of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> \| <code>Array</code> | The Object (or Array) to be filtered |
| fn | [<code>filterCallback</code>](#module_objectHelpers..filterCallback) \| <code>function</code> | The function to be processed for each filtered property |
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
Check if the provided thing is an object.

**Kind**: static method of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type |
| --- | --- |
| object | <code>\*</code> | 

<a name="module_objectHelpers.mapObject"></a>

### objectHelpers.mapObject(obj, fn, [thisArg]) ⇒ <code>Object</code> \| <code>Array</code>
This function is intended to replicate behaviour of the Array.map() function but for Objects.If an array is passed in instead then it will perform standard map(). It is recommended toalways use the standard map() function when it is known that the object is actually an array.

**Kind**: static method of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> \| <code>Array</code> | The Object (or Array) to be mapped |
| fn | [<code>mapCallback</code>](#module_objectHelpers..mapCallback) \| <code>function</code> | The function to be processed for each mapped property |
| [thisArg] | <code>Object</code> \| <code>Array</code> | Optional. Value to use as this when executing callback. |

<a name="module_objectHelpers.mergeObjects"></a>

### objectHelpers.mergeObjects(...objects) ⇒ <code>\*</code>
Uses mergeObjectsBase deep merge objects and arrays, merge by value.

**Kind**: static method of [<code>objectHelpers</code>](#module_objectHelpers)  
**See**: [mergeObjectsCallback](#module_objectHelpers..mergeObjectsCallback)  

| Param | Type | Description |
| --- | --- | --- |
| ...objects | <code>Object</code> | Provide a list of objects which will be merged starting from the end up into the first |

<a name="module_objectHelpers.mergeObjectsBase"></a>

### objectHelpers.mergeObjectsBase([options]) ⇒ [<code>mergeObjectsCallback</code>](#module_objectHelpers..mergeObjectsCallback)
Perform a deep merge of objects. This will return a function that will combine all objects and sub-objects.Objects having the same attributes will overwrite from last object to first.

**Kind**: static method of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type | Default |
| --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | 
| [options.mapLimit] | <code>number</code> | <code>1000</code> | 
| [options.depthLimit] | <code>number</code> | <code>-1</code> | 
| [options.relevancyRange] | <code>number</code> | <code>100</code> | 
| [options.map] | <code>Iterable</code> \| <code>array</code> | <code>[]</code> | 
| [options.useClone] | <code>boolean</code> | <code>false</code> | 

<a name="module_objectHelpers.mergeObjectsBase..updateMap"></a>

#### mergeObjectsBase~updateMap(map) ⇒ <code>array</code>
Remove elements out of relevance range and update the max relevance.

**Kind**: inner method of [<code>mergeObjectsBase</code>](#module_objectHelpers.mergeObjectsBase)  

| Param | Type |
| --- | --- |
| map | <code>array</code> | 

<a name="module_objectHelpers.mergeObjectsMutable"></a>

### objectHelpers.mergeObjectsMutable(...objects) ⇒ <code>\*</code>
Uses mergeObjectsBase deep merge objects and arrays, merge by reference.

**Kind**: static method of [<code>objectHelpers</code>](#module_objectHelpers)  
**See**: [mergeObjectsCallback](#module_objectHelpers..mergeObjectsCallback)  

| Param | Type | Description |
| --- | --- | --- |
| ...objects | <code>Object</code> | Provide a list of objects which will be merged starting from the end up into the first |

<a name="module_objectHelpers.objectKeys"></a>

### objectHelpers.objectKeys(object, [includeInherited]) ⇒ <code>Array.&lt;(string\|number)&gt;</code>
Get an array of keys from any object or array. Will return empty array when invalid or there are no keys.Optional flag will include the inherited keys from prototype chain when set.

**Kind**: static method of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type | Default |
| --- | --- | --- |
| object | <code>Object</code> \| <code>Array</code> |  | 
| [includeInherited] | <code>boolean</code> | <code>false</code> | 

<a name="module_objectHelpers.objectValues"></a>

### objectHelpers.objectValues(object, [includeInherited]) ⇒ <code>Array</code>
Get an array of values from any object or array. Will return empty array when invalid or there are no values.Optional flag will include the inherited values from prototype chain when set.

**Kind**: static method of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type | Default |
| --- | --- | --- |
| object | <code>Object</code> \| <code>Array</code> |  | 
| [includeInherited] | <code>boolean</code> | <code>false</code> | 

<a name="module_objectHelpers.reduceObject"></a>

### objectHelpers.reduceObject(obj, fn, [initialValue]) ⇒ <code>Object</code> \| <code>Array</code>
This function is intended to replicate behaviour of the Array.reduce() function but for Objects.If an array is passed in instead then it will perform standard reduce(). It is recommended toalways use the standard reduce() function when it is known that the object is actually an array.

**Kind**: static method of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> \| <code>Array</code> | The Object (or Array) to be filtered |
| fn | [<code>reduceCallback</code>](#module_objectHelpers..reduceCallback) \| <code>function</code> | The function to be processed for each filtered property |
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
Set a value on an item, then return the item.NOTE: Argument order designed for usage with pipe

**Kind**: static method of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> \| <code>number</code> | The key on the item which will have its value set |
| value | <code>\*</code> | Any value to be applied to the key |
| item | <code>Object</code> \| <code>Array</code> | An object or array to be updated |

<a name="module_objectHelpers..filterCallback"></a>

### objectHelpers~filterCallback ⇒ <code>boolean</code>
Function is a predicate, to test each property value of the object. Return true to keep the element, falseotherwise, taking three arguments

**Kind**: inner typedef of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| currentProperty | <code>\*</code> | The current property being processed in the object. |
| [currentIndex] | <code>string</code> | The property name of the current property being processed in the object. |
| [object] | <code>Object</code> \| <code>Array</code> | The object filter was called upon. |

<a name="module_objectHelpers..mapCallback"></a>

### objectHelpers~mapCallback ⇒ <code>\*</code>
Function that produces a property of the new Object, taking three arguments

**Kind**: inner typedef of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| currentProperty | <code>\*</code> | The current property being processed in the object. |
| [currentIndex] | <code>string</code> | The property name of the current property being processed in the object. |
| [object] | <code>Object</code> \| <code>Array</code> | The object map was called upon. |

<a name="module_objectHelpers..mergeObjectsCallback"></a>

### objectHelpers~mergeObjectsCallback ⇒ <code>\*</code>
Function that takes one or more objects and combines them into one.

**Kind**: inner typedef of [<code>objectHelpers</code>](#module_objectHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| ...objects | <code>Object</code> | Provide a list of objects which will be merged starting from the end up into the first |

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

