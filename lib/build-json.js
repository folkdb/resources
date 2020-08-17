import { resolve } from 'path';
import parseToml from '@iarna/toml/parse-async.js';
import { tryCatch } from './utils/try-catch.js';
import {
  listDirectories,
  listFiles,
  readFiles,
  parseStrings,
} from './filesystem-api/index.js';

export const buildJson = (entry = 'data') => tryCatch(
  async () => {
    const context = resolve(process.cwd(), entry);
    const categories = await listDirectories(context);

    const eachCategory = (category) => tryCatch(
      async () => {
        const currentDir = resolve(context, category);
        const fileNames = await listFiles(currentDir, (n) => /\.toml$/.test(n));
        const fileContents = await readFiles(currentDir, fileNames);
        const partials = await parseStrings(parseToml, fileContents);

        return partials.map((partial, i) => (
          {
            category,
            slug: fileNames[i].slice(0, -5),
            ...partial,
          }
        ));
      },
      {
        function: 'eachCategory',
        source: 'lib/build-json.js',
        library: 'folkdb/resources',
        arguments: { category },
        environment: { context },
      },
    );

    const subArrays = await Promise.all(
      categories.map(eachCategory),
    );

    return subArrays.flat();
  },
  {
    function: 'buildJson',
    source: 'lib/build-json.js',
    library: 'folkdb/resources',
    arguments: { entry },
  },
);
