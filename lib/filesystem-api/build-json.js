import { readFile } from 'fs';
import { resolve } from 'path';
import { promisify } from 'util';
import parseToml from '@iarna/toml/parse-async.js';

export const buildJson = async () => {
  const reader = promisify(readFile);
  const testPath = resolve(process.cwd(), 'data/collections-songs-tunes/campin.toml');
  
  const tomlString = await reader(testPath, 'utf8');
  const parsed = await parseToml(tomlString);

  console.log(JSON.stringify(parsed, undefined, 2));
};