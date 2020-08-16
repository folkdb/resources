import { readFile } from 'fs/promises';
import { resolve } from 'path';

export const readFiles = (context, names) => Promise.all(
  names.map((n) => readFile(resolve(context, n), 'utf8')),
);
