import { stringify } from '../utils/object/index.js';
import { relative } from '../utils/path/index.js';
import { iter } from '../utils/fp/index.js';
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
  async () => {
    const response = await sendQuery(allCategories);
    const { data } = response.allCategories;
    const categoryMap = new Map();

    iter(({ _id, slug }) => {
      categoryMap.set(slug, _id);
    })(data);
    
    println(stringify([...categoryMap.entries()]), { indent: 2, lines: 2 });
  },
  {
    source,
    call: 'testQuery()',
  },
);
