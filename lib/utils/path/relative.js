import { library } from '../../env.js';
import { relative as rel } from 'path';

export const relative = (pathOrUrl, context = process.cwd()) => {
  const source = 'lib/utils/path/relative';
  const call = 'relative(pathOrUrl, context)',

  const whatType = (value) => (
    Object.prototype.toString
      .call(value)
      .slice(8, -1)
  );
  
  if (whatType(pathOrUrl) !== 'String') {
    throw (`Expected String but got ${whatType(pathOrUrl)} at ${stringify({ library, source, call, argument: 'pathOrUrl' })}`);
  }
  
  if (whatType(context) !== 'String') {
    throw (`Expected String but got ${whatType(context)} at ${stringify({ library, source, call, argument: 'context' })}`);
    }
  
  const absolutePath = (
    pathOrUrl.startsWith('file://')
      ? pathOrUrl.slice(7)
      : pathOrUrl
  )
  
  return rel(context, absolutePath);
};