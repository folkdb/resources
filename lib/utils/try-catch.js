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

    print('*---------------------------------*', { lines: 1 });
    print('|          RUNTIME ERROR          |', { lines: 1 });
    print('*---------------------------------*', { lines: 2 });

    print('Exception caught at:', { lines: 1 });
    print({
      library: originator.library,
      source: originator.source,
      function: originator.function,
    }, { lines: 2 });

    print('Error message:', { lines: 1 });
    print(err.message.trim(), { indent: 2, lines: 2 })

    if (originator.arguments) {
      print('Check the following arguments:', { lines : 1 });
      print(originator.arguments, { lines: 2 });
    }
    
    if (originator.environment) {
      print('And the following environment variables:', { lines : 1 });
      print(originator.environment, { lines: 2 });
    }

    process.exitCode = 1;
    return Promise.reject(errorObj);
  }
};
