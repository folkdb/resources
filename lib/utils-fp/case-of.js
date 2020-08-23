import { expect } from '../utils-type/index.js';

export const caseOf = (kvList, {
  defaultTo = undefined,
  test = (a, b) => (a === b),
} = {}) => (value) => {
  const here = {
    source: 'lib/utils-fp/case-of.js',
    function: 'caseOf',
  };
  
  expect('Array')(kvList, { ...here, argument: 'kvList' });
  expect('Function')(test, { ...here, argument: 'test' });
  
  const match = ([pattern]) => test(pattern, value);
  const [_, result] = kvList.find(match) || ['_', defaultTo];

  return result;
};
