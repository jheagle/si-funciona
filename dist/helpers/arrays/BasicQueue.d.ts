export type callableLater = {
    fn?: Function;
    args?: Array<any>;
};
export type queuedItem = {
    item: callableLater | any;
    generator: Generator;
};
export interface IsQueue<queuedItem> {
    dequeue: () => queuedItem | null;
    empty: () => boolean;
    enqueue: (data: queuedItem) => void;
    peek: () => queuedItem | null;
    size: () => number;
}
/**
 * Class BasicQueue is a functional example of a queue to be used with queueManager.
 */
declare class BasicQueue implements IsQueue<queuedItem> {
    private readonly innerList;
    /**
     * @param innerList - Items to pre-populate the queue with, in order.
     */
    constructor(innerList?: queuedItem[] | any);
    /**
     * Remove and return the next item in the queue
     */
    dequeue(): queuedItem | any;
    /**
     * Check if the queue is empty
     */
    empty(): boolean;
    /**
     * Add an item to the end of the queue
     * @param data
     */
    enqueue(data: queuedItem | any): IsQueue<queuedItem>;
    /**
     * Retrieve the next item from the queue
     */
    peek(): queuedItem | any;
    /**
     * Get the quantity of items in the queue
     */
    size(): number;
}
export default BasicQueue;
//# sourceMappingURL=BasicQueue.d.ts.map