import { library } from '../env.js';
import { stringify } from './utils-cli/stringify.js'
import { expect } from './expect.js';
import { whatType } from './what-type.js';

export const expectOneOf = (typeList) => (value, originator) => {
  expect('Array')(typeList, {
    source: 'lib/utils-type/expect-one-of.js',
    function: 'expect',
    argument: 'typeList',
  });
  
  if (!typeList.includes(whatType(value))) {
    throw new Error(`Expected ${typeList.join(' | ')} but got ${whatType(value)} at: ${stringify({ library, ...originator })}`);
  }
};
