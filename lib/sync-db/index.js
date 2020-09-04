import { stringify } from '../utils/object/index.js';
import { relative } from '../utils/path/index.js';
import { iter } from '../utils/fp/index.js';
import { println } from '../utils/cli/index.js';
import { tryCatch } from '../utils/async/index.js';
import { gqlQuery } from '../graphql-api/index.js';

const source = relative(import.meta.url);

const clientApi = gqlQuery(
  'https://graphql.fauna.com/graphql',
  'FAUNADB_SERVER_SECRET',
);

const categoryMap = await mapCategories(clientApi);
const resourceMap = await mapResources(clientApi);