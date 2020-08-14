import { readFile } from 'fs';
import { resolve } from 'path';
import { promisify } from 'util';
import parseToml from '@iarna/toml/parse-async.js';

const testParsing = async () => {
  const reader = promisify(readFile);
  const testPath = resolve(process.cwd(), 'data/collections-songs-tunes/campin.toml');
  
  const tomlString = await reader(testPath, 'utf8');
  const parsed = await parseToml(tomlString);

  console.log(JSON.stringify(parsed, undefined, 2));
};

const testQuery = async () => {
  const response = await allCategories();
  
  console.log(JSON.stringify(response, undefined, 2));
}

testQuery();
