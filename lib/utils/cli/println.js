import { relative } from '../path/index.js';
import { expect } from '../type/index.js';
import { print } from './print.js';

export const println = (output, {
  lines = 1,
  ...options
} = {}) => {
  const source = relative(import.meta.url);
  const call = 'println(output, { lines, indent, stream })';

  expect('String')(output, { source, call, argument: 'output' });
  expect('Number')(lines, { source, call, argument: 'lines' });
  expect('Number')(indent, { source, call, argument: 'indent' });

  const after = '\n'.repeat(lines);
  print(`${output.trimEnd()}${after}`, options);
};
