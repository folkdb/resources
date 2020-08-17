#!/usr/bin/env node

import { resolve } from 'path';
import mri from 'mri';
import { buildJson } from './index.js';

(() => {
  const { _, ...options } = mri(process.argv.slice(2));
  const context = resolve(process.cwd(), _[0] || '');
  buildJson(context, options).catch(() => {});
})();
