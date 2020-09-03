import { relative } from '../utils/path/index.js';
import { println } from '../utils/cli/index.js';
import { tryCatch } from '../utils/async/index.js';

import {
  allCategories,
  createCategory,
  gqlQuery,
} from '../graphql-api/index.js';

const source = relative(import.meta.url);

const sendQuery = gqlQuery(
  'https://graphql.fauna.com/graphql',
  'FAUNADB_SERVER_SECRET',
);

export const testQuery = (_, { slug }) => tryCatch(
  () => sendQuery(createCategory, { slug }),
  {
    source,
    call: 'testQuery()',
  },
);
