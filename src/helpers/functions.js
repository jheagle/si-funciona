/**
 * Manage how functions are called with these utilities.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module functionHelpers
 * @memberOf module:functionalHelpers
 */

import 'core-js/stable'
import callWithParams from './functions/callWithParams.js'
import curry from './functions/curry.js'
import delay from './functions/delay.js'
import onBodyLoad from './functions/onBodyLoad.js'
import pipe from './functions/pipe.js'
import preloadParams from './functions/preloadParams.js'
import queueManager from './functions/queueManager.js'
import queueTimeout from './functions/queueTimeout.js'
import relevancyFilter from './functions/relevancyFilter.js'
import trace from './functions/trace.js'

export default {
  callWithParams,
  curry,
  delay,
  onBodyLoad,
  pipe,
  preloadParams,
  queueManager,
  queueTimeout,
  relevancyFilter,
  trace
}