import descriptorDetailSample, { descriptorDetail } from './descriptorDetail'

export type descriptor = {
  index: number,
  details: Array<descriptorDetail>,
  length: number,
  keys: Array<number | string>,
  references: Array<number>,
  isArray: boolean,
  complete: boolean,
}

const descriptorSample: descriptor = {
  index: 0,
  details: [descriptorDetailSample],
  length: 1,
  keys: [descriptorDetailSample.key],
  references: [],
  isArray: false,
  complete: true
}

export default descriptorSample
