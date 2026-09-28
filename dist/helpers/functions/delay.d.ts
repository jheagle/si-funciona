import 'regenerator-runtime/runtime';
type delayHandler = {
    resolver: Promise<any>;
    cancel: () => void;
};
/**
 * Provide a timeout which returns a promise.
 * @param time - Delay in milliseconds
 */
declare const delay: (time?: number) => delayHandler;
export default delay;
//# sourceMappingURL=delay.d.ts.map