/* eslint prefer-promise-reject-errors: off */

import cleanStack from 'clean-stack';
import extractStack from 'extract-stack';
import { library } from '../../env.js'
import { stringify } from '../object/index.js';
import { relative } from '../path/index.js';
import { expect, expectOneOf } from '../type/index.js';
import { println, styled } from '../cli/index.js';
import { iter, iterEntries, map } from '../fp/index.js';

export const tryCatch = async (call, originator = {}) => {  
  try {
    const here = {
      source: relative(import.meta.url),
      call: 'tryCatch(call, originator)',
    };
    
    expectOneOf([
      'Function',
      'AsyncFunction',
    ])(call, { ...here, argument: 'call' });
    
    expect('Object')(originator, { ...here, argument: 'originator' });

    const result = await call();
    return result;
  } catch (err) {
    const stackArray = extractStack.lines(
      cleanStack(err.stack, { basePath: process.cwd() }),
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
      `library: ${styled('info')(library)}`,
      `source: ${styled('info')(originator.source)}`,
      `call: ${styled('info')(originator.function)}`,
    ], { indent: 2 });

    println('');

    println(styled('warning')('Error message:'));
    println(
      `${styled('error')(err.message)}`,
      { indent: 2, lines: 2 },
    );

    if (originator.arguments) {
      println(styled('warning')('Check the following arguments:'));

      iterEntries(([k, v]) => {
        println(`${k}: ${styled('info')(stringify(v))}`, { indent: 2 });
      })(originator.arguments);

      println('');
    }

    if (originator.environment) {
      println(styled('warning')('And the following environment variables:'));

      iterEntries(([k, v]) => {
        println(`${k}: ${styled('info')(stringify(v))}`, { indent: 2 });
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

    process.exitCode = 1;

    return Promise.reject({
      error: {
        name: err.name,
        message: err.message,
        stack: stackArray,
      },
      originator,
    });
  }
};
