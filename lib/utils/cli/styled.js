import k from 'kleur';
import { relative } from '../path/index.js';
import { expectLiteral } from '../type/index.js';
import { caseOf } from '../fp/index.js';

export const styled = (kind) => {
  expectLiteral([
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
    'muted',
  ])(kind, {
    source: relative(import.meta.url),
    call: 'styled(kind)',
    argument: 'kind',
  });

  const selector = caseOf([
    ['primary', (s) => k.bold(k.blue(s))],
    ['secondary', k.magenta],
    ['info', k.cyan],
    ['success', k.green],
    ['warning', k.yellow],
    ['error', k.red],
    ['muted', k.gray],
  ], { defaultTo: (x) => x });

  return selector(kind);
};
