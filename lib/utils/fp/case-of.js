import { relative } from '../path/index.js';
import { expect } from '../type/index.js';

export const caseOf = (kvList, {
  defaultTo = undefined,
  test = (a, b) => (a === b),
} = {}) => (value) => {
  const source = relative(import.meta.url);
  const call = 'caseOf(kvList, { defaultTo, test })';

  expect('Array')(kvList, { source, call, argument: 'kvList' });
  expect('Function')(test, { source, call, argument: 'test' });

  const match = ([pattern]) => test(pattern, value);
  const [_, result] = kvList.find(match) || ['_', defaultTo];

  return result;
};
