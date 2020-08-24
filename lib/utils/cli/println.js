import { relative } from '../path/index.js';
import { expect } from '../type/index.js';
import { print } from './print.js';

export const println = (output, {
  lines = 1,
  ...options
} = {}) => {
  const source = relative(import.meta.url);
  const call = 'println(output, { lines, ...options })';

  expect('String')(output, { source, call, argument: 'output' });
  expect('Number')(lines, { source, call, argument: 'lines' });

  const after = '\n'.repeat(lines);
  print(`${output.trimEnd()}${after}`, options);
};
