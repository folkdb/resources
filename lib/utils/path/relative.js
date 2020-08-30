import { relative as rel } from 'path';
import { expect } from '../type/expect.js';

export const relative = (pathOrUrl, context = process.cwd()) => {
  const source = 'lib/utils/path/relative';
  const call = 'relative(pathOrUrl, context)';

  expect('String')(pathOrUrl, { source, call, argument: 'pathOrUrl' });
  expect('String')(context, { source, call, argument: 'context' });

  const absolutePath = (
    pathOrUrl.startsWith('file://')
      ? pathOrUrl.slice(7)
      : pathOrUrl
  );

  return rel(context, absolutePath);
};
