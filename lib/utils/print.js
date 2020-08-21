import stringify from 'stringify-object';
import { caseOf } from './case-of.js';
import { styled } from './styled.js';
import { whatType } from './what-type.js';

export const print = (output, {
  indent = 0,
  lines = 0,
  style = 'none',
  tabWidth = 2,
  stream = process.stdout,
} = {}) => {
  const dataType = whatType(output);
  const before = ' '.repeat(indent);
  const after = '\n'.repeat(lines);

  const format = caseOf([
    [
      'Object',
      (obj) => (
        Object.entries(obj)
          .map(([k, v]) => `${before}${k}: ${styled('info')(stringify(v, { singleQuotes: false }))}`)
          .join('\n')
      ),
    ],
    [
      'Array',
      (arr) => stringify(arr),
    ],
  ], { defaultTo: (x) => x })(dataType);

  stream.write(`${format(output)}${after}`);
};
