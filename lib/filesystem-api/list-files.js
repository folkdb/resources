import { readdir, stat } from 'fs/promises';
import { expect } from '../utils/type/index.js';
import { absolute, relative } from '../utils/path/index.js';
import { map, mapAsync } from '../utils/fp/index.js';
import { tryCatch } from '../utils/async/index.js';

export const listFiles = (context, test = () => true) => {
  const source = relative(import.meta.url);
  const call = 'listFiles(context, test)';

  expect('String')(context, { source, call, argument: 'context' });
  expect('Function')(test, { source, call, argument: 'test' });

  return tryCatch(
    async () => {
      const names = await readdir(context);
      const paths = map(absolute)(names, context);
      const stats = await mapAsync(stat)(paths);

      return names.filter((n, i) => stats[i].isFile() && test(n, stats[i]));
    },
    { source, call, arguments: { context, test: '[Function]' } },
  );
};
