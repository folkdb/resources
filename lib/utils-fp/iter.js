import { expect, expectOneOf } from '../utils-type/index.js';

export const iter = (func) => (iterable, ...args) => {
  const here = {
    source: 'lib/utils-fp/iter.js',
    function: 'iter',
  };
  
  expect('Function')(func, {
    ...here,
    argument: 'func',
  });

  expectOneOf(['Array', 'Set', ...TypedArray])(iterable, {
    ...here,
    argument: 'iterable',
  });
  
  iterable.forEach(
    (v) => { func(v, ...args); },
  );
};

