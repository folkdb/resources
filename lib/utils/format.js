import { bold, blue, cyan, green, yellow, red, gray } from 'kleur';
import { caseOf } from './case-of.js';

export const format = caseOf([
  [ 'primary', (s) => bold(blue(s))],
  [ 'secondary', blue ],
  [ 'info', cyan ],
  [ 'success', green ],
  [ 'warning', yellow ],
  [ 'error', red ],
  [ 'muted', gray ],
], { default: (x) => x });
