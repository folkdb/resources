import { test } from 'uvu';
import * as assert from 'uvu/assert';
import graphqlRequest from 'graphql-request';
import { mockServer } from './gql-server/index.js';
import { categories, resources } from './gql-server/data.js';

const { GraphQLClient } = graphqlRequest;

test('Gets expected Hello response', async () => {
  const gqlServer = await mockServer();
  const { url, server } = await gqlServer.listen();
  const client = new GraphQLClient(url);

  const { allCategories } = await client.request(`
    {
      allCategories {
        data {
          slug
        }
      }
    }
  `);
  
  assert.equal(allCategories.data, categories.map({ slug } => ({ slug })));

  server.close();
});

export default test;
