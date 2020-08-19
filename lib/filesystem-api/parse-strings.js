import { tryCatch } from '../utils/try-catch.js';

export const parseStrings = (parser, strings) => tryCatch(
  () => {
    const parseEach = (current) => tryCatch(
      () => parser(current),
      {
        library: 'folkdb/resources',
        source: 'lib/filesystem-api/parse-strings.js',
        function: 'parseEach',
        arguments: { current },
        environment: { parser },
      },
    );
  
    return Promise.all(strings.map(parseEach));
  },
  {
    library: 'folkdb/resources',
    source: 'lib/filesystem-api/parse-strings.js',
    function: 'parseStrings',
    arguments: { parser, strings: `[Array(${strings.length})]` },
  },
);
