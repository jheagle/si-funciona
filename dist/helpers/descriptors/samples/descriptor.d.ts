import { descriptorDetail } from './descriptorDetail';
export type descriptor = {
    index: number;
    details: Array<descriptorDetail>;
    length: number;
    keys: Array<number | string>;
    references: Array<number>;
    isArray: boolean;
    complete: boolean;
};
declare const descriptorSample: descriptor;
export default descriptorSample;
//# sourceMappingURL=descriptor.d.ts.map