import { writeFile } from 'fs/promises';
import parseToml from '@iarna/toml/parse-async.js';
import { absolute, relative } from '../utils/path/index.js';
import { mapAsync, mapIndexed } from '../utils/fp/index.js';
import { print, println, styled } from '../utils/cli/index.js';
import { tryCatch } from '../utils/async/index.js';

import {
  listDirectories,
  listFiles,
  readFiles,
  parseStrings,
} from '../filesystem-api/index.js';

export const buildJson = (context, {
  entry = 'data',
  output = false,
} = {}) => {
  const source = relative(import.meta.url);
  const call = 'buildJson(context, options)';

  const eachCategory = (category, parentDir) => tryCatch(
    async () => {
      const currentDir = absolute(category, parentDir);
      const fileNames = await listFiles(
        currentDir,
        (n) => /\.toml$/.test(n),
      );

      const fileContents = await readFiles(currentDir, fileNames);
      const partials = await parseStrings(parseToml, fileContents);

      return mapIndexed(([i, partial]) => (
        {
          category,
          slug: fileNames[i].slice(0, -5),
          ...partial,
        }
      ))(partials);
    },
    {
      source,
      call: 'eachCategory(category, parentDir)',
      arguments: { category, parentDir },
    },
  );

  return tryCatch(
    async () => {
      const entryPath = absolute(entry, context);
      const categories = await listDirectories(entryPath);
      const subArrays = await mapAsync(eachCategory)(categories, entryPath);
      const result = subArrays.flat();
  
      if (output) {
        const outputPath = absolute(output, context);
        await writeFile(outputPath, JSON.stringify(result, undefined, 2));
        print(styled('warning')('Wrote JSON output to '));
        println(styled('info')(outputPath), { lines: 2 });
      }
  
      return result;
    },
    {
      source,
      call, 
      arguments: { context, entry, output },
    },
  );
};