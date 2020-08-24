import { relative } from '../path/index.js';
import { expect, expectOneOf, TypedArray } from '../type/index.js';

export const iterIndexed = (func) => (iterable, ...args) => {
  const here = {
    source: relative(import.meta.url),
    call: 'iter(func)(iterable, ...args)',
  };
  
  expect('Function')(func, {
    ...here,
    argument: 'func',
  });

  expectOneOf(['Array', ...TypedArray])(iterable, {
    ...here,
    argument: 'iterable',
  });
  
  iterable.forEach(
    (v, i) => { func([i, v], ...args); },
  );
};
