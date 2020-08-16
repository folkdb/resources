import { basename, resolve } from 'path';
import parseToml from '@iarna/toml/parse-async.js';
import { listDirectories } from './list-directories.js';
import { listFiles } from './list-files.js';
import { readFiles } from './read-files.js';
import { parseStrings } from './parse-strings.js';

export const buildJson = async () => {
  const context = resolve(process.cwd(), 'data');
  const categories = await listDirectories(context);

  const eachCategory = async (category) => {
    const currentDir = resolve(context, category);
    const fileNames = await listFiles(currentDir, (n) => /\.toml$/.test(n));
    const fileContents = await readFiles(currentDir, fileNames);
    const partials = await parseStrings(parseToml, fileContents);
    
    return partials.map((partial, i) => (
      {
        category,
        slug: fileNames[i].slice(0, -5),
        ...partial
      }
    ));
  };
  
  const subArrays = await Promise.all(
    categories.map(eachCategory),
  );
  
  return subArrays.flat();
};
