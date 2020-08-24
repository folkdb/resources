import { relative } from '../path/index.js';
import { expect } from '../type/index.js';

export const print = (output, {
  indent = 0,
  stream = process.stdout,
} = {}) => {
  const source = relative(import.meta.url);
  const call = 'print(output, { indent, stream })';

  expect('String')(output, { source, call, argument: 'output' });
  expect('Number')(indent, { source, call, argument: 'indent' });

  const before = ' '.repeat(indent);
  const indentNewLines = (str) => str.replace(/\n/g, `\n${before}`);

  const formatted = (
    output.slice(-1) === '\n'
      ? `${indentNewLines(output.slice(0, -1))}\n`
      : indentNewLines(output)
  );

  stream.write(`${before}${formatted}`);
};
