/**
 * Manage how functions are called with these utilities.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module functionHelpers
 * @memberOf module:siFunciona
 */
import 'core-js/stable';
import callWithParams from './functions/callWithParams';
import curry from './functions/curry';
import delay from './functions/delay';
import makeBasicQueue from './functions/makeBasicQueue';
import onBodyLoad from './functions/onBodyLoad';
import pipe from './functions/pipe';
import preloadParams from './functions/preloadParams';
import queueManager from './functions/queueManager';
import queueTimeout from './functions/queueTimeout';
import relevancyFilter from './functions/relevancyFilter';
import trace from './functions/trace';
export { callWithParams, curry, delay, makeBasicQueue, onBodyLoad, pipe, preloadParams, queueManager, queueTimeout, relevancyFilter, trace };
declare const _default: {
    callWithParams: (fn: Function, params?: Array<any>, minimum?: number) => any;
    curry: (fn: Function) => Function | any;
    delay: (time?: number) => {
        resolver: Promise<any>;
        cancel: () => void;
    };
    makeBasicQueue: (initialQueue?: import("./arrays/BasicQueue").queuedItem[] | any) => import("./arrays/BasicQueue").IsQueue<any>;
    onBodyLoad: (callback: Function, reset?: boolean) => Array<Function>;
    pipe: (...fns: Function[]) => any;
    preloadParams: (fn: Function, params?: Array<any>, unassignedParam?: number) => (missing: any) => any;
    queueManager: (queue?: import("./arrays/BasicQueue").IsQueue<import("./arrays/BasicQueue").queuedItem>) => import("./functions/queueManager").queueManagerHandle;
    queueTimeout: (queueManagerHandle?: import("./functions/queueManager").queueManagerHandle) => (fn: Function, time: number, ...args: any) => Promise<any>;
    relevancyFilter: (map: import("./functions/relevancyFilter").relevanceMap, { mapLimit, relevancyRange }?: {
        mapLimit?: number;
        relevancyRange?: number;
    }) => import("./functions/relevancyFilter").relevanceMap;
    trace: (label: string, useClone?: boolean) => (value: any) => any;
};
export default _default;
//# sourceMappingURL=functions.d.ts.map