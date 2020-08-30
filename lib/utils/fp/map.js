import { relative } from '../path/index.js';
import { expect, expectOneOf, TypedArray } from '../type/index.js';

export const map = (func) => (mapable, ...args) => {
  const source = relative(import.meta.url);
  const call = 'map(func)(mapable, ...args)';

  expect('Function')(func, { source, call, argument: 'func' });

  expectOneOf([
    'Array',
    ...TypedArray
  ])(mapable, { source, call, argument: 'mapable' });

  return mapable.map((v) => func(v, ...args));
};
