import { readdir, stat } from 'fs/promises';
import { resolve } from 'path';
import { tryCatch } from '../utils/try-catch.js';

export const listFiles = (context, test = () => true) => tryCatch(
  async () => {
    const names = await readdir(context);
    const stats = await Promise.all(
      names.map((n) => stat(resolve(context, n))),
    );
  
    return names.filter((n, i) => stats[i].isFile() && test(n, stats[i]));
  },
  { 
    function: 'listFiles', 
    source: 'lib/filesystem-api/list-files.js',
    library: 'folkdb/resources',
    arguments: { context, test },
  },
);  
