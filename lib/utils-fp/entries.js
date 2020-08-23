import { expectOneOf } from '../utils-type/index.js';

export const entries = (objOrMap) => {
  expectOneOf(['Object', 'Map'])(objOrMap, {
    source: 'lib/utils-fp/entries.js',
    function: 'entries',
    argument: 'objOrMap',
  });
  
  return (
    whatType(objOrMap) === 'Object'
      ? Object.entries(objOrMap)
      : [...objOrMap.entries()]
  );
};