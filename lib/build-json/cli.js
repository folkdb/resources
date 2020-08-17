#!/usr/bin/env node

import mri from 'mri';
import { buildJson } from './index.js'

(() => {
  const { _, ...options } = mri(process.argv.slice(2));
  const context = path.resolve(process.cwd(), _[0] || '');
  buildJson(context, options).catch(() => {});
})();
