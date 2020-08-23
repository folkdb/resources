import { expect, expectOneOf, TypedArray } from '../utils-type/index.js';

export const iterIndexed = (func) => (iterable, ...args) => {
  const here = {
    source: 'lib/utils-fp/iter-indexed.js',
    function: 'iter',
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
