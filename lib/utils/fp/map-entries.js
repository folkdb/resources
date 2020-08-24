import { entries } from './entries.js';
import { map } from './map.js';

export const mapEntries = (func) => (objOrMap, ...args) => (
  map(func)(entries(objOrMap), ...args)
);
