import { relative } from '../path/index.js';
import { expectOneOf, TypedArray } from '../type/index.js';

export const mapAsync = (asyncFunc) => (mapable, ...args) => {
  const source = relative(import.meta.url);
  const call = 'map(asyncFunc)(mapable, ...args)';

  expectOneOf([
    'AsyncFunction',
    'Function',
  ])(asyncFunc, { source, call, argument: 'asyncFunc' });

  expectOneOf([
    'Array',
    ...TypedArray
  ])(mapable, { source, call, argument: 'mapable' });

  return Promise.all(
    mapable.map((v) => asyncFunc(v, ...args)),
  );
};
