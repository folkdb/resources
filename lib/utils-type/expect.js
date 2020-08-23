import { library } from '../env.js';
import { stringify } from '../utils-cli/stringify.js'
import { whatType } from './what-type.js';

export const expect = (type) => (value, originator) => {
  if (whatType(type) !== 'String') {
    const here = {
      library,
      source: 'lib/utils-type/expect.js',
      function: 'expect',
      argument: 'type',
    };
    
    throw new Error(`Expected String but got ${whatType(type)} at: ${stringify(here)}`);
  }
  
  if (whatType(value) !== type) {
    throw new Error(`Expected ${type} but got ${whatType(value)} at: ${stringify({ library, ...originator })}`);
  }
};
