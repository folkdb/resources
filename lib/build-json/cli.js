#!/usr/bin/env node

import { resolve } from 'path';
import mri from 'mri';
import stringify from 'stringify-object';
import { styled, print, println } from '../utils/index.js';
import { buildJson } from './index.js';

(() => {
  const { _, ...options } = mri(process.argv.slice(2));
  const context = resolve(process.cwd(), _[0] || '');

  println('');
  print(styled('secondary')('Running script '));
  print(styled('primary')('build-json'));
  println(styled('secondary')(' with arguments:')),
  println(`${styled('muted')('context:')} ${styled('info')(stringify(context, { singleQuotes: false }))}`, { indent: 2 });
  println(`${styled('muted')('options:')} ${styled('info')(stringify(options, { singleQuotes: false }))}`, { indent: 2 });
  println('');

  buildJson(context, options)
    .then(() => {
      [ 
        '  ∆···········∆',
        '  ‡  D O N E  ‡',
        '  ˘············˘·',
      ].map(styled('success')).map(println);
      println('');
    })
    .catch(() => {});
})();
