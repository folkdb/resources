import { relative } from '../path/index.js';
import { expect, expectOneOf, TypedArray } from '../type/index.js';

export const iter = (func) => (iterable, ...args) => {
  const source = relative(import.meta.url);
  const call = 'iter(func)(iterable, ...args)';

  expect('Function')(func, { source, call, argument: 'func' });

  expectOneOf([
    'Array',
    'Set',
    ...TypedArray
  ])(iterable, { source, call, argument: 'iterable' });

  iterable.forEach(
    (v) => { func(v, ...args); },
  );
};
