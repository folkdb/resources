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

    print([
      `Exception caught at ${originator.function} in `,
      `${originator.source} of ${originator.library}:`,
    ].join(''));

    print(`  ${prettyStack}\n`, { error: true });
    
    if (originator.arguments) {
      print('Check the following arguments:');
      print(originator.arguments);
      print('');
    }
    
    if (originator.environment) {
      print('And the following environment variables:');
      print(originator.environment);
      print('');
    }

    process.exitCode = 1;
    return Promise.reject(errorObj);
  }
};
