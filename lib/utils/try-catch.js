import cleanStack from 'clean-stack';
import extractStack from 'extract-stack';
import { print } from './print.js';

export const tryCatch = async (call, originator) => {
  try {
    const result = await call();
    return result;
  } catch (err) {
    const prettyStack = cleanStack(err.stack, { basePath: process.cwd() });

    const errorObj = {
      originator,
      errorType: err.name,
      errorMessage: err.message,
      callStack: extractStack.lines(prettyStack),
    };

    const errorMsg = [
      `Exception caught at ${originator.function} in ${originator.source} of ${originator.library}:`,
      `\n  ${prettyStack}\n`,
    ].join('');
    
    print(errorMsg, { error: true });
    process.exitCode = 1;
    return Promise.reject(errorObj);
  }
};
