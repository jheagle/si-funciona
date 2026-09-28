import 'regenerator-runtime/runtime';
import { queueManagerHandle } from './queueManager';
type queueTimeoutHandle = (fn: Function, time: number, ...args: any) => Promise<any>;
/**
 * Manage functions to run sequentially with delays.
 * @param queueManagerHandle
 */
declare const queueTimeout: (queueManagerHandle?: queueManagerHandle) => queueTimeoutHandle;
export default queueTimeout;
//# sourceMappingURL=queueTimeout.d.ts.map