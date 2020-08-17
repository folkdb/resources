// import {
//   allCategories,
//   createCategory,
// } from './graphql-api/index.js';
import { tryCatch } from './utils/try-catch.js';
import { buildJson } from './build-json.js';

// const testQuery = async (q, vars) => {
//   const response = await q(vars);

//   console.log(JSON.stringify(response, undefined, 2));
// };

// testQuery(createCategory, { slug: 'pineapple' });

const testParser = () => tryCatch(
  () => {
    const json = await buildJson();
    console.log(JSON.stringify(json, undefined, 2));
  },
  { 
    function: 'testParser', 
    source: 'lib/index.js',
    library: 'folkdb/resources',
  },
};

testParser();
