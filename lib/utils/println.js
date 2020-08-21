import { print } from './print.js'

export const println = (output, options) => print(output, { ...options, lines: 1 });
