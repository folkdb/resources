import { test } from 'uvu';
import * as assert from 'uvu/assert';
import graphqlRequest from 'graphql-request';
import { gqlServer } from './gql-server/index.js';

const { GraphQLClient } = graphqlRequest;

test('Gets expected Hello response', async () => {
  const { url, server } = await gqlServer.listen();
  const client = new GraphQLClient(url);

  const { allResources } = await client.request(`
    {
      allResources {
        data {
          slug
        }
      }
    }
  `);
  
  assert.equal(allResources.data, [
    { slug: 'apple' },
    { slug: 'orange' },
    { slug: 'pear' },
  ]);

  server.close();
});

export default test;
