import { entries } from './entries.js';
import { map } from './map.js';

export const mapEntriesAsync = (asyncFunc) => (objOrMap, ...args) => (
  mapAsync(asyncFunc)(entries(objOrMap), ...args)
);
