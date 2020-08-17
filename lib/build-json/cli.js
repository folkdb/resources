#!/usr/bin/env node

import { resolve } from 'path';
import mri from 'mri';
import { buildJson } from './index.js';

(() => {
  const { _, ...options } = mri(process.argv.slice(2));
  const context = resolve(process.cwd(), _[0] || '');
  
  console.log([
    'build-json\n',
    `  context: ${context}\n`,
    '  options:\n',
    ...Object.entries(options).map(([k, v]) => `    - ${k}: ${v}\n`),
  ].join(''));

  buildJson(context, options)
    .then(() => { console.log('Done\n'); })
    .catch(() => {});
})();
