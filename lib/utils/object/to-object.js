import { relative } from '../path/index.js';
import { expectOneOf, whatType } from '../type/index.js';

export const toObject = (arrOrMap) => {
  expectOneOf(['Array', 'Map'])(arrOrMap, {
    source: relative(import.meta.url),
    call: 'toObject(arrOrMap)',
    argument: 'arrOrMap',
  });
  
  const out = {};

  const iterator = (
    whatType(arrOrMap) === 'Map'
      ? (value, key) => { out[key] = value; }
      : ([key, value]) => { out[key] = value; }
  );

  arrOrMap.forEach(iterator);
  return out;
};
