#!/usr/bin/env node

import { resolve } from 'path';
import mri from 'mri';
import {
  print, println, stringify, styled,
} from '../utils/index.js';
import { buildJson } from './index.js';

(() => {
  const { _, ...options } = mri(process.argv.slice(2));
  const context = resolve(process.cwd(), _[0] || '');

  println('');

  [styled('warning')('Running script '),
    styled('primary')('lib/build-json/cli.js'),
    styled('warning')(' with'),
  ].map(print);

  println('', { lines: 2 });

  println(
    `${styled('secondary')('context:')} ${styled('info')(stringify(context))}`,
    { indent: 2, lines: 2 },
  );

  println(
    `${styled('secondary')('options:')} ${styled('info')(stringify(options))}`,
    { indent: 2, lines: 2 },
  );

  buildJson(context, options)
    .then(() => {
      [
        '  ∆ ········· ∆',
        '  ‡  D O N E  ‡',
        '  ^ ········· ^',
      ].map(styled('success')).map(println);
      println('');
    })
    .catch(() => {});
})();
