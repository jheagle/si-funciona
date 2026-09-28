import 'regenerator-runtime/runtime';
import { IsQueue, queuedItem } from '../arrays/BasicQueue';
export type queuedRunnable = {
    item: {
        fn: Function | queuedItem;
        args: any[];
    };
    generator: Generator;
};
export type queuePush = (fn: Function, ...args: any) => Promise<any>;
export type queueManagerHandle = {
    start: () => void;
    pause: () => void;
    push: queuePush;
};
/**
 * Manage functions to run sequentially.
 * @param queue - The queue to manage. Pass a plain array to have it converted into a
 * {@link module:arrayHelpers.BasicQueue} automatically, or a custom queue implementing `IsQueue`; omit it (or pass
 * `null`) to have one created for you.
 */
declare const queueManager: (queue?: IsQueue<queuedItem>) => queueManagerHandle;
export default queueManager;
//# sourceMappingURL=queueManager.d.ts.map