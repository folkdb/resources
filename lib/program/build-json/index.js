import { writeFile } from 'fs/promises';
import { resolve } from 'path';
import parseToml from '@iarna/toml/parse-async.js';
import { print, println, styled } from '../utils/cli/index.js';
import {
  listDirectories,
  listFiles,
  readFiles,
  parseStrings,
} from '../filesystem-api/index.js';

export const buildJson = (context, {
  entry = 'data',
  output = false,
} = {}) => tryCatch(
  async () => {
    const entryPath = resolve(context, entry);
    const categories = await listDirectories(entryPath);

    const eachCategory = (category) => tryCatch(
      async () => {
        const currentDir = resolve(entryPath, category);
        const fileNames = await listFiles(
          currentDir,
          (n) => /\.toml$/.test(n),
        );

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
        environment: { entryPath },
      },
    );

    const subArrays = await Promise.all(
      categories.map(eachCategory),
    );

    const result = subArrays.flat();

    if (output) {
      const outputPath = resolve(context, output);
      await writeFile(outputPath, JSON.stringify(result, undefined, 2));
      print(styled('warning')('Wrote JSON output to '));
      println(styled('info')(outputPath), { lines: 2 });
    }

    return result;
  },
  {
    function: 'buildJson',
    source: 'lib/build-json.js',
    library: 'folkdb/resources',
    arguments: { context, entry, output },
  },
);
