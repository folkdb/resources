import { print } from './print.ts';

export const println = (output, {
  lines = 1,
  ...options
} = {}) => {
  const after = '\n'.repeat(lines);
  print(`${output.trimEnd()}${after}`, options);
};
