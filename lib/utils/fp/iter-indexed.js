import { relative } from '../path/index.js';
import { expect, expectOneOf, TypedArray } from '../type/index.js';

export const iterIndexed = (func) => (iterable, ...args) => {
  const source = relative(import.meta.url);
  const call = 'iter(func)(iterable, ...args)';

  expect('Function')(func, { source, call, argument: 'func' });

  expectOneOf([
    'Array',
    ...TypedArray
  ])(iterable, { source, call, argument: 'iterable' });

  iterable.forEach(
    (v, i) => { func([i, v], ...args); },
  );
};
