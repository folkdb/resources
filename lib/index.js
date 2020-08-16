import {
  allCategories,
  createCategory,
} from './graphql-api/index.js';

import { buildJson } from './filesystem-api/index.js';

const testQuery = async (q, vars) => {
  const response = await q(vars);

  console.log(JSON.stringify(response, undefined, 2));
};

// testQuery(createCategory, { slug: 'pineapple' });

const testParser = async () => {
  const json = await buildJson();
  console.log(JSON.stringify(json, undefined, 2));
};

testParser();
