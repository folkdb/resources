import { relative } from '../utils/path/index.js';
import { expect } from '../utils/type/index.js';
import { mapAsync } from '../utils/fp/index.js';
import { tryCatch } from '../utils/async/index.js';

export const parseStrings = (parser, strings) => {
  const source = relative(import.meta.url);
  const call = 'parseStrings(parser, strings)';

  expect('Function')(parser, { source, call, argument: 'parser' });
  expect('Array')(strings, { source, call, argument: 'strings' });

  const parseEach = (current) => {
    expect('String')(current, {
      source,
      call: 'parseEach(current)',
      argument: 'current',
    });

    return tryCatch(
      () => parser(current),
      {
        source,
        call: 'parseEach(current)',
        arguments: { current },
        environment: { parser: '[Function]' },
      },
    );
  };

  return tryCatch(
    () => mapAsync(parseEach)(strings),
    {
      source,
      call,
      arguments: { parser: '[Function]', strings: '[Array]' },
    },
  );
};
