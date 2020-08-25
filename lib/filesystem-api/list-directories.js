import { readdir, stat } from 'fs/promises';
import { resolve } from 'path';
import { relative } from '../utils/path/index.js';
import { expect } from '../utils/type/index.js';
import { tryCatch } from '../utils/async/index.js';

export const listDirectories = (context) => {
  const source = relative(import.meta.url);
  const call = 'listDirectories(context)';

  expect('String')(context, { source, call, argument: 'context' });

  return tryCatch(
    async () => {
      const names = await readdir(context);
      const stats = await Promise.all(
        names.map((n) => stat(resolve(context, n))),
      );

      return names.filter((_, i) => stats[i].isDirectory());
    },
    { source, call, arguments: { context } },
  );
};
