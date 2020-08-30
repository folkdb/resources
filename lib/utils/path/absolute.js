import { resolve } from 'path';
import { expect } from '../type/expect.js';

export const absolute = (pathOrUrl, context = process.cwd()) => {
  const source = 'lib/utils/path/absolute';
  const call = 'absolute(pathOrUrl, context)';

  expect('String')(pathOrUrl, { source, call, argument: 'pathOrUrl' });
  expect('String')(context, { source, call, argument: 'context' });

  return resolve(context, pathOrUrl);
};
