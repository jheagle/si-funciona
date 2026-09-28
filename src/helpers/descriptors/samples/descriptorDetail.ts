export type descriptorDetail = {
  index: number,
  key: number | string,
  type: Array<string>,
  value: Array<any>,
  nullable: boolean,
  optional: boolean,
  circular: boolean,
  isReference: boolean,
  isInstance: boolean,
  arrayReference: number | null,
  objectReference: number | null,
}

const descriptorDetailSample: descriptorDetail = {
  index: 0,
  key: 'keyName',
  type: ['string'],
  value: [''],
  nullable: false,
  optional: false,
  circular: false,
  isReference: false,
  isInstance: false,
  arrayReference: null,
  objectReference: null
}

export default descriptorDetailSample