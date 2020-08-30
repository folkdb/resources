import { library } from '../../env.js';
import { relative } from '../path/index.js';
import { expect, expectOneOf } from '../type/index.js';
import { runtimeError } from '../cli/index.js';

export const tryCatch = async (asyncCall, originator = {}) => {
  try {
    const source = relative(import.meta.url);
    const call = 'tryCatch(asyncCall, originator)';

    expectOneOf([
      'AsyncFunction',
      'Function',
    ])(asyncCall, { source, call, argument: 'asyncCall' });

    expect('Object')(originator, { source, call, argument: 'originator' });

    const result = await asyncCall();
    return result;
  } catch (error) {
    runtimeError({ error, originator });
    process.exitCode = 1;
    return Promise.reject(error); 
  }
};
