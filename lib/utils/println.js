import { print } from './print.js';

export const println = (output, options) => print(output, { lines: 1, ...options });
