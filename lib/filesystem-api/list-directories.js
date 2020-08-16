import { readdir, stat } from 'fs/promises';
import { resolve } from 'path';

export const listDirectories = (context) => {
  const names = await readdir(context);
  const stats = await Promise.all(
    names.map((n) => stat(resolve(context, n))),
  );

  return names.filter((_, i) => stats[i].isDirectory());
};  
