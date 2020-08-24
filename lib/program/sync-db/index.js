import {
  print,
  tryCatch,
} from '../utils/index.js';
import {
  allCategories,
  createCategory,
  gqlQuery,
} from '../graphql-api/index.js';

const sendQuery = gqlQuery(
  'https://graphql.fauna.com/graphql',
  'FAUNADB_SERVER_SECRET',
);

const testQuery = () => tryCatch(
  async () => {
    const response = await sendQuery(createCategory, { slug: 'pineapple' });
    print(response);
  },
  {
    function: 'testQuery',
    source: 'lib/sync-db/index.js',
    library: 'folkdb/resources',
  },
);
