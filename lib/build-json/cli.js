#!/usr/bin/env node

import { resolve } from 'path';
import mri from 'mri';
import { stringify } from '../utils/object/index.js';
import { iter, map } from '../utils/fp/index.js';
import { print, println, styled } from '../utils/cli/index.js';
import { buildJson } from './index.js';

(() => {
  const { _, ...options } = mri(process.argv.slice(2));
  const context = resolve(process.cwd(), _[0] || '');

  println('');

  iter(print)([
    styled('warning')('Running script '),
    styled('primary')('lib/build-json/cli.js'),
    styled('warning')(' with'),
  ]);

  println('', { lines: 2 });

  println(
    [
      styled('secondary')('context:'), 
      styled('info')(stringify(context)),
    ].join(' '), 
    { indent: 2, lines: 2 },
  );

  println(
    [
      styled('secondary')('options:'), 
      styled('info')(stringify(options)),
    ].join(' '), 
    { indent: 2, lines: 2 },
  );

  buildJson(context, options)
    .then(() => {
      iter(println)(
        map(styled('success'))([
          '  ∆ ········· ∆',
          '  ‡  D O N E  ‡',
          '  ^ ········· ^',
          '',
        ]),
      );
    })
    .catch(() => {});
})();
