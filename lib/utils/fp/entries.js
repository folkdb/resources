import { relative } from '../path/index.js';
import { expectOneOf, whatType } from '../type/index.js';

export const entries = (objOrMap) => {
  expectOneOf(['Object', 'Map'])(objOrMap, {
    source: relative(import.meta.url),
    call: 'entries(objOrMap)',
    argument: 'objOrMap',
  });
  
  return (
    whatType(objOrMap) === 'Object'
      ? Object.entries(objOrMap)
      : [...objOrMap.entries()]
  );
};