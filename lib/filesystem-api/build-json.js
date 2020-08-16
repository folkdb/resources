import { basename } from 'path';
import parseToml from '@iarna/toml/parse-async.js';

export const buildJson = async () => {
  const context = resolve(process.cwd(), 'data');
  const categories = await listDirectories(context);
  
  const eachCategory = async (category) => {
    const fileNames = await listFiles(context, (n) => /\.toml$/.test(n));
    const fileContents = await readFiles(context, fileNames);
    const partials = await parseStrings(parseToml, fileContents);
    
    return partials.map((partial, i) => ({
      slug: fileNames[i].slice(0, -5),
      category,
      ...partial
    });
  };
  
  const subArrays = await Promise.all(
    categories.map(eachCategory),
  );
  
  return subArrays.flat();
};