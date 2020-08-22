import { print } from './print';

export const println = (output: string, {
  lines = 1,
  indent = 0,
  stream = process.stdout,
} = {}) => {
  const after = '\n'.repeat(lines);
  print(`${output.trimEnd()}${after}`, { indent, stream });
};
