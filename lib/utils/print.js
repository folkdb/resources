import stringify from 'stringify-object';
import { whatType } from './what-type.js';

export const print = (output, {
  indent = 0,
  lines = 0,
  style = 'none',
  tabWidth = 2,
  stderr = false,
} = {}) => {
  const stream = stderr ? process.stderr : process.stdout;
  const dataType = whatType(output);
  
  if (dataType === 'Object' || dataType === 'Array') {
    const formatted = (
      stringify(output, {
        indent: ' '.repeat(tabWidth + indent),
        singleQuotes: false,
      })
        .slice(2, -2)
        .replace(/(,\n)/g, '\n')
    );

    stream.write(formatted);
  } else {
    stream.write(' '.repeat(indent));
    stream.write(output);
  }
  
  stream.write('\n'.repeat(lines));
};
