import { expect, expectOneOf, TypedArray } from '../utils-type/index.js';

export const map = (func) => (arrayLike, ...args) => {
  const here = {
    source: 'lib/utils-fp/map.js',
    function: 'map',
  };
  
  expect('Function')(func, {
    ...here,
    argument: 'func',
  });

  expectOneOf(['Array', ...TypedArray])(arrayLike, {
    ...here,
    argument: 'arrayLike',
  });
  
  return arrayLike.map((v) => func(v, ...args));
};
