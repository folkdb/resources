import { library } from '../../env.js';
import { relative } from '../path/index.js';
import { stringify } from '../object/stringify.js';
import { whatType } from './what-type.js';

export const expect = (type) => (value, originator) => {
  if (whatType(type) !== 'String') {
    const here = {
      library,
      source: relative(import.meta.url),
      call: 'expect(type)(value, originator)',
      argument: 'type',
    };

    throw new Error(`Expected String but got ${whatType(type)} at: ${stringify(here)}`);
  }

  if (whatType(value) !== type) {
    throw new Error(`Expected ${type} but got ${whatType(value)} at: ${stringify({ library, ...originator })}`);
  }
};
