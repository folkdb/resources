import { readdir, stat } from 'fs/promises';
import { expect } from '../utils/type/index.js';
import { absolute, relative } from '../utils/path/index.js';
import { map, mapAsync } from '../utils/fp/index.js';
import { tryCatch } from '../utils/async/index.js';

export const listDirectories = (context) => {
  const source = relative(import.meta.url);
  const call = 'listDirectories(context)';

  expect('String')(context, { source, call, argument: 'context' });

  return tryCatch(
    async () => {
      const names = await readdir(context);
      const paths = map(absolute)(names, context);
      const stats = await mapAsync(stat)(paths);

      return names.filter((_, i) => stats[i].isDirectory());
    },
    { source, call, arguments: { context } },
  );
};
