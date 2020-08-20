import {
  tryCatch,
  whatType,
} from '../utils/index.js';

export const parseStrings = (parser, strings) => tryCatch(
  () => {
    const parseEach = (current) => tryCatch(
      () => parser(current),
      {
        library: 'folkdb/resources',
        source: 'lib/filesystem-api/parse-strings.js',
        function: 'parseEach',
        arguments: { current },
        environment: { parser: `[${whatType(parser)}]` },
      },
    );
  
    return Promise.all(strings.map(parseEach));
  },
  {
    library: 'folkdb/resources',
    source: 'lib/filesystem-api/parse-strings.js',
    function: 'parseStrings',
    arguments: { parser: `[${whatType(parser)}]`, strings: `[${whatType(strings)}]` },
  },
);
