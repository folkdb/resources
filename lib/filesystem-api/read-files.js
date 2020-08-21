import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { tryCatch } from '../utils/try-catch.js';

export const readFiles = (context, names) => tryCatch(
  () => {
    const readEach = (current) => tryCatch(
      () => readFile(resolve(context, current), 'utf8'),
      {
        library: 'folkdb/resources',
        source: 'lib/filesystem-api/read-files.js',
        function: 'readEach',
        arguments: { current },
        environment: { context },
      },
    );

    return Promise.all(names.map(readEach));
  },
  {
    library: 'folkdb/resources',
    source: 'lib/filesystem-api/read-files.js',
    function: 'readFiles',
    arguments: { context, names: `[Array(${names.length})]` },
  },
);
