import { relative } from '../path/index.js';
import { expect } from '../type/index.js';

export const caseOf = (kvList, {
  defaultTo = undefined,
  test = (a, b) => (a === b),
} = {}) => (value) => {
  const here = {
    source: relative(import.meta.url),
    call: 'caseOf(kvList, { defaultTo, test })',
  };

  expect('Array')(kvList, { ...here, argument: 'kvList' });
  expect('Function')(test, { ...here, argument: 'test' });

  const match = ([pattern]) => test(pattern, value);
  const [_, result] = kvList.find(match) || ['_', defaultTo];

  return result;
};
