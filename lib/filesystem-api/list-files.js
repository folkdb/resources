import { readdir, stat } from 'fs/promises';
import { resolve } from 'path';

export const listFiles = async (context, test = () => true) => {
  const names = await readdir(context);
  const stats = await Promise.all(
    names.map((n) => stat(resolve(context, n))),
  );

  return names.filter((n, i) => stats[i].isFile() && test(n, stats[i]));
};  
