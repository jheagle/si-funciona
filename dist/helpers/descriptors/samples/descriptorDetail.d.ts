export type descriptorDetail = {
    index: number;
    key: number | string;
    type: Array<string>;
    value: Array<any>;
    nullable: boolean;
    optional: boolean;
    circular: boolean;
    isReference: boolean;
    isInstance: boolean;
    arrayReference: number | null;
    objectReference: number | null;
};
declare const descriptorDetailSample: descriptorDetail;
export default descriptorDetailSample;
//# sourceMappingURL=descriptorDetail.d.ts.map