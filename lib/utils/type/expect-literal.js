import { library } from '../../env.js';
import { relative } from '../path/index.js';
import { stringify } from '../object/index.js';
import { expect } from './expect.js';

export const expectLiteral = (kindList) => (value, originator) => {
  expect('Array')(kindList, {
    source: relative(import.meta.url),
    call: 'expectLiteral(kindList)(value, originator)',
    argument: 'kindList',
  });
  
  if (!kindList.includes(value)) {
    throw new Error(`Expected ${kindList.join(' | ')} but got ${value} at: ${stringify({ library, ...originator })}`);
  }
};
