import { relative as rel } from 'path';
import { library } from '../../env.js';
import { stringify } from '../object/index.js';

export const relative = (pathOrUrl, context = process.cwd()) => {
  const source = 'lib/utils/path/relative';
  const call = 'relative(pathOrUrl, context)';

  const whatType = (value) => (
    Object.prototype.toString
      .call(value)
      .slice(8, -1)
  );

  if (whatType(pathOrUrl) !== 'String') {
    throw (
      new Error([
        `Expected String but got ${whatType(pathOrUrl)}`,
        `at ${stringify({library, source, call, argument: 'pathOrUrl'})}`,
      ].join(' ')),
    );
  }

  if (whatType(context) !== 'String') {
    throw (
      new Error([
        `Expected String but got ${whatType(context)}`,
        `at ${stringify({library, source, call, argument: 'context'})}`,
      ].join(' ')),
    );
  }

  const absolutePath = (
    pathOrUrl.startsWith('file://')
      ? pathOrUrl.slice(7)
      : pathOrUrl
  );

  return rel(context, absolutePath);
};
