import { relative } from '../path/index.js';
import { expect, expectOneOf, TypedArray } from '../type/index.js';

export const map = (func) => (mapable, ...args) => {
  const here = {
    source: relative(import.meta.url),
    call: 'map(func)(mapable, ...args)',
  };
  
  expect('Function')(func, {
    ...here,
    argument: 'func',
  });

  expectOneOf(['Array', ...TypedArray])(mapable, {
    ...here,
    argument: 'mapable',
  });
  
  return mapable.map((v, i) => func([i, v], ...args));
};
