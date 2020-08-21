import k from 'kleur';
import { caseOf } from './case-of.js';

export const styled = caseOf([
  ['primary', (s) => k.bold(blue(s))],
  ['secondary', k.blue],
  ['info', k.cyan],
  ['success', k.green],
  ['warning', k.yellow],
  ['error', k.red],
  ['muted', k.gray],
], { default: (x) => x });
