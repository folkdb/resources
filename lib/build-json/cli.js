#!/usr/bin/env node

import { resolve } from 'path';
import mri from 'mri';
import { print } from '../utils/index.js';
import { buildJson } from './index.js';

(() => {
  const { _, ...options } = mri(process.argv.slice(2));
  const context = resolve(process.cwd(), _[0] || '');

  print('Running script build-json', { lines: 1, format: 'primary' });
  print({ context, options }, { lines: 2, format: 'info' });

  buildJson(context, options)
    .then(() => { console.log('Done\n'); })
    .catch(() => {});
})();
