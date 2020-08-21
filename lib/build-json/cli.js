#!/usr/bin/env node

import { resolve } from 'path';
import mri from 'mri';
import { print, println, stringify, styled } from '../utils/index.js';
import { buildJson } from './index.js';

(() => {
  const { _, ...options } = mri(process.argv.slice(2));
  const context = resolve(process.cwd(), _[0] || '');

  println('');

  [styled('secondary')('Running script '),
    styled('primary')('build-json'),
    styled('secondary')(' with arguments:'),
  ].map(print);

  println('');

  println(
    `${styled('muted')('context:')} ${styled('info')(stringify(context))}`,
    { indent: 2 },
  );

  println(
    `${styled('muted')('options:')} ${styled('info')(stringify(options))}`,
    { indent: 2 },
  );

  println('');

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
