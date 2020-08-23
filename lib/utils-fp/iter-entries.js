import { entries } from './entries.js';
import { iter } from './iter.js';

export const iterEntries = (func) => (objOrMap, ...args) => {
  iter(func)(entries(objOrMap), ...args);
};
