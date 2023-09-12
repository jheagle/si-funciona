/**
 * Manage how functions are called with these utilities.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module functionHelpers
 * @memberOf module:siFunciona
 */
import 'core-js/stable';
declare const _default: {
    callWithParams: (fn: Function, params?: any[], minimum?: number) => any;
    curry: (fn: Function) => any;
    delay: (time?: number) => {
        resolver: Promise<any>;
        cancel: () => void;
    };
    onBodyLoad: (callback: Function, reset?: boolean) => Function[];
    pipe: (...fns: Function[]) => any;
    preloadParams: (fn: Function, params?: any[], unassignedParam?: number) => (missing: any) => any;
    queueManager: (queue?: import("./functions/queueManager").queuedItem[]) => import("./functions/queueManager").queueManagerHandle;
    queueTimeout: (queueManagerHandle?: import("./functions/queueManager").queueManagerHandle) => (fn: Function, time: number, ...args: any) => Promise<any>;
    relevancyFilter: (map: import("./functions/relevancyFilter").relevanceMap, { mapLimit, relevancyRange }?: {
        mapLimit?: number;
        relevancyRange?: number;
    }) => import("./functions/relevancyFilter").relevanceMap;
    trace: (label: string, useClone?: boolean) => (value: any) => any;
};
export default _default;
