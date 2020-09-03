import cleanStack from 'clean-stack';
import extractStack from 'extract-stack';
import { library } from '../../env.js';
import { stringify } from '../object/index.js';
import { print, println, styled } from '../cli/index.js';
import { iter, iterEntries, map } from '../fp/index.js';

export const runtimeError = ({ error, originator }) => {
  try {
    const stackArray = extractStack.lines(
      cleanStack(error.stack, { basePath: process.cwd() }),
    );

    iter(println)(
      map(styled('error'))([
        '*=================================*',
        '|          RUNTIME ERROR          |',
        '*=================================*',
      ]),
    );

    println('');
    println(styled('warning')('Exception caught at:'));

    iter(println)([
      `${styled('secondary')('library:')} ${styled('info')(library)}`,
      `${styled('secondary')('source:')} ${styled('info')(originator.source)}`,
      `${styled('secondary')('call:')} ${styled('info')(originator.call)}`,
    ], { indent: 2 });

    println('');

    println(styled('warning')('Error message:'));
    println(
      `${styled('error')(error.message)}`,
      { indent: 2, lines: 2 },
    );

    if (originator.arguments) {
      println(styled('warning')('Check the following arguments:'));

      iterEntries(([k, v]) => {
        print(styled('secondary')(`${k}:`), { indent: 2 }); 
        println(styled('info')(stringify(v)), { indent: 1 });
      })(originator.arguments);

      println('');
    }

    if (originator.environment) {
      println(styled('warning')('And the following environment variables:'));

      iterEntries(([k, v]) => {
        print(styled('secondary')(`${k}:`), { indent: 2 });
        println(styled('info')(stringify(v)), { indent: 2 });
      })(originator.environment);

      println('');
    }

    if (stackArray.length > 0) {
      println(styled('warning')('Stack trace:'));

      iter((step) => {
        println(styled('muted')(step), { indent: 2 });
      })(stackArray);

      println('');
    }

    println('');
  } catch (logErr) {
    console.error(new Error(`Exception thrown while logging error details. See error message below.`));
    console.error(logErr);
  }
};
