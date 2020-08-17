import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { tryCatch } from '../utils/try-catch.js';

export const readFiles = (context, names) => tryCatch(
  () => Promise.all(
    names.map((n) => readFile(resolve(context, n), 'utf8')),
  ),
  { 
    function: 'readFiles', 
    source: 'lib/filesystem-api/read-files.js',
    library: 'folkdb/resources',
    arguments: { context, names },
  },
);
