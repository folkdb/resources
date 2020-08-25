import { library } from '../../env.js';
import { relative } from '../path/index.js';
import { stringify } from '../object/index.js';
import { expect } from './expect.js';
import { whatType } from './what-type.js';

export const expectOneOf = (typeList) => (value, originator) => {
  expect('Array')(typeList, {
    source: relative(import.meta.url),
    call: 'expectOneOf(typeList)(value, originator)',
    argument: 'typeList',
  });

  if (!typeList.includes(whatType(value))) {
    throw new Error(`Expected ${typeList.join(' | ')} but got ${whatType(value)} at: ${stringify({ library, ...originator })}`);
  }
};
