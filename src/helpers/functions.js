/**
 * Manage how functions are called with these utilities.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module functionHelpers
 * @memberOf module:functionalHelpers
 */

import 'core-js/stable'
import callWithParams from './functions/callWithParams'
import curry from './functions/curry'
import delay from './functions/delay'
import pipe from './functions/pipe'
import preloadParams from './functions/preloadParams'
import queueManager from './functions/queueManager'
import queueTimeout from './functions/queueTimeout'
import trace from './functions/trace'

export default {
  callWithParams,
  curry,
  delay,
  pipe,
  preloadParams,
  queueManager,
  queueTimeout,
  trace
}