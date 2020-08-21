import cleanStack from 'clean-stack';
import extractStack from 'extract-stack';
import stringify from 'stringify-object';
import { println } from './println.js';
import { styled } from './styled.js'

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

    [
      '*=================================*',
      '|          RUNTIME ERROR          |',
      '*=================================*',
      ''
    ].map(styled('error')).map(println);
    
    [
      styled('warning')('Exception caught at:'),
      `  library: ${styled('info')('folkdb/resources')}`,
      `  source: ${styled('info')(originator.source)}`,
      `  function: ${styled('info')(originator.function)}`,
      '',
    ].map(println);

    [
      styled('warning')('Error message:'),
      `  ${styled('error')(err.message.trim())}`,
      '',
    ].map(println);

    if (originator.arguments) {
      println(styled('warning')('Check the following arguments:'));
      Object.entries(originator.arguments).map(
        ([k, v]) => println(`  ${k}: ${styled('info')(stringify(v, { singleQuotes: false }))}`),
      );
      println('');
    }

    if (originator.environment) {
      println(styled('warning')('And the following environment variables:'));
      Object.entries(originator.environment).map(
        ([k, v]) => println(`  ${k}: ${styled('info')(stringify(v, { singleQuotes: false }))}`),
      );
      println('');
    }

    println('');

    process.exitCode = 1;
    return Promise.reject(errorObj);
  }
};
