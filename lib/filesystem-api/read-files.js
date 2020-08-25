import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { relative } from '../utils/path/index.js';
import { expect } from '../utils/type/index.js';
import { tryCatch } from '../utils/async/index.js';

export const readFiles = (context, names) => {
  const source = relative(import.meta.url);
  const call = 'readFiles(context, names)';

  expect('String')(context, { source, call, argument: 'context' });
  expect('Array')(names, { source, call, argument: 'names' });

  const readEach = (current) => {
    expect('String')(current, {
      source,
      call: 'readEach(current)',
      argument: 'current',
    });

    return tryCatch(
      () => readFile(resolve(context, current), 'utf8'),
      {
        source,
        call: 'readEach(current)',
        arguments: { current },
        environment: { context },
      },
    );
  };

  return tryCatch(
    () => Promise.all(names.map(readEach)),
    {
      source,
      call,
      arguments: { context, names: `[Array(${names.length})]` },
    },
  );
};
