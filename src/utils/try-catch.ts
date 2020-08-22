import cleanStack from 'clean-stack';
import extractStack from 'extract-stack';
import { println } from './println';
import { stringify } from './stringify';
import { styled } from './styled';

interface Originator {
  library?: string;
  source: string;
  function: string;
  arguments?: any[];
  environment?: any[];
}

export const tryCatch = async (call: Function, originator: Originator): Promise<any> => {
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
    ].map(styled('error')).forEach((s) => println(s));

    println('');

    [
      styled('warning')('Exception caught at:'),
      `  library: ${styled('info')('folkdb/resources')}`,
      `  source: ${styled('info')(originator.source)}`,
      `  function: ${styled('info')(originator.function)}`,
    ].forEach((s) => println(s));

    println('');

    println(styled('warning')('Error message:'));
    println(
      `${styled('error')(err.message)}`,
      { lines: 2, indent: 2 },
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
