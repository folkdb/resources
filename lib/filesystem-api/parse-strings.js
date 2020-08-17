import { tryCatch } from '../utils/try-catch.js';

export const parseStrings = (parser, strings) => tryCatch(
  () => Promise.all(
    strings.map((s) => parser(s)),
  ),
  {
    function: 'parseStrings',
    source: 'lib/filesystem-api/parse-strings.js',
    library: 'folkdb/resources',
    arguments: { parser, strings },
  },
);
