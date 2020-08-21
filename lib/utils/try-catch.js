import cleanStack from 'clean-stack';
import extractStack from 'extract-stack';
import { println } from './println.js';
import { stringify } from './stringify.js';
import { styled } from './styled.js';

export const tryCatch = async (call, originator) => {
  try {
    const result = await call();
    return result;
  } catch (err) {
    const errStack = extractStack.lines(
      cleanStack(err.stack, { basePath: process.cwd() }),
    );

    const errorObj = {
      originator,
      errType: err.name,
      errMessage: err.message,
      errStack,
    };

    [
      '*=================================*',
      '|          RUNTIME ERROR          |',
      '*=================================*',
    ].map(styled('error')).map(println);

    println('');

    [
      styled('warning')('Exception caught at:'),
      `  library: ${styled('info')('folkdb/resources')}`,
      `  source: ${styled('info')(originator.source)}`,
      `  function: ${styled('info')(originator.function)}`,
    ].map(println);

    println('');

    println(styled('warning')('Error message:'));
    println(
      `${styled('error')(err.message)}`,
      { indent: 2, lines: 2 },
    );

    if (originator.arguments) {
      println(styled('warning')('Check the following arguments:'));

      Object.entries(originator.arguments)
        .forEach(([k, v]) => {
          println(`${k}: ${styled('info')(stringify(v))}`, { indent: 2 });
        });

      println('');
    }

    if (originator.environment) {
      println(styled('warning')('And the following environment variables:'));

      Object.entries(originator.environment)
        .forEach(([k, v]) => {
          println(`${k}: ${styled('info')(stringify(v))}`, { indent: 2 });
        });

      println('');
    }

    if (errStack.length > 0) {
      println(styled('warning')('Stack trace:'));

      errStack.forEach((step) => {
        println(styled('muted')(step), { indent: 2 });
      });

      println('');
    }

    println('');

    process.exitCode = 1;
    return Promise.reject(errorObj);
  }
};
