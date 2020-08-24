import { readdir, stat } from 'fs/promises';
import { resolve } from 'path';
import { relative } from '../../utils/path/index.js';
import { expect } from '../../utils/type/index.js'
import { tryCatch } from '../../utils/promise/index.js';

export const listFiles = (context, test = () => true) => {
  const source = relative(import.meta.url);
  const call = 'listFiles(context, test)';
  
  expect('String')(context, { source, call, argument: 'context' });
  expect('Function')(context, { source, call, argument: 'test' });
  

  return tryCatch(
    async () => {
      const names = await readdir(context);
      const stats = await Promise.all(
        names.map((n) => stat(resolve(context, n))),
      );
  
      return names.filter((n, i) => stats[i].isFile() && test(n, stats[i]));
    },
    { source, call, arguments: { context, test: '[Function]' } },
  );
};
