import { println } from './println';
import { stringify } from './stringify';

export const debugPromise = async (promise, timeout = 5) => {
  const expire = () => new Promise((resolve) => {
    setTimeout(() => resolve('%TIMEOUT%'), timeout * 1000);
  });

  let out;

  try {
    const value = await Promise.race([promise, expire()]);
    out = (
      value === '%TIMEOUT%'
        ? { status: 'pending (timed out)', timeout: `${timeout} seconds` }
        : { status: 'fulfilled', value }
    );
  } catch (error) {
    out = { status: 'rejected', error };
  }

  println(stringify(out));
};
