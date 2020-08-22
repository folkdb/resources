import k from 'kleur';
import { caseOf } from './case-of.ts';

export const styled = caseOf([
  ['primary', (s) => k.bold(k.blue(s))],
  ['secondary', k.magenta],
  ['info', k.cyan],
  ['success', k.green],
  ['warning', k.yellow],
  ['error', k.red],
  ['muted', k.gray],
], { defaultTo: (x) => x });
